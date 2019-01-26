let c = new Candy();
c.createCanvas(600, 400);
c.fullScreen();

let time = 0;
let wave = [];


let config = {
  x: 200, y: 200,
  n: 4,
  radius: 50,
  maxLength: 500,
  waveOffset: 100
}
window.onload = function () {

  let gui = new dat.GUI();
  gui.add(config, 'x', 1, CANVAS_WIDTH);
  gui.add(config, 'y', 1, CANVAS_HEIGHT);
  gui.add(config, 'n', 1, 50, 1);
  gui.add(config, 'radius', 1, 200);
  gui.add(config, 'waveOffset', 1, 200);

  c.stroke(255);
  function animate() {
    c.clear(35);

    let x = 0;
    let y = 0;

    for (let i = 0; i < config.n; i++) {
      c.push();
      c.translate(config.x, config.y);
      let prevx = x;
      let prevy = y;

      let n = i * 2 + 1;
      let num = 4;
      let den = (n * Math.PI);
      let coeff = n;
      let radius = config.radius * (num / den);
      // radius = map(radius, 0, 100, 10, 0);
      x += radius * Math.cos(coeff * time);
      y += radius * Math.sin(coeff * time);


      // let n = i * 2 + 1;
      // let radius = (config.radius * (4 / (n * Math.PI)))
      // radius = map(radius, 0, 200, 0, 100);
      // x += radius * Math.cos(n * time);
      // y += radius * Math.sin(n * time);

      c.noFill();
      c.circle(prevx, prevy, radius);
      c.line(prevx, prevy, x, y);
      c.circle(x, y, 4);

      prevx = x;
      prevy = y;
      c.pop();
    }
    wave.unshift(y);

    c.push();
    c.translate(config.x + config.waveOffset, config.y)
    c.line(0, -100, 0, 100);
    c.begin();
    c.from(x - config.waveOffset, wave[0]);
    for (let i = 0; i < wave.length; i++) {
      c.to(i, wave[i]);
    }
    c.stroke();
    c.close();
    c.pop();

    if (wave.length > config.maxLength) {
      wave.pop();
    }


    time += 0.05;
    c.loop(animate);
  }
  animate();

}
