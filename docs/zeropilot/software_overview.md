# Software Overview

## Introduction

The software for ZeroPilot is very complex and has a lot of different moving parts. This documentation is meant as a reference for future ZeroPilot development, and might not exactly reflect the current code base.

ZeroPilot software is broken up into 2 sections. The Autopilot controller runs on STM32F7 MCU and controls most of the autopilot algorithms. The safety controller is a STM32F0 MCU which controls PWM and PPM. The two processors are separated to create a failsafe autopilot design. If the more complex autopilot code fails and crashes, the safety controller will detect the failure and automatically switch over to manual control. This should never happen, but in early testing stages it will be very useful to safety develop new features.

## Safety Controller

The safety controller is designed to be the most reliable code in the system, since if it fails, there will be no control and the vehicle will crash. To do this, the code is kept as minimal as possible while still implementing the safety features that are needed.

The safety controller inputs PPM from the reciever. There is also an option to input UART instead of PPM, if desired. The safety controller converts the PPM into a value from -3200 to 3200. That value can either be output directly to the PWM outputs (aka pass-through or manual mode), or can be fed into the autopilot controller (aka autonomous mode). The safety controller determines which mode to use based off of SAFETY_CHANNEL and the autopilot fault flag.

 Manual Control = (SAFETY_CHANNEL < -1500) OR (SAFETY_CHANNEL > 1000) OR (AUTOPILOT_FAULT)

The safety controller talks to the Autopilot controller using [SPI](Protocols/SPI.md). The safety controller sends the input PPM signal and status (manual or autonomous control) to the autopilot controller. The autopilot controller sends the output PWM signal and status (AUTOPILOT_FAULT and information for buzzer control) to the safety controller. The autopilot controller is master and sends a packet every 5ms. The safety controller counts the time in between packets and uses it as a heartbeat to determine if the autopilot controller is still running. If there is more than 200ms between packets, the safety controller assumes the autopilot controller has crashed and it gives manual control. If regular packets resume, the safety controller will continue manual control until the safety switch is toggled.

For more information on the safety controller, look at [how PWM works on the safety controller](/Protocols/PWM.md).

## Autopilot Controller

The autopilot controller is where most of the code is written. The autopilot controller handles 4 main jobs: waypoint pathing algorithms, stabilization (PIDs), sensor drivers, and telemetry communications. Each part is critical to a successful autonomous flight and must work together to deliver quick response from the input sensor drivers and telemetry to the output motors and servos.

The sensor drivers are the root of the autopilot system, since it is what lets the software know the attitude (roll/pitch/yaw) and location of the UAV. The sensors get fed into the Attitude object, which merges the raw sensor data into attitude information. It keeps track of any sensor failures and will merge sensor data together depending on sensor accuracy. For example, it will merge the barometric pressure altitude with the GPS and ultrasonic altitude to get stable and reliable data.

The stabilization algorithms uses the attitude data to stabilize the plane so it flies in the desired orientation. The stabilization algorithm takes in set points and outputs the PWM values needed to move towards those set points. It determines the output PWM values using [PID controllers](/PID.md). The setpoints can originate from the RC controller, the ground station, or the pathing algorithsm.. The stabilizer controls whether to use angle or rate control, based on the current system parameters.

The path manager inputs waypoints from the waypoint manager and outputs the desired heading and altitude for the vehicle. It updates the desired heading and altitude based on a P controller, which is a simpler version of the PID controller. As the vehicle approaches a turn, the path manager determines what curve to follow around the turn. Future goals for the path manager include autonomous take off and landing.

The telemetry system talks to the ground station to send and recieve data and commands. The telemetry system handles logging data, retrieving set points from the ground station and EEPROM, recieving commands such as arming, and processes waypoint data to be forwarded to the waypoint manager. The telemetry system uses mavlink protocol and communicates using an XBee over 915MHz to the ground station.

