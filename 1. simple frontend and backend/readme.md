# 1. Create simple frontend and backend
Shows how to setup Node.JS HTTP service and serve your own static HTML page. 

## Setup
This step requires "Initial setup" from root folder's `readme.md` to be done.

Now you need to create project's folder and initialize NPM oackage there:
1. Create a folder for your project (all paths below will be relative to it)
2. Open that folder with VSCode
3. Open VSCode's terminal: _View -> Toggle integrated terminal_ 
4. Run `npm init` command, you can keep all defaults for now or add information you want

Now you should have `package.json` file, which defines your project. It will be used both for frontend and backend. 

Now we need a simple HTTP server, which would listen to HTTP requests and return some static files.

### HTML and Stylesheet
Create `static` folder, which will contain static resources.

Create `static/index.html` file, it'll be our main page. Add following content:
```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example JS service</title>
    <link rel="stylesheet" type="text/css" href="index.css"/>
</head>
<body>
    Hello world!
</body>
</html>
```
As you can see it depends on `static/index.css` file, so add it too:
```
body {
    background-color: black;
    color: whiteservice.js
}
```
Open `static/index.html` file in any browser and you should see black background and white text `Hello world!`.

### Express HTTP service
Create `service.js` file, it'll be our service. Add following content:
```
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static')); // maps app contents of /static folder to the site's root

app.listen(5000, function () {
  console.log('Example JS service is listening on http://localhost:5000');
});
```

We're using [express framework](https://expressjs.com/) to run our HTTP service.

### NPM package's entry point and dependencies
Now we have a page to show and service to run, so we need to configure our `project.json` to include `express` module as dependency and point to `service.js` as our main script:
```
{
  "name": "javascript-example",
  "version": "0.0.0",
  "description": "Step-by-step example of simple JS backend and frontend with explanations",
  "main": "service.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": { 
    "express": "*" 
  },
  "author": "Anton Purin",
  "license": "MIT"
}
```
Also we need to install newly added dependency. Open VSCode's terminal again and run `npm install` command.

### Run and debug Node.JS service in the VSCode
Select `service.js` file in VSCode and press `F5` and choose `Node.js` environment to create `.vscode/launch.json` configuration file, which allows to run and debug our Node.JS service inside VSCode.
We don't need `Attach` and `Attach to Proccess` configurations for this manual so you can delete them.

To run your service simply press `F5` again. To stop it press `Shift + F5`
To see debug console with output from your service open _View -> Debug Console_ or press `Ctrl + Shift + Y`.
You should see _Example JS service is listening on port 5000!_ message. Open [http://localhost:5000](http://localhost:5000) url to see your HTML page served by your HTTP service.

You now also can debug your Node.JS service by simply setting breakpoints to `service.js` code. 
Try it now - stop service, put a breakpoint anywhere and run it again.