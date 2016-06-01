/**
 * Created by aman on 5/27/16.
 */

var {MorphComponent} = require('./MorphComponent');
var {Point, newCanvas} = require('./morphic');

class StackLayoutMorph extends MorphComponent {
    constructor (stackItems = []) {
        super();
        this.updateStackItems(stackItems);
        this.stackItems = stackItems;
    }

    updateStackItems (newStackItems) {
        var oldStackItems = this.stackItems;
        if (oldStackItems) {
            oldStackItems.forEach(_ => this.cleanMorph(_));
        }

        this.stackItems = newStackItems;
        newStackItems.forEach(_ => this.makeFixedChild(_));
        this.drawNew();
    }

    drawNew () {
        super.drawNew();
        if (!(this.stackItems) || this.stackItems.length === 0) {
            return;
        }

        var sizes = this.stackItems.map(c => c.extent());
        var maxWidth = Math.max.apply(null, sizes.map(s => s.x));
        var summedHeight =
            sizes
                .map(s => s.y) // get heights
                .reduce((previous, current) => previous + current, 0);
        this.silentSetExtent(new Point(maxWidth, summedHeight));

        this.image = newCanvas(this.extent());

        this.stackItems.reduce((previous, current) => {
            current.setPosition(previous);
            current.drawNew();
            return current.bottomLeft();
        }, this.position());
    }

    // TODO : check if this is necessary or morphic deals
    // mouseClickLeft (position) {
    //     console.log("oh no");
    //     debugger;
    // }
}

module.exports = {
    StackLayoutMorph: StackLayoutMorph
};
