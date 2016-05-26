/**
 * Created by aman on 5/25/16.
 */

var {Morph} = require('./morphic');


// MovableMorph ////////////////////////////////////////////////////////

var MovableMorph;

// Movables inherit from Morph:

MovableMorph.prototype = new Morph();
MovableMorph.prototype.constructor = MovableMorph;
MovableMorph.uber = Morph.prototype;

// MovableMorph instance creation:

function MovableMorph() {
    this.init();
}

// MovableMorph initialization:

MovableMorph.prototype.init = function (type, speed) {
    MovableMorph.uber.init.call(this);
    this.fps = 50;

    this.moveVector = new Point(0, 0);
};

// MovableMorph moving:
// MovableMorph stepping:

MovableMorph.prototype.step = function () {
    this.moveBy(this.moveVector);
    if (this.fullBounds().top() < this.parent.top()) {
        this.moveVector = new Point(this.moveVector.x, -1 * this.moveVector.y);
    }
    if (this.fullBounds().bottom() > this.parent.bottom()) {
        this.moveVector = new Point(this.moveVector.x, -1 * this.moveVector.y);
    }
    if (this.fullBounds().left() < this.parent.left()) {
        this.moveVector = new Point(-1 * this.moveVector.x, this.moveVector.y);
    }
    if (this.fullBounds().right() > this.parent.right()) {
        this.moveVector = new Point(-1 * this.moveVector.x, this.moveVector.y);
    }
    if (this.overlappedMorphs().length !== 0) {
        this.moveVector = this.moveVector.multiplyBy(-1);
    }
};

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




