# Datalink

The datalink is one of the most important peripheral components in an unmanned 
system. It provides information on the status of the aircraft (telemetry) and 
provides the crucial functionality of an uplink, in order to be able to 
communicate with the system and make changes to its overall functionality.

Make note that the details of this system can change frequently due to the 
requirements of each user. The telemetry data may change from the ones present 
in this document. Likewise, uplink commands may change based on newly 
implemented features and requirements. Although, this document should be updated 
whenever there is a change, this may not always occur. Therefore, be careful 
when referencing data in this section.

## Telemetry (Downlink) Data

The Picpilot sends down packets based on priorities. There are 3 priorities of
packets.

- **Priority 1**: *High frequency - multiple times a second*
- **Priority 2**: *Medium frequency - once every second*
- **Priority 3**: *Low frequency - have to be triggered from a relevant update*

The implementation of packets is due to the 100 byte limit that we can send data
down the Xbees. The PicPilot will send each of the three packets seperately, and
at different intervals. For Priority 3 packets, an update event will trigger
the packet to be sent down. For example, if gains were updated, a priority 3
packet will be sent back since it contains information on the gains.

### Priority 1 Packet Reference
*Note*:

- `long double` is 64-bit
- `float` is 32-bit
- `int` is 32-bit
- `char` is 8-bit or 1 byte

| **Data**            | **Header Name**       | **Type**      | **Description**                                                            |
|---------------------|-----------------------|---------------|----------------------------------------------------------------------------|
| Latitude            | `lat`                 | `long double` | Latitude location of the airplane in degrees                               |
| Longitude           | `lon`                 | `long double` | Longitude location of the airplane in degrees                              |
| Elapsed Time        | `sys_time`            | `long int`    | Time elapsed since the picpilot was started in seconds                     |
| Current Time        | `time`                | `float`       | The time as a UTC time stamp (seconds from Jan 1, 1970)                    |
| Pitch               | `pitch`               | `float`       | Pitch of the aircraft in degrees                                           |
| Roll                | `roll`                | `float`       | Roll of the aircraft in degrees                                            |
| Yaw                 | `yaw`                 | `float`       | Yaw according to magnetometer on the IMU in degrees.                       |
| Pitch Rate          | `pitch_rate`          | `float`       | From the gyroscope. In radians/s                                           |
| Roll Rate           | `roll_rate`           | `float`       | From the gyroscope. In radians/s                                           |
| Yaw Rate            | `yaw_rate`            | `float`       | From the gyroscope. In radians/s                                           |
| Heading             | `heading`             | `int`         | GPS heading of the aircraft in degrees ranging from 0 to 360.              |
| Altitude            | `altitude`            | `float`       | Altitude of the plane above the mean sea level (in meters)                 |
| Air Speed           | `airspeed`            | `float`       | Current speed of the aircraft based on the airspeed sensor in m/s          |
| Ground Speed        | `ground_speed`        | `float`       | Ground speed of the aircraft in m/s                                        |
| Pitch Setpoint      | `pitch_setpoint`      | `int`         | Current pitch setpoint in degrees                                          |
| Roll Setpoint       | `roll_setpoint`       | `int`         | Current roll setpoint in degrees.                                          |
| Pitch Rate Setpoint | `pitch_rate_setpoint` | `int`         | Current pitch rate setpoint in rad/s                                       |
| Roll Rate Setpoint  | `roll_rate_setpoint`  | `int`         | Current roll rate setpoint in rad/s                                        |
| Throttle Setpoint   | `throttle_setpoint`   | `int`         | Current throttle pwm value. Ranges from -1024 to 1024, with 0 being at %50 |

### Priority 2 Packet Reference
| **Data**                   | **Header Name**       | **Type** | **Description**                                                                                      |
|----------------------------|-----------------------|----------|------------------------------------------------------------------------------------------------------|
| Roll KD Gain               | `roll_kd`             | `float`  | Derivative gain for roll                                                                             |
| Roll KP Gain               | `roll_kp`             | `float`  | Proportional gain for roll                                                                           |
| Pitch KD Gain              | `pitch_kd`            | `float`  | Derivative gain for pitch                                                                            |
| Pitch KP Gain              | `pitch_kp`            | `float`  | Proportional gain for pitch                                                                          |
| Yaw KP Gain                | `yaw_kp`              | `float`  | Proportional gain for yaw                                                                            |
| Yaw KD Gain                | `yaw_kd`              | `float`  | Derivative gain for yaw                                                                              |
| Yaw Rate Setpoint          | `yaw_rate_setpoint`   | `int`    | Current yaw rate setpoint in rad/s                                                                   |
| Heading Setpoint           | `heading_setpoint`    | `int`    | Current heading setpoint in degrees                                                                  |
| Altitude Setpoint          | `altitude_setpoint`   | `int`    | Current altitude setpoint in m                                                                       |
| Flap Setpoint              | `flap_setpoint`       | `int`    | Current flap setpoint pwm value. Ranges from -1024 to 1024, with 0 being in middle                   |
| Last Command Sent (0)      | `last_command_sent0`  | `int`    | ID of the most recent command sent                                                                   |
| Last Command Sent (1)      | `last_command_sent1`  | `int`    | ID of the most 2nd most recent command sent                                                          |
| Last Command Sent (2)      | `last_command_sent2`  | `int`    | ID of the most 3rd most recent command sent                                                          |
| Last Command Sent (3)      | `last_command_sent3`  | `int`    | ID of the most 4th most recent command sent                                                          |
| Battery 1 Level            | `battery_level1`      | `int`    | PWM voltage of motor battery. Ranges from -1024 to 1024, with 1024 being full voltage                |
| Battery 2 Level            | `battery_level2`      | `int`    | PWM voltage of autopilot battery. Ranges from -1024 to 1024, with 1024 being full voltage            |
| Camera Status              | `camera_status`       | `int`    | Current number of photos taken by the camera                                                         |
| Wireless Connection Status | `wireless_connection` | `int`    | Whether the plane has UHF and is in manual (full rc) or autopilot mode. Read below for bitmask guide |
| Autopilot Active Status    | `autopilot_active`    | `int`    | Current autopilot state. ie. Initializing, Armed, etc. Read below for bitmask guide                  |
| GPS Status                 | `gpsStatus`           | `int`    | Indicates # of satellites connected, as well as gps fix. Check bellow for how to parse the value     |
| Number of Waypoints        | `waypoint_count`      | `int`    | Current number of waypoints                                                                          |
| Path Following Status      | `path_following`      | `char`   | Whether path following has been turned on. 1 if on                                                   |
| Path Checksum              | `path_checksum`       | `float`  | Checksum to verify path. Calculated by adding altitude, lat, lon and radius of all waypoints         |
| Channel 1 Input            | `ch1In`               | `int`    | Input from RC Controller. Integer value usually from -1024 to 1024, and -3072                        |
| Channel 2 Input            | `ch2In`               | `int`    | Input from RC Controller. Integer value usually from -1024 to 1024, and -3072                        |
| Channel 3 Input            | `ch3In`               | `int`    | Input from RC Controller. Integer value usually from -1024 to 1024, and -3072                        |
| Channel 4 Input            | `ch4In`               | `int`    | Input from RC Controller. Integer value usually from -1024 to 1024, and -3072                        |
| Channel 5 Input            | `ch5In`               | `int`    | Input from RC Controller. Integer value usually from -1024 to 1024, and -3072                        |
| Channel 6 Input            | `ch6In`               | `int`    | Input from RC Controller. Integer value usually from -1024 to 1024, and -3072                        |
| Channel 7 Input            | `ch7In`               | `int`    | Input from RC Controller. Integer value usually from -1024 to 1024, and -3072                        |
| Channel 8 Input            | `ch8In`               | `int`    | Input from RC Controller. Integer value usually from -1024 to 1024, and -3072                        |
| Channel 1 Output           | `ch1out`              | `int`    | Output from RC Controller. Integer value usually from -1024 to 1024, and -3072                       |
| Channel 2 Output           | `ch2out`              | `int`    | Output from RC Controller. Integer value usually from -1024 to 1024, and -3072                       |
| Channel 3 Output           | `ch3out`              | `int`    | Output from RC Controller. Integer value usually from -1024 to 1024, and -3072                       |
| Channel 4 Output           | `ch4out`              | `int`    | Output from RC Controller. Integer value usually from -1024 to 1024, and -3072                       |
| Channel 5 Output           | `ch5out`              | `int`    | Output from RC Controller. Integer value usually from -1024 to 1024, and -3072                       |
| Channel 6 Output           | `ch6out`              | `int`    | Output from RC Controller. Integer value usually from -1024 to 1024, and -3072                       |
| Channel 7 Output           | `ch7out`              | `int`    | Output from RC Controller. Integer value usually from -1024 to 1024, and -3072                       |
| Channel 8 Output           | `ch8out`              | `int`    | Output from RC Controller. Integer value usually from -1024 to 1024, and -3072                       |

### Priority Packet 3 Reference

| **Data**            | **Header Name**       | **Type** | **Description**                                                             |
|---------------------|-----------------------|----------|-----------------------------------------------------------------------------|
| Roll KI Gain        | `roll_ki`             | `float`  | Integral gain for roll                                                      |
| Pitch KI Gain       | `pitch_ki`            | `float`  | Integral gain for pitch                                                     |
| Yaw KI Gain         | `yaw_ki`              | `float`  | Integral gain for yaw                                                       |
| Heading KD Gain     | `heading_kd`          | `float`  | Derivative gain for heading                                                 |
| Heading KI Gain     | `heading_ki`          | `float`  | Integral gain for heading                                                   |
| Altitude KD Gain    | `altitude_kd`         | `float`  | Derivative gain for altitude                                                |
| Altitude KP Gain    | `altitude_kp`         | `float`  | Proportional gain for altitude                                              |
| Altitude KI Gain    | `altitude_ki`         | `float`  | Integral gain for altitude                                                  |
| Throttle KD Gain    | `throttle_kd`         | `float`  | Derivative gain for throttle                                                |
| Throttle KI Gain    | `throttle_ki`         | `float`  | Integral gain for throttle                                                  |
| Throttle KP Gain    | `throttle_kp`         | `float`  | Proportional gain for throttle                                              |
| Flap KD Gain        | `flap_kd`             | `float`  | Derivative gain for flap                                                    |
| Flap KP Gain        | `flap_kp`             | `float`  | Proportional gain for flap                                                  |
| Flap KI Gain        | `flap_ki`             | `float`  | Integral gain for flap                                                      |
| Path Gain           | `path_gain`           | `float`  | Proportional Path gain. How hard the aircraft adjust to follow the path     |
| Orbital Gain        | `orbit_gain`          | `float`  | Proportional Orbital gain. How hard the aircraft turn around waypoints      |
| Autonomous Level    | `autonomousLevel`     | `int`    | Autonomous level of the aircraft. Read below for how to interpret the value |
| Startup Error Codes | `startup_error_codes` | `int`    | Startup error codes for the autopilot. Read below for how to interpret it   |
| Startup Settings    | `startupSettings`     | `int`    | Whether the aircraft is in plane or quad mode. Read below for bitmask guide |
| Probe Status        | `probe_status`        | `int`    | Bitmask for determining which of the 3 probes have been released            |

Note that all telemetry data must be visible within the scope of the AttitudeManager.c file.

## Command (Uplink) Data

Every command that is sent to the UAV must be predefined with an ID, as well as an associated function. Some commands only change variable values, whereas some call functions with the associated data as a parameter.
| **ID** | **Socket Command**                        | **Associated Function**                                                     | **Format**                   | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|----------------|-------------------------------------------|-----------------------------------------------------------------------------|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0              | debug:<data>                              | UART1\_SendString(<data>)                                                   | Char Array                   | The debugging command, which writes to the UART1 port.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1              | set\_pitchKDGain:<data>                   | setGain(PITCH, KD\_GAIN, <data>)                                            | Float                        | The command to set the derivative gain for pitch control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2              | set\_rollKDGain:<data>                    | setGain(ROLL, KD\_GAIN, <data>)                                             | Float                        | The command to set the derivative gain for roll control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 3              | set\_yawKDGain:<data>                     | setGain(YAW, KD\_GAIN, <data>)                                              | Float                        | The command to set the derivative gain for yaw control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 4              | set\_pitchKPGain:<data>                   | setGain(PITCH, KP\_GAIN, <data>)                                            | Float                        | The command to set the proportional gain for pitch control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 5              | set\_rollKPGain:<data>                    | setGain(ROLL, KP\_GAIN, <data>)                                             | Float                        | The command to set the proportional gain for roll control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 6              | set\_yawKPGain:<data>                     | setGain(YAW, KP\_GAIN, <data>)                                              | Float                        | The command to set the proportional gain for yaw control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 7              | set\_pitchKIGain:<data>                   | setGain(PITCH, KI\_GAIN, <data>)                                            | Float                        | The command to set the integral gain for pitch control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 8              | set\_rollKIGain:<data>                    | setGain(ROLL, KI\_GAIN, <data>)                                             | Float                        | The command to set the proportional gain for roll control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 9              | set\_yawKIGain:<data>                     | setGain(YAW, KI\_GAIN, <data>)                                              | Float                        | The command to set the proportional gain for yaw control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 10             | set\_headingKDGain:<data>                 | setGain(HEADING, KD\_GAIN, <data>)                                          | Float                        | The command to set the derivative gain for heading control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 11             | set\_headingKPGain:<data>                 | setGain(HEADING, KP\_GAIN, <data>)                                          | Float                        | The command to set the proportional gain for heading control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 12             | set\_headingKIGain:<data>                 | setGain(HEADING, KI\_GAIN, <data>)                                          | Float                        | The command to set the integral gain for heading control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 13             | set\_altitudeKDGain:<data>                | setGain(ALTITUDE, KD\_GAIN, <data>)                                         | Float                        | The command to set the derivative gain for altitude control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 14             | set\_altitudeKPGain:<data>                | setGain(ALTITUDE, KP\_GAIN, <data>)                                         | Float                        | The command to set the proportional gain for altitude control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 15             | set\_altitudeKIGain:<data>                | setGain(ALTITUDE, KI\_GAIN, <data>)                                         | Float                        | The command to set the integral gain for altitude control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 16             | set\_throttleKDGain:<data>                | setGain(THROTTLE, KD\_GAIN, <data>)                                         | Float                        | The command to set the derivative gain for throttle control (speed).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 17             | set\_throttleKPGain:<data>                | setGain(THROTTLE, KP\_GAIN, <data>)                                         | Float                        | The command to set the derivative gain for throttle control (speed).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 18             | set\_throttleKIGain:<data>                | setGain(THROTTLE, KI\_GAIN, <data>)                                         | Float                        | The command to set the integral gain for throttle control (speed).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 19             | set\_pathGain:<data>                      | Currently Unsupported, but will not cause errors if set                     | Float                        | The command used to set the gain that scales lateral positional control around a path.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 20             | set\_orbitGain:<data>                     | Currently Unsupported, but will not cause errors if set                     | Float                        | The command used to set the gain that scales orbital convergence.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 21             | set\_showGain:<data>                      | displayGain = <data>                                                        | Char                         | The command used to switch the output between multiple gain types:0x00 = Yaw0x01 = Pitch0x02 = Roll0x03 = Heading0x04 = Altitude0x05 = Throttle\*Note that there is no support for the path gain or orbital gain yet.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 22             | set\_pitchRate:<data>                     | sp\_PitchRate = <data>                                                      | Int                          | The user input for the pitch rate in PWM timer tick units. (Normal values range from 470 to 941 [dependent on setup]). Note you must set command 32 greater than 4 to use this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 23             | set\_rollRate:<data>                      | sp\_RollRate = <data>                                                       | Int                          | The user input for the roll rate in PWM timer tick units. (Normal values range from 470 to 941 [dependent on setup]) Note you must set command 32 greater than 4 to use this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 24             | set\_yawRate:<data>                       | sp\_YawRate = <data>                                                        | Int                          | The user input for the roll rate in PWM timer tick units. (Normal values range from 470 to 941 [dependent on setup]) Note you must set command 32 greater than 4 to use this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 25             | set\_pitchAngle:<data>                    | sp\_PitchAngle = <data>                                                     | Float                        | The user input for the pitch angle in degrees. Note you must set command 32 greater than 5 to use this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 26             | set\_rollAngle:<data>                     | sp\_RollAngle = <data>                                                      | Float                        | The user input for the roll angle in degrees. Note you must set command 32 greater than 5 to use this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 27             | set\_yawAngle:<data>                      | Currently Unsupported, but will not cause errors if set                     | Float                        | The user input for the yaw angle in degrees. WILL LIKELY BE REMOVED IN THE FUTURE IF UNEEDED. Note you must set command 32 greater than 5 to use this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 28             | set\_altitude:<data>                      | sp\_Altitude = <data>                                                       | Float                        | The user input for the altitude in meters above sea level. Note you must set command 32 greater than 6 to use this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 29             | set\_heading:<data>                       | sp\_Heading = <data>                                                        | Float                        | The user input for the heading in standard compass bearing degrees. Note you must set command 32 greater than 7 to use this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 30             | set\_throttle:<data>                      | sp\_Throttle = <data>                                                       | Int                          | The user input for the throttle as a percentage. Note you must set command 32 to 8 to use this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 31             | set\_autonomousLevel:<data>               | controlLevel = <data>                                                       | Int                          | This sets the source of control input between the autopilot, the remote control, and the ground stations:0b00000000 = Full manual control (default)0b00000001 = Set Pitch Rate(0), Pitch Angle(1)0b00000010 = Pitch Control Source: Controller(0), Ground Station(1) 0b00000100 = Roll Control Type: Roll Rate(0), Roll Angle(1)0b00001000 = Roll Control Sources: Controller(0), Ground Station(1)0b00110000 = Throttle control source: Controller(0), Ground Station(1), Autopilot(2) 0b01000000 = Altitude Source: Ground Station(0), Autopilot(1)0b10000000 = Altitude Control On(1) or Off(0)0b100000000 = Heading control source: Ground Station(0), Autopilot(1)0b1000000000=  To fly with Ground Station Control of the Pitch Rate and Roll Angle:set\_autonomousLevel:14To fly with Ground Station Control of the Pitch Rate, Roll Angle, and Throttle:set\_autonomousLevel:30To fly with Ground Station Control of Altitude, and Throttle (Roll controlled by controller):set\_autonomousLevel:134To fly with Ground Station Control of Altitude, Throttle, Roll Angle:set\_autonomousLevel:156To reset everything and fly with controller:set\_autonomousLevel:0 |
| 32             | set\_angularWalkVariance:<data>           | setAngularWalkVariance(<data>)                                              | Float                        | Sets the Kalman Filter parameter that determines how fast the gyro bias estimates converge.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 33             | Set\_gyroVariance:<data>                  | setGyroVariance(<data>)                                                     | Float                        | Sets the Kalman filter parameter that determines the weighting of the gryo in the attitude estimates of the plane.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 34             | set\_magneticVariance:<data>              | setMagneticVariance(<data>)                                                 | Float                        | Sets the Kalman filter parameter that determines the weighting of the magnetometers in the attitude estimates of the plane.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 35             | set\_accelVariance:<data>                 | setAccelVariance(<data>)                                                    | Float                        | Sets the Kalman filter parameter that determines the weighting of the accelerometers in the attitude estimates of the plane.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 36             | set\_scaleFactor:<data>                   | pitchScaleFactor = <data>                                                   | Float                        | Sets the value for the feed-forward term of pitch, when the aircraft is turning. In other words, when the aircraft is turning, this proportion is added to the elevators to prevent the airplane from losing altitude.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 37             | calibrate\_altimeter:<data>               | amData.calibrationHeight = <data>amData.command = PM\_CALIBRATE\_ALTIMETER  | Float                        | This sets the reference height on the altimeter to a predefined value. This allows one to choose a _relative_ value for the height aircraft. For example, one may set 0m to refer to the starting or landing terrain height.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 38             | clear\_waypoints:<data>                   | amData.waypoint.id = <data>amData.command = PM\_CLEAR\_WAYPOINTS            | Byte                         | This command clears ALL waypoints. The <data> is just a dummy variable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 39             | remove\_waypoint:<data>                   | amData.waypoint.id = <data>amData.command = PM\_REMOVE\_WAYPOINT            | Byte                         | This command removes a specific waypoint given a specific ID as the parameter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 40             | set\_targetWaypoint:<data>                | amData.waypoint.id = <data>amData.command = PM\_SET\_TARGET\_WAYPOINT       | Byte                         | The target waypoint is the waypoint which the UAV is trying to currently get to. If this command is called, it can be used to skip waypoints, or return to waypoints. The <data> is the specified ID for the new target.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 41             | return\_home:<data>                       | amData.command = PM\_RETURN\_HOME                                           | Byte                         | This tells the plane to go to the "home" coordinates. The <data> is just a dummy variable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 42             | cancel\_returnHome:<data>                 | amData.command = PM\_CANCEL\_RETURN\_HOME                                   | Byte                         | This tells the plane to return back to its original path after being called to the "home" coordinates.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 43             | send\_heartbeat:<data>                    | heartbeatTimer = time                                                       | Byte                         | This sends a "heartbeat" (verification ping) to the plane to tell it that a data connection is still present. If this command is not received after a certain amount of time, emergency maneuvers will be used.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 44             | trigger\_camera:<data>                    | triggerCamera(<data>)                                                       | Int                          | This manually triggers the camera via a "fake" PWM signal. The <data> is the integer value of the PWM signal.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 45             | set\_triggerDistance:<data>               | setTriggerDistance(<data>)                                                  | Float                        | This sets the trigger distance (how often a picture is taken based on distance). This <data> is a value in meters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 46             | set\_gimbleOffset:<data>                  | setGimbleOffset(<data>)                                                     | Int                          | This provides an offset to the gimbal. If the gimbal is misaligned on start up, this function can correct it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 47             | kill\_plane:<data>                        | if (<data> == 1234)                    killingPlane = 1;                    | Int                          | This crashes the plane into the ground (in emergencies). This requires a password (<data> = "1234") to ensure this isn't an accident.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 48             | unkill\_plane:<data>                      | if (<data> == 1234)                    killingPlane = 0;                    | Int                          | This changes the state of the plane from "I'm crashing" to "Nevermind, this was just a test". This requires a password (<data> = "1234") to ensure this isn't an accident.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 128            | new\_waypoint:<data>,<data>,<data>,<data> | amData.command = PM\_NEW\_WAYPOINTamData.waypoint = <data>                  | 4 floats                     | This uploads and appends a waypoint to the aircraft based on corresponding gps coordinates and path instructions. The format is (longitude, latitude, altitude,radius).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 129            | insert\_Waypoint:                         | amData.command = PM\_INSERT\_WAYPOINT amData.waypoint = <data>              | 4 floats followed by 2 Bytes | This uploads and inserts a waypoint to the aircraft based on corresponding gps coordinates and path instructions. The format is (longitude, latitude, altitude,radius,nextID,previousID).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 130            | set\_ReturnHomeCoordinates:               | amData.command = PM\_SET\_RETURN\_HOME\_COORDINATESamData.waypoint = <data> | 3 Floats                     | This sets the home coordinates, to which the plane will return in case of an emergency. The format is (longitude, latitude, altitude).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 131            | tare\_IMU:<data>,<data>,<data>            | adjustVNOrientationMatrix(float\* adjustment);                              | 3 Floats                     | This adds a bias adjustment to the matrix based on the last setting. The 3 data values are the x,y,z components of the aircraft.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 132            | Set\_IMU:<data>,<data>,<data>             | setVNOrientationMatrix(float\* adjustment);                                 | 3 Floats                     | This is used to set the reference frame of the aircraft's IMU unit. The input values are the x,y,z values of the IMU's rotation respectively.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 132            | follow_path:<data>,<data>,<data>             | setVNOrientationMatrix(float\* adjustment);                                 | 3 Floats                     | This is used to set the reference frame of the aircraft's IMU unit. The input values are the x,y,z values of the IMU's rotation respectively.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 132            | drop_probe:<data>,<data>,<data>             | setVNOrientationMatrix(float\* adjustment);                                 | 3 Floats                     | This is used to set the reference frame of the aircraft's IMU unit. The input values are the x,y,z values of the IMU's rotation respectively.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### Interpretting startup settings

### Interpreting GPS
Eg. 0x00 = No GPS Fix, 0 Satellites0x1A = GPS Fix, 10 Satellites0x24 = DGPS Fix, 4 Satellites
```javascript
var checkGPS = function (data) {
   if(data !== null) {
     var connection_status = ((data & 0xf0) >> 4) > 0; // if theres at least 1 fix
     if (connection_status !== this.gps.status) { //if its a different status
       this.gps.status = connection_status;
       StatusManager.setStatusCode('GPS_LOST', !this.gps.status);
       if (this.gps.status === false) { //if it was set to false, start the timer
         this.gps.timeSinceLost = Date.now();
       }
       else {
         this.gps.timeSinceLost = null;
       }
     }
   }
  }.bind(this);
```
### Interpreting autopilot_active
```javascript
var checkPlaneStatus = function (number) {
    if(number !== null){
      this.initializing = (number === 0);
      if (number === 1) { //only set armed to false if the number is ONLY 1
        this.armed = false;
      }
      this.armed = (number === 2);
      this.running = (number === 3);
      this.killModeWarning = (number === 4);
      this.killModeActive = (number === 5);

      StatusManager.setStatusCode('AIRCRAFT_INITIALIZE', this.initializing);
      StatusManager.setStatusCode('AIRCRAFT_UNARMED', !this.armed);
      StatusManager.setStatusCode('AIRCRAFT_ARMED', this.armed);
      StatusManager.setStatusCode('AIRCRAFT_RUNNING', this.running);
      StatusManager.setStatusCode('AIRCRAFT_KILLMODE_WARNING', this.killModeWarning);
      StatusManager.setStatusCode('AIRCRAFT_KILLMODE', this.killModeActive);
    }
  }.bind(this);
  ```
### Interpreting wireless connection
```
  var checkUHFStatus = function (data) {
    if(data !== null){
      var bitmask = new Bitmask(data);
      this.uhf.status = bitmask.getBit(1);

      if (this.uhf.status) { //has been turned to true
        this.uhf.timeSinceLost = null;
      }
      else { //has been turned to false
        this.uhf.timeSinceLost = Date.now();
      }
      StatusManager.setStatusCode('UHF_LOST', !this.uhf.status);
    }
  }.bind(this);

  var checkManualMode = function (data) {
    if(data !== null){
      var bitmask = new Bitmask(data);
      this.manualMode = !bitmask.getBit(0);
      StatusManager.setStatusCode('MANUAL_MODE', this.manualMode);
    }
  }.bind(this);

```
### Interpreting Autonotmous level
```javascript
if (alevel.getBit(0)) {
        this.ui.remote_pitch_type.text('Angle');
      }
      else {
        this.ui.remote_pitch_type.text('Rate');
      }
      if (alevel.getBit(1)) {
        this.ui.remote_pitch_source.text('Ground Station');
      }
      else {
        this.ui.remote_pitch_source.text('Controller');
      }
      if (alevel.getBit(2)) {
        this.ui.remote_roll_type.text('Angle');
      }
      else {
        this.ui.remote_roll_type.text('Rate');
      }
      if (alevel.getBit(3)) {
        this.ui.remote_roll_source.text('Ground Station');
      }
      else {
        this.ui.remote_roll_source.text('Controller');
      }
      if (alevel.getBit(5)) {
        this.ui.remote_throttle_source.text('Autopilot');
      }
      else if (alevel.getBit(4)) {
        this.ui.remote_throttle_source.text('Groundstation');
      }
      else {
        this.ui.remote_throttle_source.text('Controller');
      }
      if (alevel.getBit(6)) {
        this.ui.remote_altitude_source.text('Autopilot');
      }
      else {
        this.ui.remote_altitude_source.text('Groundstation');
      }
      if (alevel.getBit(7)) {
        this.ui.remote_altitude_toggle.text('On');
      }
      else {
        this.ui.remote_altitude_toggle.text('Off');
      }
      if (alevel.getBit(8)) {
        this.ui.remote_heading_source.text('Autopilot');
      }
      else {
        this.ui.remote_heading_source.text('Groundstation');
      }
      if (alevel.getBit(9)) {
        this.ui.remote_heading_toggle.text('On');
      }
      else {
        this.ui.remote_heading_toggle.text('Off');
      }
      if (alevel.getBit(11)) {
        this.ui.remote_flap_source.text('Autopilot');
      }
      else if (alevel.getBit(10)) {
        this.ui.remote_flap_source.text('Groundstation');
      }
      else {
        this.ui.remote_flap_source.text('Controller');
      }
    },
```
### Interpreting error codes
Signals any problems that may be occurring or have occurred.This value is retrieved from StartupErrorCodes.c. The possible values are (and any binary combination):0b0000000000000000: No Errors0b0000000000000001:Power on reset occurred.0b0000000000000010:Brown out reset occurred.0b0000000000000100:Idle Mode Reset Occurred.0b0000000000001000:Sleep Mode Reset Occurred.0b0000000000010000:Software Watch Dog Timer Reset Occurred.0b0000000000100000:Software Reset Occurred.0b0000000001000000:External Reset Occurred.0b0000000010000000:Voltage Regulator Reset Occurred.0b0000000100000000:Illegal Opcode Reset Occurred.0b0000001000000000:Trap Reset Occurred.0b1000000000000000:UHF Switch is ON (Can be used to indicate joystick controller connection)


## In the code

Prior to usage, the datalink must be initialized.  This is done so in _main.c _using _initDataLink()_. This simply initializes the UART2 interface (see UART section) for appropriate usage with the datalink.

After initialization, the data link can be used. The interface used to queue data to the datalink is present in the AttitudeManager.c file.

### In the code – Downlink/Telemetry

Data is exported to the data link at a certain frequency (according to a clock). This is done by calling _writeDatalink(frequency)_, where frequency is the time between packets. This subroutine creates a structure (defined in _net.h_) which contains memory locations for every variable. This data is then pushed to be processed in _net\_outbound.c_.

    if (time - lastTime > frequency) {

        lastTime = time;

        struct telem_block* statusData = createTelemetryBlock();

        statusData->lat = gps_Latitude;

        statusData->lon = gps_Longitude;

        ...

    return pushOutboundTelemetryQueue(statusData);

    }

When all the data is assembled in the struct, _pushOutboundTelemetryQueue(statusData)_ is called. This pushes the data onto a queue to be processed later:

    int pushOutboundTelemetryQueue(struct telem_block *telem) {

        if (getOutboundQueueLength() >= OUTBOUND_QUEUE_SIZE) {

            return -1;

        }

        outBuffer[outbuff_end] = telem;

        outbuff_end++;

        outbuff_end = outbuff_end % OUTBOUND_QUEUE_SIZE;

        return getOutboundQueueLength();

    }

Note that this is a circular buffer. When the buffer reaches the OUTBOUND\_QUEUE\_SIZE, the outbuff\_end variable starts from 0 and overwrites the old data.

Every once in a while, the data accumulated must be processed. As a result, every iteration of the program runs a subroutine to maintain and cleanup the circular buffer. For the outgoing buffer, this method is _outboundBufferMaintenance()_:

    if ( stagingBuffer.sendIndex >= PACKET_LENGTH ) {

        destroyTelemetryBlock(stagingBuffer.telemetry.asStruct);

        if ( getOutboundQueueLength() ) {

            stageTelemetryBlock(popOutboundTelemetryQueue());

        }

    } else if ( stagingBuffer.telemetry.asStruct == 0 && getOutboundQueueLength() ) {

        stageTelemetryBlock(popOutboundTelemetryQueue());

    }

Note that the structure of _stagingBuffer_ is as follows:

    struct telem_buffer {

        unsigned int sendIndex;             // index into telemetry to send

        unsigned char header[API_HEADER_LENGTH];    // The header for the telem

        union {

            struct telem_block *asStruct;   // The telemetry block being sent

            unsigned char *asArray;         // The telemetry intepreted as an array

        } telemetry;

        unsigned char checksum;             // The checksum so far

    };

Note that the _stagingBuffer _converts the data into a data link friendly format. The data link hardware requires that each data packet must be sent with a header, the data, and a checksum (For more specification see the XBEE section). These are 3 components of the _telem\_buffer_ structure. The 4th component is the _sendIndex_ variable. This value is used to keep track (index) what data has already been sent or still needs to be sent.

After sufficient error checking (making sure _sendIndex_ is less than the allowed packet size), stageTelemetryBlock(popOutboundTelemetryQueue()) is called. This method takes (pops) the next struct of data and stages it to be sent. _stageTelemetryBlock()_ is responsible for converting the telemetry data into a _telem\_buffer_ structure.

    void stageTelemetryBlock(struct telem_block *telem) {

        stagingBuffer.telemetry.asStruct = telem;

        generateApiHeader(stagingBuffer.header, 0);

        stagingBuffer.checksum = 0;

        // Send index should be reset last for reasons

        stagingBuffer.sendIndex = 0;

        sendNextByte();

    }

The first line of the subroutine adds the data into the packet. The second line (_generateApiHeader(stagingBuffer.header,0))_ creates an appropriate header in the _stagingBuffer.header_ memory address with a data frame of 0. (See the XBEE section for the datasheet). The API header includes information involving which device the packet should be sent to, the length of the packet, as well as acknowledgement options, and packet types (data packet, configuration packet, status packet). After the _checksum_ and _sendIndex_ are explicitly reset, the sending process begins with _sendNextByte()_:

    void sendNextByte(void) {

        unsigned char sendByte; // The byte to send

        if ( stagingBuffer.sendIndex < API_HEADER_LENGTH ) {

            //while (U2STAbits.TRMT == 0);

            sendByte = stagingBuffer.header[stagingBuffer.sendIndex] & 0xFF;

            // Compute checksum

            if (stagingBuffer.sendIndex >= 3) {

                stagingBuffer.checksum += sendByte & 0xFF;

            }

        } else if ( stagingBuffer.sendIndex < PACKET_LENGTH - 1 ) {

            sendByte = stagingBuffer.telemetry.asArray[stagingBuffer.sendIndex - API_HEADER_LENGTH] & 0xFF;

            stagingBuffer.checksum += sendByte & 0xFF;

        } else if ( stagingBuffer.sendIndex == PACKET_LENGTH - 1) {

            sendByte = 0xFF - (stagingBuffer.checksum & 0xFF);

        } else {

            IFS1bits.U2TXIF = 0;

            return;

        }

        stagingBuffer.sendIndex++;

        IFS1bits.U2TXIF = 0;

        U2TXREG = sendByte;

    }

All the "_if_" statements above, compile the header, the data and the checksum together. Note that the checksum is the bitwise inverse of the actual sum: sendByte = 0xFF - (stagingBuffer.checksum & 0xFF). The most important part of this process is the last line, where each byte is sent to the UART transmit buffer. Since the UART transmit process is interrupt-based, each interrupt keeps calling _sendNextByte()_, until there is no more data left:

    void __attribute__((__interrupt__, no_auto_psv)) _U2TXInterrupt(void) {

        // Short circuit if nothing in the staging area yet

        if ( stagingBuffer.telemetry.asStruct == 0 ) {

            IFS1bits.U2TXIF = 0;

            return;

        }

        sendNextByte();

    }

The process can be described through this flowchart:

![Downlink Flowchart](http://i.imgur.com/2pCYJRK.jpg)

### In the code – Uplink

Once every iteration, a command is read from the uplink queue. This is done by calling readDatalink(). The command _popCommand()_ is called. If any new commands have been received, _popCommand()_ will return a _command_ struct (defined in _net.h_):

    struct command {

        unsigned char cmd;

        unsigned char data\_length;

        unsigned char data[101];

    };

It is fairly straight forward. The structure contains a _cmd.cmd _which indicates the command ID. This ID corresponds to a certain function that needs to be completed. Following the pop command are a series of case statements (one for each command ID). For instance, if the command ID is 30, the following command is run (in _net\_inbound.c_):

    struct command* cmd = popCommand();

    //TODO: Add rudimentary input validation

    if ( cmd ) {

        if (lastCommandSentCode == cmd->cmd){

            lastCommandSentCode++;

        }

        else{

            lastCommandSentCode = cmd->cmd * 100;

        }

        switch (cmd->cmd) {

            ...

            case SET_THROTTLE:

                sp_ThrottleRate = (int)(*(int*)(&cmd->data) / 100.0  * (890 - 454) + 454);

                break;

            ...
        }

    }

The throttle ends up being set to the value indicated in the _cmd.data_ location. In addition, the last command read is stored and sent to the ground station as verification that the command was received.

The _popCommand() _function waits and reads the next available command from a circular buffer (note the _INBOUND\_QUEUE\_SIZE_ variable). If the command doesn't exist, it exits the function.

In order for the command structure to exist, the _U2RXInterrupt_ must have been triggered. This occurs when new data is sent.

    void __attribute__((__interrupt__, no_auto_psv)) _U2RXInterrupt(void) {

        unsigned char data = U2RXREG;

        if ( rawPacketStatus[packetPos] != BUSY ) {    // no buffer available to write

            packetPos = ( packetPos + 1  ) % RAW_PACKET_BUFFER_SIZE;

            IFS1bits.U2RXIF = 0;

            return;

        }

        switch ( payloadPos ) {

            case 0:

                if ( data != START_DELIMITER ) {

                    IFS1bits.U2RXIF = 0;

                    return;

                }

                break;

            case 1:

                if ( data != 0 ) {

                    payloadPos = 0;

                    IFS1bits.U2RXIF = 0;

                    return;                 // packet length < 100 bytes, so msb == 0

                }

                break;

            case 2:

                payloadLength[packetPos] = data;

                break;

            default:        // Normally, don't do anything special

                break;

        }

        rawPackets[packetPos][payloadPos++] = data;

        if ( payloadPos && payloadPos == payloadLength[packetPos] + 3 + 1) {   // at end of packet

            rawPacketStatus[packetPos] = READY;

            payloadPos = 0;

            packetPos = ( packetPos + 1  ) % RAW_PACKET_BUFFER_SIZE;

            if ( rawPacketStatus[packetPos] == EMPTY ) {

                rawPacketStatus[packetPos] = BUSY;

            }

        }

        IFS1bits.U2RXIF = 0;

    }

The first thing that occurs when new data arrives is a check to see if there is enough memory to store the data. A _if statement_ is used to check if the buffer (rawPacketStatus) is busy or not.  Note that the interrupt will only record the data, if the current _packetPos_ marked busy.

If the buffer is full, the next buffer location is checked. Otherwise, the packet is parsed byte by byte.

Firstly, the start delimiter is looked for using a case statement. Until the start delimiter is found, nothing happens. Secondly, for case 1 and 2, the length of the packet is check and recorded. Once the length of the packet is known, the _data_ is read into a 2d array called _rawPackets_. This array contains each byte of every packet in the circular buffer. Once all the data is copied into the array, the packet is marked as _READY_, and the next one is marked _BUSY_ if it is _EMPTY_, and the processing of the data begins on the next maintenance cycle when _inboundBufferMaintenance()_ is called from _main.c_:

    void inboundBufferMaintenance(void) {

        int i;

        for ( i = 0; i < RAW_PACKET_BUFFER_SIZE; i++ ) {

            if ( rawPacketStatus[i] == READY && checkPacket(rawPackets[i]) ) {

                struct command\* cmd = createCommand( rawPackets[i] );

                if ( cmd ) {            // create command was successful ?

                    pushCommand( cmd ); // queue it up

                    rawPacketStatus[i] = EMPTY;         // buffer is now good for writing another packet

                }

            }

        }

        if ( rawPacketStatus[0] == EMPTY ) {

            rawPacketStatus[0] = BUSY;

        }

    }

This subroutine iterates through each buffer location and checks for any _READY_ packets. If one is found, and it has been verified through a checksum, the command structure is created from the data using the _createCommand(rawPackets[i])_ method. Once this is done, the previous spot is marked _EMPTY_. The first buffer is always primed if it is empty.



![Uplink Flowchart](http://i.imgur.com/F71doku.png)