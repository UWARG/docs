# WARG Embedded Software Bootcamp

## Introduction

Welcome to the Embedded Software Bootcamp!

WARG members often find that joining this team requires more knowledge and has a larger learning curve than other student teams. Once members have acquired this knowledge they gain a lot of confidence and are able to make large contributions to the team. Therefore, this Bootcamp is designed as a first task to be completed to both help you through the learning curve, while giving you a project that is fully your own. The hope is that once you complete this Bootcamp you will feel confident and hopefully have acquired enough skills such that you are ready to take on tasks with our aircraft! Just a quick disclaimer: this Bootcamp will help accelerate and minimize the learning curve, but it will not teach you everything there is to know about. The remaining knowledge will be acquired through completing other tasks with the team.

## Bootcamp Objectives

- Learn C, and become familiar with some of the concepts in embedded programming.
- Learn the underlying Hardware Abstraction Layer (HAL) libraries.
- Learn how to track code revisions and perform code reviews using GitHub.

## Bootcamp Outline

This Bootcamp has two options, both of which require a team lead's approval of completion in order to move onto working on other tasks. The estimated time of completion for this Bootcamp is a 2-4 hours.

**Note**: *This will vary depending on your expirience level in programming. This is a rough estimate and don't get discouraged if it takes you longer!*

## 1. Implement a Servo Tester

### Background

One of the biggest things that makes embedded programming interesting is working at the barrier between hardware and software. There are several low-level peripherals on-board the microcontrollers for interfacing with various devices. The two low-level libraries you will be working with for this bootcamp are the analog to digital converters (ADC) and the timers (TIM).

Analog to digital converters (ADCs) take an analog value and convert it to a digital numbers. This peripheral is useful to interface with sensors, battery voltages, and potentiometers. For this bootcamp, you will be using the analog voltage of the potentiometer and converting it to a digital PWM signal to drive a servo.

Timer modules are a hardware feature of embedded microcontrollers. They allow the program to delay without blocking other code from running. Timers are useful to implement PWM, since PWM has very specific timing requirements for when the IO pin gets turned on and off.

### Task

Your task is to input a potentiometer value from 0 to 3.3V and convert it to a PWM signal to drive a servo. The potentiometer should be able to control the servo to its full throw. Servo testers are useful for determining servo range, prototype testing, and centering servos.

You are tasked with implementing this on the Safety Controller.

### Hints

- For PWM, you will need to use timer 16 to create a PWM signal. The signal should be at 50Hz, with an on-time ranging from 1ms - 2ms. To acheive this frequency, you will need to change the prescaler and period in tim.c. Note that the input clock frequency is 48 MHz. To change the duty cycle, you will need to set the compare register using the HAL library APIs.
- Look at HAL_TIM_, __HAL_TIM_ and HAL_ADC_ functions to access the timers and ADCs.
- At the top of the main.h file is the IO pin mappings. Use those defines when configuring your ADC and PWM ports. If you want to learn more about the pinout and IO configuration, you can download STM32Cube and open the bootcamp.ioc file.

### Git

The code for the embedded bootcamp is hosted on [GitHub](https://www.github.com/UWARG/embedded-bootcamp). You will have to fork the repository to make your changes. If you don't know what git or github is, or how to use it, please read this [git and github tutorial](../tutorials/git.md) that we wrote.

### Submission

Because of resource constraints, you will likely not have the ability to actually test the code. Just make sure it compiles.

To submit your work, create a pull request of your fork against the `UWARG/embedded-bootcamp` repository. Name your pull request `Bootcamp: YOURNAME`. Tell the responsible team lead that you've completed the bootcamp and they will review your submission. You may be asked to revise some things.

**Note**: *If you would like to test out the code, come to one of the work days and we'll show you how to program the board and actually test it out*

### Additional Resources

- Your most valuable resource will be our [ZeroPilot documentation](https://uwarg-docs.atlassian.net/wiki/spaces/ZP/overview)
- [Our Git Tutorial](../tutorials/git.md)
- [SparkFun Embedded Electronics Tutorial](https://www.sparkfun.com/tutorials/category/1)
- [Expanation of Output Compare/PWM](http://www.micromouseonline.com/2016/02/06/pwm-basics-on-the-stm32-general-purpose-timers/)
## 2. Previous Experience

If you feel that you've obtained significant enough experience elsewhere to be exempt from option 1, you can contact the responsible team lead to explain, and preferably show what you've done. It will be up to the Team Lead’s discretion whether you qualify to be exempt from the Bootcamp. If the Team Lead feels that you should still complete option 1 it is because they think you can learn and gain skills from the completion of the Bootcamp.

## Completion of Bootcamp

Upon the approved completion of the Bootcamp by a Team Lead you are now eligible to work on other tasks related to the ZeroPilot! If you have any feedback you would like to give to make this Bootcamp better please let a team lead know as we want this to be the best and most informative introduction to the team as possible.
