/**
 * Created by aman on 5/27/16.
 */

var {ModifiableEllipseMorph} = require('./ModifiableEllipseMorph');
var {Point, newCanvas} = require('./morphic');

class CompositeMorph extends ModifiableEllipseMorph {
    constructor (subMorph) {
        super();
        this.subMorph = subMorph;
        this.add(subMorph);
        subMorph.isDraggable = false;
        subMorph.stopMoving && subMorph.stopMoving();
        this.drawNew();
    }

    drawNew () {
        super.drawNew();

        if (!this.subMorph) {
           return;
        }
        this.silentSetExtent(new Point(this.subMorph.width(), this.subMorph.height()));
        this.image = newCanvas(this.extent());
        this.subMorph.setPosition(this.position());
        this.subMorph.drawNew();
    }

    mouseClickLeft (position) {
        return this.subMorph.mouseClickLeft(position);
    }
}

module.exports = {
    CompositeMorph: CompositeMorph
};
