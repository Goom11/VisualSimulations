/**
 * Created by aman on 5/25/16.
 */

var {Morph, Point} = require('./morphic');


// MovableMorph ////////////////////////////////////////////////////////

var MovableMorph;

// Movables inherit from Morph:

MovableMorph.prototype = new Morph();
MovableMorph.prototype.constructor = MovableMorph;
MovableMorph.uber = Morph.prototype;

// MovableMorph instance creation:

function MovableMorph() {
    this.init();
}

// MovableMorph initialization:

MovableMorph.prototype.init = function (type, speed) {
    MovableMorph.uber.init.call(this);
    this.fps = 50;

    this.moveVector = new Point(0, 0);
};

// MovableMorph moving:
// MovableMorph stepping:

MovableMorph.prototype.step = function () {
    this.moveBy(this.moveVector);
    if (this.fullBounds().top() < this.parent.top()) {
        this.moveVector = new Point(this.moveVector.x, -1 * this.moveVector.y);
    }
    if (this.fullBounds().bottom() > this.parent.bottom()) {
        this.moveVector = new Point(this.moveVector.x, -1 * this.moveVector.y);
    }
    if (this.fullBounds().left() < this.parent.left()) {
        this.moveVector = new Point(-1 * this.moveVector.x, this.moveVector.y);
    }
    if (this.fullBounds().right() > this.parent.right()) {
        this.moveVector = new Point(-1 * this.moveVector.x, this.moveVector.y);
    }
    if (this.overlappedMorphs().length !== 0) {
        this.moveVector = this.moveVector.multiplyBy(-1);
    }
};

module.exports = {
    MovableMorph: MovableMorph
};
