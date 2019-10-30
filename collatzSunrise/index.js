
/**
 * CollatzSunrise
 * Inspired by Daniel Shiffman's
 * Coding in the Cabana 2: Collatz Conjecture
 * @author <https://github.com/anuraghazra>
 * @demo <https://anuraghazra.github.io/canvasFun/collatzSunrise>
 */

let i = 0;
let a = 0;

let canvas;
const config = {
  len: 2,
  angle: 1,
  innerRadius: 10,
  rollX: 100,
  rollY: 100,
  x: 0,
  y: 0,
  RedMultipler: 100,
  GreenMultipler: 15,
  BlueMultipler: 50,
  OverlayBlend: false
}

let gui = new dat.GUI();
gui.add(config, 'len', 0, 50, 0.01);
gui.add(config, 'angle', 0, 50, 0.01);
gui.add(config, 'innerRadius', 0, 50, 1);
gui.add(config, 'rollX', 0, 100, 1);
gui.add(config, 'rollY', 0, 100, 1);
gui.add(config, 'RedMultipler', 0, 100, 1);
gui.add(config, 'GreenMultipler', 0, 100, 1);
gui.add(config, 'BlueMultipler', 0, 100, 1);
gui.add(config, 'OverlayBlend');

function Collatz(n) {
  if (n % 2 == 0) {
    return n / 2;
  } else {
    return (n * 3 + 1) / 2
  }
}


function compute(i) {
  let n = i;
  push();
  config.OverlayBlend && blendMode(OVERLAY);
  resetMatrix();
  translate(config.x, config.y);
  do {
    n = Collatz(n);
    // visualize
    if (n % 2 == 0) {
      rotate(config.angle)
    } else {
      rotate(-config.angle * a)
    }
    strokeWeight(0.5);
    // 500, 15, 50,
    stroke(a * config.RedMultipler, a * config.GreenMultipler, a * config.BlueMultipler, constrain(a * 5, 0, 255));
    line(a * config.rollX, a * config.rollY, a * config.innerRadius, -config.len);
    translate(0, -config.len);
  } while (n !== 1);
  pop();
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(15, 15, 50);
  config.x = width / 2;
  config.y = height / 2;

  // only reset drawing on canvas click
  canvas.elt.addEventListener('click', e => {
    config.x = e.offsetX;
    config.y = e.offsetY;
    i = 0;
    a = 0;
    background(15, 15, 50);
  })
}

function draw() {
  i++;
  a += 0.1;
  compute(i);
}