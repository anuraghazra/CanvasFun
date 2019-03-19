let pi = 4;
let iteration = 0;
let history = [];
let domMath = document.getElementById('math');

function setup() {
  createCanvas(800, 700);
}

function waveViz(posy) {
  let w = width / history.length;
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < history.length; i++) {
    let x = i * w;
    let y = posy + map(history[i], cos(x / history.length * w * 4), 4, height, 0);
    stroke(lerpColor(color(255, 0, 0), color(0, 255, 0), cos(y + x)));

    vertex(x, y);
  }
  endShape();
}

function waveViz2(posy) {
  let w = width / history.length;
  noFill();
  beginShape();
  for (let i = 0; i < history.length; i++) {
    let x = i * w;
    let y = posy + map(history[i], cos(x), 4, height, 0);
    stroke(lerpColor(color(0, 0, 255), color(255, 0, 255), sin(y + x)));
    vertex(x, y);
  }
  endShape();
}

function waveViz3(posy) {
  let w = width / history.length;
  noFill();
  beginShape();
  for (let i = 0; i < history.length; i++) {
    let x = (i * w);
    let y = posy + sin(history[i] * ((i * w / history.length))) * i % 70;
    stroke(lerpColor(color(255, 50, 90), color(0, 0, 255), sin(y)));
    vertex(x, y);
  }
  endShape();
}
function waveViz4(posy) {
  let w = width / history.length;
  noFill();
  beginShape();
  stroke(65, 155, 35);
  for (let i = 0; i < history.length; i++) {
    let x = (i * w);
    let y = posy + sin(history[i] * ((x / x * i + x / history.length * 2))) * i % 50;
    vertex(x, y);
  }
  endShape();
}

function draw() {
  background(255);

  let den = iteration * 2 + 3;
  if (iteration % 2 === 0) {
    pi -= (4 / den);
  } else {
    pi += (4 / den);
  }

  history.push(pi);

  waveViz(-80);
  waveViz2(80);
  waveViz3(400);
  waveViz4(600);

  console.log(pi)
  iteration++;
}