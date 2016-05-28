/**
 * Created by aman on 5/27/16.
 */

var {Morph} = require('./morphic');

class DebuggableMorph extends Morph {
    debugInConsole () {
        console.log(this);
        debugger;
    }

    developersMenu () {
        var menu = super.developersMenu();
        menu.addLine();
        menu.addItem(
            "Debug in console...",
            'debugInConsole',
            'debug this morph in the console'
        );
        return menu;
    }
}

module.exports = {
    DebuggableMorph: DebuggableMorph
};
