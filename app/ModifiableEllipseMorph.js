var {Point, newCanvas} = require('./morphic');
var {MovableMorph} = require('./MovableMorph');
var {HoleyPropertiesSet} = require('./HoleyPropertiesSet');
// var {HoleyColor} = require('./HoleyColor');
var {HoleyPosition} = require('./HoleyPosition');
var {HoleyVector} = require('./HoleyVector');
var {HoleyNumber} = require('./HoleyNumber');

class ModifiableEllipseMorph extends MovableMorph {
    constructor () {
        super();
        this.setExtent(new Point(50, 50));
        this.toCloneCount = 0;
    }

    // TODO : add attributes box
    // mouseClickLeft () {
    //     console.log("ugh");
    // }

    drawNew () {
        this.image = newCanvas(this.extent());
        var context = this.image.getContext('2d');
        context.fillStyle = this.color.toString();
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

    developersMenu () {
        var menu = super.developersMenu();
        menu.addLine();
        menu.addItem(
            "CloneN...",
            'cloneN',
            'make multiple clones of this object'
        );
        menu.addLine();
        menu.addItem(
            "Open In Prototype Tree",
            'openInPrototypeTree',
            'open this morph in the prototype tree'
        );
        return menu;
    }

    getHoleyProperties () {
        var holeyProps = new HoleyPropertiesSet();
//         holeyProps.add({
//             property : 'color',
//             setter : 'setColor',
//             propertyClass : HoleyColor,
//         });

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

    openInPrototypeTree () {
        // open prototype tree at this morph or update prototype tree to focus on this morph
        var prototypeTree = new PrototypeTreeMorph();
        prototypeTree.isDraggable = true;
        var world = this.world();
        prototypeTree.pickUp(world);
        world.hand.drop();
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

class PrototypeTreeMorph extends ModifiableEllipseMorph {
    constructor () {
        super();
        this.init();
    }

    init () {
        super.init();
    }
}

module.exports = {
    ModifiableEllipseMorph: ModifiableEllipseMorph
};
