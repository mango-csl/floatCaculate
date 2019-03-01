var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

var calc = require('../hzk');
var accuracyCompute = calc.accuracyCompute;

function test_countDecimals(number_a, number_b, computedType, expected) {
    var info = number_a + computedType + number_b + "=" + expected;
    it(info, function (done) {
        var value = accuracyCompute(number_a, number_b, computedType);
        console.log("value = ", value);
        expect(accuracyCompute(number_a, number_b, computedType)).to.be.equal(expected);
        expect(Math.eval(number_a + computedType + number_b)).to.be.equal(expected);
        done();
    });
}

describe('TEST countDecimals', function () {
    describe('TEST Number', function () {
        test_countDecimals(5.01, 3.01, '-', 2.00);
        test_countDecimals(5.01, 3.01, '*', 15.08);
    });

    // describe('TEST String', function() {
    //     test_countDecimals('3', '3', 0);
    //     test_countDecimals('3.00', '3.00', 0);
    //     test_countDecimals('3.01', '3.01', 2);
    //     test_countDecimals('3.00e0', '3.00e0', 0);
    //     test_countDecimals('3.00e10', '3.00e10', 0);
    //     test_countDecimals('3.00e-10', '3.00e-10', 10);
    //     test_countDecimals('30e-1', '30e-1', 0);
    //     test_countDecimals('30e-2', '30e-2', 1);
    // });
});
