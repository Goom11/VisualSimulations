/**
 * Created by aman on 5/25/16.
 */

var {WorldMorph} = require('./morphic');
var {ModifiableEllipseMorph} = require('./ModifiableEllipseMorph');

class SimulationWorldMorph extends WorldMorph {
    contextMenu() {
        var myself = this;
        var menu = super.contextMenu();
        menu.addLine();
        menu.addItem('modifiable ellipse morph', function () {
            var newMorph = new ModifiableEllipseMorph();
            newMorph.isDraggable = true;
            newMorph.pickUp(myself);
        });
        return menu;
    }
}

module.exports = {
    SimulationWorldMorph: SimulationWorldMorph
};
