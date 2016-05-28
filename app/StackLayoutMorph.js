/**
 * Created by aman on 5/27/16.
 */

var {DebuggableMorph} = require('./DebuggableMorph');
var {Morph, Point, newCanvas} = require('./morphic');

class StackLayoutMorph extends DebuggableMorph {
    constructor (stackItems) {
        super();
        super.init();
        this.stackItems = stackItems;
        stackItems.forEach((stackItem) => {
            // if (item.parent === undefined) {
            //     item.parent = null;
            // }
            this.add(stackItem);
            stackItem.isDraggable = false;
            stackItem.stopMoving && stackItem.stopMoving();
        });
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

        var position = this.position();
        this.stackItems.reduce((previous, current) => {
            current.setPosition(new Point(position.x , previous));
            current.drawNew();
            return previous + current.height();
        }, position.y);
    }
}

module.exports = {
    StackLayoutMorph: StackLayoutMorph
};
