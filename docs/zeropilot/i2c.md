# I2C

I2C stands for Inter-Integrated Circuit. It is pronounced "I-two-C" or "I-squared-C". It is similar to SPI, with the exception that it does not require a slave select line. All communication takes place on one data line, and one clock line. I2C is a _synchronous_ method of communication, indicating that a clock line is present. Once again, I2C is a protocol for chips to be able to communicate between one another through serial connections (data on a single wire). It cannot operate in full duplex mode, unlike SPI. This means that both chips take turns transmitting and receiving and cannot do so at the same time. The minimum hardware requirements include a clock line (SCL), a data line (SDA), and both lines connected to Vdd via a pull-up resistor. The connections should looks like this:

![Multiple Slave Setup](http://i.imgur.com/9Uqg27B.png)

This protocol is extremely simple from a hardware point of view. However, it is significantly slower than SPI, which is the main disadvantage. If you require high speed communication, I2C is not the best choice.

In a similar fashion to SPI, I2C also has Master and Slave devices. I2C protocol dictates that the master must always initialize communication.

There are two types of messages that a master device can send. It can be a read or a write message. Both messages are similar in structure; however, the read message requires the slave to respond, whereas the write message does not.

The write message is structured in the following order:

1. Start condition is specified on SDA and SCL (depends on the settings but typically involves the master pulling the data line low, shortly followed by the clock line being pulled low)
2. An 8-bit message is then sent, which contains a 7-bit (unique) identifying address, which determines what slave will engage in the data transfer. The 8th bit of the message is a read or write bit. When the bit is low (0), this indicates a write. When the bit is high (1), this indicates a read. In this scenario, we express the write bit (0).
3. The master waits for an acknowledgment from the slave. The acknowledgment is the slave pulling the data line low (0), while the master listens. If the acknowledgment is not received, there is likely a problem with the device or the connection.
4. At this point data is written 8 bits at a time, until the stop condition is expressed by the master. After each bit, the slave must acknowledge (ACK).
5. The stop condition is expressed. (SDA is pulled low, then the SCL is pulled high and it stops pulsing. The SDA is then also pulled high.)

The read message is very similar to the write message. The start condition and the first byte (address and write bit) must always be present. If a read condition is to exist, a repeated restart must be executed followed by the address of the slave with the read bit (1). The second byte/message may be a command message. Following the message, for the next 8 bytes, the master will expect a response to the command.

Assuming that the write message from above was never stopped, the read message would be as follows:

1. Execute a repeated restart.
2. Send the slave address with a read bit (1).
3. The slave will respond with 8 bits of data. These 8 bits of data depend on the message sent prior to the repeated restart.
4. The master will not acknowledge (Yes I know, laugh all you want)
5. The stop condition or a repeated restart is executed.

A visual depiction of a common I2C message is below:

![I2C Message](http://i.imgur.com/Kv0nULC.png)

On the PICpilot, the only I2C peripheral currently in use is the altimeter. The altimeter is connected to the path managing chip.

## In the code

The initialization of I2C on the dspic33fj256710a is very simple. There are only a few necessary choices to make:

    I2C2CONbits.A10M = 0;   //7 bit address mode

    I2C2CONbits.DISSLW = 1; //Slew Rate control disabled for 100KHz

    I2C2CONbits.SMEN = 0;   //Do NOT use SMBus voltage configuration

    ///I2C1BRG  - BAUD RATE GENERATOR

    ///MPL3115A2 requires Max 4MHz

    I2C2BRG = 19;           //~118KHz clock rate; FCY = 4MHz

    //Enable the I2C module

    I2C2CONbits.I2CEN = 1;

As you can see, there are only a few important distinctions to make. Firstly, you can have a 10 bit addressing mode or a 7 bit addressing mode. On the PICpilot we use the 7 bit mode.

Secondly, the clock rate is set via the I2C2BRG register. This could be upgraded to a faster communication speed in the future. The I2C module is then enabled.

At this point reading and writing can take place. The function to do so is called _sendMessage()_:

    char sendMessage(char devAddress, char address, char\* data, char length, char rw)

    {

        char rData = 0;

        I2CIdle();

        I2C2CONbits.SEN = 1;  //Send Start condition

        I2CIdle();

        //SET Slave Address & write (Address shifted one bit left and then the write(0) bit is added)

        I2C2TRN = devAddress << 1; //If reading, the read process is specified after the dummy bytes.

        if (rw == READ) //If in reading mode

        {

            rData = readMessage(devAddress, address);

        }

        else //Otherwise go into writing mode

        {

           writeMessage(address,data, length);

        }

        I2CIdle();

        I2C2CONbits.PEN = 1; //Send Stop condition

        I2CIdle();

        return rData;

    }

In the above code, the I2CIdle(); command is a while loop, which waits until the module is ready to transmit:

    while((I2C2CON & 0x1F ) || I2C2STATbits.TRSTAT == 1);

In the code, it is evident that the start condition is asserted (using control register 2), followed by loading the device address and the write bit into the _I2C2TRN_ transmit buffer. At this point the read or write functions are executed, depending on the request, before finally sending the stop condition.

The write command is extremely simple. It simply loops through the data, waiting for an acknowledgment after each one.

    void writeMessage(char address, char\* data, char length)

    {

        I2CIdle();

        I2C2TRN = address;  //Then after it is free, write the address.

        //Write each byte of data

        int i = 0;

        for(i = 0; i < length; i++)

        {

            I2CIdle();//Check until transmition was completed

            I2C2TRN = (char)data[i];

        }

    }

Note, that the register address is first specified, followed by the iteration of bits that is sent to the buffer.

On the contrary the read message is a bit more complicated:

    char readMessage(char devAddress, char address)

    {

        I2CIdle();

        I2C2TRN = address;  //Then after it is free, write the local address.

        I2CIdle(); //Wait until acknowledge is sent from the slave

        I2C2CONbits.RSEN = 1; //Resend the start condition

        I2CIdle(); //Wait until acknowledge is sent from the slave

        I2C2TRN = (devAddress << 1) + 1; //Shift and add the read bit(1) - Prep for restart

        I2CIdle(); //Wait until acknowledge is sent from the slave

        ///THE MESSAGE FROM THE SLAVE IS SENT HERE

        I2C2CONbits.RCEN = 1; //Enable receive mode

        I2CIdle(); //Wait until all 8 bits have been acquired

        while (I2C2STATbits.RBF != 1);

        char data = I2C2RCV;

        //Send back a NACK

        I2C2CONbits.ACKDT = 1; //Send NACK

        I2C2CONbits.ACKEN = 1; //Start the acknowledge sequence

        I2CIdle(); //Wait until done

        return data;

    }

The register address is sent, which is followed by a restart condition. Then the device address is sent, BUT this time, the read bit is sent. At this point, the master enables receiving and waits until all data is received. A NACK (Not Acknowledgement) is sent prior to returning the data.

The device and register addresses depend on the device and its functionality.
