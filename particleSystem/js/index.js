let c = new Candy();
c.createCanvas(800, 600);

window.onload = function() {
  
  c.trypreload();
  let img = c.loadImage('https://anuraghazra.github.io/CanvasFun/particleSystem/texture/emitter1.png');
  let ps;

  c.preload = function() {
    ps = new ParticleSystem(CANVAS_WIDTH/2, 400, img);
    animate();
    console.log('ok')
  }

  c.noStroke();

  function animate() {
    c.clear('#151515');
    
    ps.origin.x = mouseX+random(0,30);
    ps.origin.y = mouseY;
    for (let i = 0; i < 5; i++) {
      ps.addParticle();
    }
    ps.update();

    requestAnimationFrame(animate);
  }

}