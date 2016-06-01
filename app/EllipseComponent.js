/**
 * Created by aman on 6/1/16.
 */

var {MorphComponent} = require('./MorphComponent');
var {Point, newCanvas} = require('./morphic');

class EllipseComponent extends MorphComponent {
    constructor (color) {
        super();
        this.color = color;
        this.setExtent(new Point(50, 50));
        this.drawNew();
    }

    drawNew () {
        this.image = newCanvas(this.extent());

        var context = this.image.getContext('2d');
        var color = this.color;
        context.fillStyle =
            color.toFillStyleString
                ? color.toFillStyleString()
                : color.toString();
        context.ellipse(
            this.width()/2,
            this.height()/2,
            this.width()/2,
            this.height()/2,
            0,
            0,
            2 * Math.PI,
            false
        );
        context.fill();
    }
}

module.exports = {
    EllipseComponent : EllipseComponent
};
