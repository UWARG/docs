#Sensors and Peripherals

There are multiple devices and peripherals currently in use on the PICpilot, however, the purpose of this document is not to document their functionality. Instead, appropriate references are listed below.

## GPS (MEDIATEK-3329)

This GPS module outputs data in the form of NMEA strings. These are ASCI strings with GPS relevant data embedded in them. A separate program is used to convert these strings to a useable format. The PICpilot expects the data to be in the form of a structure:

    typedef struct _GPSData {

        long double latitude;  //8 Bytes

        long double longitude; //8 Bytes

        float time;     //4 Bytes

        float speed;

        int altitude;

        int heading;

        char satellites;    //1 Byte

        char positionFix;

    } GPSData;

_Latitude_ and _Longitude_ should be in degrees.

_Time_ should be in 24 hour time, with the decimal portion indicating milliseconds.

_Speed_ should be in m/s.

_Altitude_ should be in m.

_Heading_ should be in degrees (geographical heading, not magnetic).

_Satellites_ is the number of connected satellites.

_PositionFix_ is a number representing the accuracy of the data (0 = no data, 1 = GPS functional, 2 = DGPS functional)

In the current PICpilot, GPS updates occur 10 times a second.

The data sheets can be retrieved from here:

[https://drive.google.com/file/d/0BySpWXvmBM4JQXVOR093anI0YXc/view?usp=sharing](https://drive.google.com/file/d/0BySpWXvmBM4JQXVOR093anI0YXc/view?usp=sharing)

[https://drive.google.com/file/d/0BySpWXvmBM4JR2xTV3dCcGJWczQ/view?usp=sharing](https://drive.google.com/file/d/0BySpWXvmBM4JR2xTV3dCcGJWczQ/view?usp=sharing)

## IMU (VN-100/VectorNav-100)

The VectorNav-100 has a Kalman filter implemented within it. All the registers and commands that can be executed on the oldest VectorNav are available in four files within the PICpilot code. This includes the VN100.c/.h files, the VN\_user.c/.h files, the VN\_lib.c/.h, and the VN\_math.c/.h files.

I GET IT that was 8 files, not four....moving on...

You will find the SPI initialization function in the VN100.c file. It initializes the SPI2 interface.

In the PICpilot, the two most commonly called functions are _VN100\_SPI\_GetYPR()_ and _VN100\_SPI\_GetRates()_. These two functions get the rate and angles of rotation along the yaw, pitch, and roll axis of the vehicle.

For a complete list of functions and settings take a look at the documentation:

[https://drive.google.com/file/d/0BySpWXvmBM4JYXlSdW85NnlxYkE/view?usp=sharing](https://drive.google.com/file/d/0BySpWXvmBM4JYXlSdW85NnlxYkE/view?usp=sharing)

## Altimeter (MPL3115A2)

The complete functionality of the altimeter can be found in the MPL3115A2.c/.h files.

There are only 3 functions implemented in the code. An initialization, calibration, and sensor read function.

To see the complete list of functions provided by the altimeter, as well as further details see the documentation here:

[https://drive.google.com/file/d/0BySpWXvmBM4JeUE4Y3BhQzVMdkk/view?usp=sharing](https://drive.google.com/file/d/0BySpWXvmBM4JeUE4Y3BhQzVMdkk/view?usp=sharing)

## Wireless Link - XBEE PRO S3B

The XBEE PRO S3B is currently the wireless interface used with the PICpilot. Nonetheless, many wireless links can be easily substituted with minimal coding as long as a UART interface is supported.

The PICpilot currently only supports this model currently. This wireless link uses the 900MHz spectrum for communication between devices.

According to the packet structure specification in the datasheet below, the data is sent or received in that manner.

For details on other functions and feature that are part of the XBEE PRO S3B module download the documentation here:

[https://drive.google.com/file/d/0BySpWXvmBM4JNzdLWXdCWHlEcGs/view?usp=sharing](https://drive.google.com/file/d/0BySpWXvmBM4JNzdLWXdCWHlEcGs/view?usp=sharing)

The above link also includes details on the packet structure. See page 62 for the Tx packet structure. See page 70 for the Rx packet structure.

The configuration options for the base station can be found here:

[https://drive.google.com/file/d/0BySpWXvmBM4JTXZESmFEMG9uZEk/view?usp=sharing](https://drive.google.com/file/d/0BySpWXvmBM4JTXZESmFEMG9uZEk/view?usp=sharing)

The configuration options for the aircraft module can be found here:

[https://drive.google.com/file/d/0BySpWXvmBM4Jdml6Wlg5UFZKWEE/view?usp=sharing](https://drive.google.com/file/d/0BySpWXvmBM4Jdml6Wlg5UFZKWEE/view?usp=sharing)

## RC Receiver (EzUHF)

The exact model of the RC Receiver is insignificant to the functionality of the PICpilot. However, the PICpilot has 8 PWM inputs and 8 PWM outputs. Therefore, it would be prudent to have a RC Receiver capable of managing 8 channels.

The current receiver uses the 431-437MHz spectrum.

The documentation can be found here:

[http://www.immersionrc.com/downloads/manuals/EzUHFManual\_EN\_v1.0.pdf](http://www.immersionrc.com/downloads/manuals/EzUHFManual_EN_v1.0.pdf)

## Airspeed Sensor (WIP)

This has not been implemented yet.

## Ultrasonic Sensor (WIP)

This has not been implemented yet.

