
/*
  Simple Physics Based DVD Logo Bounce
  All the physics is handled by verlet.js https://github.com/anuraghazra/verlet.js
  read the docs of verlet.js https://github.com/anuraghazra/verlet.js/blob/master/README.md
  verlet.js written by me from scratch. and its super simple try it out 

  if you love if try out my other project VerletDrawing at https://anuraghazra.github.io/VerletDrawing/
*/
window.onload = function () {
  let addrope = document.getElementById('addrope');

  // width, height, canvasid, gravity, friction, stiffness
  const verlet = new Verlet(window.innerWidth, window.innerHeight - 4, '#c', 0, 1, 0.75);
  verlet.bounce = 1.5;
  let dots = [];
  let cons = [];
  let images = [];

  addObejcts();
  function addObejcts() {
    dots = [];
    cons = [];
    images = [];

    // simple Poly Objects
    verlet.Poly.box({
      width: 200, height: 100,
      vx: -100, vy: -50
    }, dots, cons);

    verlet.Poly.box({
      width: 250, height: 200,
      x: 800, y: 0,
      vx: 45, vy: 60
    }, dots, cons);

    // if you wanna have more fun
    // verlet.Poly.cloth({ segs: 50 }, dots, cons);

    // Join them with rope
    if (addrope.checked) {
      verlet.Poly.rope({ segs: 50 }, dots, cons);
      dots[8].pinned = false;

      // join the rope with boxes
      verlet.clamp([
        [8, 0, { length: 10 }],
        [57, 4, { length: 10 }]
      ], dots, cons);
    }

    // render images on to vertex
    verlet.throwImage([1, 0, 3, 2], './dvd-logo-png-18.png', images, dots);
    verlet.throwImage([5, 4, 12, 6], './train.png', images, dots);
    verlet.Interact.move(dots);
  }

  addrope.onchange = () => addObejcts();

  function animate() {
    verlet.frame(animate, '#252525');

    verlet.superUpdate(dots, cons, 25, { hoverColor: 'white' });
    verlet.superRender(dots, cons, {
      renderDots: false,
      renderLines: true,
      lineColor: 'white',
      // renderPointIndex : true,
      renderImages: true,
      images: images
    });
  }
  animate();
}