
window.onload = function () {
  let c = new Candy();
  c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  let current = new Particle(250,  0);
  let snowflakes = [];


  function renderMirrors() {
    // mirror 6 times
    for (let i = 0; i < 6; i++) {
      c.rotate(Math.PI/3)
      for (let p of snowflakes) {
        p.render(c);
      }

      c.push();
      c.ctx.scale(1, -1)
      for (let p of snowflakes) {
        p.render(c);
      }
      c.pop();
    }
  }

  c.smooth();
  function animate() {
    c.clear(rgba(5, 134, 255));

    c.push(); //--
    
    c.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    c.rotate(Math.PI/6);
    
    while(!current.finished() && !current.intersects(snowflakes)) {
      current.update(c);   
    }

    if (current.pos.x < WINDOW_WIDTH/2) {
      snowflakes.push(current);
      current = new Particle(250, 0);
    }
    renderMirrors();

    c.pop(); //--

    c.loop(animate);
  }
  animate();

}