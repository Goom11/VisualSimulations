/**
 * Created by aman on 5/29/16.
 */

var {Point, newCanvas} = require('./morphic');
var {Component} = require('./Component');
var {HoleyColor} = require('./HoleyColor');

class ColorPaletteComponent extends Component {
    constructor (target = null, size = new Point(80, 50), choice = HoleyColor.random()) {
        super();
        this.target = target;
        this.targetSetter = 'color';
        this.silentSetExtent(size);
        this.choice = choice;
        this.drawNew();
    }

    drawNew () {
        var extent = this.extent();
        this.image = newCanvas(this.extent());
        var context = this.image.getContext('2d');
        for (var x = 0; x <= extent.x; x += 1) {
            var h = 360 * x / extent.x;
            for (var y = 0; y <= extent.y; y += 1) {
                var l = 100 - (y / extent.y * 100);
                context.fillStyle = 'hsl(' + h + ',100%,' + l + '%)';
                context.fillRect(x, y, 1, 1);
            }
        }
    }

    // TODO: make choice definitely a holeycolor instead of color
    mouseMove (pos) {
        this.choice = HoleyColor.fromColor(this.getPixelColor(pos));
        this.updateTarget();
    }

    mouseDownLeft (pos) {
        this.choice = HoleyColor.fromColor(this.getPixelColor(pos));
        this.updateTarget();
    }

    updateTarget () {
        if (this.target && this.choice !== null) {
            this.target(this.choice);
        }
    }
}


module.exports = {
    ColorPaletteComponent: ColorPaletteComponent
};
