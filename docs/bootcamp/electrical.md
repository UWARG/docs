
# WARG Electrical Bootcamp

## Introduction

WARG members often find that joining this team requires more knowledge and has a larger learning curve than other student teams. Once members have acquired this knowledge they gain a lot of confidence and are able to make large contributions to the team. Therefore, this Bootcamp is designed as a first task to be completed to both help you through the learning curve, while giving you a project that is fully your own. The hope is that once you complete this Bootcamp you will feel confident and hopefully have acquired enough skills such that you are ready to take on tasks with our aircraft! Just a quick disclaimer, this Bootcamp will help accelerate and minimize the learning curve but it will not give you all knowledge. The remaining knowledge will be acquired through completing other tasks with the team.

## Bootcamp Objectives

- Learn how to make a basic schematic
- Learn how to make a PCB board.
- Learn how to create a custom pattern
- Learn where to find documentation and how to understand it.

## Bootcamp Outline
This Bootcamp has two options, both of which require a Team Leads approval of completion in order to move onto working on other tasks. The estimated time of completion for this Bootcamp is 1 week.

## 1. Tracking Antenna Power Circuit

### Background

The tracking antenna helps to ensure our ground station keeps in contact with the plane at all times by pointing antennas at the plane, using data from the ground station. To do this, the tracking antenna has 2 servos that point the antennas, an arduino to do computations and basic control, and multiple sensors to help in calibration. 
The power circuit allows the antenna to be powered by either a battery or from a power cable, and simplifies the wiring to the servos and arduino.

### Task

Your task is to design a PCB using DipTrace which will be able to take power from a battery or power cable.  If both battery and power cable are connected, it should default towards the power cable. It will have pin connections for the 2 servos (pan and tilt) and the arduino (5V, GND, and a PWM signal for each servo). To save money, design the PCB as small as possible. There will also be multiple LED indicators to show the circuit is working.

The example schematic is at the bottom of this page. You can copy it directly, make some improvements, or design your own.  

Note: We are not actually printing this circuit due to the cost and time constraints.

###Inputs, Outputs, and LEDs
- 3-wire PWM cable for pan servo
- 3-wire PWM cable for tilt servo
- 4 female pins for arduino wires (5V, GND, Pan, and Tilt)
- JST battery connector (input power)
- DC 5.5mm barrel jack (9-12V input power)
- LED indicator to indicate the board is powered

### Project Checklist
- Schematic, PCB, and parts list
- Inputs and outputs listed above
- Circuit elements (MOSFET and Voltage regulator) that regulate power and can switch between the two sources
- If both power elements are plugged in, it defaults to the power cable
- Labels to define inputs, outputs, and component placements
- Traces are adequately sized and well routed

### Using DipTrace
Go to this link and download the freeware:
[http://diptrace.com/download-diptrace/](http://diptrace.com/download-diptrace/)

If you need help with using the CAD software, here are some resources:

Diptrace Tutorial: [http://diptrace.com/support/tutorials/](http://diptrace.com/support/tutorials/)

Schematics: [https://www.youtube.com/watch?v=uCPUqXFvUZU](https://www.youtube.com/watch?v=uCPUqXFvUZU)

PCB Layout: [https://www.youtube.com/watch?v=kw51rlCTYBY](https://www.youtube.com/watch?v=kw51rlCTYBY)

Datasheets: [https://www.octopart.com](https://www.octopart.com)

## 2. Previous Team Contribution

If you have been on the team and feel that you have made a contribution significant to be exempt from the option 1 you can contact a Team Lead to explain, and preferably show the project you have done. It will be up to the Team Lead’s discretion whether you qualify to be exempt from the Bootcamp. If the Team Lead feels that you should still complete option 1 it is because they think you can learn and gain skills from the completion of the Bootcamp.

## Completion of Bootcamp

Show a team lead the schematic, PCB, and parts list files. Upon the approved completion of the Bootcamp by a Team Lead you are now eligible to work on other tasks with the team! If you have any feedback you would like to give to make this Bootcamp better please let a Team Lead know as we want this to be the best and most informative introduction to the team as possible.

![Example Circuit](resources\tracking_antenna_circuit.PNG)