/**
 * Created by aman on 5/26/16.
 */

// [min, max) // min is included, max is excluded
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomNumberFromZeroTo (max) {
    return getRandomInRange(0, max);
}

function getRandomIntFromZeroTo (max) {
    return Math.floor(getRandomNumberFromZeroTo(max));
}

module.exports = {
    getRandomInRange : getRandomInRange,
    getRandomNumberFromZeroTo: getRandomNumberFromZeroTo,
    getRandomIntFromZeroTo: getRandomIntFromZeroTo,
};

