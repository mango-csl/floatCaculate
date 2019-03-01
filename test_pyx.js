var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

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

var _toFixed = function (num, s) {
    var times = Math.pow(10, s + 1),
        des = parseInt(num * times),
        rest = des % 10;
    if (rest === 5) {
        return ((parseFloat(des) + 1) / times).toFixed(s);
    }
    return num.toFixed(s);
};

function demo2(info, expected) {
    it(info, function (done) {
        var value = +(eval(info).toFixed(2));
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

    // for (var i = 0, len = items.length; i < len; i++) {
    //     demo(items[i], result[i]);
    // }

    // test_countDecimals(5.01, 3.01, '-', 2.00);
    // test_countDecimals(5.01, 3.01, '*', 15.08);

    var demo1 = [
        '3 - 3 = 0',
        '3.00 - 3.00 = 0',
        '30e-2 - 30e-2 = 0',
        '3.00e10 - 3.00e10 = 0'
    ];

    // demo1.forEach(function (value, key) {
    //     var temp = value.split('=');
    //     demo(temp[0], +temp[1]);
    // });
    //
    // demo2('0.7*0.8', 0.56);
    // demo2('7*0.8', 5.6);
    // demo2('0.1+0.2', 0.3);


    // 随机数计算测试
    var arr = [];
    for (var i = 0; i < 1000; i++) {
        var value1 = Math.random() * 100;
        var value2 = Math.random() * 100;
        var type = [
            '+',
            '-',
            '*',
            '/'
        ][Math.floor(Math.random() * 4)];
        var str = '' + value1 + type + value2 + '';
        if (type !== '-') {
            // demo2(str, accuracyCompute(value1, value2, type));
        }
    }

    // demo('3.444', 3.45);

    // 经过测试，可能是accuracyTofixed和原生的toFixed的结果值有差别
    console.log(7.093781058943516 + 86.86119714716432);// 93.95497820610784
    console.log((7.093781058943516 + 86.86119714716432).toFixed(2));// 93.95
    console.log(_toFixed(7.093781058943516 + 86.86119714716432, 2));// 93.95
    console.log(accuracyTofixed(7.093781058943516 + 86.86119714716432, 2));// 93.96
    console.log('---------------------------------------------');
    console.log(3.445);// 3.445，
    console.log((3.445).toFixed(2));// 3.44 ie11下3.45 谷歌浏览器下3.44
    console.log(_toFixed(3.445, 2));// 3.45
    console.log(accuracyTofixed(3.445, 2));// 3.45
    console.log('---------------------------------------------');
    console.log(3.4401);// 3.4401
    console.log((3.4401).toFixed(2));// 3.44
    console.log(_toFixed(3.4401, 2));// 3.44
    console.log(accuracyTofixed(3.4401, 2));// 3.44
});
