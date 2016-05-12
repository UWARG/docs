# Computer-Vision Bootcamp

## Introduction

WARG members often find that joining this team requires more knowledge and has a larger learning curve than other student teams. Once members have acquired this knowledge they gain a lot of confidence and are able to make large contributions to the team. Therefore, this Bootcamp is designed as a first task to be completed to both help you through the learning curve and to familiarize you with our system and conventions. The hope is that once you complete this Bootcamp you will feel confident and hopefully have acquired enough skills such that you are ready to take on tasks with the main software project! Just a quick disclaimer, this Bootcamp will help accelerate and minimize the learning curve but it will not give you all knowledge. The remaining knowledge will be acquired through completing other tasks with the team.

## 1. Fork and Setup Local Project

Forks can be created using the fork button in the top right of the Github Interface (you need to be signed into a Github account).

Clone your fork with either:

```
git clone git@github.com:YOUR_USERNAME_HERE/computer-vision-bootcamp.git
```
if you want to use ssh
or
```
git clone https://github.com/YOUR_USERNAME_HERE/computer-vision-bootcamp.git
```
for https

Note that you will need to have CMake installed so that you can build your module once you've written it.

## 2. Choose a Task
Your task is to write a module that detects and identifies objects in an image.

For this you will need to install and familiarize yourself with OpenCV
You will also need Boost and CMake.
The OpenCV documentation contains a [set of tutorials](http://docs.opencv.org/3.1.0/d9/df8/tutorial_root.html#gsc.tab=0) which you may find useful.

#### A note on OpenCV if you are not using our prebuilt docker image
The most recent OpenCV major release, OpenCV 3.x, is not yet generally available in package repositories due to the update breaking a large number of packages downstream. This means that you will have to build and install OpenCV 3.x manually.
The computer vision project uses OpenCV 3.0 or newer, and it is recommended that you use it if possible, but if you run into difficulties getting it to work, feel free to use OpenCV 2.4.x for the bootcamp.

## 3. Implement

Specifically, your code must contain a class or function which, when given an image (in the form of a [cv::Mat](http://docs.opencv.org/3.1.0/d9/df8/tutorial_root.html#gsc.tab=0)) returns a set of data structures detailing the locations of distinct objects in the image as well as optionally any other information you wish to include (e.g. colour of the object).

The object detection can be simple (i.e, identifying objects of solid colour on a blank background), or more complicated if you wish.

**Be Wary of the fact that this will get much more difficult and time consuming when trying to do something more complex.
It is Strongly recommended to start with something very simple, submit it, and if you want to add complexity, do so while you are waiting for it to be reviewed.**

Your code must be implemented as a submodule and must:

- Follow our [style guide](computer-vision/Coding-Conventions)
- Build using CMake
- Be well documented using doxygen-formatted comments
- Be tested using our [testing framework](computer-vision/Writing-Tests). Note that in the core module of the bootcamp project there is a contour comparison function that can be used to compare the results of OpenCV edge detection algorithms to manually created vectors of points for the purposes of testing.

See [contributing](computer-vision/Contributing) for an example and more information.

You are also welcome to implement something different if you want, but please run your idea by a computer-vision lead first.

## 4. Submit
To submit your bootcamp project you should create a pull request. Note that this does not mean you are done, we will review your pull request and give you feedback and you will be expected to update it so that if meets all requirements.

Once your pull request has been merged you are ready to work on the Computer Vision project.
