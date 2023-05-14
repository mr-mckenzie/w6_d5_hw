const Decorator = function () {
    this.stock = []
}

Decorator.prototype.addPaintToStock = function (paintToAdd) {
    this.stock.push(paintToAdd)
}

Decorator.prototype.getTotalPaintInStock = function() {
    let total = this.stock.reduce((accumulator, paintCan) => {
    return accumulator += paintCan.volume},
    0
    )
    return total
}

Decorator.prototype.canPaintRoom = function (roomToPaint) {
    const totalPaintInStock = this.getTotalPaintInStock()
    const paintRequired = roomToPaint.area
    if (totalPaintInStock >= paintRequired) {
        return true
    }
    return false
} 

Decorator.prototype.paint = function (roomToPaint) {
    this.removeEmptyCans()
    if (this.canPaintRoom(roomToPaint)) {
        let paintNeeded = roomToPaint.area
        roomToPaint.painted = true
        for (const paintCan of this.stock) {
            if (paintNeeded > 0) {
                paintNeeded -= paintCan.volume
                paintCan.empty()
            }
        }
        this.removeEmptyCans()
    }
}

Decorator.prototype.removeEmptyCans = function () {
    const fullCans = this.stock.filter( (paintCan) => paintCan.volume > 0)
    this.stock = fullCans
}

module.exports = Decorator