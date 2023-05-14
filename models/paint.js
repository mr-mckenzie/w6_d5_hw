const Paint = function (volume) {
    this.volume = volume
}

Paint.prototype.hasPaint = function () {
    if (this.volume) {
        return true
    } 
    return false
}

Paint.prototype.empty = function () {
    this.volume = 0
}

module.exports = Paint