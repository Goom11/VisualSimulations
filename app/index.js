var {WorldMorph} = require('./morphic');
var {ModifiableEllipseMorph} = require('./ModifiableEllipseMorph.js');

var world = new WorldMorph(document.getElementById('world'));

world.isDevMode = true;

console.log("setup done, starting animation frame loop");

function loop() {
  requestAnimationFrame(loop);
  world.doOneCycle();
}

loop();
