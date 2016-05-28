/**
 * Created by aman on 5/25/16.
 */

var {WorldMorph, Morph, BoxMorph, CircleBoxMorph} = require('./morphic');
var {ModifiableEllipseMorph} = require('./ModifiableEllipseMorph');
var {StackLayoutMorph} = require('./StackLayoutMorph');

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
        return menu;
    }
}

module.exports = {
    SimulationWorldMorph: SimulationWorldMorph
};
