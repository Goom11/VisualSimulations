/**
 * Created by aman on 5/27/16.
 */

var {ModifiableEllipseMorph} = require('./ModifiableEllipseMorph');
var {Point, newCanvas} = require('./morphic');

class CompositeMorph extends ModifiableEllipseMorph {
    constructor (subMorph) {
        super();
        this.updateSubMorph(subMorph);
    }

    updateSubMorph(subMorph) {
        var oldSubMorph = this.subMorph;
        if (oldSubMorph) {
            this.cleanMorph(oldSubMorph);
        }

        this.subMorph = subMorph;
        if (subMorph) {
            this.makeFixedChild(subMorph);
        }
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

    // TODO : figure out if I need this systematically
    // mouseClickLeft (position) {
        // return this.subMorph.mouseClickLeft(position);
    // }
}

module.exports = {
    CompositeMorph: CompositeMorph
};
