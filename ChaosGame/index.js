window.onload = function () {
  let c = new Candy('#c', 500, 500);

  let dots = [];
  let current;
  let ratio = 0.75;
  let previous;

  setup();
  function setup() {

    let n = 15;
    for (let i = 0; i < n; i++) {
      let angle = i * Math.PI * 2 / n;
      let v = Vector.fromAngle(angle);
      v.mult(CANVAS_WIDTH / 2);
      v.add(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      dots.push(v);
    }

    current = new Vector(random(CANVAS_WIDTH), random(CANVAS_HEIGHT))


    c.clear(0);
    for (const d of dots) {
      c.fill(255);
      c.circle(d.x, d.y, 4);
    }
  }

  function animate() {
    c.noStroke();

    for (let i = 0; i < 400; i++) {
      c.fill(i*5,i,0);

      let r = Math.floor(random(dots.length));
      let next = dots[r];
      if (previous !== next) {

        current.x = lerp(ratio, current.x, next.x);
        current.y = lerp(ratio, current.y, next.y);
        c.circle(current.x, current.y, 0.5);
      }

      previous = next;
    }


    c.loop(animate);
  }
  animate();
}