/**
 * @name: Ask Buddie Logo dissolve
 * @author <hazru.anurag@gmail.com>
 * @website https://anuraghazra.github.io
 */

let c = new Candy('#c', 600, 600);
let width = CANVAS_WIDTH;
let height = CANVAS_HEIGHT;
let points = [];
let pointSize = 4;
let mouseDown = false;

window.addEventListener('mousedown', () => mouseDown = true);
window.addEventListener('mouseup', () => mouseDown = false);

c.createScreenBuffer('osc');
let osc = c.screenBuffers.osc;

window.onload = function () {
  let url = './src/images/askbuddie_low.png';

  let mouse = new Vector(0, 0);

  let img = c.loadImage(url);
  img.setAttribute('crossOrigin', '');
  c.trypreload();
  c.preload = function () {
    animate();
  }

  c.noStroke();
  let count = 1;
  function animate() {
    c.clear('white');

    mouse.setXY(mouseX, mouseY);
    osc.image(img, 100, 100, width - 200, height - 150);

    if (count > 0) getPixelCoords();
    count--;

    for (let i = 0; i < points.length; i++) {
      points[i].behaviour(mouse);
      points[i].update();
      points[i].render();
    }
    c.loop(animate);
  }

}

