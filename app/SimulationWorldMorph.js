/**
 * Created by aman on 5/25/16.
 */

var {WorldMorph, Morph, BoxMorph, CircleBoxMorph} = require('./morphic');
var {ModifiableEllipseMorph} = require('./ModifiableEllipseMorph');
var {StackLayoutMorph} = require('./StackLayoutMorph');
var {CompositeMorph} = require('./CompositeMorph');
var {HoleyColor} = require('./HoleyColor');
var {ColorPickerComponent} = require('./ColorPickerComponent');

class SimulationWorldMorph extends WorldMorph {
    contextMenu() {
        var menu = super.contextMenu();
        var createAndDrop = (aMorph) => {
            aMorph.isDraggable = true;
            aMorph.pickUp(this);
        };
        menu.addLine();
        menu.addItem('modifiable ellipse morph',
            () => createAndDrop(new ModifiableEllipseMorph()));
        menu.addLine();
        menu.addItem('test stack layout morph',
            () => createAndDrop(
                new StackLayoutMorph(
                    [new Morph(), new BoxMorph(), new CircleBoxMorph()]
                )
            )
        );
        menu.addItem('test composite layout morph',
            () => createAndDrop(new CompositeMorph(new Morph()))
        );
        menu.addItem('test color morph can draw itself',
            () => createAndDrop(HoleyColor.random())
        );
        if (!this.myColor) {
            this.myColor = {};
            this.myColor.value = HoleyColor.random();
        }
        menu.addItem('test color picker component can draw itself',
            () => createAndDrop(
                new ColorPickerComponent(
                    this.myColor.value,
                    (newColor) => this.myColor.value = newColor
                )
            )
        );
        return menu;
    }
}

module.exports = {
    SimulationWorldMorph: SimulationWorldMorph
};
