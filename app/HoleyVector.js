/**
 * Created by aman on 5/26/16.
 */

var {Point} = require('./morphic');
var {getRandomInRange, getRandomNumberFromZeroTo} = require('./mathHelpers');

class HoleyVector extends Point {
    constructor (direction, magnitude = 1) {
        super();
        this.direction = direction;
        this.magnitude = magnitude;
        this.polarToCartesianSave();
    }

    copy () {
        return new HoleyVector(this.direction, this.r());
    }

    // TODO: make this actually random // right now the direction is biased towards corners
    // TODO: move these arbitrary limits to the postconditions
    static random () {
        return new HoleyVector(
            new Point(getRandomInRange(-5, 5), getRandomInRange(-5, 5)),
            getRandomNumberFromZeroTo(10)
        );
    }

    setMagnitude (magnitude) {
        this.magnitude = magnitude;
        this.polarToCartesianSave();
    }

    setDirection (direction) {
        this.direction = direction;
        this.polarToCartesianSave();
    }

    normalizedDirection () {
        var direction = this.direction;
        return direction.divideBy(direction.r())
    }

    cartesianToPolarSave () {
        var newDirection = new Point(this.x, this.y);
        this.magnitude = newDirection.r();
        if (this.x === 0 && this.y === 0) {
            // don't update direction
            return;
        } else {
            this.direction = newDirection;
        }
    }

    polarToCartesianSave () {
        var direction = this.direction;
        var directionScaledToMagnitude =
            direction.divideBy(direction.r()).multiplyBy(this.magnitude);
        this.x = directionScaledToMagnitude.x;
        this.y = directionScaledToMagnitude.y;
    }

}

module.exports = {
    HoleyVector : HoleyVector
};
