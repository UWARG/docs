# Getting Started with ZeroPilot Software

Welcome to the ZeroPilot Software Documentation! This page will give you all the tools and links you need to setup your ZeroPilot environment.

Note that these documents are written for a Windows system, but should be similar for other operating systems (and is probably less of a pain than Windows).

## Software Overview
There is a number of tools needed to setup your environment for ZeroPilot Software. Each one has a specific purpose in the build chain, and it is good to understand what each software does in case you run into issues.

- __Git__ is a version control software which manages changes and multiple versions of our source code.
- __A text editor__ is how you modify the code in the git repository. It's important to chose a good editor and configure it correctly, because you will use it a lot.
- __CMake__ is used to manage dependencies between files and choose which files get compiled and how they compile.
- __GNU ARM Embedded Toolchain__ provides the compiler and linker to convert the C/C++ code to machine code. Cmake uses this embedded toolchain to compile the project.
- __Ninja__ is called by the cmake, and is a faster alternative to `make`. If you already have make installed, that should work too.
- __ST-Link__ is the device that sends the machine code from the embedded toolchain to the ZeroPilot board.

## Step 1: Get the source code

The first step is to grab the source code from our [WARG Github](https://github.com/UWARG/ZeroPilot-SW). There are a couple different ways you can do this.

Before cloning the repo locally, fork the UWARG repo to your personal account. This will be used to make changes, and then your changes can be merged into the UWARG repo using a Pull Request (PR).

__Note for the bootcamp__: Your git commands will be slightly different from this, since you will be grabbing the embedded-bootcamp repo instead of ZeroPilot-SW. Make sure you get the right repo, or else your bootcamp will be very confusing!

### Using Git via Command Line (more powerful)
To get started with Git using the command line, download [Git](https://git-scm.com/downloads) for your specific operating system. Once you have installed git, you should be able to open up Git Bash. It is also recommended to add git to your path variables, either through the installation process or through [environment variables](https://www.java.com/en/download/help/path.xml).

Once you have git installed, open git bash. Navigate to the directory where you want your repo to be, then run the clone command. 

(Note that Documents/WARG is an example path, you can put it wherever you want.)

`cd Documents/WARG`

`git clone https://github.com/[Your Github username]/ZeroPilot-SW.git`

`cd ZeroPilot-SW`

If you get an error saying that the git command is not recognized, check that you installed git correctly. Make sure you are using git bash, or have added git to your path. If it is giving an error saying the repo does not exist, make sure you forked the repo and typed in your github username correctly.

### Using Git via GUI (easier to get started)
To use Github Desktop, use the installer [here](https://desktop.github.com/) for your required operating system. Once you have installed it, open the desktop gui and then go to `File -> Clone Repository`. Go to the URL tab and paste in the repo url: `https://github.com/[Your username]/ZeroPilot-SW.git`. Put in your desired local path and click `Clone`. The repo should now be on your local machine. If it is giving an error saying the repo does not exist, make sure you forked the repo and typed in your github username correctly.

## Step 2: Install CMake

CMake is a simple, cross-platform build system. It's used for building and uploading all the code for the ZeroPilot project.

To install, visit the [CMake website](https://cmake.org/download/) and download the installer for your operating system.
__When installing, make sure to select Add CMake to system PATH!__ It doesn't matter if you add it for current user or all users, that depends on if your system is a multi-user system.

To verify it properly installed, open up a new terminal and run `cmake --version`. If it doesn't recognize cmake as a command, you did something wrong. Check the program files exist, and verify the path variable has been updated.

## Step 3: Install GNU ARM Embedded

To install the GNU ARM Embedded toolchain, download the installer from the [download page](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads). Similar to the CMake install, __make sure you select "Add Path to Environment Variable" when installing__. This option will be on the last page of the installer.

To verify the install, open up a command line and type `arm-none-eabi-gcc --version`. If this is not a recognized command, check your path variables and restart your terminal.

## Step 4: Install Ninja
If you do not have make already on your system, you will need Ninja or make. Ninja is recommended because it is much faster than make.

To start, download the binary from the [Ninja github page](https://github.com/ninja-build/ninja/releases). Alternative install instructions using packet mananegers can be found on the [Ninja website](https://ninja-build.org/).

Once you have installed the binary, you will need to add it to the path variable so that your bash terminal can access the command. To do this, create a folder in the directory "C:\Ninja". Put the binary file in this folder. Unlike the other programs with installers, you will have to manually add it to the path.

Go to environment variables, then select the PATH variable and click edit. At the end of the variable, add a semicolon if there isn't one there already, then paste in your directory where the binary file is ("C:\Ninja", for example).

To verify the install, open a new terminal and run `ninja --version`. If this command fails, try restarting your terminal and verifying the path variable has been updated correctly.

## Step 5: Install a text editor

This step is pretty straight forward, and will vary from person to person. Some developers prefer simpler text editors such as Sublime Text, which others prefer more comprehensive IDEs such as Eclipse. This page will cover installing and configuring Visual Studio Code (AKA VSCode) to work with the ZeroPilot environment, but you can use whatever you are most comfortable with.

To install VSCode, download the installer from [their website](https://code.visualstudio.com/) and following the install instructions.

Once you have it installed, you will want to open the ZeroPilot-SW folder using `File -> Open Folder`. This will let you access all the files in the directory within VSCode.

There are a few important features that will make your life easier within VSCode. The first is the C/C++ library, which will give you autocomplete and basic syntax checking. Click on the extensions icon on the left toolbar, and search for "C/C++". Follow the installation instructions (it's pretty straightforward).

Clang-Format is a useful tool to help keep code clean. To install the extension, search for "Clang-Format". It should automatically detect the Clang-Format configuration file in the ZeroPilot-SW directory. To format a file, use the shortcut Shift+Alt+F.

The most useful tool within VSCode is the integrated terminal. Go to `View -> Integrated Terminal` if it isn't already open by default. It should open up a command line at the bottom of the window where you can type commands to manage git, build your project, and flash the ZeroPilot board. It is recommended you change the default terminal to bash so that you can easily run .bash scripts. To do this, open the command palette using Ctrl+Shift+P, then type "Select Default Shell".

## Step 6: ST-Link

ST-Link interfaces with the ZeroPilot board to send the machine code from your computer to the MCU's memory. To start, install the drivers from [the ST-Link Website](https://www.st.com/en/development-tools/st-link-v2.html#sw-tools-scroll) and install the [ST-Link Utility](https://www.st.com/content/st_com/en/products/development-tools/software-development-tools/stm32-software-development-tools/stm32-programmers/stsw-link004.html) and the [USB Driver (Windows specific)](https://www.st.com/content/st_com/en/products/development-tools/software-development-tools/stm32-software-development-tools/stm32-utilities/stsw-link009.html).

To verify the installs, plug in the ST-Link programmer and open the ST-Link Utility software. You should be able to connect to the board and view the program memory, assuming it all worked correctly. Make sure you externally power the board when you do this. If this doesn't work, look in the Device Manager and verify the driver has properly installed.

## Step 7: Program the board

Finally, the exciting part: putting your software into the hardware! 

### Programming the Autopilot Chip

First, plug in the programmer to your computer and the programming port on the ZeroPilot. Make sure you plug the programmer into the programming port for the Autopilot chip, since there are 2 programming ports on the board. Open a bash terminal (you can use VSCode's integrated terminal) and navigate to `ZeroPilot-SW/Autopilot`. Then, run the following command: `Tools\build.bash -f`. This will compile the project and flash it to the board. To get a full list of options, use `Tools\build.bash -h`. If you get errors about CMake cache, use the `-c` option to remove the cache and generate a new one.

### Programming the Safety Controller Chip
The Safety controller can currently be programmed by navigating to `ZeroPilot-SW/Safety` and running `make install`. However, this needs to be updated to work with Ninja and Cmake in the future.

## Step 8: Serial Terminal Debugging

A useful feature for the ZeroPilot is to be able to print statements to a terminal so you can debug what is going on inside the chip. To view the serial terminal, you need a serial terminal viewer. Common terminals are [Putty](https://www.putty.org/), [Coolterm](http://freeware.the-meiers.org/), and [RealTerm](https://sourceforge.net/projects/realterm/). The arduino IDE also has a built in serial terminal that can be used. For this tutorial,  [Tera Term](https://ttssh2.osdn.jp/index.html.en) will be used as an example.

To start, download Tera Term from their [website](https://ttssh2.osdn.jp/index.html.en). Plug in a USB to UART adapter, which should be terminated with a connector to plug into the 3 pin ZeroPilot debug port. Open the program and Select "Serial" (not TCP/IP). Select the port for the debugger. If you are unsure which serial port goes with the debugger, you can view all of your ports in the device manager.

Once you have the port open, you need to set the baudrate to 115200. This determines the speed of data, and is configured in the ZeroPilot software to be that speed. To select the baud rate, go to `Setup -> Serial Port` and change the baudrate to 115200.

Reset the board using the ST-Link utility, reprogramming the board, or power cycling the board. When it boots up, you should see some print statements show up on the terminal. If the symbols don't make any sense (i.e. not normal ASCII characters), check the baudrate and other settings, and that you have selected the correct serial port. The complete list of parameters is listed below.

- Baudrate: 115200
- Data: 8 bit
- Parity: None
- Stop: 1 bit
- Flow Control: None

Now you have all the tools you need to start programming! Our toolchain is contantly evolving, so if you have any suggestions on how to make the toolchain easier or more efficient, let us know!
