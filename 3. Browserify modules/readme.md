# 3. Browserify modules
Use NPM modules in the browser with [Browserify](http://browserify.org/) with help of [Watchify](https://github.com/substack/watchify).

## Setup
This step requires "Initial setup" from root folder's `readme.md` to be done and sources from "2. Unit tests with Mocha and Chai" folder.

## Create client side code
Create `index.js` file:
```
$ = require('jquery');

$( document ).ready(function() {
    $('body').append('<br />Updated by jQuery!');
});
```
It imports [jQuery](https://jquery.com/) as NPM module.

Browser can't use this script, so we need to import `static/bundle.js` in our `static/index.html` which will be created later:
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
    <script src="bundle.js"></script>      
</body>
</html>
```
Notice that `static` folder serves as root for our HTTP service, so `static/bundle.js` will be available as `<host>/bundle.js`.
This is why it is imported simply as `src="bundle.js"`.

## Build client side with Browserify and Watchify
Now we need to add `jQuery` and `Browserify` to package's dependencies and add script which will generate client side JS code.
Also, we will add `Watchify` to devdependencies to simplify frontend development.

Update `package.json`:
```
{
  "name": "javascript-example",
  "version": "0.0.0",
  "description": "",
  "main": "service.js",
  "scripts": {
    "build": "browserify index.js > static/bundle.js",
    "watch": "watchify index.js -o static/bundle.js",
    "test": "mocha tests/*-tests.js"
  },
  "dependencies": { 
    "express": "*",
    "browserify": "*",
    "jquery": "*"
  },
  "devDependencies": {
    "mocha": "*",
    "chai": "*",
    "watchify": "*"
  },
  "author": "Anton Purin",
  "license": "MIT"
}
```
Notice new dependencies, devDependencies and new scripts. Script `build` will pack our `index.js` and all it's dependencies to browser friendly `static/bundle.js` file.
As we added new dependencies we need to install them. Run `npm install` in the _View -> Integrated terminal_.

Now we can invoke browserify: `npm run-script build`.
Start backend service (Open _View -> Debug_, choose "Launch" in the dropdown menu and press `F5`) and open [http://localhost:5000](http://localhost:5000) to see that jQuery now works in the browser.

To avoid manual rebundling every time `index.js` changed we can run `npm run-script watch`. Watchify will watch for any changes saved to `index.js` and instantly bundle them to `static/bundle.js`.
To stop watchify just press `Ctrl + C` in the terminal window.

## Debug frontend code in the browser
To debug frontend code you need to simply use develope's console. 

In Chrome press `F12` and choose "Sources" tab. You will see following tree:
 - localhost:5000
   - (index)
   - bundle.js
   - index.css

Click on `bundle.js` and you will see your code in the begining of file. Put breakpoint on `$('body').append('<br />Updated by jQuery!');` line and refresh page.

If you have Watchify running you can edit `main.js` and instantly see changes in browser by refreshing the page.