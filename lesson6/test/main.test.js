var main = require("../main");
var should = require("should");
var mocha = require("mocha");

describe('test/main.test.js',function(){
    it('should equal 55 when n===10',function(){
    main.fibonacci(10).should.equal(55);
    });
});
