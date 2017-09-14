# Introduction

ZeroPilot is a next-generation autopilot, currently being developed by the Waterloo Aerial Robotics Group. It has been designed to be able to fly both fixed-wing and multi-rotor aircraft, but is easily adapted to control almost any vehicle.

Most of ZeroPilot's processing is performed by a powerful ARM Coretex-M7 microcontroller, produced by [STMicroelectronics](http://www.st.com). The device used is the [STM32F765ZG](http://www.st.com/en/microcontrollers/stm32f765zg.html). There is a second MCU on board that manages the safety systems for the autopilot. This is the much smaller [STM32F030RC](http://www.st.com/en/microcontrollers/stm32f030rc.html). You can find more information about the hardware [here](zeropilot/hardware).

The code for ZeroPilot is publicly available on the [WARG GitHub](https://github.com/UWARG/ZeroPilot-SW).

## Setup

To get started developing for ZeroPilot, you will need a few things:

* [Git Client](https://github.com/)
* [GNU ARM Embedded Toolchain](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm)
* [GNU MCU Eclipse](https://gnu-mcu-eclipse.github.io/)
* If modifying peripheral settings, [STM32CubeMX](http://www.st.com/en/development-tools/stm32cubemx.html)

### Git

Git is a version control system we use to manage changes in our code. If you aren't already familiar with Git, there are many resources to help you learn:

- [GitHub Guides](https://guides.github.com/)
    - [Hello World](https://guides.github.com/activities/hello-world/)
    - [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Our own tutorial](tutorials/git)

### GNU ARM Embedded

[download](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads)

### GNU MCU Eclipse

[link](https://github.com/gnu-mcu-eclipse/org.eclipse.epp.packages/releases/)

## System Overview

The Autopilot 
