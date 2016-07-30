# 1. Simple frontend and backend
This section shows how to setup Node.JS HTTP service and serve your own static content like HTML page. 

Do _Initial setup_ from root folder's `readme.md` first.

## Setup
Now you need to create project's folder and initialize NPM package there:
1. Create a folder for your project (all paths below will be relative to it)
2. Open that folder with VSCode
3. Open VSCode's terminal: _View -> Toggle integrated terminal_ 
4. Run `npm init` command, set "entry point" to be `service.js`
Now you should have `package.json` file, which defines your project. It will be used both for frontend and backend.

Example of `package.json`:
```
{
  "name": "js-example",
  "version": "1.0.0",
  "description": "An example of JS frontend & backend",
  "main": "service.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Anton Purin",
  "license": "MIT",
  "dependencies": {
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/anpur/js-example.git"
  },
  "bugs": {
    "url": "https://github.com/anpur/js-example/issues"
  },
  "homepage": "https://github.com/anpur/js-example"
}
```

## HTML and Stylesheet
Create `static` folder, which will contain all our static resources.

Create `static/index.html` file, it'll be our main page. Add following markup:
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
As you can see it depends on `static/index.css` stylesheet file, so add it too:
```
body {
    background-color: black;
    color: white
}
```
Open `static/index.html` file and you should see black background and white text "_Hello world!_".

## Express HTTP service
Create `service.js` file, it'll be our backend service. Add following code:
```
// === HTTP service ===
var express = require('express');
var app = express();
var server = require('http').createServer(app);

// maps contents of /static folder to the site's root
app.use(express.static(__dirname + '/static')); 

// start listening 
server.listen(5000, function () {
  console.log('Example JS service is listening on http://localhost:5000');
});
```
We're using [express framework](https://expressjs.com/) to run our HTTP service.

To include `express` module as a dependency and install it run following command in the terminal (_View -> Toggle integrated terminal_):
```
npm install --save express
```

## Run and debug Node.JS service in the VSCode
Select `service.js` file in the VSCode, press `F5` and choose `Node.js` environment. It will create `.vscode/launch.json` configuration file, which allows to run and debug Node.JS service inside the VSCode.
We don't need `Attach` and `Attach to Process` configurations for this manual so you can either delete or ignore them.

To run your service simply press `F5` again. To stop it press `Shift + F5`.
To see console with debug output open _View -> Debug Console_ or press `Ctrl + Shift + Y`.
You should see _Example JS service is listening on http://localhost:5000_ message. Open [http://localhost:5000](http://localhost:5000) url in the browser to see your HTML page served by your HTTP service.

You now also can [debug your Node.JS service](https://code.visualstudio.com/docs/editor/debugging) simply setting breakpoints to `service.js`. 
Try it now - stop service, put a breakpoint anywhere and run it again.