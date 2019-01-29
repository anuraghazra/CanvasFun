const c = new Candy();

c.createCanvas(600, 500);

let arc = new Arch(150, 400);
let target = new Target(500, 400);

c.noStroke();
function animate() {
  c.clear(25);

  arc.update();
  arc.render();
  target.update();
  target.render();

  c.loop(animate);
}
animate();