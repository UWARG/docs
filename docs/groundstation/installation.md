# Installation

1. The first step is cloning the repository. Open up the terminal and run: 
`git clone https://github.com/UWARG/WARG-Ground-Station`

2. Then you need to install Node.js. You can download and install it [here](https://nodejs.org/en/). Download Node version 5 and above preferably. After you've installed node you should have the `node` command available for you to use in your terminal. Run `node help` to verify that you've successfuly installed node and make sure you're running the right version.

3. Now that you've installed node, navigate to the groundstation project directory (the folder that was created when you did the git clone). Then run `npm install` to install all of the apps dependencies. If you get weird errors, try running your terminal in administrative mode (or sudo for linux users).

4. Now you're ready to start the app up. Run `npm start` to start the application. You should see a window appear of the groundsation.

5. Now you need to download the offline satelite files that the application uses for it's map. [Download them here.](https://drive.google.com/file/d/0BwjduHozuvOiaUFzV2dZdncyZnc/view). Extract the zip into the `assets` folder of the project directory (so you should have a folder called `sat_tiles` in the assets folder). 

Congratulations! You should now have the groundstation installed on your computer ready for you to develop on! 