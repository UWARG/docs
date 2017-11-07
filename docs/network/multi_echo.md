
#Multi Echo Server

##Purpose

The Multi echo server is a python script that can run on any computer and is meant to be run on the raspberry pi along with the data relay. The server recieves information from a TCP connection and echos it out to all devices connected to the server via TCP connection. This allows communication between ground applications to talk to eachother.

Currently this script is not in use in our current setup. However, this script will likely be used for computer vision and tracking antenna communication between them and the ground station. Having this communication between ground applications enables the ground station operator to have more data about all the running scripts. For example, the multi-echo server could allow the ground station operator to send commands to the tracking antenna to initialize it, or to get data about the antenna's orientation and status. It can also be used to transmit computer vision data such as potential mission targets to the ground stations.

##Network

The network for the multi echo is setup the same as the data relay. The UDP broadcast is not yet implemented, so it always runs in legacy mode. The standard connection information is listed below:

`IP address: 192.168.1.103 (same as data relay)`

`Port: 4321`
