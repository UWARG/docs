# WARG Embedded Software Bootcamp

## Introduction
Welcome to the Embedded Software Bootcamp!

WARG members often find that joining this team requires more knowledge and has a larger learning curve than other student teams. Once members have acquired this knowledge they gain a lot of confidence and are able to make large contributions to the team. Therefore, this Bootcamp is designed as a first task to be completed to both help you through the learning curve, while giving you a project that is fully your own. The hope is that once you complete this Bootcamp you will feel confident and hopefully have acquired enough skills such that you are ready to take on tasks with our aircraft! Just a quick disclaimer, this Bootcamp will help accelerate and minimize the learning curve but it will not give you all knowledge. The remaining knowledge will be acquired through completing other tasks with the team.

## Bootcamp Objectives

- Learn C, and become familiar with some of the concepts in embedded programming
- Learn the underlying PicPilot(autopilot) code structure
- Learn how to track code revisions and perform code reviews via Git

## Bootcamp Outline
This Bootcamp has two options, both of which require a team lead's approval of completion in order to move onto working on other tasks. The estimated time of completion for this Bootcamp is 1 week. 

**Note**: *This will vary depending on your expirience level in programming. This is a rough estimate and don't get discouraged if it takes you longer!*

## 1. Add a drop and snap command to the picpilot:

### Background

The groundstation is the main line of communication between the aircraft and the ground control crew. Even though the aircraft is completely automonous, someone's gotta tell it what to do and where to go.

The aircraft's autopilot (called the PicPilot) is what manages the communication to the groundstation from the aircraft. The groundstation communicates with the plane by sending it integer-based commmands, through the xbee data link. The autopilot interprets the command, and can choose to perform a certain action in response.

The aircraft is also equiped with 2 modules for the purposes of the competition. A go pro camera attached the front of the aircarft for taking aerial photos, and a probe drop module that's capable of dropping its payload (toilet papers).

### Task

In order to make it easier to track the location of dropped probes, the ground station operators would like to send a command to the autopilot that will both:

1. Drop one of the three probes
2. Trigger a camera to take a shot

The groundstation will send a value along with the command that can either be 1, 2, or 3, indicating the probe to drop.

You are tasked with implementing this feature for the autopilot.

### Hints
- Because of resource constraints, you will not have the ability to actually test the code. Just make sure it compiles
- The code to drop a probe or trigger a camera **ALREADY** exists. You just have to write the code that actually executes them when a command is received from the groundstation
- You can name the command whatever you want, but it has to be sensible and match the already existing command naming convention
- Feel free to use the existing code as reference (code for dropping probe and triggering camera seperately already exist)
- The datalink documentation (the data the groundstation received) can be found [here](../picpilot/datalink.md)

### Git
The code for the picpilot is hosted on [Github](http://www.github.com/uwarg/PicPilot). You will have to fork the repository to make your changes. Also its recommened that you make your own branch. If you don't know what git or github is, or how to use it, please read this [git and github tutorial](../tutorials/git.md) that we wrote.

### Submission
To submit your work, create a pull request of your fork against the main picpilot repository. Name your pull request `Bootcamp by YOURNAME`. Tell the responsible team lead that you've completed the bootcamp and they will review your submission. You may be asked to revise some things.

### Additional Resources
- Your most valuable resource will be our [picpilot documentation](../picpilot/introduction.md)
- [Our Git Tutorial](../tutorials/git.md)
- [Datalink Documentation](../picpilot/datalink.md)
- [Sparkfun Embedded Electronics Tutorial](https://www.sparkfun.com/tutorials/category/1)

## 2. Previous Team Contribution

If you have worked on the PicPilot before, and feel that you've made a significant enough contribution to be exempt from option 1, you can contact the responsible team lead to explain, and preferably show what you've done. It will be up to the Team Lead’s discretion whether you qualify to be exempt from the Bootcamp. If the Team Lead feels that you should still complete option 1 it is because they think you can learn and gain skills from the completion of the Bootcamp.

## Completion of Bootcamp

Upon the approved completion of the Bootcamp by a Team Lead you are now eligible to work on other tasks related to the picpilot! If you have any feedback you would like to give to make this Bootcamp better please let a team lead know as we want this to be the best and most informative introduction to the team as possible.



