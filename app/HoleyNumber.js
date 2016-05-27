/**
 * Created by aman on 5/26/16.
 */

var {getRandomNumberFromZeroTo} = require('./mathHelpers');

class HoleyNumber extends Number {

    // TODO: move these arbitrary limits to the postconditions
    // or make them not arbitrary
    static random () {
        return getRandomNumberFromZeroTo(500);
    }
}

module.exports = {
    HoleyNumber: HoleyNumber
};
