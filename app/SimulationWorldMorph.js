/**
 * Created by aman on 5/25/16.
 */

var {WorldMorph} = require('./morphic');
var {ModifiableEllipseMorph} = require('./ModifiableEllipseMorph');

class SimulationWorldMorph extends WorldMorph {
    contextMenu() {
        var menu = super.contextMenu();
        menu.addLine();
        menu.addItem('modifiable ellipse morph', () => {
            var newMorph = new ModifiableEllipseMorph();
            newMorph.isDraggable = true;
            newMorph.pickUp(this);
        });
        return menu;
    }
}

module.exports = {
    SimulationWorldMorph: SimulationWorldMorph
};
