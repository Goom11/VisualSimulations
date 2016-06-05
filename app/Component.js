var {Point, newCanvas} = require('./morphic');
var {MovableMorph} = require('./MovableMorph');
var {HoleyPropertiesSet} = require('./HoleyPropertiesSet');
// var {HoleyColor} = require('./HoleyColor');
var {HoleyPosition} = require('./HoleyPosition');
var {HoleyVector} = require('./HoleyVector');
var {HoleyNumber} = require('./HoleyNumber');

class Component extends MovableMorph {
    constructor () {
        super();
        this.setExtent(new Point(0, 0));
        this.toCloneCount = 0;
    }

    drawNew () {
        this.image = newCanvas(this.extent());
    }

    developersMenu () {
        var menu = super.developersMenu();
        menu.addLine();
        menu.addItem(
            "CloneN...",
            'cloneN',
            'make multiple clones of this object'
        );
        return menu;
    }

    getHoleyProperties () {
        var holeyProps = new HoleyPropertiesSet();

        holeyProps.add({
            property : 'position',
            setter : 'setPosition',
            propertyClass : HoleyPosition,
            postConditions : [
                    aMorph => aMorph.world().bounds.containsPoint(
                        aMorph.position().add(aMorph.extent())
                    )
            ],
        });

        holeyProps.add({
            property : 'moveVector',
            setter : 'setMoveVector',
            propertyClass : HoleyVector,
        });

        // TODO : convert height and width into a size property
        holeyProps.add({
            property : 'height',
            setter : 'setHeight',
            propertyClass : HoleyNumber,
        });

        holeyProps.add({
            property : 'width',
            setter : 'setWidth',
            propertyClass : HoleyNumber,
        });

        return holeyProps;
    }

    // TODO : make this work for StackLayoutMorph and others(?)
    clone () {
        var clone = this.fullCopy();
        clone.toCloneCount = 0;
        var world = this.world();
        // TODO : don't pickup and drop but just place
        clone.pickUp(world);
        world.hand.drop();
        var holeyProps = this.getHoleyProperties();

        // create holey morph
        // check that holey morph is valid
        // if not valid, loop and reevaluate holey properties
        // if valid, done
        while (!holeyProps.applyOntoMorph(clone)) {}
    }

    cloneN () {
        this.toCloneCount = this.toCloneCount + 20;
    }

    step () {
        super.step();
        if (this.toCloneCount > 0) {
            for (var i = 0; i < 20; i++) {
                if (this.toCloneCount > 0) {
                    this.clone();
                    this.toCloneCount = this.toCloneCount - 1;
                }
            }
        }
    }

    cleanMorph (aMorph) {
        this.removeChild(aMorph);
        aMorph.destroy();
    }

    makeFixedChild (aMorph) {
        this.add(aMorph);
        aMorph.isDraggable = false;
        // TODO : am I being overly cautious?
        aMorph.stopMoving && aMorph.stopMoving();
    }
}


module.exports = {
    Component: Component
};
