
# WARG Electrical Bootcamp

## Introduction
Welcome to the WARG's electrical bootcamp!

WARG members often find that joining this team requires more knowledge and has a larger learning curve than other student teams. Once members have acquired this knowledge they gain a lot of confidence and are able to make large contributions to the team. Therefore, this Bootcamp is designed as a first task to be completed to both help you through the learning curve, while giving you a project that is fully your own. The hope is that once you complete this Bootcamp you will feel confident and hopefully have acquired enough skills such that you are ready to take on tasks with our aircraft! Just a quick disclaimer, this Bootcamp will help accelerate and minimize the learning curve but it will not give you all knowledge. The remaining knowledge will be acquired through completing other tasks with the team.

## Bootcamp Objectives

In this bootcamp you will learn how to do the following in KiCad:

- Search digikey and select a component
- Manage bill of materials (BOM) and the WARG component library
- Make a symbol or find symbol libraries
- Edit a schematic
- Find a footprint and map it to the part
- Place and route a PCB
- Export gerbers

## Bootcamp Outline

This Bootcamp has two options, both of which require a Team Leads approval of completion in order to move onto working on other tasks. The estimated time of completion for this Bootcamp is 1 week.

## 1. ZeroPilot DC/DC Buck Regulator

### Background

In 2017 WARG started work on the new autopilot PCB, called ZeroPilot. With the new board comes a lot of tasks involving designing new circuits, converting circuits from Diptrace (our old software) to KiCad, and fixing bugs in various circuits. ZeroPilot is based off of STM microprocessors. It has a main processor called the autopilot controller which is a Cortex-M7 processor which handles most of our calculations. The board also has a secondary processor as a failsafe, which is called the safety controller. It allows us to confidently test new autopilot code since we can always switch into safety mode if there is an autopilot software error.

The ZeroPilot requires multiple voltages to power its various systems. There is the main battery which ranges from 7V-16V, and it has to be converted into 5V and 3.3V for different circuits.

### Task

Your task is to replace the 3.3V regulator to power the main processors. Currently we use a linear regulator (commonly called an LDO) to convert 5V to 3.3V, but this is a very inefficient process, since input current = output current. Replacing the LDO with a buck regulator will save power by more efficiently converting voltage to 3.3V. It’s helpful to know how buck regulators work but not required for the bootcamp

Replace the LDO (WARG #REGU-002) with a buck regulator that you can find on digikey. The requirements for the buck regulator are listed below.

### Requirements

Below is a list of requirements for the buck regulator circuit:

- Convert Battery voltage (7V-16V) to 3.3V
- Must be able to supply at least 1A of current
- Must be cost effective

NOTE: Make sure you connect the input of the added buck regulator to VBATT, not to the 5V output of the other regulator. Chaining buck regulators in series is very inefficient since efficiency decreases with lower input current.

### Steps

Here are the steps you are expected to take to complete this task.

1. Download and setup KiCad, Github, and the ZeroPilot repo. Fork and create a bootcamp branch of both github repos (ZeroPilot and WARG-KiCad).

2. Open the circuit editor and anaylze the current circuit. Identify the 3.3V regulator.

3. Find a replacement buck regulator that meets the requirements above. Highly recommend using digikey to find the part.

4. Add the part to the compoent_library.csv in the WARG-KiCad repo and add an appropriate part number, digikey number, and other information to the csv.

5. Either create or find a part symbol for the part you chose. Make sure the part is either in the default KiCad library or in WARG's symbol library (WARG-KiCad).

6. Remove the 3.3V LDO from the schematic and replace it with the symbol you created. Add the necessary components (hint: there will likely be an inductor needed). Run a design rule check to make sure you don't have any errors.

7. Make sure that the parameters of the parts are correct. Make sure every part has a WARG part number field.

8. If needed, create a footprint for the part. Most likely you will be able to find the footprint in KiCad's large library of footprints, but if you do have to create one make sure to save it to the WARG-KiCad repo. Map the footprint to the part you added in step 7.

9. Export the netlist and import it into the PCB editor. Feel free to change the board outline to fit the bigger part, as we don't expect you to re-route the whole board to fit the component.

10. Add tracks to connect the components together. Look at the datasheet for a recommended layout pattern. Ensure that your traces are thick enough to handle the current that will be flowing through it. Also, make sure to update the copper pours to fit the new component and board outline.

11. Export the gerbers into a zip file. These files are what are sent to the manufacturer to print the boards and stencils.

## Submitting the bootcamp

Create a pull request (PR) to WARG github. Make sure to title your bootcamp PR in the format, "Bootcamp: {name here}". There should be 2 PRs, one for each repo (ZeroPilot and WARG-KiCad). The ZeroPilot PR should also include a zip file containing the manufacturing files. A team lead will review the PR within a few days and reply with approval or with some comments. The team lead will close the PR and not merge it when it is complete.


### Resources

- [ZeroPilot repo](https://github.com/UWARG/ZeroPilot-HW)
- [KiCad library repo](https://github.com/UWARG/ZeroPilot-HW)
- [Digikey to find components](https://www.digikey.com/)
- [KiCad Software](http://kicad-pcb.org/)
- [KiCad Documentation](http://kicad-pcb.org/help/documentation/)
- [KiCad getting started guide](http://docs.kicad-pcb.org/stable/en/getting_started_in_kicad.pdf)
-  Bootcamp channel on  [slack](https://uwarg.slack.com) to ask questions to team leads

## 2. Previous Team Contribution

If you have been on the team and feel that you have made a contribution significant to be exempt from the option 1 you can contact a Team Lead to explain, and preferably show the project you have done. It will be up to the Team Lead’s discretion whether you qualify to be exempt from the Bootcamp. If the Team Lead feels that you should still complete option 1 it is because they think you can learn and gain skills from the completion of the Bootcamp.

#Completion of Bootcamp

Upon the approved completion of the Bootcamp by a Team Lead you are now eligible to work on other tasks with the team! If you have any feedback you would like to give to make this Bootcamp better please let a Team Lead know as we want this to be the best and most informative introduction to the team as possible.
