const c = new Candy();
c.createCanvas(100,100);
c.fullScreen();

function setup() {
  console.log('ok')
}
c.clear(35);

c.canvas.addEventListener('mousemove', function(e) {
  // draw(e.offsetX, e.offsetY);
  mouseDown && animate();
})

function draw(x, y) {
  x = map(x, 0, CANVAS_WIDTH, 0, -CANVAS_WIDTH/2);
  y = map(y, 0, CANVAS_HEIGHT, 0, -CANVAS_HEIGHT/2)

  c.push();
  c.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
  c.rotate(Math.PI/6);

  for (let i = 0; i < 6; i++) {
    c.rotate(Math.PI/3);
    c.fill(255);
    c.noStroke();
    c.circle(x, y, 2);
  }
  
  c.pop();
}

function animate() {

  c.push();
  c.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
  c.rotate(Math.PI/6);

  for (let i = 0; i < 6; i++) {
    c.rotate(-Math.PI/3);
    draw(mouseX, mouseY);
  }
  
  c.pop();

  // c.loop(animate);
}
// animate();


window.onload = setup;