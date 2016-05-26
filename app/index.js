var Morphic = require('./morphic');

var world = new Morphic.WorldMorph(document.getElementById('world'));

world.isDevMode = true;

console.log("setup done, starting animation frame loop");

function loop() {
  requestAnimationFrame(loop);
  world.doOneCycle();
}

loop();
