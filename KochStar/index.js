let c = new Candy();
window.onload = function () {
  c.createCanvas(600, 600);
  c.fullScreen()

  let config = {
    radius : 150,
    x : CANVAS_WIDTH/2, y : CANVAS_HEIGHT/2,
    loop1: 4, loop2 : 1,
    n : 6,
    interation : 3
  };
  let gui = new dat.GUI();
  gui.add(config, 'x', 0, 1000);
  gui.add(config, 'y', 0, 1000);
  gui.add(config, 'radius', 10, 1000);
  gui.add(config, 'n', 3, 16, 1);
  gui.add(config, 'loop1', 0, 10, 1);
  gui.add(config, 'loop2', 0, 10, 1);
  gui.add(config, 'interation', 0, 5, 1);

  const koch = new Koch(config);
  function animate() {
    c.clear(15);

    koch.reset();
    koch.createKoch();
    for (let i = 0; i < config.interation; i++) {
      koch.generate();
    }
    koch.render();

    c.loop(animate);
  }
  animate();
}