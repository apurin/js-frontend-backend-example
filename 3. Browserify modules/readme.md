# 3. Browserify modules
This section shows how to use Node.JS modules in the browser with the [Browserify](http://browserify.org/) with help of the [Watchify](https://github.com/substack/watchify).

It requires _Initial setup_ to be done and the sources from "2. Unit tests with Mocha and Chai" folder.

## Create a frontend code
Create `index.js` file:
```
// === Import NPM jQuery module on the client side === 
$ = require('jquery');

$( document ).ready(function() {
    $('body').append('<br />Updated by jQuery!');
});
```
It imports [jQuery](https://jquery.com/) as NPM module.

The browser can't use this script, so we need to import `static/bundle.js` in our `static/index.html` which will be created later:
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
Notice that the `static` folder serves as root for our HTTP service, so `static/bundle.js` will be available as `<host>/bundle.js`.
This is why it is imported as `src="bundle.js"`.

## Build the frontend code with Browserify and Watchify
Now we need to add `jQuery` and `Browserify` to package's dependencies and add script which will generate client side JS code.
Also, we will add `Watchify` to devdependencies to simplify frontend development.

Run following commands in the terminal:
```
npm install --save jquery
npm install --save browserify
npm install --save-dev watchify
```
And add following scripts to `package.json` along with the `test` script we already had:
```
"scripts": {
  "build": "browserify index.js > static/bundle.js",
  "watch": "watchify index.js -o static/bundle.js",
  "test": "mocha tests/*-tests.js"
},
```
Script `build` will pack our `index.js` and all it's dependencies to browser-friendly `static/bundle.js` script.

Now we can invoke browserify: 
```
npm run-script build
```
Start backend service (Open _View -> Debug_, choose "Launch" in the dropdown menu and press `F5`) and open [http://localhost:5000](http://localhost:5000) to see that jQuery now works in the browser.

To avoid manual rebundling every time `index.js` changed we can run `npm run-script watch`. Watchify will watch for any changes saved to `index.js` and instantly bundle them to `static/bundle.js`.
To stop watchify just press `Ctrl + C` in the terminal window.

## Debug the frontend code in the browser
To debug the frontend code you need to simply use develope's console. 

In Chrome press `F12` and choose "Sources" tab. You will see following tree:
 - localhost:5000
   - (index)
   - bundle.js
   - index.css

Click on `bundle.js` and you will see your code in the beginning of file. Put a breakpoint onto `$('body').append('<br />Updated by jQuery!');` line and refresh the page.

If you have Watchify running you can edit `main.js` and instantly see changes in the browser by refreshing the page.