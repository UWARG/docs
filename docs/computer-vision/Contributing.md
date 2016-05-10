# Contributing

<a name='new_class'/>
## Adding a New Class
The project is divided into modules. Any class that is specific to a certain module should be stored in that module's directory. Classes that need to be accessed by multiple modules should go in Core.

The class should be declared in a header file of the same name as the class and placed in the appropriate module's include directory.

For example: Suppose we are creating class Foo in module Core

(See [Coding Conventions](https://github.com/UWARG/computer-vision/wiki/Coding-Conventions/_edit) for details on formatting)

File: modules/core/include/foo.h
```c++
/**
 * @file foo.h
 * @author WARG
 *
 * @section LICENSE
 *
 *  Copyright (c) 2015, Waterloo Aerial Robotics Group (WARG)
 *  All rights reserved.
 *
 *  This software is licensed under a modified version of the BSD 3 clause license
 *  that should have been included with this software in a file called COPYING.txt
 *  Otherwise it is available at:
 *  https://raw.githubusercontent.com/UWARG/computer-vision/master/COPYING.txt
 */

#ifndef FOO_H_INCLUDED
#define FOO_H_INCLUDED

#include "bar.h"

/**
 * @class Foo
 *
 * Foo description goes here
 *
 * @brief optional briefer description goes here
 */

class Foo : public Bar {
public:

    /**
     * Constructor for foo
     *
     * @param baz description of param baz immediately follows variable name
     */
    Foo(int baz);

    /**
     * Getter for baz
     *
     * @returns description of value returned
     */
    int get_baz();

private:
    /**
     * Description of baz
     */
     int baz;

};

#endif // FOO_H_INCLUDED
```

The corresponding source file which contains the definitions for the class Foo is placed in the src folder

File: modules/core/src/foo.cpp
```c++
/**
 * @file foo.cpp
 * @author WARG
 *
 * @section LICENSE
 *
 *  Copyright (c) 2015, Waterloo Aerial Robotics Group (WARG)
 *  All rights reserved.
 *
 *  This software is licensed under a modified version of the BSD 3 clause license
 *  that should have been included with this software in a file called COPYING.txt
 *  Otherwise it is available at:
 *  https://raw.githubusercontent.com/UWARG/computer-vision/master/COPYING.txt
 */

#include "bar.h"
#include "foo.h"

Foo::Foo(int baz) : baz(baz) { }

int Foo::get_baz() {
    // note that while documentation is not needed in source files
    //     comments are greatly appreciated
    return baz;
}

```

However we're not done yet. While header files when placed in the proper directory are immediately ready for use, source files must be added to the module's CMakeLists.txt file to be compiled into the module.

File: modules/core/CMakeLists.txt

```cmake
include_directories(include)
add_library(Core src/foo.cpp src/frame.cpp src/pixel_target.cpp src/target.cpp)
```
Your source file should be added to the arguments of the add_library function (ideally in retaining alphabetical order for readability)

#### But what if bar is part of an external library?
If you've forgotten what bar is already notice that it is an external class included in foo.h

The first question to answer is whether or not the use of bar can be avoided. In particular it may provide functionality that is already available in one of the project's current dependencies. Unless it provides substantially improved functionality over what is already available it probably shouldn't be added to the project.

If you determine that bar is a necessary dependency, then it needs to be added to CMakeLists.txt as well. As long as it is only being used in one module, it can be defined in that module's CMakeLists.txt rather than the global CMakeLists.txt.

For simplicity we will assume bar.h is part of the package Bar

File: modules/core/CMakeLists.txt
```cmake
include_directories(include)
find_package(Bar)
if(Bar_FOUND)
    include_directories(${Bar_INCLUDE_DIRS})
    add_library(Core ${Bar_LIBRARIES} src/foo.cpp src/frame.cpp src/pixel_target.cpp src/target.cpp)
endif()
```

You may want to research the library you've added online since many external libraries have additional configuration that needs to be added to the CMakeLists or unusual naming conventions for the package.

And we're done.
Now if you re-run cmake and re-build Foo should be built into the project.

<a name='contributing_to_master'/>
## Contributing to Master Repository
To get your code added to master you will, if you haven't done so already, need to fork the project. This can be done by going to the computer-vision page on GitHub and clicking the fork button in the top right.

You then need to make your local code point your fork rather than master.
```bash
git remote set-url origin $FORK_URL
```
Where $FORK_URL is the clone link for your fork

You will also want to set a new remote, called upstream, to reference the master repository so that you can pull changes.
```bash
git remote add upstream git@github.com:UWARG/computer-vision.git
```
or for https
```bash
git remote add upstream https://github.com/UWARG/computer-vision.git
```
this allows upstream changes to be fetched with `git fetch upstream` and merged into the current branch with `git merge upstream/branch_name`

Now, you can commit your code and push to the fork with
```bash
git add modules/core/src/foo.cpp modules/core/include/foo.h modules/core/CMakeLists.txt
git commit -m "Added class Foo"
git push origin
```

Note that it is recommended to add files individually rather than adding all at once with `git add -A .`

That way you ensure you only commit the files you intend to add.
You can also see a list of all unstaged changes (changes that have yet to be added) using `git diff`

Once the code is pushed, go to Github to your fork's page and create a pull request by either going into the pull request menu and choosing "New Pull Request", or, if you have pushed code recently, a pop-up will appear on the main page prompting you to create a pull request.

From the pull request page you can add comments to the pull request noting what you have changed, you can review the changed you have made to make sure you haven't included anything unnecessary and then you can submit the request.

Please note that pull requests will be rejected if they contain extraneous changes.
You can avoid a lot of issues by configuring git to ignore point out whitespace issues in diffs and to fix when patching with:
```bash
git config core.whitespace trailing-space,space-before-tab
git config apply.whitespace fix
```
