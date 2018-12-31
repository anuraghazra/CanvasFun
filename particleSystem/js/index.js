let c = new Candy();
c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

window.onload = function() {
  
  c.trypreload();
  // let img = c.loadImage('https://anuraghazra.github.io/CanvasFun/particleSystem/texture/emitter1.png');
  let img2 = c.loadImage('https://anuraghazra.github.io/CanvasFun/particleSystem/texture/emitter.png');
  let img3 = c.loadImage('https://anuraghazra.github.io/CanvasFun/particleSystem/texture/particle.png');
  
  let ps;

  c.preload = function() {
    ps = new ParticleSystem(CANVAS_WIDTH/2, 400, [img2, img3]);
    animate();
  }

  c.noStroke();

  let angle = 0;
  function animate() {
    c.clear('#151515');

    angle += 0.05;
    
    ps.origin.x = mouseX+Math.cos(angle)*100;
    ps.origin.y = mouseY+Math.sin(angle)*100;
    for (let i = 0; i < 5; i++) {
      ps.addParticle();
    }
    ps.update();

    requestAnimationFrame(animate);
  }

}