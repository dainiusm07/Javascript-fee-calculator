const assert = require('chai').assert;
const isEmpty = require('../isEmpty');
const feeCalculation = require('../feeCalculation');
const roundFee = require('../roundFee');
const getWeekNumber = require('../getWeekNumber');

const data = [
    {
        "date": "2016-01-06",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_out",
        "operation": {
            "amount": 200,
            "currency": "EUR"
        }
    },
    {
        "date": "2016-01-07",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_out",
        "operation": {
            "amount": 850,
            "currency": "EUR"
        }
    }]
let user = [];

describe('App', function() {

    describe('isEmpty', function() {
        const testData = {
            test: 5
        };
        it('Should return false', function() {
            assert.equal(isEmpty(testData), false)
        });

        const testData2 = {};
        it('Should return true', function() {
            assert.equal(isEmpty(testData2), true)
        });
    });

    describe('getWeekNumber', function() {
        it('Should return [2019, 27]', function() {
            assert.deepEqual(getWeekNumber(new Date('2019-07-01')), [2019, 27])
        });

        it('Should return [2018, 1]', function() {
            assert.deepEqual(getWeekNumber(new Date('2018-01-01')), [2018, 1])
        });
    });

    describe('feeCalculation', function() {
        it('Should return 0', function(){
            assert.equal(feeCalculation(data[0], user), 0)
        });

        it('Should return 0.15', function(){
            assert.equal(feeCalculation(data[1], user), 0.15)
        });

        it('Should return 0.6', function(){
            assert.equal(feeCalculation(data[0], user), 0.6)
        });

    });

    describe('roundFee', function() {
        it('Should return 0.03', function() {
            assert.equal(roundFee(0.023), 0.03)
        });

        it('Should return 1.01', function() {
            assert.equal(roundFee(1.0000001), 1.01)
        });
    });
    
});