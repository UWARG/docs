#UART

UART stands for Universal Asynchronous Receive Transmit. It is a protocol for chips to be able to communicate between on another. It is a serial form of communication, where each bit of data is transmitted along the same connection. The minimum hardware requirements look like this:

![UART Communication](http://i.imgur.com/XtuUHVi.gif)

Note that Tx represents the transmit port, Rx represents the receive port, and the GND represents the required ground connection.

UART is convenient due to its simplicity. Note that the interface does not have a clock line or any special signalling channels. Most other methods of communication require a pulsing clock to determine the rate at which data is transferred from one component to another. UART is "asynchronous" and therefore the bits on the transfer line and the receive line do not need to be transmitted at the same instance in time. Instead, both chips have a predefined rate at which they transfer binary information to one another. This predefined rate is often determined by the user, or sometimes (very rarely) restricted by the manufacturer. This rate is referred to as the **baud rate**. It is very similar to a bit rate.

As a side note (don't worry if you are confused), Bit rate is the number of _bits_transferred per second. Baud rate is the number of _symbols_ transferred per second. A bit can be 0 or 1. A symbol carries different amounts of information in different technologies. For instance, in certain communication protocols, there can be 64 possible values for a single symbol. 64 values required 6 bits to be represented. Therefore, the baud rate is 6 times less than the bit rate.

For the UART communication protocol, the baud rate is equivalent to the bit rate, although "baud" is the correct terminology.

Although UART can be used in both 8 bit mode and 16 bit mode, the PICpilot uses the 8 bit mode of communication as displayed below.


1. First a start bit is sent
2. The message is then relayed in series
3. The stop bit(s) are then sent. (There can be 1 or 2 stop bits)

The stop and end bits indicate the beginning and the end of communication.

| **Bit number** | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|   | **Start bit** | **5–8 data bits** | **Stop bit(s)** |
|   | Start | Data 0 | Data 1 | Data 2 | Data 3 | Data 4 | Data 5 | Data 6 | Data 7 | Stop |

![UART Scope](http://i.imgur.com/Y6wtYli.jpg)

The most common settings for the UART protocol include 8 data bits, no parity, 1 stop bit, and no flow control. Remember to make sure that the baud rate matches up, and NEVER connect Tx to Tx or Rx to Rx.

In case you do not know, parity is a special bit used to check the integrity of the data sent. It indicates whether or not the sum of the 8 bits must be odd or even. If this result does not match the parity bit, the microcontroller would know that the information is garbled.

Secondly, flow control requires additional pins, where each peripheral signals the other one before it transmits and receives. This ensures that both chips are ready to communicate.

Thirdly, the terms full duplex and half duplex refer to a chip being able to multitask. Full duplex indicates that both chips send and receive at the same time. Half duplex indicates that only one chip sends and receives at a time. Usually, some type of flow control is required for half duplex systems.

This form of communication is used for two purposes on the PICpilot. It is used for the data link, as well as the debugging interface. The settings are listed below.

## In the code

Each dspic33fj256gp710a has two UART interfaces. They are labeled UART1 and UART2. In the code, two corresponding files are present: UART1.c and UART2.c (as well as their header files). UART1 and UART2 have nearly the same configuration settings, but with slight discrepancies. UART1 is used for debugging purposes. UART2 is used for the wireless transmitter (datalink).

For detailed register maps and specifications of the UART interface, see the [dspic33fj256gp710A](http://www.microchip.com/wwwproducts/Devices.aspx?product=dsPIC33FJ256GP710A) datasheet.

The most important settings are listed below.

### UART1

    U1MODEbits.UEN = 0;

    U1MODEbits.PDSEL = 0b00;

    U1MODEbits.STSEL = 0;

    U1BRG = 1;

    IPC7 = 0x4400;

    IFS0bits.U1TXIF = 0;                // Clear the Transmit Interrupt Flag

    IEC0bits.U1TXIE = 0;        // Enable Transmit Interrupts

    IFS0bits.U1RXIF = 0;                // Clear the Recieve Interrupt Flag

    IEC0bits.U1RXIE = 0;        // Enable Recieve Interrupts

    U1MODEbits.UARTEN = 1;        //Enable UART

    U1STAbits.UTXEN = 1;        //This must be set after UARTEN - This allows UART to control the Tx pin.

| Register | Value | Function |
| --- | --- | --- |
| U1MODEbits.UEN | 0 | Enables the Rx and Tx pins and disables the CTS and RTS pins. |
| U1MODEbits.PDSEL | 0 | Configures 8 bit messages with no parity bits. |
| U1MODEbits.STSEL | 0 | Configures 1 stop bit. |
| U1BRG | 1 | Sets the Baud Rate to 115200 Baud. |
| IPC7 | 17408 | Sets the priority level for UART interrupts. |
| IFS0bits.U1TXIF | 0 | Clears the transmit interrupt flag. |
| IEC0bits.U1TXIE | 0 | Enables the transmit interrupt event. |
| IFS0bits.U1RXIF | 0 | Clears the receive interrupt flag. |
| IEC0bits.U1TXIE | 0 | Enables the receive interrupt event. |
| U1MODEbits.UARTEN | 1 | Turns UART on. |
| U1STAbits.UTXEN | 1 | Allows transmission (Tx) to take place. |

### UART2

    U2MODEbits.UEN = 0;

    U2MODEbits.PDSEL = 0b00;

    U2MODEbits.STSEL = 0;

    U2BRG = 5;

    IPC7 = 0x4400;

    IFS1bits.U2TXIF = 0;                // Clear the Transmit Interrupt Flag

    IEC1bits.U2TXIE = 0;        // Enable Transmit Interrupts

    IFS1bits.U2RXIF = 0;                // Clear the Recieve Interrupt Flag

    IEC1bits.U2RXIE = 0;        // Enable Recieve Interrupts

    U2MODEbits.UARTEN = 1;        //Enable UART

    U2STAbits.UTXEN = 1;        //This must be set after UARTEN - This allows UART to control the Tx pin.

| Register | Value | Function |
| --- | --- | --- |
| U1MODEbits.UEN | 0 | Enables the Rx and Tx pins and disables the CTS and RTS pins. |
| U1MODEbits.PDSEL | 0 | Configures 8 bit messages with no parity bits. |
| U1MODEbits.STSEL | 0 | Configures 1 stop bit. |
| U1BRG | 5 | Sets the Baud Rate to 38400 Baud. |
| IPC7 | 17408 | Sets the priority level for UART interrupts. |
| IFS0bits.U1TXIF | 0 | Clears the transmit interrupt flag. |
| IEC0bits.U1TXIE | 0 | Enables the transmit interrupt event. |
| IFS0bits.U1RXIF | 0 | Clears the receive interrupt flag. |
| IEC0bits.U1TXIE | 0 | Enables the receive interrupt event. |
| U1MODEbits.UARTEN | 1 | Turns UART on. |
| U1STAbits.UTXEN | 1 | Allows transmission (Tx) to take place. |

Note that the only difference between the data link (UART2) and the debugging interface (UART1), is the rate at which information is sent (baud rate).