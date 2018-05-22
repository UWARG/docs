# Building the project

To build the project on Windows, you will need to setup a Docker. It is possible to setup the libraries in Windows natively, but it is much easier to use Docker since it has all of the libraries preinstalled.

## Installing Docker
If you don't have a Linux environment, don't worry! You can download a docker image. It is essentially a premade virtual machine.

* Go to [https://docs.docker.com/mac/](https://docs.docker.com/mac/) for Mac systems
* Go to [https://docs.docker.com/windows/](https://docs.docker.com/windows/) for Windows systems.

## Setting up the image

Once docker is installed you can get our docker image by running `docker pull uwarg/warg-cv`

After the image has been fetched:

1. `docker create -it --name cv uwarg/warg-cv` to create a new container using the warg-cv image called cv
2. `docker start cv` to start the image
3. `docker exec -it cv bash` to enter the container
4. `git clone https://github.com/UWARG/computer-vision` to clone the repo into the image.

When you want to use the container again in future, use docker exec (as in step 3 above). There is no need to create a new container unless the image has changed.

## Compiling and Running

Once the docker is setup, you can follow the same instructions that are in [building the project in linux](Building-the-project-[Linux].md).
