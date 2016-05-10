## Coding Conventions

## Code
#### Variable Names:
varName

#### Constant Names:
CONST_NAME

#### Function Names:
function_name

#### Class Names:
ClassName

#### Indentation:
4 spaces per level of indentation

#### brackets:
```c++
void foo_bar(int i) {
    int varName = (i + 2)/2;
}
```

## File Structure
#### File Names:
file_name.ext

#### Directory Structure:
```
|-- computer-vision
    |-- modules
        |-- core
            |-- include
                |-- header.h
            |-- src
                |-- source.cpp
            |-- CMakeLists.txt
    |-- CMakeLists.txt
    |-- main.cpp
         ...
```

#### Header File Formatting
```c++
/**
 * @file foo.h
 * @author WARG
 *
 * @section LICENSE
 *
 * Copyright (c) 2015-2016, Waterloo Aerial Robotics Group (WARG)
 * All rights reserved.
 *
 * This software is licensed under a modified version of the BSD 3 clause license
 * that should have been included with this software in a file called COPYING.txt
 * Otherwise it is available at:
 * https://raw.githubusercontent.com/UWARG/computer-vision/master/COPYING.txt
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

#### Source file formatting
```c++
/*
 * This file is part of WARG's computer-vision
 *
 * Copyright (c) 2015-2016, Waterloo Aerial Robotics Group (WARG)
 * All rights reserved.
 *
 * This software is licensed under a modified version of the BSD 3 clause license
 * that should have been included with this software in a file called COPYING.txt
 * Otherwise it is available at:
 * https://raw.githubusercontent.com/UWARG/computer-vision/master/COPYING.txt
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
