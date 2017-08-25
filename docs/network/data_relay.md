
#Data Relay

##Purpose

The data relay is a python script that can run on any computer and is primarly run on Raspberry Pi. It is the communication link with the vehicles and the ground stations. It communicates with XBees over a serial USB connection to receive and transmit data like commands from the ground station and telemetry coming from the UAV. The relay has a TCP connection over its network to communicate with various ground devices such as ground stations, tracking antennas, computer vision software, and WARG's android app. The benefit of this system is to allow multiple planes to communicate with multiple ground stations to give flexibility and redundancy.

Separating the ground station from the data relay makes our system safer by ensuring the plane will still fly if a ground station fails. If the ground station fails for any reason, another ground station can take its place and continue the UAV flight. To get write access, the ground stations sends 'commander' to the ground station over the TCP connection. This extra step ensure that other applications connected to the data relay will never accidentally send a command to the plane.

##Setup

The installation instructions can be found in the [github README.md](https://github.com/UWARG/data-relay-station). These setup instructions will assist you in setting up the Raspberry Pi to run the data relay

### 1. Setup the Hardware
Step 1... plug in the device (duh). Connect power to the Raspberry Pi. Either plug in an ethernet cable to the Pi's ethernet port or connect it to the Wifi network. Plug in the XBee via USB cable unless you are planning to just use the Xbee simulator.

### 2. Connecting the the Raspberry Pi
There are multiple ways to connect to the Raspberry Pi:

The easiest way to start the data relay script is to plug in a monitor and keyboard to the Pi. A terminal window will appear where you can run commands and start the script from.

An SSH connection is helpful and is what is usually used on the flight line to connect to the Raspberry Pi. To do this, type the following command:

`ssh root@192.168.1.103`
The IP address might be slightly different, and depending on the type of Raspberry Pi it might be `pi@[IP address]`.

If you do this method, type `screen` as the first command. This will make sure the script will still run even if the ssh connection breaks.

You can also setup the raspberry Pi to start the python script on startup so you don't need to connect to it at all. There are multiple ways to do this and currently have some issues, so this will be documented once a good method is figured out.

### 3. Running the script

Assuming the script isn't configured to run on startup, use the following command to start the data relay:

If you used ssh, first use the `screen` command.

Use the command `python data_relay.py`. If it started correctly, it should print out `writing headers`

To see what options are available, use `python data_relay.py -h` to view all the possible parameters

### 4. Stopping the script

Currently it is hard to stop the data relay due to the way the code was structured. The code is synchronous so CTRL+C doesn't work as usual. This bug is being investigated and will soon be fixed.

To stop the process, use the `pkill python`. This will kill all python processes. To view the running processes, use `ps`. This will let you see if the data relay is already running.

## Simulator

The data relay has the ability to run without an Xbee connected for debuggin purposes. It uses a csv file to print out data from a previous flight to simlate plane data. Use the --simfile parameter to use the simulator:

`python data_relay.py --simfile FILENAME.csv`

The data relay can also simulate the XBee link to the autopilot system using a USB-uart dongle. Connect a USB-uart dongle from the data relay computer to the XBee port on the autopilot board. Use the --uart command to enable this feature:
`python data_relay.py --uart`

## Network Connection

The data relay communicates to ground stations and other apps using a TCP connection. To enable ground stations to find the data relay computer without needing its IP address, the ground station broadcasts on a UDP connection to see if there are any data relays on the network. The data relay will respond to the UDP broadcast with a UDP packet to the IP address of the broadcast. The packet will include the IP address and port number of the data relay. The port number can also be seen in the data relay logs in the terminal. After this, the ground station will connect to the TCP connection. The TCP connection is more stable than a UDP connection and has a handshake protocol to make sure the ground station is connected to the data relay.


The data relay can use just the TCP mode if the UDP connection is unwanted. The legacy TCP information is below. Use --legacy_port to enable this:

`IP: 192.168.1.103
Port: 1234`
