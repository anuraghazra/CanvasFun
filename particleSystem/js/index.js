function rand(min, max) {
  return min + Math.random() * max;
}

let canvas = document.querySelector('#c');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let c = new Candy(canvas);

window.onload = function() {
  
  let img = new Image();
  img.src = '/particleSystem/texture/emitter1.png';

  let ps = new ParticleSystem(width/2,400, img);

  let mouseX = 0;
  let mouseY = 0;
  canvas.addEventListener('mousemove', function(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  });
  
  function animate() {
    ctx.fillStyle = '#151515'
    ctx.fillRect(0,0,width,height);

    ps.origin.x = mouseX+rand(0,30);
    ps.origin.y = mouseY;
    for (let i = 0; i < 5; i++) {
      ps.addParticle();
    }
    ps.update(ctx);

    requestAnimationFrame(animate);
  }
  animate();
}