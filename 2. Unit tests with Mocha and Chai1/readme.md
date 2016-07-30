# 2. Unit tests with Mocha and Chai
This section shows how to define Node.JS module and define unit tests.

It requires _Initial setup_ to be done and the sources from "1. Simple frontend and backend" folder.

## Creating a Node.JS module
We don't have any code to test yet, let's add some. Create `my-module.js`:
```
module.exports = {
    square: function (n)
    {
        return n * n;
    },      
    waitOneSecond: function (callback) {
        setTimeout(callback, 1000);
    }
};
```
We've created a [Node.JS module](https://nodejs.org/api/modules.html) by assigning our functions to `module.exports`.

As you can see we have sync `square(n)` and async `waitOneSecond(callback)` functions here.

N.B. - using `setTimeout()` method is not recommended and it is here only to demonstrate testing of async functions.  

## Using our Node.JS module
To use our own module we need to import it via `require()` Node.JS method. Add following code to the `service.js`:
```
// === Importing module on server side ===
var myModule = require('./my-module.js');

console.log('Square of 5 is ' + myModule.square(5));
console.log('Waiting one second');
myModule.waitOneSecond(function() {
  console.log('Waiting is over');
});
```
Run your service to see output.

## Unit testing by Mocha and Chai
[Mocha](https://mochajs.org) is a test framework which allows to test sync and async code, and [Chai](http://chaijs.com/api/assert/) is an assertion library.

Let's create `tests/my-module-tests.js`:
```
var myModule = require('../my-module.js');
var assert = require("chai").assert;

describe("square", function () {    
    it("below zero", function () {        
        assert.equal(1, myModule.square(-1));
        assert.equal(4, myModule.square(-2));
    });
    it("zero", function () {
        assert.equal(0, myModule.square(0));
    });
    it("normal", function () {
        assert.equal(1, myModule.square(1));
        assert.equal(4, myModule.square(2));
        assert.equal(9, myModule.square(3));
    });
});

describe("waitOneSecond", function () {
    var started = new Date().getTime();
    it("waiting", function (done) {
        myModule.waitOneSecond(function () {
            assert.isAbove(new Date().getTime() - started, 1000);
            done();
        });
    }).timeout(1200);
});
```
To test asynchronous functions like `waitOneSecond` we just need to define a `done` argument in our test function and then call it when test is done (no pun intended). 
Also we can define test's timeout by calling `timeout(milliseconds)` on the result of `it(...)` invocation.

Both Mocha and Chai are needed only for tests, so we can install them as [devdependencies](https://docs.npmjs.com/files/package.json#devdependencies) via `--save-dev` flag. 

Open _View -> Integrated terminal_ again and run these two commands:
```
npm install --save-dev mocha
npm install --save-dev chai
```

Now we also need to update `test` script in the `package.json`:
```
"test": "mocha tests/*-tests.js"
```
so we can run it with `npm test` command (or `npm run-script test`).

## Debug Mocha tests in the VSCode
Now you can test your code, but it would be good to be able to debug it in the case of issues. Open `.vscode/launch.json` and add following configuration:
```
{
    "name": "Run Mocha tests",
    "type": "node",
    "request": "launch",
    "program": "${workspaceRoot}/node_modules/mocha/bin/_mocha",
    "stopOnEntry": false,
    "args": ["tests/*-tests.js"],
    "cwd": "${workspaceRoot}",
    "runtimeExecutable": null,
    "env": { "NODE_ENV": "development"}
}
```
Now you can run your Mocha tests in VSCode - simply switch to _View -> Debug_ and choose "Run Mocha tests" in the dropdown list. Press `F5` to run them and use breakpoints as usually.