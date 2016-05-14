# Git and Github Tutorial

This tutorial will introduce you to git and github. Knowing these is essential if you want to contribute to the software side of UWARG.

## What is Git?

[Git](https://git-scm.com/) is a source code version control system. What does this mean? It lets you manage source code. Git tracks changes to your code, lets you revert your code, and allows you to collaborate with other people easily.  Git tracks the *changes* to your files only, not the individual files themselves.

## Why use Git?

You may just be used to saving code to your computer locally only, and relying on Ctrl-Z in case you break something and want to restart. This is where git shines. You commit code, which allows you to revert to it later if need be (say, you break code).

## Installing git

You have two options when installing Git. There's the command line version (you use it through the command promt/no gui). There's also [Github for Desktop](https://desktop.github.com/), which is a GUI client for Git that integrates with Github (don't worry we'll explain github later on). If you're a beginner, you should probably start out with the GUI client. If you're on linux or interested in using the command shell (its usually faster than the GUI client) then install that.

### Windows
You can download and run the [git installer](https://git-scm.com/downloads)

### Mac OS X
You can install [homebrew](http://brew.sh/) and install git with `brew install git`

### Ubuntu
If you're using linux, you can install git by simply running:
`sudo apt-get install git`. 

## Creating a Github account
[Sign up](https://github.com/join) for a github account if you don't have one. We'll later explain what github is, but you can just create an account for now.

## Setting up git for the first time
To set up git for the first time on your computer, run these commands in the git shell (or the command line): 
```
git config --global user.name "Your Name"
git config --global user.email your.email@example.com
git config --global push.default matching
git config --global alias.co checkout
```
Where `Your Name` and `your.email@example.com` preferrably match your github account. If you've installed the GUI Github for Desktop client, you've probably done all of these steps already at the startup screen.

## How to use Git

Using git is very simple. How the workflow works is:

- You edit your code in your project
- You decide that you would like to save the current state of your project
- You add the changed files to the staging index with `git add .`
- You commit the files with `git commit -m "Your unique commit message here`

### Branching
Git branches are a feature of git that allow you to work on multiple features at once. Branches also allow you to
prototype and try new things without breaking the main code. A branch lets you essentially create a current snapshot
of your code. A git repo can have as many branches as you want. 

Say for example you're working on Feature X. Feature X will take a while to make, and since you don't want it to be in the main code until its ready, you decide you want to  branch off of the `master` branch with a new branch called `feature-x`. To create a branch you type in `git checkout -b feature-x`. Now all of your changes and commits are applied to the `feature-x` branch, and not the master branch. 

Say now you want to add Feature Y. Because you're using branches, you're not directly affecting the main code. You can
switch to the `master` branch with `git checkout master`, which contains the latest, most stable code for your application. 
Now you can create a branch off of master called `feature-y` with `git branch feature-y` and then work on that branch 
with `git checkout feature-y`. Note that `git checkout -b feature-y` is the same as running the previous two commands.

You can move between branches this way, and work on multiple features all at the same time, whilst not affecting the main code,
usually located in the `master` branch until your feature is ready.

That's it! Its that simple. When using git you may want to wrap your head around the concept of the staging index, the remote repository, local repository, etc. Those go beyond this tutorial however if you're interested you head scroll down to the [Additional Resources](./git.md#additional-resources) section which lists articles that explain it.

## Common Commands

Here are some common commands you can use with git:

| Command                        | Description
---------------------------------|----------------------------------------------
|`git init`	                     | Create a repository in the current directory
|`git clone {url}`               | Clone a remote repository into a subdirectory
|`git add {file or path}`        | Add file or files in directory recursively to the staging index
|`git add .`                     | Add all of your changes to the staging index
|`git add . --all`               | Add all of your changes to the staging index (including removed files)
|`git reset HEAD {file or path}` | Remove file or files from the staging index
|`git checkout -- .`             | Remove all changes from your working tree
|`git checkout {branch_name}`    | Switch to a branch
|`git checkout -b {branch_name}` | Switch to a branch and create it if it doesnt yet exist
|`git branch {branch_name}`      | Create a branch off of the one you're currently on
|`git branch`                    | View all the branches you have stored locally, as well as view the branch you're on
|`git status`	                 | Show status of the working tree
|`git diff {file}`	             | Show the changes in the file
|`git diff`	                     | Show all changes in the working tree
|`git commit {file or path}`     | Commit files that has been staged (with git-add)
|`git reset --soft HEAD^`        | Undo commit & keep changes in the working tree
|`git reset --hard HEAD^`        | Reset the working tree to the last commit
|`git log {path} --oneline`      | View commit log, optionally for specific path
|`git blame [file]`              | Show file annotated with line modifications
|`git fetch`	                 | Fetch changes from a remote repository
|`git pull`                      | Fetch and merge changes from a remote repository
|`git push origin {branch_name}` | Push branch and its changes to a remote repository (like github)
|`git remote -v`                 | List remote repositories

## What is Github?
When you create a git repository, it created on your file system. [Github](https://www.github.com) is the dropbox of git. It allows you to store your git repository online in public. This lets other people download and collaborate with your repo. Github has some extra perks in terms
of collaborating with other people. One of these features includes the creation of Pull Requests. 

### Pull Requests
A pull requests is analogous to you asking everyone on your project to take a look at the work you did, and accept your changes if they all agree. Thats what a pull request lets you do.

A normal git/github workflow works like this:

1. You branch off of the master branch of the repo you're working on
2. You make your changes, committing often
3. You open up a Pull Request on Github against the master branch
4. Anyone else working on the project will look at the PR, look at the changes you've made, and make comments on them if necessary
5. After everyone gives you the thumbs up, you have permission to merge your changes in to the master branch. At that point anyone else that branches of off master will have your changes
6. Repeat Step 1

### Forks
Github also allows forks. Forks are essentially the ability to clone github repos that you dont have permission to push to into
your own account. After you've made changes to your fork, you can create a pull request against the original repo, and the developers
of the repo can merge your changes in if they like them. 

## Additional Resources
- [15 Minute Git Tutorial](https://try.github.io/levels/1/challenges/1)
- [CodeAcademy Git Course](https://www.codecademy.com/learn/learn-git)
- [More Resources](https://help.github.com/articles/good-resources-for-learning-git-and-github/)