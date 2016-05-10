# Writing Tests

Testing should be done in a directory inside the submodule called test, which should be included in the module's CMakeLists.txt via add_subdirectory and should have its own CMakeLists.txt.
Furthermore, large test files should be stored in the global computer-vision/testdata directory so that they can be shared between multiple tests.
That is, test directories should have the following structure
```
|-- computer-vision
    |-- modules
        |-- MODULE_NAME
            |-- include
            |-- src
            |-- test
                |-- CMakeLists.txt
                |-- foo_test.cpp
                |-- bar_test.cpp
            |-- CMakeLists.txt
    |-- testdata
        |-- image.jpg
```

Testing should be done using the boost test framework.

Tutorials provided by boost are found [here](http://www.boost.org/doc/libs/1_60_0/libs/test/doc/html/boost_test/practical_usage_recommendations/tutorials.html).

API Reference available [here](http://www.boost.org/doc/libs/1_60_0/libs/test/doc/html/boost_test/utf_reference.html)

To test code it should be run inside the BOOST_AUTO_TEST_CASE and use the boost test macros to verify sanity and results.
Some available macros include
```cpp
BOOST_WARN(predicate); // produces a warning if predicate is false, does not cause failures
BOOST_CHECK(predicate); // produces a failure if predicate is false, but continues testing
BOOST_REQUIRE(predicate); // produces a failure if predicate is false and aborts test suite.
```

#### Example
file: modules/mymodule/test/test.cpp
```cpp
#define BOOST_TEST_DYN_LINK
#define BOOST_TEST_MODULE TestSuiteName
#include <boost/test/unit_test.hpp>
#include "foo.h" // declares type foo, header is in the core module

BOOST_AUTO_TEST_CASE(TestName) {
    foo bar;
    BOOST_CHECK(foo.baz());
}
```

file: modules/mymodule/test/CMakeLists.txt
```cmake
include_directories(${Core_INCLUDE_DIR})
add_executable(mytest test.cpp)
target_link_libraries(mytest Core)

# Tests
add_test(
    NAME "example test"
    COMMAND mytest
)
```
