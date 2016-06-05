/**
 * Created by aman on 5/25/16.
 */

var {EllipseComponent} = require('./EllipseComponent');
var {WorldMorph, Morph, BoxMorph, CircleBoxMorph} = require('./morphic');
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
            () => createAndDrop(new EllipseComponent()));
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
            () => {
                var color = HoleyColor.random();
                color.visualize(color => new EllipseComponent(color));
                createAndDrop(color);
            }
        );
        menu.addItem('test color picker component can draw itself',
            () => createAndDrop(new ColorPickerComponent())
        );
        return menu;
    }
}

module.exports = {
    SimulationWorldMorph: SimulationWorldMorph
};
