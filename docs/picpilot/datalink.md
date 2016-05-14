# Datalink

The datalink is one of the most important peripheral components in an unmanned system. It provides information on the status of the aircraft (telemetry) and provides the crucial functionality of an uplink, in order to be able to communicate with the system and make changes to its overall functionality.

Make note that the details of this system can change frequently due to the requirements of each user. The telemetry data may change from the ones present in this document. Likewise, uplink commands may change based on newly implemented features and requirements. Although, this document should be updated whenever there is a change, this may not always occur. Therefore, be careful when referencing data in this section.

## Telemetry (Downlink) Data

| **Data** | **Programming Variable** | **Format** | **Description** |
| --- | --- | --- | --- |
| Latitude | Lat | Long double (64bit floating point) | The latitude location of the airplane in degrees. |
| Longitude | Lon | Long double (64bit floating point) | The longitude location of the airplane in degrees. |
| Time | Time | Float (32 bit floating point) | The time as a UTC time stamp. |
| Pitch | Pitch | Float | The current state estimation of the pitch of the aircraft in degrees. |
| Roll | Roll | Float | The current state estimation of the roll of the aircraft in degrees. |
| Yaw | Yaw | Float | The current state estimation of the yaw of the aircraft according to the magnetometer in degrees. |
| Pitch Rate | Pitch\_rate | Float | The gyroscope sensor data. The rate of rotation of the aircraft in radians per second. |
| Roll Rate | Roll\_rate | Float | The gyroscope sensor data. The rate of rotation of the aircraft in radians per second. |
| Yaw Rate | Yaw\_rate | Float | The gyroscope sensor data. The rate of rotation of the aircraft in radians per second. |
| Derivative Gain | Kd\_gain | Float | A predetermined gain value for a PID loop. Typically used for tuning and debugging purposes. |
| Proportional Gain | Kp\_gain | Float | A predetermined gain value for a PID loop. Typically used for tuning and debugging purposes. |
| Integral Gain | Ki\_gain | Float | A predetermined gain value for a PID loop. Typically used for tuning and debugging purposes. |
| Heading | Heading | Float | The GPS heading of the aircraft in degrees ranging from 0 to 360. |
| Ground Speed | Ground\_speed | Float | The ground speed of the aircraft in meters per second. |
| Pitch Setpoint | Pitch\_setpoint | Float | The autopilot-controlled setpoint for the pitch angle in degrees. |
| Roll Setpoint | Roll\_setpoint | Float | The autopilot-controlled setpoint for the Roll angle in degrees. |
| Heading Setpoint | heading\_setpoint | Float | The autopilot-controlled setpoint for the heading angle in degrees. |
| Throttle Setpoint | Throttle\_setpoint | Float | The autopilot-controlled setpoint for the propeller speed in terms of percentage (0-100%) |
| Altitude Setpoint | altitude\_setpoint | Float | The autopilot-controlled setpoint for the altitude above mean sea level. (in meters) |
| Altitude | altitude | Float | The altitude of the plane above the mean sea level (in meters) |
| Pitch Setpoint (Controller) | int\_pitch\_setpoint | Float | The user input for the Pitch angle in arbitrary timer tick units. |
| Roll Setpoint(Controller) | int\_roll\_setpoint | Float | The user input for the Roll angle in arbitrary timer tick units. |
| Yaw Setpoint (Controller) | int\_yaw\_setpoint | Float | The user input for the yaw angle in arbitrary timer tick units. |
| Last Wireless Command Sent&Received | lastCommandSent | int | This is a combination of the command number (commands.h) multiplied by 100. For every subsequent call, the number is incremented by 1.For example, if the return home command was called 5 times, this variable would be equal to: _4105_ |
| Error Codes | errorCodes | Unsigned int | Signals any problems that may be occurring or have occurred.This value is retrieved from StartupErrorCodes.c. The possible values are (and any binary combination):0b0000000000000000: No Errors0b0000000000000001:Power on reset occurred.0b0000000000000010:Brown out reset occurred.0b0000000000000100:Idle Mode Reset Occurred.0b0000000000001000:Sleep Mode Reset Occurred.0b0000000000010000:Software Watch Dog Timer Reset Occurred.0b0000000000100000:Software Reset Occurred.0b0000000001000000:External Reset Occurred.0b0000000010000000:Voltage Regulator Reset Occurred.0b0000000100000000:Illegal Opcode Reset Occurred.0b0000001000000000:Trap Reset Occurred.0b1000000000000000:UHF Switch is ON (Can be used to indicate joystick controller connection) |
| Camera Counter | cameraCounter | Unsigned Int | Every time the camera is triggered, this value increases by one. This allows one to keep track which picture corresponds to what data. |
| Waypoint Index | waypointIndex | Char | Indicates what waypoint the vehicle is attempting to get to.-1 - indicates that the vehicle is going "HOME"Any other value indicates the waypoint in the order that it was added. |
| Controller Status Indicator | Editing\_gain | Char | An indicator that depicts which gain values are currently being changed.0x00 = Manual Mode0x01 = Yaw0x02 = Pitch0x03 = Roll0x04 = Heading0x05 = Altitude0x06 = Throttle |
| GPS Status Indicator | Gps\_status | Char | An indicator that depicts the number of satellites connected, as well as the status of the gps fix. Format:0x<GPS Fix><Satellites> For example:0x00 = No GPS Fix, 0 Satellites0x1A = GPS Fix, 10 Satellites0x24 = DGPS Fix, 4 Satellites  |
| Battery Level Indicator | batteryLevel | Char | This indicator provides the battery level as a percentage (%) of the original battery capacity specified in the voltageSensor.c/h files. |

Note that all telemetry data must be visible within the scope of the AttitudeManager.c file.

## Command (Uplink) Data

Every command that is sent to the UAV must be predefined with an ID, as well as an associated function. Some commands only change variable values, whereas some call functions with the associated data as a parameter.

| **Command ID** | **Socket Command** | **Associated Function** | **Format** | **Description** |
| --- | --- | --- | --- | --- |
| 0 | debug:<data> | UART1\_SendString(<data>) | Char Array | The debugging command, which writes to the UART1 port. |
| 1 | set\_pitchKDGain:<data> | setGain(PITCH, KD\_GAIN, <data>) | Float | The command to set the derivative gain for pitch control. |
| 2 | set\_rollKDGain:<data> | setGain(ROLL, KD\_GAIN, <data>) | Float | The command to set the derivative gain for roll control. |
| 3 | set\_yawKDGain:<data> | setGain(YAW, KD\_GAIN, <data>) | Float | The command to set the derivative gain for yaw control. |
| 4 | set\_pitchKPGain:<data> | setGain(PITCH, KP\_GAIN, <data>) | Float | The command to set the proportional gain for pitch control. |
| 5 | set\_rollKPGain:<data> | setGain(ROLL, KP\_GAIN, <data>) | Float | The command to set the proportional gain for roll control. |
| 6 | set\_yawKPGain:<data> | setGain(YAW, KP\_GAIN, <data>) | Float | The command to set the proportional gain for yaw control. |
| 7 | set\_pitchKIGain:<data> | setGain(PITCH, KI\_GAIN, <data>) | Float | The command to set the integral gain for pitch control. |
| 8 | set\_rollKIGain:<data> | setGain(ROLL, KI\_GAIN, <data>) | Float | The command to set the proportional gain for roll control. |
| 9 | set\_yawKIGain:<data> | setGain(YAW, KI\_GAIN, <data>) | Float | The command to set the proportional gain for yaw control. |
| 10 | set\_headingKDGain:<data> | setGain(HEADING, KD\_GAIN, <data>) | Float | The command to set the derivative gain for heading control. |
| 11 | set\_headingKPGain:<data> | setGain(HEADING, KP\_GAIN, <data>) | Float | The command to set the proportional gain for heading control. |
| 12 | set\_headingKIGain:<data> | setGain(HEADING, KI\_GAIN, <data>) | Float | The command to set the integral gain for heading control. |
| 13 | set\_altitudeKDGain:<data> | setGain(ALTITUDE, KD\_GAIN, <data>) | Float | The command to set the derivative gain for altitude control. |
| 14 | set\_altitudeKPGain:<data> | setGain(ALTITUDE, KP\_GAIN, <data>) | Float | The command to set the proportional gain for altitude control. |
| 15 | set\_altitudeKIGain:<data> | setGain(ALTITUDE, KI\_GAIN, <data>) | Float | The command to set the integral gain for altitude control. |
| 16 | set\_throttleKDGain:<data> | setGain(THROTTLE, KD\_GAIN, <data>) | Float | The command to set the derivative gain for throttle control (speed). |
| 17 | set\_throttleKPGain:<data> | setGain(THROTTLE, KP\_GAIN, <data>) | Float | The command to set the derivative gain for throttle control (speed). |
| 18 | set\_throttleKIGain:<data> | setGain(THROTTLE, KI\_GAIN, <data>) | Float | The command to set the integral gain for throttle control (speed). |
| 19 | set\_pathGain:<data> | Currently Unsupported, but will not cause errors if set | Float | The command used to set the gain that scales lateral positional control around a path. |
| 20 | set\_orbitGain:<data> | Currently Unsupported, but will not cause errors if set | Float | The command used to set the gain that scales orbital convergence. |
| 21 | set\_showGain:<data> | displayGain = <data> | Char | The command used to switch the output between multiple gain types:0x00 = Yaw0x01 = Pitch0x02 = Roll0x03 = Heading0x04 = Altitude0x05 = Throttle\*Note that there is no support for the path gain or orbital gain yet. |
| 22 | set\_pitchRate:<data> | sp\_PitchRate = <data> | Int | The user input for the pitch rate in PWM timer tick units. (Normal values range from 470 to 941 [dependent on setup]). Note you must set command 32 greater than 4 to use this. |
| 23 | set\_rollRate:<data> | sp\_RollRate = <data> | Int | The user input for the roll rate in PWM timer tick units. (Normal values range from 470 to 941 [dependent on setup]) Note you must set command 32 greater than 4 to use this. |
| 24 | set\_yawRate:<data> | sp\_YawRate = <data> | Int | The user input for the roll rate in PWM timer tick units. (Normal values range from 470 to 941 [dependent on setup]) Note you must set command 32 greater than 4 to use this. |
| 25 | set\_pitchAngle:<data> | sp\_PitchAngle = <data> | Float | The user input for the pitch angle in degrees. Note you must set command 32 greater than 5 to use this. |
| 26 | set\_rollAngle:<data> | sp\_RollAngle = <data> | Float | The user input for the roll angle in degrees. Note you must set command 32 greater than 5 to use this. |
| 27 | set\_yawAngle:<data> | Currently Unsupported, but will not cause errors if set| Float | The user input for the yaw angle in degrees. WILL LIKELY BE REMOVED IN THE FUTURE IF UNEEDED. Note you must set command 32 greater than 5 to use this. |
| 28 | set\_altitude:<data> | sp\_Altitude = <data> | Float | The user input for the altitude in meters above sea level. Note you must set command 32 greater than 6 to use this. |
| 29 | set\_heading:<data> | sp\_Heading = <data> | Float | The user input for the heading in standard compass bearing degrees. Note you must set command 32 greater than 7 to use this. |
| 30 | set\_throttle:<data> | sp\_Throttle = <data> | Int | The user input for the throttle as a percentage. Note you must set command 32 to 8 to use this. |
| 31 | set\_autonomousLevel:<data> | controlLevel = <data> | Int | This sets the source of control input between the autopilot, the remote control, and the ground stations:0b00000000 = Full manual control (default)0b00000001 = Set Pitch Rate(0), Pitch Angle(1)0b00000010 = Pitch Control Source: Controller(0), Ground Station(1) 0b00000100 = Roll Control Type: Roll Rate(0), Roll Angle(1)0b00001000 = Roll Control Sources: Controller(0), Ground Station(1)0b00110000 = Throttle control source: Controller(0), Ground Station(1), Autopilot(2) 0b01000000 = Altitude Source: Ground Station(0), Autopilot(1)0b10000000 = Altitude Control On(1) or Off(0)0b100000000 = Heading control source: Ground Station(0), Autopilot(1)0b1000000000=  To fly with Ground Station Control of the Pitch Rate and Roll Angle:set\_autonomousLevel:14To fly with Ground Station Control of the Pitch Rate, Roll Angle, and Throttle:set\_autonomousLevel:30To fly with Ground Station Control of Altitude, and Throttle (Roll controlled by controller):set\_autonomousLevel:134To fly with Ground Station Control of Altitude, Throttle, Roll Angle:set\_autonomousLevel:156To reset everything and fly with controller:set\_autonomousLevel:0 |
| 32 | set\_angularWalkVariance:<data> | setAngularWalkVariance(<data>) | Float | Sets the Kalman Filter parameter that determines how fast the gyro bias estimates converge. |
| 33 | Set\_gyroVariance:<data> | setGyroVariance(<data>) | Float | Sets the Kalman filter parameter that determines the weighting of the gryo in the attitude estimates of the plane. |
| 34 | set\_magneticVariance:<data> | setMagneticVariance(<data>) | Float | Sets the Kalman filter parameter that determines the weighting of the magnetometers in the attitude estimates of the plane. |
| 35 | set\_accelVariance:<data> | setAccelVariance(<data>) | Float | Sets the Kalman filter parameter that determines the weighting of the accelerometers in the attitude estimates of the plane. |
| 36 | set\_scaleFactor:<data> | pitchScaleFactor = <data> | Float | Sets the value for the feed-forward term of pitch, when the aircraft is turning. In other words, when the aircraft is turning, this proportion is added to the elevators to prevent the airplane from losing altitude. |
| 37 | calibrate\_altimeter:<data> | amData.calibrationHeight = <data>amData.command = PM\_CALIBRATE\_ALTIMETER | Float | This sets the reference height on the altimeter to a predefined value. This allows one to choose a _relative_ value for the height aircraft. For example, one may set 0m to refer to the starting or landing terrain height. |
| 38 | clear\_waypoints:<data> | amData.waypoint.id = <data>amData.command = PM\_CLEAR\_WAYPOINTS | Byte | This command clears ALL waypoints. The <data> is just a dummy variable. |
| 39 | remove\_waypoint:<data> | amData.waypoint.id = <data>amData.command = PM\_REMOVE\_WAYPOINT | Byte | This command removes a specific waypoint given a specific ID as the parameter. |
| 40 | set\_targetWaypoint:<data> | amData.waypoint.id = <data>amData.command = PM\_SET\_TARGET\_WAYPOINT | Byte | The target waypoint is the waypoint which the UAV is trying to currently get to. If this command is called, it can be used to skip waypoints, or return to waypoints. The <data> is the specified ID for the new target. |
| 41 | return\_home:<data> | amData.command = PM\_RETURN\_HOME | Byte | This tells the plane to go to the "home" coordinates. The <data> is just a dummy variable. |
| 42 | cancel\_returnHome:<data> | amData.command = PM\_CANCEL\_RETURN\_HOME | Byte | This tells the plane to return back to its original path after being called to the "home" coordinates. |
| 43 | send\_heartbeat:<data> | heartbeatTimer = time | Byte | This sends a "heartbeat" (verification ping) to the plane to tell it that a data connection is still present. If this command is not received after a certain amount of time, emergency maneuvers will be used. |
| 44 | trigger\_camera:<data> | triggerCamera(<data>) | Int | This manually triggers the camera via a "fake" PWM signal. The <data> is the integer value of the PWM signal. |
| 45 | set\_triggerDistance:<data> | setTriggerDistance(<data>) | Float | This sets the trigger distance (how often a picture is taken based on distance). This <data> is a value in meters. |
| 46 | set\_gimbleOffset:<data> | setGimbleOffset(<data>) | Int | This provides an offset to the gimbal. If the gimbal is misaligned on start up, this function can correct it. |
| 47 | kill\_plane:<data> | if (<data> == 1234)                    killingPlane = 1; | Int | This crashes the plane into the ground (in emergencies). This requires a password (<data> = "1234") to ensure this isn't an accident. |
| 48 | unkill\_plane:<data> | if (<data> == 1234)                    killingPlane = 0; | Int | This changes the state of the plane from "I'm crashing" to "Nevermind, this was just a test". This requires a password (<data> = "1234") to ensure this isn't an accident. |
| 128 | new\_waypoint:<data>,<data>,<data>,<data> | amData.command = PM\_NEW\_WAYPOINTamData.waypoint = <data> | 4 floats | This uploads and appends a waypoint to the aircraft based on corresponding gps coordinates and path instructions. The format is (longitude, latitude, altitude,radius). |
| 129 | insert\_Waypoint: | amData.command = PM\_INSERT\_WAYPOINT amData.waypoint = <data> | 4 floats followed by 2 Bytes | This uploads and inserts a waypoint to the aircraft based on corresponding gps coordinates and path instructions. The format is (longitude, latitude, altitude,radius,nextID,previousID). |
| 130 | set\_ReturnHomeCoordinates: | amData.command = PM\_SET\_RETURN\_HOME\_COORDINATESamData.waypoint = <data> | 3 Floats | This sets the home coordinates, to which the plane will return in case of an emergency. The format is (longitude, latitude, altitude). |
| 131 | tare\_IMU:<data>,<data>,<data> | adjustVNOrientationMatrix(float\* adjustment); | 3 Floats | This adds a bias adjustment to the matrix based on the last setting. The 3 data values are the x,y,z components of the aircraft. |
| 132 | Set\_IMU:<data>,<data>,<data> | setVNOrientationMatrix(float\* adjustment); | 3 Floats | This is used to set the reference frame of the aircraft's IMU unit. The input values are the x,y,z values of the IMU's rotation respectively. |

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