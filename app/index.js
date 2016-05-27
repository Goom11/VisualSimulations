var {SimulationWorldMorph} = require('./SimulationWorldMorph');

var world = new SimulationWorldMorph(document.getElementById('world'));

world.isDevMode = true;

module.exports = {
    world: world
};

function loop() {
    requestAnimationFrame(loop);
    world.doOneCycle();
}

console.log("setup done, starting animation frame loop");

loop();
