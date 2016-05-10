# Building the Project

### 1. Install Dependencies
Dependencies:
- OpenCV - 3.x (2.x.x is no longer supported)
- Boost - Tested with 1.56-60, should work with earlier versions
- ZBar
- DecklinkSDK (Optional, if available builds support for reading video from Decklink video capture cards)
- Exiv2

### 2. Clone the Repo
```bash
git clone https://github.com/UWARG/computer-vision.git
```

If you want to be able to submit changes you should fork the repository first and then clone your fork

```bash
git clone https://github.com/YOUR_NAME_HERE/computer-vision.git
```

### 3. Configure the project with CMake
It is recommended to build from a separate directory to keep the source tree clean
```bash
cd computer vision
mkdir build
cd build
cmake ..
```

### 4. Build
```bash
make
```

Building individual modules
Once the project is configured
```bash
make MODULE_NAME
```
For a list of build targets including Submodules
```bash
make help
```

Running tests
```bash
make test
```
