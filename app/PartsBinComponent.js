/**
 * Created by aman on 6/1/16.
 */

var {Point} = require('./morphic');
var {CompositeMorph} = require('./CompositeMorph');
var {StackLayoutMorph} = require('./StackLayoutMorph');
var {HoleyColor} = require('./HoleyColor');
var {ColorPaletteComponent} = require('./ColorPaletteComponent');
var {Component} = require('./Component');

class PartsBinComponent extends CompositeMorph {
    constructor (parts = [ModifiableEllipseMorph]) {
        super();
        this.updatePartsBin(parts);
    }

    updatePartsBin(newParts) {
        this.parts = newParts;
        this.updateSubMorph(
            new StackLayoutMorph([])
        );
    }
}

module.exports = {
    PartsBinComponent: PartsBinComponent
};
