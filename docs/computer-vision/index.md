#Welcome to the Computer Vision Docs!

# Contents
- [Building the project - Linux](Building-the-project-%5BLinux%5D)
- [Building the project - Windows](Building-the-project-%5BWindows%5D)
- [Coding Conventions](Coding-Conventions)
- [Using the WARG Server Environment](Using-the-WARG-server-environment)
- [Contributing](Contributing)
- [Writing Tests](Writing-Tests)

##Installation
The installation process depends on what system you have. WARG-CV runs on Linux. However, in case you don’t have Linux, we have premade a DockerFile, so that you can setup a virtual image on any system.
You may be able to get the project to compile on Mac OS X, but that is up to you to figure out.

If you don't have a Linux environment, don't worry! You can download a docker image. It is essentially a premade virtual machine.

* Go to [https://docs.docker.com/mac/](https://docs.docker.com/mac/) for Mac systems
* Go to [https://docs.docker.com/windows/](https://docs.docker.com/windows/) for Windows systems.

Once docker is installed you can get our docker image by running `docker pull uwarg/warg-cv`

After the image has been fetched:

1. `docker create -it --name cv uwarg/warg-cv` to create a new container using the warg-cv image called cv
2. `docker exec -it cv bash` to enter the container

When you want to use the container again in future, use docker exec (as in step 2 above). There is no need to create a new container unless the image has changed.
