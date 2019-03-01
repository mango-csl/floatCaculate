var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();

var _toFixed = function (num, s) {
    var times = Math.pow(10, s + 1),
        des = parseInt(num * times),
        rest = des % 10;
    if (rest === 5) {
        return ((parseFloat(des) + 1) / times).toFixed(s);
    }
    return num.toFixed(s);
};

function runExpect(info, expected) {
    it(info, function (done) {
        var value = +(eval(info).toFixed(2));
        console.log(info + " = ", value);
        expect(value).to.be.equal(expected);
        done();
    });
}

var type = [
    '+',
    '-',
    '*',
    '/'
];
describe('TEST countDecimals', function () {
    describe('TEST Number', function () {
        for (var i = 0; i < 1000; i++) {
            var value1 = Math.random() * 100;
            var value2 = Math.random() * 100;
            var type = [
                '+',
                '-
                '*',
                '/'
            ][Math.floor(Math.random() * 4)];
            var str = '' + value1 + type + value2 + '';
            runExpect(str, accuracyCompute(value1, value2, type));
        }
    });
});
