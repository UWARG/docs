#PID Loops

PID Loops are vital to the functionality of the PICpilot Autopilot software. UAV systems (especially fixed-wing) are difficult to characterize through a mathematical model. Hence, a control algorithm, such as a PID loop, simplifies the process. It does so by making small changes to the system at regular intervals. The algorithm tracks changes in the past (short term and long term) and the present to be adaptive to future conditions. For instance, if a sudden disturbance is introduced into the system, differential control will compensate and attempt to stabilize the system.

The letters "PID" stand for:

* Proportional Control – This stabilizes any instantaneous changes to the system

* Integral Control – This stabilizes and reduces long-term error in the system

* Derivative Control – This stabilizes abrupt changes (large derivative values).

PI systems are usually more common than PID systems. Nonetheless, a common PID system would look like this:

![A common PID Loop](http://i.imgur.com/9J12pgG.png)

 _A common PID control loop_

In a PID system, the input, r(t), is compared with the output, y(t), in the time domain. The subtraction between these two values yields the error, e(t). The error is then fed into the PID modules. Note each module contains a constant Kd, Kp, Ki. These are scaling factors. They determine the proportions in which each module adds together.

For the proportional module, the error is simply multiplied by a factor.

For the integral module, the error is integrated over time, before being multiplied by its corresponding factor.

For the derivative module, the error is differentiated at each time step, before being multiplied by its corresponding factor.

These three values are added together to determine u(t), which controls the system (plane, quadcopter, etc.). This can be expressed through the following code segment:

int controlSignal = (int)(HEADING\_ROLL\_SCALE\_FACTOR \* ((dValue \* kd\_gain[HEADING]) + (error \* kp\_gain[HEADING]) + (sum\_gain[HEADING] \* ki\_gain[HEADING])));

Where _HEADING\_ROLL\_SCALE \_FACTOR_ is a dimensionless scale factor.

Where _dValue_ is the derivative.

Where _sum\_gain_ is the integral summation over time.

Where _error_ is the setpoint minus the output.

Where _kd\_gain_ is the derivative gain.

Where _kp\_gain_ is the proportional gain.

Where _ki\_gain_ is the integral gain.

Note that abrupt changes would affect the derivative term, gradual drift would affect the integral term, and anything in between would affect the proportional term.

The PID model used in the PICpilot is slightly different. Some modules are rearranged, and a hierarchy of PID loops is present.

## Rate Control

Rate control is the basis of most aerial aircraft. The flaps on the wings of a plane control the rate at which it turns or rotates, but not the actual angle of the aircraft. For instance, if the flaps on a fixed wing aircraft were fully deflected, the aircraft would continuously spin out of control. It will not stop at a certain angle. In that sense, you control the _rate of angular rotation_, also known as the derivative. Likewise, the sensors on the aircraft (gyroscopes), measure the rate of rotation (derivative). This provides an interesting PID system. This PID loop only contains the derivative term. Hence the name "rate control".  The rate control diagram looks like this:

![Rate Control PID loop](http://i.imgur.com/mX1H9wo.png)

_Rate control PID loop_

The equation that relates the input with the output is:

Control Signal = (dx – dy) \* Kd

Control Signal = de \* Kd

## Rate Control - In The Code

Rate Control takes place at the end of the program execution cycle. The code responsible for this can be found in the _AttitudeManager.c _and _OrientationControl.c _files. The function that completes the calculation is called:

int controlSignal(float setpoint, float output, unsigned char type)

This function is responsible for the angular rates of the plane. It contains the differential equations that are part of the PID control system. It calculates the derivative term of the control signal. The setpoint (target value required by the system) and the output (current state of the system) are both inputs to this function in terms of angles (deg/s or rad/s). The units depend on the value of SERVO\_SCALE\_FACTOR which can be changed for various units. The original value was degrees per second.

## Angular Control

Once the roll, pitch, and yaw of the aircraft are empirically controlled (using the rate control code), the roll, pitch, and yaw can then be controlled in terms of angles. In other words, this PI controller allows the aircraft to be commanded to maintain a certain angle in the air, such as a 30 degree bank angle. This allows the aircraft to be controlled by the autopilot to turn, as well as alter its altitude.

An Inertial Measurement Unit (IMU) provides the sensory information required to control the plane in this manner. The IMU usually uses a Kalman filter and state estimation (using integration) to determine the position of the unit.

The resulting angular control PI loop incorporates the rate control loop from the section above. The angular control diagram looks like this:

![Angular Control PID Loop](http://i.imgur.com/m1VRtS8.png)

_Angular Control PID Loop_

The equations that relate r(t) and dx(t) are:

dx(t) = (r – y) \* Kp + Ki \* integral(r-y,dt)

dx(t) = e \* Kp + Ki \* integral(e,dt)

## Angular Control – In The Code

Angular control code takes place right before the rate control portion of the code. The code responsible for this can be found in the _AttitudeManager.c _and _OrientationControl.c _files. The function responsible for these calculations is called:

int controlSignalAngles(float setpoint, float output, unsigned char type, float SERVO\_SCALE\_FACTOR\_ANGLES)

This function is responsible for the orientation of the plane. It contains the equations that model a PID control system. It calculates the proportional and integral term of the control signal. The setpoint (target value required by the system) and the output (current state of the system) are both inputs to this function in terms of angles (deg or rad), where the units depend on the value of SERVO\_SCALE\_FACTOR\_ANGLES which can be changed for various units.

## Heading Control

Once rudimentary control of the aircraft is attained using the angular control loop and the rate control loop, the position of the aircraft can be controlled. As a result, the next control loop controls the heading of the aircraft. For instance, the plane can be directed at a 30 degree magnetic heading, and it will maintain that heading for as long as is required.

The measurements come from an external GPS sensor. The sensor measurements can also come from other sources, but they need to be in units of degrees. Currently, the calculations are done in degrees.

This control system uses the commonly recognized PID loop structure:

![Heading Control PID Loop](http://i.imgur.com/GF1ZfEg.png)

_Heading Control PID Loop_

The equations that relate r(t) and h(t) are:

r(t) = Kd \* d(h – θ)/dt + (h – θ) \* Kp + Ki \* integral(h – θ,dt)

r(t) = Kd \* de/dt + e \* Kp + Ki \* integral(e,dt)

## Heading Control – In The Code

Heading control code takes place right before the angular control portion of the code. The code responsible for this can be found in the _AttitudeManager.c _and _OrientationControl.c _files. The function responsible for these calculations is called:

int controlSignalHeading(int setpoint, int output)

This function is responsible for steering the plane in the correct direction. It contains the equations that model a PID control system. It calculates the derivative, proportional, and integral term of the control signal. The setpoint (target value required by the system) and the output (current state of the system) are both inputs to this function in terms of angles (currently in degrees).

This function completes a comparison between the setpoint and the output, and then decides if it should turn left or right. When the setpoint and the output are subtracted, the resulting error is set to be between -180 and +180, where -180 degrees indicates the requirement to bank left and +180 degrees indicates the requirement to bank right.

The remainder of the PID control is the same. An integrator, derivative, and proportional term is present.

## Altitude and Throttle Control

Altitude and Throttle control are two separate control loops. However, they are highly dependent on one another. For instance, if the throttle is increased, the plane has a natural tendency to gain altitude. Likewise, if the throttle is decreased, the plane has a natural tendency to lose altitude. Likewise, the opposite is true; if the plane gains or losses altitude, the airspeed of the aircraft changes.

Both altitude and throttle control is established by the use of PID loops. Currently, altitude uses the _proportional_ and _derivative _terms, whereas, throttle uses only the _proportional _term. You can determine this by looking at the gain settings for each PID loop (if the gain is zero, the respective PID term is unused).

Generally, the throttle control should be regulated using an airspeed sensor, in order to keep the airspeed constant. However, in cases where there is no airspeed sensor (such as in SPIKE), altitude is used directly to calculate both the throttle and the pitch angle (to change the altitude). This directly affects airspeed and altitude, and if properly tuned is quite effective. This is the appropriate PID diagram for a non-airspeed sensor setup:

![Altitude and Throttle Control PID Loop - No airspeed](http://i.imgur.com/0GwtClc.png)

_Altitude and Throttle Control PID Loop – No airspeed sensor_

![ltitude and Throttle Control PID Loop - With airspeed](http://i.imgur.com/pvEm8KO.png)

_Altitude and Throttle Control PID Loop – Airspeed sensor_

## Altitude and Throttle Control – In The Code

In the PIC pilot software, altitude control is dependent on a PID loop. Currently, the integral term is implemented, but unused. On the other hand, the throttle control only uses the proportional term and the integral term. The derivative term is negligible. Currently, the integral term is unused (for SPIKE) and thus only the proportional term is used. The function responsible for the PID control of the altitude is:

int controlSignalAltitude(int sp\_Altitude,int gps\_Altitude);

This function is responsible for the altitude control of the plane. It contains the equations that model a PID control system. It calculates the proportional, integral, and derivative terms of the control signal. The setpoint (target value required by the system) and the output (current state of the system) are both inputs to this function in terms of meters above the initial starting point.

The two parameters used to call the function are the setpoint (sp\_Altitude) and the sensor output (gps\_Altitude). These are then used to calculate the corresponding error.

The function responsible for the PID control of the throttle is:

int controlSignalThrottle(int setpoint, int output);

This function is responsible for the throttle control of the plane. It contains the equations that model a PID control system. It calculates the proportional, integral, and derivative terms of the control signal. The setpoint (target value required by the system) and the output (current state of the system) are both inputs to this function in terms of percentage from no throttle (0%) to full throttle (100%).

The two parameters used to call the function are the setpoint and the sensor output. These are then used to calculate the corresponding error.

## Total PID Control Overview

The total control diagram can be approximated with the flow chart below:

![Total PID System](http://i.imgur.com/mQi5zdb.png)

## Tuning PID Loops

As explained above, PID loops keep unstable systems stable via input through (primarily) electronic means. In order to do so, one must analyze the transfer functions of the system and determine PID control gains, or more practically develop these gains from empirically testing the system.

The empirical method which WARG employs in the PID tuning is called the [Zieger-Nichols Method](http://en.wikipedia.org/wiki/Ziegler%E2%80%93Nichols_method). This method involves a tuning procedure with the assistance of the following chart:

| *Control Type* | *Kp* | *Ki* | *Kd* |
| --- | --- | --- | --- |
| P | 0.5Ku | - | - |
| PI | 0.45Ku | 1.2Kp/Tu | - |
| PD | 0.8Ku | - | KpTu/8 |
| Classic PID | 0.6Ku | 2Kp/Tu | KpTu/8 |
| Pessen Integral Rule | 0.7Ku | 2.5Kp/Tu | 3KpTu/20 |
| Some Overshoot | 0.33Ku | 2Kp/Tu | KpTu/3 |
| No Overshoot | 0.2Ku | 2Kp/Tu | KpTu/3 |

As a general rule, flying a vehicle requires minimal overshoot and maximum disturbance rejection. The "Some Overshoot" control type is unwanted in aerial applications.

The tuning procedure is as follows:

1. Begin with roll. Increase the proportional gain until the plane oscillates with a constant period and amplitude.
2. Retrieve the data, plot it in excel and determine the period of oscillation (Tu­). The proportional gain at which the vehicle began to oscillate is the Ultimate Gain (Ku). Use the above chart to determine the appropriate gain values.
3. Reset all the gains. Repeat steps 1 and 2 for pitch and yaw (if need be).
4. Repeat steps 1 and 2, but with all the calculated gains running on the system. This step will fine tune all the values since pitch, roll, and yaw are interdependent. You will only need to repeat this step, whenever making changes to the PID setup or any crucial component on the system itself.