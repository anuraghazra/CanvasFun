// Fourier Transform
const USER = 0;
const FOURIER = 1;

let x = [];
let fourierX;
let time = 0;
let path = [];
let drawing = [];


let state = -1;
let font;

getdraw.onmouseover = function (e) {
  e.preventDefault()
  console.log(JSON.stringify(drawing));
};
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  font = loadFont('./American_Captain.otf');

}

function calculateFourier() {
  fourierX = []
  let skip = 1;
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(new Complex(drawing[i].x, drawing[i].y));
  }
  fourierX = dft(x);
  fourierX.sort((a, b) => b.amp - a.amp);
}

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

function epicycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;

    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 25);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    stroke(255, 100);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

let num = 0;
function draw() {
  background(25);

  if (state == USER) {
    textFont(font);
    textSize(150);
    text('Draw', width/2 - 150, height/2);
    let points = font.textToPoints('Draw', width/2 - 150, height/2);
    num += 0.5
    console.log(points)
    if (num > points.length) {
      num = 0;
    };
    // for (let i = 0; i < points; i++) {
    let point = {x : (points[floor(num % points.length)].x - width / 2), y: points[floor(num % points.length)].y - height / 2};
    drawing.push(point);
    // }
    stroke(255);
    noFill();
    beginShape();
    for (let v of drawing) {
      vertex(v.x + width / 2, v.y + height / 2);
    }
    endShape();
  } else if (state == FOURIER) {
    let v = epicycles(width / 2, height / 2, 0, fourierX);
    path.unshift(v);
    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();

    let dt = TWO_PI / fourierX.length;
    time += dt;

    if (time > TWO_PI) {
      time = 0;
      path = [];
    }
  }
}