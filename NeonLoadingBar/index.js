/**
 * NeonLoadingBar in Javascript By anuraghazra
 */
let WIDTH = null;
let HEIGHT = null;
window.onload = function () {
  let canvas = document.getElementById('c');
  let ctx = canvas.getContext('2d');
  WIDTH = canvas.width = window.innerWidth;
  HEIGHT = canvas.height = window.innerHeight;


  const PARTICLE_COUNT = 200;

  let fs = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    fs.push(new Particle(ctx));
  }

  function animate() {
    ctx.globalCompositeOperation = 'destination-atop';

    let grd = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 0, WIDTH / 2, HEIGHT / 2, WIDTH);
    grd.addColorStop(0, "rgba(25,25,54, 1)");
    grd.addColorStop(1, "rgba(0,0,20,1)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (let i = 0; i < fs.length; i++) {
      fs[i].move()
      fs[i].render(ctx)
    }

    requestAnimationFrame(animate);
  }
  animate();
}