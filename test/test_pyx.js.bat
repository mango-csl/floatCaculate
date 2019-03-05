var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

var calc = require('../hzk');
var accuracyCompute = calc.accuracyCompute;
var getDecNum = calc.getDecNum;
var accuracyTofixed = calc.accuracyTofixed;

var math = require('../lib/math_v0.18.0');
math = new math();

// function test_countDecimals(number_a, number_b, computedType, expected) {
//     var info = number_a + computedType + number_b + "=" + expected;
//     it(info, function (done) {
//         var value = accuracyCompute(number_a, number_b, computedType);
//         console.log("value = ", value);
//         expect(accuracyCompute(number_a, number_b, computedType)).to.be.equal(expected);
//         // expect(Math.eval(number_a + computedType + number_b)).to.be.equal(expected);
//         done();
//     });
// }

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

/**
 * 精确的四舍五入，解决火狐浏览器下tofixed错误的情况
 * @param {number} number 目标数字
 * @param {number} n 保留的小数位
 * @return {string} 四舍五入后的值
 */
var accuracyTofixed = function (number, n) {
    var times = Math.pow(10, n);
    var des = accuracyCompute(accuracyCompute(number, times, '*'), 0.5, '+');
    des = accuracyCompute(parseInt(des, 10), times, '/');
    return des + '';
};

function test_toFixed(_number, _expected) {
    var arr = ['Math.toFixed', 'accuracyTofixed', '_toFixed'];

    function calculate_toFixed(type) {
        var value;
        switch (type) {
            case 'Math.toFixed':
                value = _number.toFixed(2);
                break;
            case 'accuracyTofixed':
                value = accuracyTofixed(_number, 2);
                break;
            case '_toFixed':
                value = _toFixed(_number, 2);
                break;
            default:
                value = _number;
                break;
        }
        return value;
    }

    for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i];
        it(item + _number, function (done) {
            var value_toFixed = Number(calculate_toFixed(item));
            console.log(item + "--- value = ", value_toFixed);
            expect(value_toFixed).to.be.equal(_expected);
            done();
        });
    }
}

describe('测试各个toFixed方法准确度', function () {
    // 测试原生toFixed、accuracyTofixed、_toFixed方法的结果值比较

    // var value1 = Math.random() * 100;
    // var value2 = Math.random() * 100;

    for (var i = 0; i < 1000; i++) {
        var random = getRandom();
        test_toFixed(random, Number(_toFixed(random, 2)))
    }
    // test_toFixed(3.445, 3.45);
    // test_toFixed(147.50497, 147.5);
    function getRandom() {
        var random = Math.random() * 100;
        var _str = random.toString();
        var index = _str.indexOf('.') + 3;
        _str = _str.split('');  //将a字符串转换成数组
        _str.splice(index, 1, '5'); //将1这个位置的字符，替换成'xxxxx'. 用的是原生js的splice方法。
        _str = Number(_str.join(''));  //将数组转换成字符串。  完成。
        return _str;
    }

    // parseInt(random.toString().(".", ""));
    // 结论是：accuracyTofixed方法可能有点问题，每次加0.5会改变原有的值，再计算会出现问题，所以应该用_toFixed。
});
