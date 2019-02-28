'use strict'

function decNum(a){/*获取小数位数*/
    var r=0;
    a=a.toString();
    if(a.indexOf(".")!== -1) r=a.split(".")[1].length;
    return r;
}
function int(a){/*去除小数点并转成数值*/
    return parseInt(a.toString().replace(".",""));
}
function calc(a,b,type){//加减乘除
    var r,
        da=decNum(a),
        db=decNum(b),
        dsum=da+db,
        dmin=Math.min(da,db),
        dmax=Math.max(da,db);
    dsum+=dmax-dmin;
    dsum=Math.pow(10,dsum);
    dmax=Math.pow(10,dmax);
    a=int(a);
    b=int(b);
    if(da>db){
        b*=Math.pow(10,da-db);
    }else{
        a*=Math.pow(10,db-da);
    }
    switch(type){
        case "add":
            r=(a+b)/dmax;
            break;
        case "subtract":
            r=(a-b)/dmax;
            break;
        case "multiply":
            r=(a*b)/dsum;
            break;
        case "divide":
            r=a/b;
            break;
    }
    return r;
}
// s=calc(0.1,0.2,"add");
// console.log(s);
// s=calc(-0.1,0.2,"add");
// console.log(s);
// s=calc(0.2,0.1,"subtract");
// console.log(s);
// s=calc(0.002,0.01,"multiply");
// console.log(s);
// s=calc(2.2,100,"divide");
// console.log(s);
if (typeof module !== 'undefined' && module.exports) {
    var calc = {};
    calc.int = int;
    module.exports = calc;
}
