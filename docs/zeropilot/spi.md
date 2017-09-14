#SPI

SPI stands for Serial Peripheral Interface. It is similar to UART, with the exception that it is a _synchronous_ method of communication. Once again, SPI is a protocol for chips to be able to communicate between on another through serial connections (data on a single wire). It always operates in full duplex mode. This means that both chips **always** transmit and receive at the same time. The minimum hardware requirements include a clock line (SCLK), a Master Out/Slave In (MOSI), a Master In/Slave Out (MISO), and a Slave Select (SS). The Master Out/In and Slave In/Out refer to the transmit and receive pins on both chips. The connections should looks like this:

![Master-Slave setup](http://i.imgur.com/BT5EKVZ.png)

Note that there is a "Master" and a "Slave". The master always initiates communication. The slave always responds first. The SCLK (clock) line counts pulses, which are synchronized to the data bits on the MOSI and MISO lines. The SS (Slave Select) line is used to notify an external chip that communication is taking place. This enables multiple chips to be connected on the same data and clock lines. This is depicted here:

![Multi-slave setup](http://i.imgur.com/VNnc53K.png)

In the PICpilot, there is never more than one slave per data port. In other words, one does not have to worry about scenarios (multiple slaves) such as the one depicted above.

The SPI interface transfers 8 bits per packet. The protocol is straight forward:

  1. The start condition is initiated. The clock starts and the (selected) slave prepares to read and the master prepares to write.
  2. On the next 8 clock pulses, the slave and master both exchange data (read and write)
  3. After transmission, the stop condition is set. This occurs when the clock stops (high or low depending on the settings).

The PIC microcontroller specifications depict the SPI interface as follows:

![Protocol Definition](http://i.imgur.com/R3hgGB4.png)

Unlike UART, there is no parity bits, start bits, or stop bits. The beginning and the end of the message are commonly referred to as the _Start Condition_ and the _Stop Condition_, because they don't actually refer to any bits, but instead they refer to the signal of multiple lines (CLK, SS).

In the PICpilot, SPI is used for communication with the GPS, VectorNav (IMU), and the two individual cores (CPU/Microcontrollers). The GPS uses SPI2, the VectorNav uses SPI2, and the crosstalk between chips uses SPI1.

## In the code

Each dspic33fj256gp710a has two SPI interfaces. They are labeled SPI1 and SPI2. In the code, you won't find any SPI files present. The initialization functions are embedded in the corresponding peripheral files. The SPI1 configuration can be found on both chips, in the file, InterchipDMA.c, as well as the corresponding .h file. The function in those files is init\_SPI1. In addition, on the secondary chip (in other words, the path management chip), the SPI2 (GPS) interface is also enabled in the InterchipDMA.c file, as well as the header file. The function is called init\_SPI2.

The SPI2 configuration on the main chip (or more precisely, the attitude management chip) can be found in the VN100.c file, as well as the corresponding header file. The function name is VN100\_initSPI. It initializes SPI2.

This table summarizes the configuration:

|   | **SPI1** | **SPI2** | **SPI2** |
| --- | --- | --- | --- |
| **Use** | Interchip Communication | GPS Communication | VectorNav Communication |
| **Chip** | Both chips | Secondary (Path Managing) Chip | Primary (Attitude Managing) Chip |
| **Function** | In InterchipDMA.c,Init\_SPI1() | In InterchipDMA.c,Init\_SPI2() | In VN100.c,VN100\_initSPI() |

For detailed register maps and specifications of the SPI interface, see the [dspic33fj256gp710A](http://www.microchip.com/wwwproducts/Devices.aspx?product=dsPIC33FJ256GP710A) datasheet.

The most important settings are listed below.

### SPI1 – DMA and SPI2 - GPS

    //Set interrupts

    IFS0bits.SPI1IF = 0;

    IEC0bits.SPI1IE = 1;

    IPC2bits.SPI1IP = 4;

    SPI1BUF = 0;

    //SPI clock controlled by this module

    SPI1CON1bits.DISSCK = 0;

    //Output pins are controlled by this module

    SPI1CON1bits.DISSDO = 0;

    //16/8 bit communication mode (1/0)

    SPI1CON1bits.MODE16 = 1; //16

    //Master mode(1)/Slave mode(0)

    SPI1CON1bits.MSTEN = 0; //Slave

    //Enable Slave Select

    SPI1CON1bits.SSEN = 0;

    //Sample Phase (end/middle)

    SPI1CON1bits.SMP = 0; //Sample the input at the middle of the square wave

    //Clock Edge Select

    SPI1CON1bits.CKE = 0; //Output data changes from idle state to active clock state (1 is the opposite)

    //Clock Polarity

    SPI1CON1bits.CKP = 0; //Idle clock state is low, active clock state is high

    //Enable SPI

    SPI1STATbits.SPIEN = 1;

| Register | Value | Function |
| --- | --- | --- |
| IFS0bits.SPI1IF | 0 | This is the interrupt flag for the SPI1 interface. |
| IEC0bits.SPI1IE | 1 (0 for GPS) | This is the interrupt enable bit for the SPI1 interface. This allows interrupts to occur. |
| IPC2bits.SPI1IP | 4 (0 for GPS) | This determines the priority of every interrupt that occurs from the SPI1 interface. |
| SPI1BUF | 0 | This is the buffer that is used for sending and receiving data. This is buffer is for both reading and writing. |
| SPI1CON1bits.DISSCK | 0 | This bit allows the SPI1 module to control the clock. |
| SPI1CON1bits.DISSDO | 0 | This bit allows the SPI1 module to convert the usual GPIO pins into SPI1 pins. |
| SPI1CON1bits.MODE16 | 1 | This allows 16 bits to be transmitted per message. |
| SPI1CON1bits.MSTEN | 0 or 1 | This determines if the chip is the master (attitude manager) or the slave (path manager). |
| SPI1CON1bits.SSEN | 0 | This value enables the slave select pin. |
| SPI1CON1bits.SMP | 0 | This determines the sampling time of the SPI interface. 0 forces sampling in the middle of the square wave, 1 forces sampling at the end of the square wave. |
| SPI1CON1bits.CKE | 0 | This bit determines when the transmitted square wave changes states. 0 means it changes from clock low to high. 1 is the opposite. |
| SPI1CON1bits.CKP | 0 | Determines the clock polarity. 0 means that active clock state is high, idle state is low. 1 is the opposite. |
| SPI1STATbits.SPIEN | 1 | Enables the entire SPI module. |

### SPI2 - VectorNav

The VectorNav SPI configuration is very similar. The differences are listed below:

| Register | Value | Function |
| --- | --- | --- |
| IEC0bits.SPI2IE | 0 | This is the interrupt enable bit for the SPI1 interface. This allows interrupts to occur. The interrupt is disabled here. |
| SPI2CON1bits.MODE16 | 0 | This allows 8 bits to be transmitted per message. |
| SPI2CON1bits.MSTEN | 1 | This determines that the chip is the master and the VectorNav is the slave. |
| SPI2CON1bits.SSEN | 0 | This value enables the slave select pin. |
| SPI2CON1bits.SMP | 0 | This determines the sampling time of the SPI interface. 0 forces sampling in the middle of the square wave, 1 forces sampling at the end of the square wave. |
| SPI2CON1bits.CKE | 0 | This bit determines when the transmitted square wave changes states. 0 means it changes from clock low to high. 1 is the opposite. |
| SPI2CON1bits.CKP | 1 | Determines the clock polarity. 1 means that active clock state is low, idle state is high. 0 is the opposite. |
| SPI2CON1bits.PPRE | 2 | Prescales the clock. It reduces the clock frequency at a 4:1 ratio. |
| SPI2CON1bits.SPRE | 6 | The secondary prescaler, prescales the output frequency from the primary prescaler. This one is set to reduce the frequency at a ratio of 2:1. |