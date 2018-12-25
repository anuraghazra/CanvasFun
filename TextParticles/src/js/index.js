let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');


let width = canvas.width = 500;
let height = canvas.height = 500;

// OS canvas
let oSCanvas = document.createElement('canvas');
oSCanvas.width = width;
oSCanvas.height = height;
let oSCtx = oSCanvas.getContext('2d');

// document.body.appendChild(oSCanvas)

let url = 'https://anuraghazra.github.io/CanvasFun/TextParticles/src/images/mypic.jpg'
let points = [];
let maxParticles = 10;
let pointSize = 6;

let mx,my;
let mouse = new Vector(0,0);

canvas.addEventListener('mousemove', function(e) {
  mx = e.offsetX;
  my = e.offsetY;
})

let isImageloaded = false;
let img = new Image();
img.src = url;
img.onerror = function() {
  return;
}
img.onload = function() {
  isImageloaded = true;
}

let count = 1;
function animate() {

  if (!isImageloaded) {
    requestAnimationFrame(animate);
    return;
  }
  renderImage(25,25,width-100,height-50);
  
  if(count > 0) {
    getPixelCoords();
  }
  count--;

  ctx.fillStyle = '#151515'
  // ctx.fillStyle = 'rgba(0,150,255)'
  ctx.fillRect(0, 0, width, height);
  

  mouse = new Vector(mx, my);
  for (let i = 0; i < points.length; i++) {
    points[i].behaviour(mouse);
    points[i].update();
    points[i].render();
  }
  requestAnimationFrame(animate);


}
console.log(points.length);

animate();
