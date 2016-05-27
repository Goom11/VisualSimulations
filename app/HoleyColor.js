/**
 * Created by aman on 5/26/16.
 */

var {Color} = require('./morphic');
var {getRandomIntFromZeroTo} = require('./mathHelpers');

class HoleyColor extends Color {
    static random() {
        return new HoleyColor(
            getRandomIntFromZeroTo(256),
            getRandomIntFromZeroTo(256),
            getRandomIntFromZeroTo(256),
            Math.random()
        );
    }
}

module.exports = {
    HoleyColor: HoleyColor
};
