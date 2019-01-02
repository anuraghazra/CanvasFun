let x = 0;
let y = 0;
let spacing = 25;

let c = new Candy();
c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

c.clear(15);

animate();
function animate() {
  c.stroke(255);
  if(Math,random() < 0.5) {
    c.strokeWeight(1)
    c.line(x, y, x+spacing, y + spacing)
    // strokeWeight(5)
    // point(x, y, x+spacing, y + spacing)
  } else {
    c.strokeWeight(1)
    c.line(x, y+spacing, x+spacing, y)
    // strokeWeight(5)
    // point(x, y+spacing, x+spacing, y)
  }
  x += spacing;
  if(x > WINDOW_WIDTH) {
    x = 0;
    y += spacing;
  }
  if(y > WINDOW_HEIGHT) {
    x = 0;
    y = 0;
  }

  c.loop(animate)
}