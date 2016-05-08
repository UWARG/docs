# Documenting

The ground station uses [jsdocs](http://usejsdoc.org/) for its documentation purposes.

If you're familiar with Java Doc or PHPDoc, then its very similar. Essentially you add comments
to your code using a double star comment in the form of `/** your comment */` and the jsdoc 
interpreter generates nice well-described documentation based on your source code files.

A good tutorial of what it is, why we use it, and how to use it can be found here: [http://speakingjs.com/es5/ch29.html](http://speakingjs.com/es5/ch29.html).

# JSDoc Reference

| Block                                                                                | Description                                                                                 
|--------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| [@abstract](http://usejsdoc.org/tags-abstract.html)˙(synonyms: @virtual)             | This member must be implemented (or overridden) by the inheritor.                           |
| [@author](http://usejsdoc.org/tags-author.html)                                      | Identify the author of an item.                                                             |
| [@callback](http://usejsdoc.org/tags-callback.html)                                  | Document a callback function.                                                               |
| [@class](http://usejsdoc.org/tags-class.html) (synonyms: @constructor)               | This function is intended to be called with the "new" keyword.                              |
| [@classdesc](http://usejsdoc.org/tags-classdesc.html)                                | Use the following text to describe the entire class.                                        
| [@constant](http://usejsdoc.org/tags-constant.html) (synonyms: @const)               | Document an object as a constant.                                                           
| [@constructs](http://usejsdoc.org/tags-constructs.html)                              | This function member will be the constructor for the previous class.                        
| [@copyright](http://usejsdoc.org/tags-copyright.html)                                | Document some copyright information.                                                        
| [@default](http://usejsdoc.org/tags-default.html) (synonyms: @defaultvalue)          | Document the default value.                                                                 
| [@deprecated](http://usejsdoc.org/tags-deprecated.html)                              | Document that this is no longer the preferred way.                                          
| [@description](http://usejsdoc.org/tags-description.html) (synonyms: @desc)          | Describe a symbol.                                                                          
| [@enum](http://usejsdoc.org/tags-enum.html)                                          | Document a collection of related properties.                                                
| [@event](http://usejsdoc.org/tags-event.html)                                        | Document an event.                                                                          
| [@example](http://usejsdoc.org/tags-example.html)                                    | Provide an example of how to use a documented item.                                         
| [@exports](http://usejsdoc.org/tags-exports.html)                                    | Identify the member that is exported by a JavaScript module.                                
| [@external](http://usejsdoc.org/tags-external.html) (synonyms: @host)                | Identifies an external class or module.                                                             
| [@file](http://usejsdoc.org/tags-file.html) (synonyms: @fileoverview or @overview)   | Describe a file.                     
| [@fires](http://usejsdoc.org/tags-fires.html) (synonyms: @emits)                     | Describe the events this method may fire.                                                  
| [@function](http://usejsdoc.org/tags-function.html) (synonyms: @funco or @method)    | Describe a function or method. 
| [@global](http://usejsdoc.org/tags-global.html)                                      | Document a global object.                                                                   
| [@ignore](http://usejsdoc.org/tags-ignore.html)                                      | Omit a symbol from the documentation.                                                       
| [@implements](http://usejsdoc.org/tags-implements.html)                              | This symbol implements an interface.                                                        
| [@inheritdoc](http://usejsdoc.org/tags-inheritdoc.html)                              | Indicate that a symbol should inherit its parent's documentation.                           
| [@instance](http://usejsdoc.org/tags-instance.html)                                  | Document an instance member.                                                                
| [@interface](http://usejsdoc.org/tags-interface.html)                                | This symbol is an interface that others can implement.                                      
| [@lends](http://usejsdoc.org/tags-lends.html)                                        | Document properties on an object literal as if they belonged to a symbol with a given name. 
| [@license](http://usejsdoc.org/tags-license.html)                                    | Identify the license that applies to this code.                                             
| [@listens](http://usejsdoc.org/tags-listens.html)                                    | List the events that a symbol listens for.                                                  
| [@member](http://usejsdoc.org/tags-member.html) (synonyms: @var)                     | Document a member.                                                                          
| [@mixin](http://usejsdoc.org/tags-mixin.html)                                        | Document a mixin object.                                                                    
| [@module](http://usejsdoc.org/tags-module.html)                                      | Document a JavaScript module.                                                               
| [@name](http://usejsdoc.org/tags-name.html)                                          | Document the name of an object.                                                             
| [@namespace](http://usejsdoc.org/tags-namespace.html)                                | Document a namespace object.                                                                
| [@override](http://usejsdoc.org/tags-override.html)                                  | Indicate that a symbol overrides its parent.                                                
| [@param](http://usejsdoc.org/tags-param.html) (synonyms: @arg or @argument)          | Document the parameter to a function. 
| [@property](http://usejsdoc.org/tags-property.html) (synonyms: @prop)                | Document a property of an object.                                                                   
| [@protected](http://usejsdoc.org/tags-protected.html)                                | This symbol is meant to be protected.                                                       
| [@public](http://usejsdoc.org/tags-public.html)                                      | This symbol is meant to be public.                                                          
| [@readonly](http://usejsdoc.org/tags-readonly.html)                                  | This symbol is meant to be read-only.                                                       
| [@requires](http://usejsdoc.org/tags-requires.html)                                  | This file requires a JavaScript module.                                                     
| [@returns](http://usejsdoc.org/tags-returns.html) (synonyms: @return)                | Document the return value of a function.                                                    
| [@see](http://usejsdoc.org/tags-see.html)                                            | Refer to some other documentation for more information.                                     
| [@static](http://usejsdoc.org/tags-static.html)                                      | Document a static member.                                                                   
| [@summary](http://usejsdoc.org/tags-summary.html)                                    | A shorter version of the full description.                                                  
| [@this](http://usejsdoc.org/tags-this.html)                                          | What does the 'this' keyword refer to here?                                                 
| [@throws](http://usejsdoc.org/tags-throws.html) (synonyms: @exception)               | Describe what errors could be thrown.                                                       
| [@todo](http://usejsdoc.org/tags-todo.html)                                          | Document tasks to be completed.                                                             
| [@tutorial](http://usejsdoc.org/tags-tutorial.html)                                  | Insert a link to an included tutorial file.                                                 
| [@type](http://usejsdoc.org/tags-type.html)                                          | Document the type of an object.                                                             
| [@typedef](http://usejsdoc.org/tags-typedef.html)                                    | Document a custom type.                                                                     