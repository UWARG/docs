#Direct Memory Access

Direct Memory Access (or DMA), is a microcontroller feature, which allows peripheral interfaces to directly access memory, completely bypassing the CPU. The CPU only needs to setup the transfer of data. The rest of the process is done without it.

DMA is a commonly used in graphic, network, and sound cards. More importantly, it is used in multi-core processors, which is essentially the usage of DMA in the PICpilot.

One DMA cycle follows this procedure:

![DMA Cycle](http://i.imgur.com/5dBPCdc.png)

In the PICpilot, the only peripheral that uses DMA is the SPI interface, although many other ones are supported.

When a DMA transfer occurs, first a peripheral makes a request to the DMA controller (based on a predefined channel number). The request causes the DMA controller to read or write to a preconfigured peripheral address. Once this is completed, the DMA controller writes the data to the DPSRAM location (this is RAM dedicated to the DMA controller) or reads from it. The direction in which this transfer occurs depends on the register value corresponding to the predefined settings of the DMA controller.

In the PICpilot, the Direct Memory Access module is constantly active through the SPI1 module. This means that the data transmission is continuous between both chips. Essentially, when this process is continuous it provides a way to share global variables between two physical microcontrollers simultaneously. This is how path data gets transmitted to the attitude manager. The path data is made global between the two chips.

It should be noted that DMA is also used between the path manager chip and the GPS.

On the PIC microcontroller, the DMA must only be initialized. The DMA controller continues operation automatically without direct processor input. The code to initialize the interface is below.

## In the code

In order to transfer data using DMA, both chips must have been initialized. In the PICpilot, only the DMA interface is initialized for data transfer between the GPS and the Path Management Chip (PM Chip), as well as the PM Chip and the Attitude Management Chip (AM Chip). Both of these connections are enabled using SPI (see previous section).

The GPS continuously sends data as soon as it is plugged in. It sends data in the following data format:

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

In order to properly configure this connection the following code is used:

    GPSData gpsData __attribute__((space(dma)));

    /*

     *

     */

    void __attribute__((__interrupt__, no_auto_psv)) _DMA2Interrupt(void){

        newGPSDataAvailable = 1;

        IFS1bits.DMA2IF = 0;// Clear the DMA0 Interrupt Flag

    }

    void init_DMA2(){

        IFS1bits.DMA2IF = 0;

        IEC1bits.DMA2IE = 1;

        DMA2CONbits.AMODE = 0b00; //Register Indirect Mode

        DMA2CONbits.DIR = 0; //Transfer from SPI to DSPRAM

        DMA2CONbits.MODE = 0b00; //Transfer continuously

        DMA2CONbits.SIZE = 1; //Transfer bytes (8 bits)

        DMA2STA = __builtin_dmaoffset(&gpsData); //Primary Transfer Buffer

        DMA2PAD = (volatile unsigned int) &SPI2BUF; //Peripheral Address

        DMA2CNT = sizeof(GPSData) - 1; //+1 for checksum //DMA Transfer Count Length

        DMA2REQ = 0b0100001; //IRQ code for SPI2

        DMA2CONbits.CHEN = 1; //Enable the channel

    }

Note how a block of memory ("GPSData") is reserved for the incoming data from the GPS unit.  The register values are configured as follows:

| Register | Value | Function |
| --- | --- | --- |
| DMA2CONbits.AMODE | 0 | This enables Register Indirect with Post Increment Mode. This enables data to be stored in chunks one after another (incremented locations). |
| DMA2CONbits.DIR | 0 | This indicates the direction that data travels on the bus. In this case, the data is always _incoming_. Therefore, it is copied from the SPI interface to the DSPRAM. |
| DMA2CONbits.MODE | 0 | This indicates if the transfer occurs a single time, or continuously, and whether a ping pong buffer should be used. It is currently enabled for continuous usage without a ping pong buffer. |
| DMA2CONbits.SIZE | 1 | Indicates if each DMA transfer is 8 bits or 16 bits. In this case, it is 8 bits. |
| DMA2STA | &gpsData with an added DMA offset | This indicates where the primary buffer is located. This memory block was initialized at the beginning of the above code snippet, where "space(dma)" is called. |
| DMA2PAD | &SPI2BUF | This stores the referenced location from where the data is obtained. (This DMA channel will use the SPI2 buffer to get the data). |
| DMA2CNT | Number of bytes in GPSData - 1 | This is a counter variable, which indicates the number of transfers that need to be completed per DMA request. |
| DMA2REQ | 0b0100001 | This is the IRQ (Interrupt Request) code for the SPI2 interface. This allows the peripheral to send an interrupt request to the DMA controller instead of the CPU. |
| DMA2CONbits.CHEN | 1 | Enables the DMA channel. |

On the other hand, the setup between the PM chip and the AM chip is slightly different. These two chips communicate with each other simultaneously through the SPI1 interface. The code controlling the initialization found in InterchipDMA.c/.h.

The data being sent to the PM chip from the AM chip is in the form of:

    typedef struct _AMData {

        WaypointWrapper waypoint;

        float pathGain;

        float orbitGain;

        float calibrationHeight;

        char command;

        char checksum;

    } AMData;

Vice-versa, the data being sent to the AM chip from the PM chip is in the form of:

    typedef struct _PMData {

        float time;     //4 Bytes   -  hhmmss.ssss

        long double latitude;  //8 Bytes - ddd.mmmmmm

        long double longitude; //8 Bytes - ddd.mmmmmm

        float speed;    //KM/H

        float altitude;

        int sp_Altitude; // Meters

        int heading;  //Degrees

        int sp_Heading; //Degrees

        char satellites;    //1 Byte

        char positionFix;   //0 = No GPS, 1 = GPS fix, 2 = DGSP Fix

        char targetWaypoint;

        char batteryLevel;

     } PMData;

The initialization process is extremely similar for both chips (PM and AM). Each chip requires a DMA channel to read the incoming data, as well as to write the outgoing data. As a result, both the AM chip and the PM chip have the same setup with a few different variables names:

    void __attribute__((__interrupt__, no_auto_psv)) _DMA0Interrupt(void){

    #if !PATH_MANAGER

        if (!transmitInitialized){

            transmitInitialized = 1;

            DMA1REQbits.FORCE = 1;

        while (DMA1REQbits.FORCE == 1);

        }

    #endif

        newDataAvailable = 1;

        IFS0bits.DMA0IF = 0;// Clear the DMA0 Interrupt Flag

    }

    void __attribute__((__interrupt__, no_auto_psv)) _DMA1Interrupt(void){

        IFS0bits.DMA1IF = 0;// Clear the DMA0 Interrupt Flag

    }

    void init_DMA0(){

        IFS0bits.DMA0IF = 0;

        IEC0bits.DMA0IE = 1;

        IPC1bits.DMA0IP = 7; //Highest Priority

        DMACS0 = 0; //Clear any IO error flags

        DMA0CONbits.DIR = 0; //Transfer from SPI to DSPRAM

        DMA0CONbits.AMODE = 0b00; //With post increment mode

        DMA0CONbits.MODE = 0b00; //Transfer continuously

        DMA0CONbits.SIZE = 0; //Transfer words (16 bits)
 
    #if PATH_MANAGER

        DMA0STA = __builtin_dmaoffset(&amData); //Primary Transfer Buffer

    #else

        DMA0STA = __builtin_dmaoffset(&pmData); //Primary Transfer Buffer

    #endif

        DMA0PAD = (volatile unsigned int) &SPI1BUF; //Peripheral Address

        DMA0CNT = PATH_MANAGER?(sizeof(AMData)/2 + sizeof(AMData) % 2 - 1):(sizeof(PMData)/2 + sizeof(PMData) % 2 - 1); //+1 for checksum //DMA Transfer Count Length

        DMA0REQ = 0x000A;//0b0100001; //IRQ code for SPI1

        DMA0CONbits.CHEN = 1; //Enable the channel

    }

    void init_DMA1(){

        IFS0bits.DMA1IF = 0;

        IEC0bits.DMA1IE = 1;

        IPC3bits.DMA1IP = 7;

        DMACS1 = 0; //Clear any IO error flags

        DMA1CONbits.DIR = 1; //Transfer from DSPRAM to SPI

        DMA1CONbits.AMODE = 0b00; //Without post increment mode

        DMA1CONbits.MODE = 0b00; //Transfer continuously, ping ponging between buffers

        DMA1CONbits.SIZE = 0; //Transfer words (16 bits)

    #if PATH_MANAGER

        DMA1STA = __builtin_dmaoffset(&pmData); //Primary Transfer Buffer

    #else

        DMA1STA = __builtin_dmaoffset(&amData); //Primary Transfer Buffer

    #endif

        DMA1PAD = (volatile unsigned int) &SPI1BUF; //Peripheral Address

        DMA1CNT = PATH_MANAGER?(sizeof(PMData)/2 + sizeof(PMData) % 2 - 1):(sizeof(AMData)/2 + sizeof(AMData) % 2 - 1); //+1 for checksum //DMA Transfer Count Length

        DMA1REQ = 0x000A;//0b0100001; //IRQ code for SPI1

        DMA1CONbits.CHEN = 1; //Enable the channel

    }

The above code is very similar to the first example with the GPS. The differences include the direction of data transfer, the buffer variables, the IRQ codes, as well as the 16 bit mode interfacing.

Also, in order to initialize transfer, the SPI master must send the first packet. This is evident in the DMA0 interrupt routine:

    #if !PATH\_MANAGER

        if (!transmitInitialized){

            transmitInitialized = 1;

            DMA1REQbits.FORCE = 1;

        while (DMA1REQbits.FORCE == 1);

        }

     #endif

A DMA request is forced by setting the DMA1REQbits.FORCE bit to 1. The following sets of data do not need to be forced, they happen automatically (since continuous mode was enabled).