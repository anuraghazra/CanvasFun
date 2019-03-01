let width = window.innerWidth-1;
let height = window.innerHeight-5;
let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;

ctx.translate(width / 2 , height/2);


let baseSlider = document.getElementById('base');
let mouseX;
let mouseY;
canvas.addEventListener('mousemove', function (e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});

canvas.addEventListener('touchmove', function (e) {
  mouseX = e.touches[0].clientY;
  mouseY = e.touches[0].clientX;
})
// let map = [
//   [2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0],
//   [2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0],
//   [2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0],
//   [2.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0],
//   [2.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0],
//   [2.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0],
//   [2.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0],
//   [2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0],
//   [2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0],
//   [2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0],
// ];
let grid = new Grid(15, 15, 50);
let map = grid.createGrid(15, 15);

let angle = 0;
function animate() {
  ctx.fillStyle = '#555555';
  ctx.fillRect(-width/2,-height/2, width, height);

  angle = mouseX/10;

  let baseHeight = parseFloat(-baseSlider.value)
  for (let i = 0; i < map.length; i++) {
    let row = map[i];
    for (let j = 0; j < row.length; j++) {
      map[i][j] = Math.abs(i/j+Math.sin(angle/j+i)+baseHeight)
    }
  }
  grid.applyHeightMap(map);
  grid.render();

  requestAnimationFrame(animate)
}
animate();
