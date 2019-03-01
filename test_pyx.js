var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

var calc = require('./hzk');
var accuracyCompute = calc.accuracyCompute;
var getDecNum = calc.getDecNum;
var accuracyTofixed = calc.accuracyTofixed;

var math = require('./lib/math_v0.18.0');
math = new math();

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
        var value = math.eval(info);
        // 判断小数两位以上的时候，就进行四舍五入，这里调用原生toFixed的方法进行比较
        if (getDecNum(value) > 2) {
            value = Number(value.toFixed(2));
        }
        console.log(info + " = ", value);
        expect(value).to.be.equal(expected);
        done();
    });
}

function demo2(info, expected) {
    it(info, function (done) {
        var value = Number(_toFixed(math.eval(info), 2));
        console.log(info + " = ", value);
        expect(value).to.be.equal(expected);
        done();
    });
}

function _toFixed(num, s) {
    var times = Math.pow(10, s + 1),
        des = parseInt(num * times),
        rest = des % 10;
    if (rest === 5) {
        return ((parseFloat(des) + 1) / times).toFixed(s);
    }
    return num.toFixed(s);
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
    // 随机产生两个数字进行计算测试
    var type = [
        '+',
        '-',
        '*',
        '/'
    ];
    var value1,
        value2,
        flag,
        str;

    for (var i = 0; i < 1000; i++) {
        value1 = Math.random() * 100;
        value2 = Math.random() * 100;
        flag = type[Math.floor(Math.random() * 4)];
        str = value1 + flag + value2;
        if (flag !== '-') {
            // 原生toFixed和accuracyTofixed方法的结果比较测试
            // demo(str, accuracyCompute(value1, value2, type));
            // _toFixed和accuracyTofixed方法的结果比较测试
            demo2(str, accuracyCompute(value1, value2, flag));
        }
    }
});

describe('TEST _toFixed', function () {
    // 测试原生toFixed、accuracyTofixed、_toFixed方法的结果值比较
    var num = 3.445;
    console.log(num);// 3.445
    console.log(num.toFixed(2));// 3.44 错误
    console.log(accuracyTofixed(num, 2));// 3.45 正确
    console.log(_toFixed(num, 2));// 3.45 正确

    num = 147.50497;
    console.log(num);// 147.50497
    console.log(num.toFixed(2));// 147.50 正确
    console.log(accuracyTofixed(num, 2));// 147.51 错误
    console.log(_toFixed(num, 2));// 147.50 正确

    // 结论是：accuracyTofixed方法可能有点问题，每次加0.5会改变原有的值，再计算会出现问题，所以应该用_toFixed。
});
