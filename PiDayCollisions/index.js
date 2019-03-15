/**
 * inspired by @shiffman 's 
 * Calculating Digits of Pi with Collisions
 * coding challenge #139
 * 
 */

/**
 * Pi Day Collisions Optics
 * @author https://github.com/anuraghazra
 */

let block1;
let block2;
let clackSound;
let countPI = 0;


let opticPoint;
let opticLines = [];

let domCount = document.getElementById('count');
let domPowOf = document.getElementById('powof');
let domTimestep = document.getElementById('timestep');
let domRun = document.getElementById('run');

let powOf = domPowOf.value;
let timeStep = domTimestep.value;

domRun.addEventListener('click', () => {
  run();
})

function preload() {
  clackSound = loadSound('./clack.wav');
}

function setup() {
  createCanvas(600, 500);
  run();
}

function run() {
  block1;
  block2;
  countPI = 0;
  opticPoint;
  opticLines = [];
  opticPoint = createVector(width - 100, height / 2 + 100);
  powOf = domPowOf.value;
  timeStep = domTimestep.value;

  const mass = pow(100, powOf);
  block1 = new Block(400, 100, -1 / timeStep, mass);
  block2 = new Block(200, 50, 0, 1);
}

function draw() {
  background(25);
  let shouldPlaySound = false;


  stroke(255);
  strokeWeight(1)

  for (let i = 0; i < timeStep; i++) {
    if (block1.collide(block2)) {
      const v1 = block1.bounce(block2);
      const v2 = block2.bounce(block1);

      block1.v = v1;
      block2.v = v2;
      shouldPlaySound = true;
      countPI++;

      block1.hits++;
      block2.hits++;
    }
    if (block2.hitWall()) {
      block2.v *= -1;
      shouldPlaySound = true;
      countPI++;
      block2.hits++;
    }

    block1.update();
    block2.update();
  }

  domCount.textContent = 'Collisions : ' + countPI;
  if (shouldPlaySound) {
    clackSound.play();
  }

  block1.render();
  block2.render();

  opticPoint.x = (block1.x) + 150;
  opticPoint.y = 400 + (-block2.x + block2.w);
  opticPoint.y = map(opticPoint.y, 0, width, 0, 300)
  opticLines.push(opticPoint.copy());

  if (opticLines.length > 800) {
    opticLines.pop();
  }

  noFill();
  strokeWeight(1);
  beginShape();
  for (let i = 0; i < opticLines.length; i++) {
    vertex(opticLines[i].x, opticLines[i].y);
  }
  endShape();

  strokeWeight(10)
  stroke(255);
  point(opticPoint.x, opticPoint.y);

}