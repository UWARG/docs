#Analog to Digital Converter

The Analog to Digital Converter (ADC) on the PICpilot is used for a single purpose, which to monitor and report the battery life remaining for the vehicle and/or the autopilot. The path managing chip is responsible for measuring the battery voltage. Based on the reference voltage, a percentage is determined which indicates the voltage measured in relationship to the reference voltage. This data is transmitted to the attitude manager chip and then it is transmitted wirelessly along with the telemetry data.

The functionality of the ADC is fairly straightforward. The ADC module switches between two states. One of which is the sampling period, whereas the other is the conversion period. During the conversion period, no sampling is performed. Instead, the previously captured data is converted into a 12 bit number. Therefore, in order to attain the voltage percent, you simply divide the data by 4096, the largest possible 12 bit number.

In the PICpilot, the ADC module is triggered through interrupts (although it can also be manually polled).

## In the code

All the code for the voltage sensor is available in the _voltageSensor.c_ and _.h_ files. The code which controls the ADC module is extremely straight forward. The process mostly involves initializations. Most of the "magic" is handled automatically by the module, therefore minimal logical coding is required. A few of the important lines have been included below:

    AD1CON1bits.FORM = 0;                // Data Output Format: Unsigned Int

    AD1CON1bits.SSRC = 7;                // Internal Counter (SAMC) ends sampling and starts conversion

    AD1CON1bits.AD12B = 1;                // 12-bit single channel operation

    AD1CON1bits.SAMP = 1;

    AD1CON2bits.SMPI=0;                        // Interrupt address every sample/conversion

    AD1CON2bits.CHPS = 0;                //We are using channel 0

    AD1CON2bits.VCFG = 0;                 //Voltage Reference is 3.3V and Ground Reference is Ground

    AD1CON3bits.SAMC=0;                         // Auto Sample Time = 0\*Tad

    AD1CON3bits.ADCS=6;                        // ADC Conversion Clock Tad=Tcy\*(ADCS+1)= (1/40M)\*7 = 175nS



    AD1CHS0bits.CH0SA = 0xC;                 //Channel 0 positive input on AN12 (Sample A)

    AD1CHS0bits.CH0SB = 0xC;                 //Channel 0 positive input on AN12 (Sample B)

    IFS0bits.AD1IF = 0;                        // Clear the A/D interrupt flag bit

    IEC0bits.AD1IE = 1;                        // Enable A/D interrupt

    AD1CON1bits.ADON = 1;                // Turn on the A/D converter

After each interrupt, the battery voltage is updated into the _currentSignal_ variable. When the battery voltage is requested, this integer is multiplied by 100 and divided by 4096 to get a percentage (4096 is 12 bits of data).