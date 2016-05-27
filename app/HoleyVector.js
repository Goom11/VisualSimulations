/**
 * Created by aman on 5/26/16.
 */

var {Point} = require('./morphic');
var {getRandomInRange, getRandomNumberFromZeroTo} = require('./mathHelpers');

class HoleyVector extends Point {
    constructor (direction, magnitude = 1) {
        super();
        this.init(direction, magnitude);
    }

    init (direction, magnitude) {
        var directionScaledToMagnitude =
            direction
                .divideBy(direction.r())
                .multiplyBy(magnitude);
        this.x = directionScaledToMagnitude.x;
        this.y = directionScaledToMagnitude.y;
    }

    // TODO: make this actually random // right now the direction is not random
    // TODO: move these arbitrary limits to the postconditions
    static random () {
        return new HoleyVector(
            new Point(getRandomInRange(-5, 5), getRandomInRange(-5, 5)),
            getRandomNumberFromZeroTo(10)
        );
    }


    direction () {
        return new Point(this.x, this.y);
    }

    normalizedDirection () {
        var direction = this.direction();
        return direction.divideBy(direction.r())
    }

    copy () {
        return new HoleyVector(this.direction(), this.r());
    }
}

module.exports = {
    HoleyVector : HoleyVector
};
