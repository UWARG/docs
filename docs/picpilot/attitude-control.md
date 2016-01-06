#Attitude Control

Attitude Control is very similar regardless of the aircraft which is being used. The end goal is to be able to keep the aircraft stable and in control. The way in which this is achieved is always very similar.

In the PICpilot, we use PID loops to manage our system. Although there are other types of controllers available, PID controllers are the best option due to their reliability, accuracy, and simplicity. The section on PID loops has a detailed explanation of how they work, and how they work together.

This section mostly deals with the _AttitudeManager.c_ file, as the name implies.

The attitude manager has the 3 main goals, as well as a side task. The 3 main goals include the aggregation of status data (inputs, sensors, etc.), error analysis on the status of the aircraft, and corrections to the aircraft. The side task involves sending all this data to the ground station, as well as receiving from the ground station.

## Initialization

The initialization process involves beginning communication with all components. The process involves the following steps:

1. Initializing communication to the Path Manager via SPI and DMA
2. VN 100 is initialized
3. VN 100 is offset according to a rotation matrix
4. VN 100 is then calibrated with confidence parameters for the X/Y/Z magnetometers, accelerometers, and gyroscopes
5. PWM input and output is specified according to the used channels

This can be found in the _attitudeInit()_ function in the _AttitudeManager.c_ file.

## Aggregation of Data

Using the initialized sensors from the prior section, the vehicle can now collect data systematically.

Every loop, new data is acquired from the DMA/SPI interface connected to the Path Manager chip. Data acquired from this chip includes the time, heading, speed, longitude, latitude, altitude, number of satellites, position fix, battery level, waypoint index, set point altitude, and set point heading.

Next, data is acquired from the PWM inputs. This includes stick positions, which determine the roll, pitch, yaw, and throttle of the aircraft. These inputs are scaled to values ranging from -1024 to 1024.

Finally, the VectorNav is polled for the latest rotational data. The roll, pitch, and yaw rate data is acquired through the _VN100\_SPI\_GetRates(0, (float\*) &imuData)_ function call. The roll, pitch, and yaw angles can be determined via the _VN100\_SPI\_GetYPR(0, &imuData[YAW], &imuData[PITCH], &imuData[ROLL])_ function call.

This concludes all data acquisition. The next step involves analyzing the error.

## Error Analysis (PID control)

PID control works on the basis of minimizing error. The majority of the attitude manager involves consecutive PID loops correcting specific portions of flying an aircraft.

All the PID loop code can be found in the _OrientationControl.c_ file. It is called from the AttitudeManager.c code.

###Altitude

The altitude is controlled through a standard PID loop. This can be found in the code:

        sp_PitchAngle = controlSignalAltitude(sp_Altitude,(int)gps_Altitude);

        if (sp_PitchAngle > MAX_PITCH_ANGLE)

            sp_PitchAngle = MAX_PITCH_ANGLE;

        if (sp_PitchAngle < -MAX_PITCH_ANGLE)

            sp_PitchAngle = -MAX_PITCH_ANGLE;

Logically, the pitch angle is determined from the desired altitude. If the plane is too low, the pitch angle will be positive (up). If the plane is too high, the pitch angle will be negative (down). The pitch angle is then checked to be within "safety limits".

###Throttle

Like the altitude PID loop, the throttle also has PID loop, which is also based on the altitude:

        control_Throttle = sp_ThrottleRate + controlSignalThrottle(sp_Altitude, (int)gps_Altitude);

        if (control_Throttle > MAX_PWM){

            control_Throttle = MAX_PWM;

        }

        else if (control_Throttle < MIN_PWM){

            control_Throttle = MIN_PWM;

        }

Logically, if the plane needs to climb, you need to increase the throttle (otherwise it will stall due to low airspeed). Likewise, if the plane needs to reduce its altitude, to prevent high airspeeds, the plane decreases the throttle. If the plane is perfectly positioned, a constant throttle is maintained as per the _sp\_ThrottleRate_ variable. Once again, the throttle is limited within the legal limits of the throttle (to ensure the throttle doesn't become negative or larger than 100%).

###Heading

The heading control code looks as such:

        while (sp_Heading > 360)

            sp_Heading -=360;

        while (sp_Heading < 0)

            sp_Heading +=360;

            sp_HeadingRate = controlSignalHeading(sp_Heading, gps_PositionFix==2?gps_Heading:(int)imu_YawAngle);

            //Approximating Roll angle from Heading

            sp_RollAngle = sp_HeadingRate;//(int)(atan((float)(sp_HeadingRate)) * PI/180.0);

        if (sp_RollAngle > MAX_ROLL_ANGLE)

            sp_RollAngle = MAX_ROLL_ANGLE;

        if (sp_RollAngle < -MAX_ROLL_ANGLE)

            sp_RollAngle = -MAX_ROLL_ANGLE;

As you can see, the input is the heading and the resulting output is a roll angle. In other words, if there is a greater error in the heading, a larger roll angle is established to correct for the heading error.

The first two while loops take into account any angle overflow or underflow, in other words, if the value is above 360 or negative, it is scaled to be between 0 and 360.

Once again the roll value is limited to a reasonable value, to prevent excessive maneuvers.

###Angles

The code to maintain the angular roll and pitch of the aircraft look as such (one statement for each):

    sp_ComputedRollRate = controlSignalAngles(sp_RollAngle,  imu_RollAngle, ROLL, -(SP_RANGE) / (MAX_ROLL_ANGLE));

Note that depending on the on the input angles, the output is a "rate". It is an angular rate. In other words, if the difference between the setpoint and the output is large, the angular rate will also be large.

###Angular Rate

The result from the angular PID loop gives rise to the angular rate PID loop. This loop is often acknowledged as a stabilizing system, where small quick vibrations are accounted for.

    control_Roll = controlSignal((sp_ComputedRollRate / SERVO_SCALE_FACTOR), imu_RollRate, ROLL);

The output of this function completes the PID pipeline. The value of _control\_Roll_, or the equivalent variable for the pitch for that matter, is then directly applied to the PWM module, in order to create a correction to the system (using the flaps, elevators, rudder, or what not).

## Output Corrections

Once the calculations have been made to determine what corrections should be made to the system, it is then time to physically alter the system based on the calculations.

This involves output to the PWM module. After a series of checks, to ensure that all values are within the maximum and minimum parameters for the PWM signal, a PWM call is made to the appropriate channel:

    setPWM(1, control_Roll + rollTrim);

As long as the PWM module was initialized, there shouldn't be any problem. The vehicle should move its servos appropriately.

## Control Levels

The control levels implemented in the attitude manager are an important part of the testing process. These levels determine which input sources have primary control over the aircraft, as well as how the input translates into flight.

For instance, when testing, one may wish to have control of the throttle, while the roll and pitch is controlled by the autopilot. Such control is implemented in the code.

As it is evident above, there a separate sections of code, which control individual PID loops. The control levels change the source of the input to the PIDs using a simple bit mask. The control level is actually determined by a single integer. Each value of the integer represents a different _control level._ As a result, a bit mask is placed within an, if statement to determine whether or not a specific element of control is enabled or disabled.

For instance, take this scenario:

    if ((controlLevel & ROLL_CONTROL_SOURCE) == 0 && (controlLevel & HEADING_CONTROL_ON) == 0)

        sp_RollAngle = (int)((-sp_RollRate / ((float)SP\_RANGE / MAX_ROLL_ANGLE) ));

This snippet of code, converts the controller input into a roll angle. For instance, if the stick is centered, the plane will be at a 0° roll angle. If the pilot steers left, the plane will angle itself left at that same angle. The _if_ statement contains two bit masks. Note that the _controlLevel_ variable has a _bitwise AND _(&) applied to it.

Therefore, if the controlLevel is (in binary):

0b00000000 00010011

The code above will run, because a _AND_ bit mask of 0b00001000, will return a value of zero, just as well as 0b00000010 00000000 will also return a logical value of zero.

This type of logic is applied to multiple sections of the attitude manager code.