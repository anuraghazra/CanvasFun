let canvas = document.getElementById('c');
let width = 500;
let height = 500;

canvas.width = width;
canvas.height = height;

let ctx = canvas.getContext('2d');

let tileWidth = 50;
let tileHeight = 25;

ctx.translate(width / 2 , 250);

function drawTile(x, y, color) {
  ctx.save();
  ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(tileWidth/2, tileHeight/2);
  ctx.lineTo(0, tileHeight);
  ctx.lineTo(-tileWidth/2, tileHeight/2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}

function drawBlock(x, y, z) {
  let top = '#eeeeee';
  let right = '#cccccc';
  let left = '#999999';

  ctx.save();
  ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);
  
  // draw top
  ctx.beginPath();
  ctx.moveTo(0, -z * tileHeight);
  ctx.lineTo(tileWidth/2, tileHeight/2 - z * tileHeight);
  ctx.lineTo(0, tileHeight - z * tileHeight);
  ctx.lineTo(-tileWidth/2, tileHeight/2 - z * tileHeight);
  ctx.closePath();
  ctx.fillStyle = top;
  ctx.fill();

  // left 
  ctx.beginPath();
  ctx.moveTo(-tileWidth/2, tileHeight/2 - z*tileHeight)  
  ctx.lineTo(0,tileHeight - z*tileHeight);
  ctx.lineTo(0, tileHeight);
  ctx.lineTo(-tileWidth / 2, tileHeight/2)
  ctx.closePath();
  ctx.fillStyle = left;
  ctx.fill();

  // right 
  ctx.beginPath();
  ctx.moveTo(tileWidth/2, tileHeight/2 - z*tileHeight)  
  ctx.lineTo(0,tileHeight - z*tileHeight);
  ctx.lineTo(0, tileHeight);
  ctx.lineTo(tileWidth / 2, tileHeight/2)
  ctx.closePath();
  ctx.fillStyle = right;
  ctx.fill();

  ctx.restore();

}

// {} [] p P
let h = 5;
let dt = 0;

window.addEventListener('mousemove', function(e) {
  h = e.offsetY;
})
function animate(time) {
  ctx.clearRect(-width/2,-height/2,width, height);
  
  dt++;
  // h = 1+Math.cos(time/dt);


  ctx.save();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      drawBlock(i, j, h*i/width);
    }
  }
  ctx.restore()

  requestAnimationFrame(animate)

}
animate();

