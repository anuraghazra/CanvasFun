window.onload = function () {
  let c = new Candy('#c', WINDOW_WIDTH, WINDOW_HEIGHT);

  let dots = [];
  let current;
  let previous;

  let config = new function () {
    this.n = 5;
    this.ratio = 0.5;
  }
  var gui = new dat.GUI();
  let nController = gui.add(config, 'n', 3, 15).step(1);
  let rController = gui.add(config, 'ratio', 0, 2.0);

 
  nController.onChange(function() {
    dots = [];
    c.clear(0);
    setup();
  });
  rController.onChange(function() {
    c.clear(0);
    setup();
  });


  setup();
  function setup() {

    for (let i = 0; i < config.n; i++) {
      let angle = i * Math.PI * 2 / config.n;
      let v = Vector.fromAngle(angle);
      v.mult(CANVAS_WIDTH / 4);
      v.add(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      dots.push(v);
    }

    current = new Vector(random(CANVAS_WIDTH), random(CANVAS_HEIGHT))


    c.clear(0);
    // for (const d of dots) {
    //   c.fill(255);
    //   c.circle(d.x, d.y, 4);
    // }
  }
  function animate() {
    c.noStroke();
    
    for (let i = 0; i < 4000; i++) {
      c.fill(255);

      let r = Math.floor(random(dots.length));
      let next = dots[r];
      if (previous !== next) {
        current.x = lerp(config.ratio, current.x, next.x);
        current.y = lerp(config.ratio, current.y, next.y);
        c.circle(current.x, current.y, 0.2);
      }

      previous = next;
    }


    c.loop(animate);
  }
  animate();
}