# Contributing

In order to contribute to the groundstation you must know how to use git. Check out our tutorial [here](../tutorials/git.md) to learn how to use it.
Follow the guidelines here if you want to contribute to the groundstation.

## Getting yourself a task
In order to qualify yourself to work on the groundstation, you must complete the groundstation bootcamp. The bootcamp should give you a good
understanding of the underlying structure of the groundstation, and help you get familiar with the code.

Afterwords, talk to the responsible team lead, and they will assign you a task on [asana](https://www.asana.com).

## Branches
If you are working on a feature or adding anything to the groundstation, *branch off of master* first, and then start working on your task.
*DO NOT WORK ON MASTER*. You are making your life harder if you do so, since you'll have to transfer your changes to a different branch before
you can make a pull request.

Please name your branches in the following format: `{type_of_change}-{your_name}-{title_of_task}`

`type_of_change` is either a `feature` or a `bug`, depending on the context of your task. For `title_of_task`, just name it something relevant.
As an example, say a really cool developer named Serge is working on adding a PID graph to the groundstation. The branch name would be in the form of:
`feature-serge-pid-graph`.

## Coding Conventions
Variable names in lower case with underscores as seperators. eg `this_is_a_variable`

Function names in camel case. For example: `functionNameHere()`

Constants in all capitals seperated by underscores. eg. `THIS_IS_A_CONSTANT`

Module and class names in capital camel case. For example: `ThisIsAModule`

For file names, look at the file names in the folder and follow them. 

*As a rule of thumb, when in doubt, look at the existing code and follow the same pattern.*

## Documentating your code
Most times your code should be verbose enough that you shouldn't need too many comments. However times may arise when your
logic gets too complicated, so use your judgement as a developer and comment your code where you think it is necessary. Imagine
trying to read the code you're writing 5 years from now, and think of how easily you'd understand it.

Note that if you're creating any sort of function, class, object, or module, *YOU MUST DOCUMENT IT WITH JSDOC SYNTAX!*. More information can be found in
the [documenting section](./documenting.md). Your code will not be merged in if this is not done.

## Pull Requests
After you finish implementing your feature, open up a pull request on github. Let the responsible team lead know and they will code review your changes.
Until the pull request is merged in, your task is not complete.

*YOU MUST OPEN UP PULL REQUESTS. **NEVER** PUSH DIRECTLY TO THE MASTER BRANCH ON GITHUB!*