# Computer-Vision Bootcamp

## Introduction

WARG members often find that joining this team requires more knowledge and has a larger learning curve than other student teams. Once members have acquired this knowledge they gain a lot of confidence and are able to make large contributions to the team. Therefore, this Bootcamp is designed as a first task to be completed to both help you through the learning curve and to familiarize you with our system and conventions. The hope is that once you complete this Bootcamp you will feel confident and hopefully have acquired enough skills such that you are ready to take on tasks with the main software project! Just a quick disclaimer, this Bootcamp will help accelerate and minimize the learning curve but it will not give you all knowledge. The remaining knowledge will be acquired through completing other tasks with the team.

## Objectives

- Learn the basics of GitHub
- Gain familiarity with Python and TensorFlow
- Understand how neural networks work and relevant design decisions

## Outline

In this bootcamp you will create an image classifier using Python and TensorFlow. The classifier will be trained on the [CIFAR-10 Dataset](https://www.cs.toronto.edu/~kriz/cifar.html).

## 1. Fork and Setup Local Project

Forks can be created using the fork button in the top right of the GitHub Interface (you need to be signed into a GitHub account).

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

Next you will need to install Python and pip if they are not already installed. To check if they are installed, open a terminal and run:
```
python3 --version
```
and
```
pip3 --version
```

If they are not installed, they can be found [here](https://www.python.org/downloads/) and [here](https://pip.pypa.io/en/stable/installing/).

After this you will need to install TensorFlow, instructions for which can be found [here](https://www.tensorflow.org/install/pip).

Lastly, you will want to install the SciPy package:
```
python -m pip install --user numpy scipy matplotlib ipython jupyter pandas sympy nose
```

## 2. Requirements

Any network topology may be used for this bootcamp. In addition to the Python script, include a plot of both training and validation losses over epochs (matplotlib.pyplot can be used for this).
The code should:

- Follow our [style guide](/computer-vision/Coding-Conventions.md)
- Have comments for each process explaining what is occurring at that step and why
- Actually train

## 3. Submit

To submit your bootcamp project you should create a pull request. Note that this does not mean you are done, we will review your pull request and give you feedback and you will be expected to update it so that if meets all requirements.

Once your pull request has been merged you are ready to work on the Computer Vision project.

## Resources

#### Python

[PythonProgramming.net](https://pythonprogramming.net/) has tutorials for both python and a variety of machine learning processes. The official documentation for both [Python](https://docs.python.org/3/) and [Matplotlib](https://matplotlib.org/tutorials/index.html) may also be useful.

#### TensorFlow and Neural Networks

The [TensorFlow](https://www.tensorflow.org/tutorials) website has documentation for all of its functions as well as a number of tutorials. Two useful books are [Deep Learning with Python](https://www.manning.com/books/deep-learning-with-python) and [Deep Learning](https://www.deeplearningbook.org/). Deep Learning with Python also has example code found [here](https://github.com/fchollet/deep-learning-with-python-notebooks). 



