
var {Point, newCanvas} = require('./morphic');
var {MovableMorph} = require('./MovableMorph');

// ModifiableEllipseMorph //

// I can be modified with constraints

var ModifiableEllipseMorph;

// ModifiableEllipseMorph inherits from Morph;

ModifiableEllipseMorph.prototype = new MovableMorph();
ModifiableEllipseMorph.prototype.constructor = ModifiableEllipseMorph;
ModifiableEllipseMorph.uber = MovableMorph.prototype;

function ModifiableEllipseMorph() {
    this.init();
}

ModifiableEllipseMorph.prototype.init = function () {
    ModifiableEllipseMorph.uber.init.call(this);
    this.setExtent(new Point(50, 50));
};

ModifiableEllipseMorph.prototype.drawNew = function () {
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
};


var PrototypeTreeMorph;

ModifiableEllipseMorph.prototype.openInPrototypeTree = function () {
    // open prototype tree at this morph or update prototype tree to focus on this morph
    var prototypeTree = new PrototypeTreeMorph();
    prototypeTree.isDraggable = true;
    var world = this.world();
    prototypeTree.pickUp(world);
    world.hand.drop();
};

ModifiableEllipseMorph.prototype.developersMenu = function () {
    var menu = ModifiableEllipseMorph.uber.developersMenu.call(this);
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
};

ModifiableEllipseMorph.prototype.cloneN = function () {
    for (var i = 0; i < 100; i++) {
        var copy = this.fullCopy();
        var world = this.world();
        copy.pickUp(world);
        world.hand.drop();

        var bounds = world.bounds;
        var origin = bounds.origin;
        var dimensions = bounds.corner.subtract(origin);

        var getRandomIntFromZeroTo = function (max) {
            return Math.floor(Math.random() * max);
        };

        var newPosition = origin.add(
            new Point(
                getRandomIntFromZeroTo(dimensions.x),
                getRandomIntFromZeroTo(dimensions.y)
            )
        );

        var copySize = new Point(copy.width(), copy.height());
        while (!bounds.containsPoint(newPosition.add(copySize))) {
            newPosition = origin.add(
                new Point(
                    getRandomIntFromZeroTo(dimensions.x),
                    getRandomIntFromZeroTo(dimensions.y)
                )
            );
        }

        copy.setPosition(newPosition);
    }
};


// PrototypeTreeMorph //

// Displays the prototype tree for all ModifiableEllipseMorph

var PrototypeTreeMorph;

// PrototypeTreeMorph inherits from ModifiableEllipseMorph;

PrototypeTreeMorph.prototype = new ModifiableEllipseMorph();
PrototypeTreeMorph.prototype.constructor = PrototypeTreeMorph;
PrototypeTreeMorph.uber = ModifiableEllipseMorph.prototype;

function PrototypeTreeMorph() {
    this.init();
}

PrototypeTreeMorph.prototype.init = function () {
    PrototypeTreeMorph.uber.init.call(this);
};

module.exports = {
    ModifiableEllipseMorph: ModifiableEllipseMorph
};
