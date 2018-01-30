# WARG Embedded Software Bootcamp

## Introduction

Welcome to the Embedded Software Bootcamp!

WARG members often find that joining this team requires more knowledge and has a larger learning curve than other student teams. Once members have acquired this knowledge they gain a lot of confidence and are able to make large contributions to the team. Therefore, this Bootcamp is designed as a first task to be completed to both help you through the learning curve, while giving you a project that is fully your own. The hope is that once you complete this Bootcamp you will feel confident and hopefully have acquired enough skills such that you are ready to take on tasks with our aircraft! Just a quick disclaimer: this Bootcamp will help accelerate and minimize the learning curve, but it will not teach you everything there is to know about. The remaining knowledge will be acquired through completing other tasks with the team.

## Bootcamp Objectives

- Learn C, and become familiar with some of the concepts in embedded programming.
- Learn the underlying Hardware Abstraction Layer (HAL) libraries.
- Learn how to track code revisions and perform code reviews using GitHub.

## Bootcamp Outline

This Bootcamp has two options, both of which require a team lead's approval of completion in order to move onto working on other tasks. The estimated time of completion for this Bootcamp is 1 week.

**Note**: *This will vary depending on your expirience level in programming. This is a rough estimate and don't get discouraged if it takes you longer!*

## 1. Implement a Servo Tester

### Background

One of the biggest things that makes embedded programming interesting is working at the barrier between hardware and software. There are several low-level peripherals on-board the microcontrollers for interfacing with various devices. more here about ADC and TIM.

### Task

The groundstation operator has to be able to send a command to drop the probe, which involves actuating a servo using PWM. There are 3 probe drops, so you will have to write some code to manage the 3 separate servos.

The command will be a multi-part command. The first part will tell the autopilot which servo to operate (1,2, or 3), and the second part will tell the autopilot what position the servo should be in (opened or closed). All servos should be closed on startup.

You are tasked with implementing this feature for the Safety Controller.

### Hints

- Because of resource constraints, you will likely not have the ability to actually test the code. Just make sure it compiles.
- Use the PWM.c file to actuate the servo. Set reasonable constants for minimum and maximum PWM for the probe drop servo.
- Make sure you use a PWM channel that is currently not in use, and make sure to initialize it when the vehicle arms.
- You can name the command whatever you want, but it has to be sensible and match the already existing command naming convention
- Feel free to use the existing code as reference
- The datalink documentation (the data the groundstation received) can be found [here](../picpilot/datalink.md)

### Git

The code for the embedded bootcamp is hosted on [GitHub](https://www.github.com/UWARG/embedded-bootcamp). You will have to fork the repository to make your changes. If you don't know what git or github is, or how to use it, please read this [git and github tutorial](../tutorials/git.md) that we wrote.

### Submission

To submit your work, create a pull request of your fork against the `UWARG/embedded-bootcamp` repository. Name your pull request `Bootcamp by YOURNAME`. Tell the responsible team lead that you've completed the bootcamp and they will review your submission. You may be asked to revise some things.

**Note**: *If you would really like to test out the code, come to one of the work days and we'll show you how to program the board and actually test it out*

### Additional Resources

- Your most valuable resource will be our [ZeroPilot documentation](https://uwarg-docs.atlassian.net/wiki/spaces/ZP/overview)
- [Our Git Tutorial](../tutorials/git.md)
- [SparkFun Embedded Electronics Tutorial](https://www.sparkfun.com/tutorials/category/1)

## 2. Previous Experience

If you have worked on ZeroPilot before, or feel that you've obtained significant enough experience elsewhere to be exempt from option 1, you can contact the responsible team lead to explain, and preferably show what you've done. It will be up to the Team Lead’s discretion whether you qualify to be exempt from the Bootcamp. If the Team Lead feels that you should still complete option 1 it is because they think you can learn and gain skills from the completion of the Bootcamp.

## Completion of Bootcamp

Upon the approved completion of the Bootcamp by a Team Lead you are now eligible to work on other tasks related to the picpilot! If you have any feedback you would like to give to make this Bootcamp better please let a team lead know as we want this to be the best and most informative introduction to the team as possible.
