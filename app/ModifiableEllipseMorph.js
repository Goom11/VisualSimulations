var {Point, newCanvas} = require('./morphic');
var {MovableMorph} = require('./MovableMorph');
var {HoleyPropertiesSet} = require('./HoleyPropertiesSet');
var {HoleyColor} = require('./HoleyColor');
var {HoleyPosition} = require('./HoleyPosition');
var {HoleyVector} = require('./HoleyVector');
var {HoleyNumber} = require('./HoleyNumber');

class ModifiableEllipseMorph extends MovableMorph {
    constructor () {
        super();
        this.init();
    }

    init () {
        super.init();
        this.setExtent(new Point(50, 50));
    }

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
        holeyProps.add({
            property : 'color',
            setter : 'setColor',
            propertyClass : HoleyColor,
        });

        holeyProps.add({
            property : 'position',
            setter : 'setPosition',
            propertyClass : HoleyPosition,
            postConditions : [
                function (aMorph) {
                    return aMorph.world().bounds.containsPoint(
                        aMorph.position().add(
                            new Point(aMorph.width(), aMorph.height())
                        )
                    );
                }
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

    cloneN () {
        for (var i = 0; i < 10; i++) {
            var clone = this.fullCopy();
            var world = this.world();
            clone.pickUp(world);
            world.hand.drop();
            var holeyProps = this.getHoleyProperties();
            var clonePostConditionsSatisfied = true;

            // create holey morph
            // check that holey morph is valid
            // if not valid, loop and reevaluate holey properties
            // if valid, done
            while (!holeyProps.applyOntoMorph(clone)) {}
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
