
# So you found a new part on DigiKey

Now what? The first thing to do is to add it to the csv file of all the components.

We will be adding an IMU in this guide to assist in the process. The part can be found [here](https://www.digikey.ca/product-detail/en/tdk-invensense/ICM-20602/1428-1060-1-ND/5872875).

## Adding to the Component Library

Open up component_library.csv, it should be located in (Your Local Directory)\ZeroPilot-HW\WARG-KiCAD. The instructions for adding a component to the spreadsheet
are provided in the README in the same folder. Note that the inventory field refers to the amount of parts that WARG currently has. Also note that the date format is
DD-MM-YYYY.

This is what the final product should look like.

![Component Library Example](resources/component_library_example.png)

## Making a Schematic

Next is to make an electronic schematic. If you don't already have the datasheet open, go ahead and do that.

Go ahead and open up ZeroPilot.pro in KiCad. If you need help on getting set-up with KiCad, check out the [Electrical Bootcamp](../bootcamp/electrical/#resources).
Open the Schematic Library Editor.

![Schematic Library Editor Button](resources/library_editor_button.png)

In the editor, click on the second button on the toolbar, the open book icon, to select the working library. Select WARG. To create a new component, click on the
op amp in the toolbar. In the component name field, put in the manufacturer part number. Next, click the capital T icon in the toolbar. Add the field "part_num" if it isn't already
listed. In the field value, put in the WARG number you assigned it in the spreadsheet. The footprint value will have to be filled in but that will be after we create
the footprint. In the datasheet, locate the pin out information.

![Pin Out Example](resources/pin_out_example.png)

This will be what you reference to make your schematic. Keep in mind the dimensions of the schematic
does not need to be an accurate representation of the real thing, that's what the footprint is for. Draw your component and add the pins, making sure that the circles
at the end of the pins are pointed away from the component. Open some of the other existing components for reference.

This is the finished schematic for the IMU. Note that the grey text saying WARG:ICM-20602 comes from the footprint field, which we will be populating after.

![Schematic Example](resources/schematic_example.png)

## Making a Footprint

Here comes the [fun](https://www.merriam-webster.com/dictionary/frustrating) part.

Back on the KiCad main screen, click on the fourth icon on the toolbar to open the PCB footprint editor. Just like in the schematic editor, you have to select the active
library. To do so, select the first button on the toolbar. Next is to create a new footprint. To do this, click on the image of the op amp on the toolbar (white rectangle
with green pins). Enter the manufacturer part number as the footprint name.

To draw the footprint, you must follow the pcb layout diagram that should be provided in the datasheet.

![PCB Layout Example](resources/pcb_layout_example.png)
![PCB Dimensions Example](resources/pcb_dimensions_example.png)

Note that all footprints are drawn looking top down. In the IMU example, take notice of the numbers on the sides of the square. Those refer to the pin numbers.
When placing the pads, make sure that they are oriented as per the top view diagram and not the bottom view. Again, it may be useful to look at some of the existing
footprints.

This is what the final product should look like. Remember, we're not done yet. We still need to fill out that footprint field in the schematic.

![Footprint Example](resources/footprint_example.png)

### Filling out the footprint field in the schematic

In the footprint editor, click on the op amp icon with the gear on the toolbar to open the Footprint Properties. The value you need is under "Footprint Name in".
It should look something like "WARG:ICM-20602".

Go back to the schematic of the component you made, open the properties again, and fill in the footprint value.

### Congratulations! You just made a new component!

Next, how to add the schematic to ZeroPilot.sch. (Work in progress)