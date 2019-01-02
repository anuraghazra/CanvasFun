let c = new Candy('#c', 400, 400);
c.fullScreen();

window.onload = function () {
  let watch = new LEDWatch(CANVAS_WIDTH/2-225, CANVAS_HEIGHT/2-50);

  let arr = [
    'Watch out for the watch',
    'You must watch this watch',
    'This watch is glowing'
  ];

  let str = arr[randomInt(0,3)];
  c.noStroke();
  function animate() {
    c.clear(rgba(25,25,25,0.75));

    watch.update();
    watch.render();

    c.fill(rgba(255,255,255,0.2));
    c.textSize(18)
    c.textFont("'Quicksand', monospace");
    c.textAlign(CENTER);
    c.text(str, watch.x+225, watch.y+180);

    c.loop(animate);
  }
  window.setInterval(function () {
    str = arr[randomInt(0,3)];
  }, 1000);
  animate();
}