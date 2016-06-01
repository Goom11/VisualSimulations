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
        super();
        this.updateColorPicker(color, target);
    }

    updateColorPicker(newColor, newTarget = this.target) {
        this.color = newColor;
        this.target = newTarget;
        this.colorPaletteComponent = new ColorPaletteComponent(
            (_) => {
                this.updateColorPicker(_);
                var target = this.target;
                target && target(newColor);
            },
            new Point(80, 50),
            this.color
        );
        this.updateSubMorph(
            new StackLayoutMorph([
                this.color,
                this.colorPaletteComponent
            ])
        );
    }

}

module.exports = {
    ColorPickerComponent: ColorPickerComponent
};
