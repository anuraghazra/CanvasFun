const c = new Candy();
c.createCanvas(800, 800);
c.fullScreen();

let particles = [];
let attractors = [];
window.onload = function () {

  c.canvas.addEventListener('mousedown', function (e) {
    if (e.which == 1) {
      particles.push(new Particle(e.offsetX, e.offsetY));
    }
    if (e.which == 2) {
      attractors.push(new Attractor(e.offsetX, e.offsetY, 1000));
    }
  });


  function animate() {
    c.clear(35);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // if (i !== p) {
      //   p.attracted(p)
      // }
      for (const a of attractors) {
        p.attracted(a);
        a.attracted(p);
      }
      p.update();
      p.render();
      p.edges();
    }


    for (const a of attractors) {
      a.update();
      a.edges();
      a.render();
    }

    c.loop(animate);
  }
  animate();

}