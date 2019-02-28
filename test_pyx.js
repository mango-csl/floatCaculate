var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

var Math = require('./lib/math_v0.18.0');
var calc = require('./hzk');
var accuracyCompute = calc.accuracyCompute;
var getDecNum = calc.getDecNum;
var accuracyTofixed = calc.accuracyTofixed;

function test_countDecimals(number_a, number_b, computedType, expected) {
    var info = number_a + computedType + number_b + "=" + expected;
    it(info, function (done) {
        var value = accuracyCompute(number_a, number_b, computedType);
        console.log("value = ", value);
        expect(accuracyCompute(number_a, number_b, computedType)).to.be.equal(expected);
        // expect(Math.eval(number_a + computedType + number_b)).to.be.equal(expected);
        done();
    });
}

function demo(info, expected) {
    it(info, function (done) {

        var value = eval(info);
        // 判断小数两位以上的时候，就进行四舍五入，这里调用志铠写好的方法
        if (getDecNum(value) > 2) {
            value = Number(accuracyTofixed(value, 2))
        }
        console.log(info + " = ", value);
        expect(value).to.be.equal(expected);
        done();
    });
}

function demo2(info, expected) {
    it(info, function (done) {
        var value = +Math().eval(info).toFixed(2);
        console.log(info + " = ", value);
        expect(value).to.be.equal(expected);
        done();
    });
}

describe('TEST countDecimals', function () {
    // describe('TEST Number', function () {
    //     test_countDecimals(5.01, 3.01, '-', 2.00);
    //     test_countDecimals(5.01, 3.01, '*', 15.08);
    // });

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

describe('TEST String', function () {
    // 计算公式
    var items = [
        '5.01-3.01',
        '5.01*3.01',
        '99 * (43.9 + 2) * 500',
        '99 * (43.9 + 2)',
        '43.9 + 2',
        '(0.7 * 0.8)',
        '0.1 + 0.2',
        '7 * 0.8',
        '1.335'// 火狐浏览器下，当最后一位小数点为5的时候，保留2位，四舍五入会出错，结果为1.33
    ];

    // 计算的结果
    var result = [
        2.00,
        15.08,
        2272050,
        4544.10,
        45.9,
        0.56,
        0.3,
        5.60,
        1.34
    ];

    for (var i = 0, len = items.length; i < len; i++) {
        demo(items[i], result[i]);
    }

    test_countDecimals(5.01, 3.01, '-', 2.00);
    test_countDecimals(5.01, 3.01, '*', 15.08);

    var demo1 = [
        '3 - 3 = 0',
        '3.00 - 3.00 = 0',
        '30e-2 - 30e-2 = 0',
        '3.00e10 - 3.00e10 = 0'
    ];

    demo1.forEach(function (value, key) {
        var temp = value.split('=');
        demo(temp[0], +temp[1]);
    });

    demo2('0.7*0.8', 0.56);
    demo2('7*0.8', 5.6);
    demo2('0.1+0.2', 0.3);
});
