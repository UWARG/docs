# What you need to know

This section will help to highlight *most* of what you need to know before you can start developing. 

## Javascript

If you already know Javascript, that's awesome. If you don't, then that's fine too. If you're already familiar with another programming language, you'll find javascript really similar and probably be able to pick it up as you start the developing the groundstation. If you don't know programming, it's highly suggested you take this [Codeacademy Javascript Course](https://www.codecademy.com/learn/javascript). The estimated course time is only 10 hours (which is really little if you think about it) and at the end you should be confident in basic programming concepts as well as javascript syntax. The most important javascripts concepts you need to know are: 

- The significance of var and when and when not to use it
- That everything in javascript is an object, including functions
- The 3 different ways of declaring javascript objects, and how they are different

## Node.js

So you don't need to read all of the gigantic [Node.js API Documentation](https://nodejs.org/dist/latest-v5.x/docs/api/), though you should reference it when you need to. Instead all you really need to know about node.js is its built-in package manager and the incredible power of modules that it provides you.

### Node.js modules

So what are these modules and why are they useful? If you look at the groundstation syntax and other node.js examples online, you may notice the key word `require` being used a lot. This isn't a native javascript function. It's actually a feature node.js provides you. 

Usually in webpages scripts execute as soon as you load them. If you want to devide your application into different parts, you would have had to split up your main javascript file into different files and load them in the order you want them to be run in. This approach is cumbersome and leads to bad practices. The biggest bad practice is the creation of global variables everywhere. Global variables make your application harder to maintain and debug.

So what do these modules do? Each module is basically a javascript file, and you call the javascript file by calling `require('filelocation/filename)`. But how is this different than loading a script on your browser? Well, when you call require on a module, everything in that module runs in its own scope (so you're free to declare global variables in that file without affecting the rest of the application) and the return result of the require function returns whatever you want the module to return.

Lets take an example comparing traditional methods and using require. 

##### Using Regular Javascript
```html
<head>
    <script>
        //this is my module
        var private_sensitive_variable=6;

        //this is the function that i want my module to return
        function hello(){
            console.log('hello'+private_sensitive_variable); //will output hello 6
        }
    </script>
    <script>
    //this is a completely seperate module
    hello(); //i can call this function from the above module which is what i wanted

    console.log(private_sensitive_variable); //this will output 6, which is NOT what I wanted since the variable was declared globally within the above script/module
    </script>
</head>
```

This is a relatively simple example, however you can see that if we keep doing this, as the application becomes large, it'll become more of a pain to manage the application and keep track of what needs what. Here's the beauty of modules. They provide dependency management, so you can clearly see what each module depends on. In the above example if I reposition the second script above the first I'll get an exception thrown, since the function hello and the variable weren't declared yet. Now lets see how we can handle the same scenario using node modules.

##### Using Node.js Modules
```javascript
//this is hello.js
var private_sensitive_variable=6;

var hello=function(){
    console.log('hello'+private_sensitive_variable); //will output hello 6
}

module.exports=hello;
```

```javascript
//this is app.js
var hello=require('hello');

hello(); //will output hello 6

console.log(private_sensitive_variable); //will throw an exception as this variable hasn't been declared globally or in the context of this module, which is good!
```

You may have noticed the `module.exports=hello;` line in the `hello.js` module. What this tells node is the result of calling `require` on the hello.js module will return the variable/function hello. In `app.js` we use this module by calling `var hello=require('hello')`. The variable hello now contains whatever the `hello.js` module exported, which in this case is a function.

You can see that even though theres more abstraction in the second method, the code has become far more maintanable. Now calling `var` will not carelessly create global variables over our application. It will only create them in the scope of the module. We can also see the dependencies on our modules immediately, and keep track of them easily.

### Node Package Manager (npm)

NPM stands for the Node Package Manager. It is based off the concept of node.js modules. It's basically a built-in dependency manager for node.js. Think of it as a plugin manager if you will, similar to pip for python or composer for php. One of the main advantages of using node.js is the abundance of libraries and modules that you can install and use in your application. You can find and search for all the packages available for use in the [NPM registry](https://www.npmjs.com/). 

The most important command of npm is `npm install <packagename>`. This will install a package in your project directory. Doing an `npm install` without any parameters at the project root will tell npm to look in your projects `package.json` file and install your apps dependencies. One of the dependencies that the groundstation relies on is the NW.js module. To try out installing a package globally, try running `npm install -g nw`. This will install the NW.js module globally on your computer, allowing you to use the `nw` command. You can use this command to start up the groundstation as well, by navigating to the groundstation directory and running `nw` in the terminal.

## Javascript Frameworks

The groundstation uses [Backbone](http://backbonejs.org/) and [Marionette](http://marionettejs.com/) as it's javascript frameworks. Why use javascript frameworks at all? To help organize the code in an MVC design pattern. Basically, rather than having all of our system logic (logic responsible for core functionality) and logic for manipulating the view (ie button state, checking user input) in one place, using these frameworks helps split them up to create more maintanable and manageble code. The design pattern it helps enforce is called MVC (Model View Controller) which you can read up on if you'd like.

You don't have to read the documentation on these frameworks to start working on the groundstation. You'll get a grasp on it after reading the tutorial (next section) and working on the groundstation. 

## Libraries Used

One of the awesome things about javascript is the awesome community! There are literally thousands of libraries available for us to use. These include [Jquery](https://jquery.com/) for simple dom manipulations, and [leaflet](http://leafletjs.com/) as the map library. You don't have to know jquery to work on the groundstation, you'll pick it up eventually. Reading the [Leaflet API Docs](http://leafletjs.com/reference.html) is pretty useful if you're working with the Map modules.