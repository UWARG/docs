# Using the Warg Computer environment

(Note that at the time of this being written the server is still being set up, hence a lot of this guide is both not yet applicable and may change)

## Setting up an SSH Client
Before you can connect to the WARG Server you will need an SSH client.

#### Windows:
There are several windows SSH clients, one of the more popular ones is PuTTY, which can be downloaded [here](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)

#### Mac OS X and Linux:
SSH should be installed by default and can be accessed by the following terminal command
```bash
ssh user@hostname
```

## Getting an account
You will not be able to connect to the WARG server without an account on the system. You will have to come in personally to the WARG bay to set this up.

## Connecting to the server
To connect to the WARG server you will need


**User:**     User-name you set up on the WARG server

**Host-name:** ip address of the WARG computer

**Port:** 22 (The default port, you probably won't need to set this)

#### Linux and OS X
On Linux or OS X this translates to the following command:
```bash
ssh user@ssh.uwarg.com
```
Optionally you can append -Y to the end of the command to enable graphics forwarding which will allow you to run graphical applications on the server (with the graphics being displayed on your computer)
```bash
ssh user@ssh.uwarg.com -Y
```
#### Windows
On Windows, see one of the following tutorials for more info on configuring PuTTY.

**An older tutorial that covers the basics**

<http://jfitz.com/tips/putty_config.html>

**More advanced PuTTY usage**

<http://support.suso.com/supki/SSH_Tutorial_for_Windows>

## Useful Commands in the Server Environment (feel free to expand this section)
(words in ALL_CAPS are arguments)

`ls` Shows a list of files and directories in your current directory or in a different one by specifying a different directory `ls DIRECTORY`

`cd DIRECTORY` opens the given directory

`nano` Simple command line text editor, can open files with `nano FILE_NAME`

(for a more complex editor that is better suited to programming, try `vim` or `emacs`. [here](http://www.tuxradar.com/content/emacs-tutorial-beginners) is an emacs tutorial and [here](http://vim.wikia.com/wiki/Tutorial) is a vim one. There is also this fun looking interactive vim tutorial [here](http://www.openvim.com/tutorial.html))

You can also learn more about any of the commands by appending ` --help` to a command or by entering `man COMMAND`

#### Useful Graphical Applications
`gedit` The Gnome text editor

`nautilus` A Linux file manager
