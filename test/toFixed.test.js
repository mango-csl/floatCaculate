let chai = require('chai');
let assert = chai.assert; // Using Assert style
let expect = chai.expect; // Using Expect style
let should = chai.should();
let math = require('../lib/math.min');

function runExpect(info, expected) {
    it(info, function (done) {
        let value = math.format(Number(math.eval(info)), {notation: 'fixed', precision: 2});
        console.log(info + " = ", value);
        expect(value.toString()).to.be.equal(expected);
        done();
    });
}


describe('TEST Number', function () {
    let expression_source = ['99*(45.9+2.2)*500=2380950.00', '99*(43.9+2.2)=4563.90', '43.9+2.2=46.10', '0.1+0.2=0.30', '2.445=2.45', '147.50497=147.50'];
    for (let item of expression_source) {
        let msg = item.split('=');
        runExpect(msg[0], msg[1]);
    }
});
