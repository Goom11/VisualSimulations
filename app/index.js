var {WorldMorph} = require('./morphic');

var world = new WorldMorph(document.getElementById('world'));

world.isDevMode = true;

console.log("setup done, starting animation frame loop");

function loop() {
  requestAnimationFrame(loop);
  world.doOneCycle();
}

loop();
