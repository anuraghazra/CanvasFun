// Fourier Transform
const USER = 0;
const FOURIER = 1;

let x = [];
let fourier;
let time = 0;
let path = [];
let state = -1;
// drawing = [];

// getdraw.onmouseover = function (e) {
//   e.preventDefault()
//   console.log(JSON.stringify(drawing));
// };

function mousePressed() {
  state = USER;
  drawing = [];
  x = [];
  path = [];
  time = 0;
}

function mouseReleased() {
  state = FOURIER;
  calculateFourier();
}

function calculateFourier() {
  fourier = []
  let skip = 1;
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(new Complex(drawing[i].x, drawing[i].y));
  }
  fourier = dft(x);
  fourier.sort((a, b) => b.amp - a.amp);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  state = FOURIER;
  calculateFourier();
  console.log(drawing)
}


function epicycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;

    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 50);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    stroke(255, 100);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

// Drawing by user
function UserDraw() {
  let point = { x: mouseX - width / 2, y: mouseY - height / 2 };
  drawing.push(point);
  stroke(255);
  noFill();
  beginShape();
  for (let v of drawing) {
    vertex(v.x + width / 2, v.y + height / 2);
  }
  endShape();
}

// Drawing by system
function FourierDraw() {
  let v = epicycles(width / 2, height / 2, 0, fourier);
  path.unshift(v);
  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  let dt = TWO_PI / fourier.length;
  time += dt;
  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}

function draw() {
  background(25);

  if (state == USER) {
    UserDraw()
  } else if (state == FOURIER) {
    FourierDraw();
  }
}