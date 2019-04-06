window.onload = function () {
  const c = new Candy();
  c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  const config = {
    color: [0, 128, 255],
    speed: 0.005,
  }
  let gui = new dat.GUI();
  gui.addColor(config, 'color', [0, 128, 255]);
  gui.add(config, 'speed', 0, 0.1);

  c.noFill();
  let t = 0;
  function animate() {
    t += config.speed;
    c.clear(10);

    let iterations = ((t * 100) % 100);
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 4; y++) {
        let s = 200;
        c.push();
        c.translate(0, 100)
        c.translate(200 * x, 200 * y)

        if (x % 2 == 0) c.scale(-1, 1);
        if (y % 2 == 0) c.scale(-1, 1);

        for (let i = 0; i < iterations; ++i) {
          // color stuff
          let r = config.color[0] + i*10;
          let g = config.color[1] + i*10;
          let b = config.color[2] + i*10;
          let color = rgb(r, g, b);
          c.stroke(color);
          c.rect(-s * 0.5, -s * 0.5, s, s);
          c.rotate(0 + (mouseX * 0.005));
          s *= 0.90;
        }
        c.pop()
      }
    }
    c.loop(animate);
  }
  animate();
}
