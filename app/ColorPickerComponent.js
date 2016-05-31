/**
 * Created by aman on 5/29/16.
 */

var {Point} = require('./morphic');
var {CompositeMorph} = require('./CompositeMorph');
var {StackLayoutMorph} = require('./StackLayoutMorph');
var {HoleyColor} = require('./HoleyColor');
var {ColorPaletteComponent} = require('./ColorPaletteComponent');

class ColorPickerComponent extends CompositeMorph {
    constructor (color = HoleyColor.random(), target = null) {
        var myself;
        super(
            new StackLayoutMorph([
                color,
                new ColorPaletteComponent(target, new Point(80, 50), color)
            ])
        );
        myself = this;
        this.color = color;
    }
};

module.exports = {
    ColorPickerComponent: ColorPickerComponent
};
