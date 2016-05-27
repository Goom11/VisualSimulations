/**
 * Created by aman on 5/26/16.
 */

var {Point} = require('./morphic');
var {getRandomIntFromZeroTo} = require('./mathHelpers');

class HoleyPosition extends Point {
    static random(world) {
        var bounds = world.bounds;
        var origin = bounds.origin;
        var dimensions = bounds.corner.subtract(origin);
        var newPosition = origin.add(
            new HoleyPosition(
                getRandomIntFromZeroTo(dimensions.x),
                getRandomIntFromZeroTo(dimensions.y)
            )
        );
        return newPosition;
    }
}

module.exports = {
    HoleyPosition: HoleyPosition
};
