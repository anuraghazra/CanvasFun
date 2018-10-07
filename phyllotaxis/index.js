const c = new Candy();

c.createCanvas(window.innerWidth, window.innerHeight - 50);

let n = 1;
let t = 8;

c.clear(25);
let rotationAngle = random(10,140);
function animate() {

  let a = n * rotationAngle;
  let r = t * Math.sqrt(n);

  let x = r * Math.cos(a) + CANVAS_WIDTH / 2;
  let y = r * Math.sin(a) + CANVAS_HEIGHT / 2;

  c.blendMode(ADD);
  c.fill(hsla(a - r, 80, 50, clamp(n/-255, 0,1)));
  c.noStroke();
  c.circle(x, y, 5);

  n++
  c.loop();
}
for (let i = 0; i < 50; i++) {
  animate(); 
}