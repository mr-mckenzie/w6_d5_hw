const { access } = require('fs');
const Decorator = require('../models/decorator.js');
const Paint = require('../models/paint.js')
const Room = require('../models/room.js')
const assert = require('assert')

describe('Decorator', function () {
    let handyMan
    let paintCan
    let bathRoom

    beforeEach( function() {
        handyMan = new Decorator ()
        paintCan5L = new Paint(5)
        paintCan10L = new Paint(10)
        paintCan4L = new Paint(4)
        paintCan2L = new Paint(2)
        
        bathRoom = new Room(18)
    })

    it('should start with an empty paint stock', function() {
        const actual = handyMan.stock
        assert.deepStrictEqual(actual, [])
    })

    it('should be able to add a can of paint to paint stock', function () {
        handyMan.addPaintToStock(paintCan10L)
        handyMan.addPaintToStock(paintCan5L)
        const actual = handyMan.stock
        assert.deepStrictEqual(actual, [paintCan10L, paintCan5L])
    })

    it('should be able to calculate total litres of paint in stock', function() {
        handyMan.addPaintToStock(paintCan10L)
        handyMan.addPaintToStock(paintCan4L)
        handyMan.addPaintToStock(paintCan2L)
        const actual = handyMan.getTotalPaintInStock()
        assert.strictEqual(actual, 16)
    })

    it('should be able to calculate whether it has enough paint to paint a room', function() {
        handyMan.addPaintToStock(paintCan5L)
        handyMan.addPaintToStock(paintCan10L)
        handyMan.addPaintToStock(paintCan2L)
        let actual = handyMan.canPaintRoom(bathRoom)
        assert.strictEqual(actual, false)
        handyMan.addPaintToStock(paintCan4L)
        actual = handyMan.canPaintRoom(bathRoom)
        assert.strictEqual(actual, true)
    })

    it('should be able to paint a room if it has enough stock', function () {
        handyMan.addPaintToStock(paintCan10L)
        handyMan.addPaintToStock(paintCan5L)
        handyMan.addPaintToStock(paintCan2L)
        handyMan.paint(bathRoom)
        let actual = bathRoom.painted
        assert.strictEqual(actual, false)
        handyMan.addPaintToStock(paintCan4L)
        handyMan.paint(bathRoom)
        actual = bathRoom.painted
        assert.strictEqual(actual, true)
    })

    it('should be able to decrease amount of paint in stock when painting a room', function() {
        handyMan.addPaintToStock(paintCan10L)
        handyMan.addPaintToStock(paintCan5L)
        handyMan.paint(bathRoom)
        let actual = handyMan.getTotalPaintInStock()
        assert.strictEqual(actual, 15)
        handyMan.addPaintToStock(paintCan4L)
        handyMan.addPaintToStock(paintCan2L)
        handyMan.paint(bathRoom)
        actual = handyMan.getTotalPaintInStock()
        assert.strictEqual(actual, 2)
    })

    it('Should be able to remove empty cans from stock', function () {
        handyMan.addPaintToStock(paintCan5L)
        handyMan.addPaintToStock(paintCan10L)
        handyMan.addPaintToStock(paintCan4L)
        handyMan.addPaintToStock(paintCan2L)
        handyMan.paint(bathRoom)
        handyMan.removeEmptyCans()
        const actual = handyMan.stock
        assert.deepStrictEqual(actual, [paintCan2L])
    })
})