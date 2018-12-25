
window.onload = function () {
  let c = new Candy();
  c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  let current = new Particle(250,  1);
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

  c.smooth('high');

  let t = 0;
  function animate() {
    c.clear(rgba(5, 134, 255));

    c.push(); //--
    
    c.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    c.rotate(Math.PI/6);
    
    while(!current.finished() && !current.intersects(snowflakes)) {
      current.update();
    }

    snowflakes.push(current);
    current = new Particle(250, 1);
    renderMirrors();

    c.pop(); //--

    if(snowflakes[snowflakes.length -1].pos.x >= current.pos.x) {
      t++;
      if(t > 20) {
        snowflakes = [];
        t = 0;
      }
    }
    
    c.loop(animate);
  }
  animate();

}