#PWM and IO

PWM stands for Pulse Width Modulation. This means that digital or analog data is encoded through the use of square wave electrical signals, where the width of the square wave determines the value of the data. For instance, in UAVs, a larger square wave will add more throttle, whereas a smaller square wave will add less throttle. The same concepts apply to the ailerons, flaps, rudder, and elevators. A PWM signal can be plotted on a voltage - time plot to attain the following graph:

![PWM Sample](http://i.imgur.com/VlwY9Dx.jpg)

For this application, the most common pulse width for a square wave is 1.5 milliseconds. This value represents the zero position for all control surfaces. The maximum value for the square wave is 2 milliseconds. The minimum value is 1 millisecond. Likewise, when using throttle, a 1 millisecond square wave is 0% throttle, and a 2 millisecond square wave is 100% throttle. For instance, here is a diagram of 3 consecutive pulses, which command the plane to throttle to 100%, followed by 50%, followed by 0%:

![PWM in aircraft](http://i.imgur.com/7LFQ9Af.jpg)

The duty cycle or period specifies the frequency of the pulses. For servo motors, the period is 22.5 milliseconds. This means that one square wave should be detected every 22.5 milliseconds. If the period is unreasonably short, or unreasonably long, the servo motor may seize, until the data is corrected. The allowable error range varies between speed controllers, but it is generally very forgiving (from experience). In general, make sure the period is more than 12 milliseconds and less than 25 milliseconds.

These PWM signals can be used to convey information as input and output to a digital signal controller (DSC). The input is often referred to as "Input Capture". The output is often referred to as "Output Capture". Each wire connection can handle one channel. The current implementation of the PICpilot supports 8 input channels and 8 output channels. Out of the 8 input channels, 6 are currently used. Out of the 8 output channels, 6 are currently used. The roll, pitch, throttle, yaw and the autopilot on/off channels are the most critical in order for the UAV to work. This encompasses 9 channels in total (5 inputs, 4 outputs).

## Hardware

The dspic33fj256gp710a chip supports 16 channels (8 inputs and 8 outputs):

| Channel | Function | Pin/Port | Input/Output |
| --- | --- | --- | --- |
| 1 | Roll | 68/RD8 | Input |
| 2 | Pitch | 69/RD9 | Input |
| 3 | Throttle | 70/RD10 | Input |
| 4 | Yaw | 71/RD11 | Input |
| 5 | UHF Switch | 79/RD12 | Input |
| 6 | N/A | 80/RD13 | Input |
| 7 | N/A | 47/RD14 | Input |
| 8 | Autopilot On/Off | 48/RD15 | Input |
| 1 | Roll | 72/RD0 | Output |
| 2 | Pitch | 76/RD1 | Output |
| 3 | Throttle | 77/RD2 | Output |
| 4 | Yaw | 78/RD3 | Output |
| 5 | Camera Shutter | 81/RD4 | Output |
| 6 | Camera Gimbal | 82/RD5 | Output |
| 7 | N/A | 83/RD6 | Output |
| 8 | N/A | 84/RD7 | Output |

Each pin has corresponding registers to determine the configuration for each pin. The input capture settings that can be configured include the clock source (for timing and comparison), edge detection (trigger on rising, falling or both), and interrupts (every event, or every 2, 3, or 4). For output compare, the settings that can be configured include the clock source, pulse type (single, continuous, high/low initialization).

For detailed hardware specifications see the Microchip website: [dspic33fj256gp710A](http://www.microchip.com/wwwproducts/Devices.aspx?product=dsPIC33FJ256GP710A)

**In the Code**

Three files are in charge of controlling all the PWM signals. InputCapture.c, which contains all the functions used to manage input capture, OutputCompare.C, which contains all the functions used to manage output compare. Finally, PWM.c links these files together.

PWM.c combines both input capture and output compare into a simple interface that is easy to manage and consistent to use. It then applies scaling factors to the arbitrary timer units, which map the Input Capture and Output Capture values to variables that range between -100 and 100.

PWM.c contains 7 functions:

| **Function Name** | **Input Variables** | **Output** | **Notes** |
| --- | --- | --- | --- |
| initPWM | inputChannels, outputChannels | None. | This function MUST be called before any other functions used below.The variables must be in binary representation. For example, channel 1, 2, and 5 enabled is: 0b00010011 |
| PWMInputCalibration | channel, signalScaleFactor, signalOffset | None. | Calibrates the input from the controller so that the range outputs from -100 to 100. |
| PWMOutputCalibration | channel, signalScaleFactor, signalOffset | None. | Calibrates the output from the controller so that the range outputs from -100 to 100. |
| getPWM | channel | Integer | Returns the value (scaled) from the input of a certain channel. |
| getPWMArray | None. | None. | Returns the value (scaled) from the input of all channels. |
| setPWM | channel, pwm | None. | Sets a certain output compare channel to a certain value according to the pwm range between -100 and 100. |
| setPWMArray | ocArray | None. | Sets all output compare channels to values stored in an array. These should be between -100 and 100. |

For future use, the calibration functions should be coordinated with the ground station, in order to be able to calibrate the controller/plane sensitivities and limits "on the go".

It should be noted that the initialization procedure is necessary for the PWM IO functions to work.

For input capture, the settings that are initialized include (for channel 1):

       IC1CONbits.ICM = 0b00; // Disable Input Capture 1 module

       IC1CONbits.ICTMR = 1; // Select Timer2 as the IC1 Time base

       IC1CONbits.ICI = 0b11; // Interrupt on every capture event

       IC1CONbits.ICM = 0b001; // Generate capture event on every Rising and Falling edge

       // Enable Capture Interrupt And Timer2

       IPC0bits.IC1IP = 7; // Setup IC1 interrupt priority level - Highest

       IFS0bits.IC1IF = 0; // Clear IC1 Interrupt Status Flag

       IEC0bits.IC1IE = 1; // Enable IC1 interrupt

The initialization procedure selects a timer, setting for frequency of capture events, interrupt frequency, as well as other interrupt settings.

For output capture, the settings that are initialized include (for channel 1):

    // Initialize Output Compare Module

    OC1CONbits.OCM = 0b000; // Disable Output Compare Module

    OC1R = MIDDLE\_PWM; // Write the duty cycle for the first PWM pulse = 1.5ms/4688

    OC1RS = MIDDLE\_PWM; // Write the duty cycle for the second PWM pulse] = 1.5ms/4688

    OC1CONbits.OCTSEL = 0; // Select Timer 2 as output compare time base

    OC1CONbits.OCM = 0b110; // Select the Output Compare mode (without fault protection)

The initialization procedure selects a timer, initial duty cycle (this changes after the first program cycle), and output compare mode.

Likewise, since both IC and OC use _timer2_. An initialization of this component is also required:

    T2CONbits.TON = 0; // Disable Timer

    T2CONbits.TCS = 0; // Select internal instruction cycle clock

    T2CONbits.TGATE = 0; // Disable Gated Timer mode

    T2CONbits.TCKPS = 0b01; // Select 1:8 Prescaler

    TMR2 = 0x00; // Clear timer register

    setPeriod(20);

    IPC1bits.T2IP = 0x01; // Set Timer 2 Interrupt Priority Level - Lowest

    IFS0bits.T2IF = 0; // Clear Timer 2 Interrupt Flag

    IEC0bits.T2IE = 1; // Enable Timer 2 interrupt

    T2CONbits.TON = 1; // Start Timer

The initialization procedure selects the clock source (internal instruction clock), selects a scaling amount (determined via oscilloscope measurements), sets the period of the pulse cycle (20ms), and enables the Timer2  interrupt (this is not used for PWM signals, it is used to keep track of the runtime of the chip).