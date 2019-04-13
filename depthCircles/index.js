const c = new Candy();
window.onload = function () {
  c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  let circles = [];

  let t = 0;
  let s = 300;

  const config = {
    stripes: 100,
    gap: 0.05,
    t: 200,
    sx: 0.5,
    sy: 0.5,
    restart: function () {
      circles = []
      t = 0;
      s = 300;
      draw();
    }
  }

  class Circle {
    constructor(s, color) {
      this.s = s;
      this.color = color;
    }

    render() {
      let m = (mouseX / 2 * (this.s) / CANVAS_WIDTH);
      let m2 = (mouseY / 2 * (this.s) / CANVAS_HEIGHT);
      c.push();
      c.translate(m + CANVAS_WIDTH / 2, m2 + CANVAS_HEIGHT / 2);
      c.blendMode(ADD);
      c.stroke(this.color);
      c.circle(-this.s * config.sx + m, -this.s * config.sy + m2, this.s);
      c.pop();
    }
  }

  let gui = new dat.GUI();
  let controller0 = gui.add(config, 'stripes', 0, 500);
  let controller1 = gui.add(config, 'gap', 0, 5);
  let controller2 = gui.add(config, 't', 0, 500);
  gui.add(config, 'sx', -2, 2);
  gui.add(config, 'sy', -2, 2);
  gui.add(config, 'restart');

  controller0.onChange(function () {
    config.restart();
  })
  controller1.onChange(function () {
    config.restart();
  })
  controller2.onChange(function () {
    config.restart();
  })

  draw();
  function draw() {
    for (let i = 0; i < config.stripes; i++) {
      t += config.gap;
      if (circles.length < 150) {
        if (circles.length % 10 == 0) s *= 0.99;

        let color = randomRGB();

        circles.push(new Circle(s, color));
        s *= 0.95 + t / config.t;
      }
    }
  }
  c.noFill();
  function animate() {
    c.clear(20);
    
    for (let i = 0; i < circles.length; i++) {
      circles[i].render();
    }

    c.loop(animate);
  }
  animate();
}
