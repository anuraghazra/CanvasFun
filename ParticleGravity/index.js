const c = new Candy();
c.createCanvas(800, 800);
c.fullScreen();

// let planet1 = new Particle();
// let planet2 = new Particle();
let sun = new Attractor(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
sun.mass = 100;
// planet1.mass = 10;
// planet2.mass = 10;

let particles = [];
let attractors = [];
window.onload = function () {

  c.canvas.addEventListener('mousedown', function (e) {
    if (e.which == 1) {
      particles.push(new Particle(e.offsetX, e.offsetY));    
    }
    if (e.which == 2) {
      attractors.push(new Attractor(e.offsetX, e.offsetY, 100));    
    }
  });
  

  function animate() {
    c.clear(35);

    for (let i = 0; i < particles.length; i++) {
      particles[i].attracted(sun);
      for (const a of attractors) {
        particles[i].attracted(a);
        // a.attracted(particles[i]);
        // a.attracted(sun);
        a.update();
        a.render();
      }
      particles[i].update();
      particles[i].render();
    }


    for (const a of attractors) {
      a.render();
      a.update();
    }
    
    // planet1.attracted(sun);
    // planet1.update();
    // planet1.render();

    // planet2.attracted(planet1)
    // planet2.attracted(planet1);
    // planet2.update();
    // planet2.render();
    // // planet2.attracted(sun);

    // // sun.attracted(planet1);
    sun.update();
    sun.render();

    c.loop(animate);
  }
  animate();

}