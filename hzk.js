/**
 * 精度计算，避免精度丢失
 * @param {number} number_a 第一个计算值
 * @param {number} number_b 第二个计算值
 * @param {number} computedType 计算类型，+加-减*乘/除
 * @return {number} 计算结果
 */
var accuracyCompute = function (number_a, number_b, computedType) {
    var result,
        decNum_a = getDecNum(number_a),
        decNum_b = getDecNum(number_b),
        decNum_sum = decNum_a + decNum_b,
        decNum_min = Math.min(decNum_a, decNum_b),
        decNum_max = Math.max(decNum_a, decNum_b);
    decNum_sum += decNum_max - decNum_min;
    decNum_sum = Math.pow(10, decNum_sum);
    decNum_max = Math.pow(10, decNum_max);
    number_a = changeToInt(number_a);
    number_b = changeToInt(number_b);
    if (decNum_a > decNum_b) {
        number_b *= Math.pow(10, decNum_a - decNum_b);
    } else {
        number_a *= Math.pow(10, decNum_b - decNum_a);
    }
    switch (computedType) {
        case '+':
            result = (number_a + number_b) / decNum_max;
            break;
        case '-':
            result = (number_a - number_b) / decNum_max;
            break;
        case '*':
            result = (number_a * number_b) / decNum_sum;
            break;
        case '/':
            result = number_a / number_b;
            break;
    }
    return result;
};

/**
 * 获取数字的小数位数
 * @param {number} number 目标数字
 * @return {number} 目标数字的小数位数
 */
function getDecNum(number) {
    var DecNum = 0;
    var stringNum = number.toString();
    if (stringNum.indexOf(".") !== -1) {
        DecNum = stringNum.split(".")[1].length;
    }
    return DecNum;
}

/**
 * 将数字转换成整数（去掉小数点）
 * @param {number} number 目标数字
 * @return {number} 目标数字的整数形式
 */
function changeToInt(number) {
    return parseInt(number.toString().replace(".", ""));
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

if (typeof module !== 'undefined' && module.exports) {
    var calc = {};
    calc.accuracyCompute = accuracyCompute;
    calc.getDecNum = getDecNum;
    calc.changeToInt = changeToInt;
    calc.accuracyTofixed = accuracyTofixed;
    module.exports = calc;
}
