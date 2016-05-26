var {ModifiableEllipseMorph} = require('./ModifiableEllipseMorph.js');
var {SimulationWorldMorph} = require('./SimulationWorldMorph');

var world = new SimulationWorldMorph(document.getElementById('world'));

world.isDevMode = true;

console.log("setup done, starting animation frame loop");


function loop() {
  requestAnimationFrame(loop);
  world.doOneCycle();
}

loop();
