# Project Structure
This is the project folder structure. Not that there are
more folders than listed here, however these are the most relevant.

```text
/
    app/
        connections/
        lib/
        map/
        models/
        util/
        views/
        windows/
    assets/
        fonts/
        images/
        simulation/
        stl/
    build/
    config/
    logs/
    node_modules/
    styles/
        lib/
        views/
    views/
    index.html
    package.json
```
## app/
This is where all of the applications javascript files are located. It is the heart and soul of the groundstation.

### app/lib
All javascript libraries go here, including jquery, marionette, leaflet, etc..

### app/views
Application logic that's responsible for views. Every single view has its own file here.

## assets/
Any binary assets are stored here

## build/
The output of running `npm run build`, which creates an executable of the groundstation for every operating system.

## config/
The groundstation config files are stored here. These config files are then dynamically loaded, stored, and persisted across the application lifecycle.

## logs/
Groundstation log output. 

### logs/data_entries/
Output of the logs from the Data Entry Window

## node_modules/
All of the node modules installed by running `npm install` are stored in here. You don't really need to be concerned about this directory.

## styles/
CSS directory. This is where styles go. Everything in here is a .css file.

## views/
Templates for the views of the app. Everything in here is .html files.

## index.html
This is the starting point of the application. This file is loaded, which in turn loads the necessary javascript files required to make the application run.

## package.json
This file describes the application, including any dependencies that it requires. You can read more about this file [here](https://docs.npmjs.com/files/package.json).