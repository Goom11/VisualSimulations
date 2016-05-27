/**
 * Created by aman on 5/26/16.
 */

var {getRandomNumberFromZeroTo} = require('./mathHelpers');

class HoleyNumber extends Number {

    // TODO: move these arbitrary limits to the postconditions
    static random () {
        return getRandomNumberFromZeroTo(200);
    }
}

module.exports = {
    HoleyNumber: HoleyNumber
};
