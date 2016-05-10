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

You can get our [docker image here](http://ece.uwaterloo.ca/~warg/docs/docker.zip).

After completing the download and installing docker:

1. Unzip the package.
2. `docker import IMAGE.tar.gz` where IMAGE is the name of the docker image archive included in the zip archive
3. `docker images` should now list the new image
4. `docker run -i -t IMAGE_ID /bin/bash` with the appropriate image id as shown with `docker images`
