CV in Terminal interface
==

This is an simple experiment to create a terminal interface of your CV. The commplete application is developed on MVC pattern using BackboneJS MV* model. I have also used Requirejs to add dependency management to the application so that it can load templates and modules dynamically.

Here are the list of Open source frameworks and tooling I have used

- BackboneJS
- RequireJS
- Custom build script
- Mocha
- SASS / Compass

Each command is a module on its own and its very simple to write more modules. I will more documentation very soon.

## Module 
To create a module you will need a javascript file and a html template file. If you want to load static content from a html file you don't need to write javascript module. I have included a generic module to load html content.

### Step 1
#### Add command information into data/command.json
Load static content
	
	{
		"command": "about",
		"alias": "(abt)",
		"parameters": "[no parameters]",
		"description": "read more about me",
		"module": "Pages",
		"action": "View",
		"params" : {
			"template" : "about"
		}
	}

Dynamic module command

	{
      "command": "web",
      "alias": "(w)",
      "parameters": "[keywords]",
      "description": "Command to search results from google serach api",
      "module": "Google",
      "action": "View",
      "params": ""
    }

## Deploy
The project use module and script writen in requirejs pattern and each module code is written in a separate file. You can use the build script to compile and optimize all external javascript file into one single file. 

	./build.sh

Note: you might need to change the permission of the build file. Use : 

	chmod +x build.sh

## TODO 
- Write few more useful modules and command
- Write a grunt task to precompile all template file during build proccess to reduce the latency in the loading and reandering of the view
- I need to write proper documentation on usage of the code.