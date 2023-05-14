const assert = require('assert');
const Room = require('../models/room.js')

describe('Room', function () {

    let livingRoom

    beforeEach(function () {
        livingRoom = new Room(50)
    })

    it('should have an area', function() {
        const actual = livingRoom.area
        assert.strictEqual(actual, 50)
    })

    it('should start unpainted', function() {
        const actual = livingRoom.painted
        assert.strictEqual(actual, false)
    })

    it('should be able to be painted', function() {
        livingRoom.paint()
        const actual = livingRoom.painted
        assert.strictEqual(actual, true)
    })

})