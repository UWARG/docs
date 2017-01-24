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

To test code it should be run inside the `BOOST_AUTO_TEST_CASE` and use the boost test macros to verify sanity and results.
Some available macros include
```cpp
BOOST_WARN(predicate); // produces a warning if predicate is false, does not cause failures
BOOST_CHECK(predicate); // produces a failure if predicate is false, but continues testing
BOOST_REQUIRE(predicate); // produces a failure if predicate is false and aborts test suite.
```

### Test heirarchy
Boost tests are stored in a heirarchy of nested suites.
The global suite for a file can be set with the `BOOST_TEST_MODULE` macro.
You can define additional suites by encapsulating test cases and suites with `BOOST_AUTO_TEST_SUITE(SuiteName);` and `BOOST_AUTO_TEST_SUITE_END();`

*Note that currently the xsl parser for generating an xUnit compatible XML file does not properly handle nested test suites and only makes use of the suite directly encapsulating the test cases (the suite declared with `BOOST_TEST_MODULE`).
However since this is expected to be fixed relatively soon, it is recommended that you use the following format to declare tests.*

#### Guidelines for naming test suites and test cases
The global test suite for a file (specified with `BOOST_TEST_MODULE`) should correspond to the computer-vision module the tests are part of.
A test suite should be created for each file with `BOOST_AUTO_TEST_SUITE` and should encompass all the tests in the file. Tests contained within a single file should all test a single feature or function of the program. Tests for different features/functions should go in their own file with a separate test suite. The file should also have the same name as the test suite (though test suite names should be camel cased).

Additional test suites can also be created inside test suites at your discretion if a certain suite has a large number of test cases that can be meaningfully subdivided.

For consistency, test suite and test case names should be UpperCamelCase (and test module name should be the full UpperCamelCase version of the module name. e.g. targetid should be TargetIdentification).

Also note that all names should be sufficiently descriptive to be unique in their scope (as well as sufficiently descriptive to convey what is being tested in a particular suite/case). That is, each test suite in a module needs to have a unique name to avoid naming conflicts, but names of test suites inside those suites and names of test cases only need to be unique inside their encapsulating test suite.

### Example
file: modules/mymodule/test/mysuite.cpp
```cpp
#define BOOST_TEST_DYN_LINK
#define BOOST_TEST_MODULE MyModule
#include <boost/test/unit_test.hpp>
#include "foo.h" // declares type foo, header is in the core module

BOOST_AUTO_TEST_SUITE(MySuite);

BOOST_AUTO_TEST_CASE(TestName) {
    foo bar;
    BOOST_CHECK(foo.baz());
}

BOOST_AUTO_TEST_SUITE_END();
```

file: modules/mymodule/test/CMakeLists.txt
```cmake
include_directories(${Core_INCLUDE_DIR})
add_executable(mytest test.cpp)
target_link_libraries(mytest Core)

# Tests
add_test(
    NAME "example test"
    COMMAND mytest --log_format=XML --log_sink=TEST-mytest.xml --log_level=all --report_level=no
)
```
