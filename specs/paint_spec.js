const assert = require('assert');
const Paint = require('../models/paint.js');

describe ('Paint', function () {
    let fullPaintCan
    let emptyPaintCan 

    beforeEach (function() {
        fullPaintCan = new Paint(5)
        emptyPaintCan = new Paint(0)
    })

    it('should have a number of litres of paint', function () {
        actual = fullPaintCan.volume
        assert.strictEqual(actual, 5)
    })

    it('should be able to check if it is empty', function(){
        actualFull = fullPaintCan.hasPaint()
        assert.strictEqual(actualFull, true)
        actualEmpty = emptyPaintCan.hasPaint()
        assert.strictEqual(actualEmpty, false)
    })

    it('should be able to empty itself of paint', function() {
        fullPaintCan.empty()
        actual = fullPaintCan.volume
        assert.strictEqual(actual, 0)
    })
})