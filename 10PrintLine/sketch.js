let x = 0;
let y = 0;
let spacing = 25;

function setup() {
  createCanvas(1200,500);
  background(51);
}

function draw() {
  // console.log(mouseX)
  stroke(255);
  if(Math,random() < 0.5) {
    strokeWeight(1)
    line(x, y, x+spacing, y + spacing)
    // strokeWeight(5)
    // point(x, y, x+spacing, y + spacing)
  } else {
    strokeWeight(1)
    line(x, y+spacing, x+spacing, y)
    // strokeWeight(5)
    // point(x, y+spacing, x+spacing, y)
  }
  x += spacing;
  if(x > 1200) {
    x = 0;
    y += spacing;
  }
  if(y > 500) {
    x = 0;
    y = 0;
  }
}