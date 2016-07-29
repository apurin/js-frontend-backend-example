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