
let gravity = new Vector(0, 1);
let keys = {};
let mouse = new Vector();
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

window.onload = function () {


  let windows = [];

  let btn = document.getElementById('play');
  let close = document.getElementById('close');



  let mouse = new Vector();
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  });

  btn.onclick = function () {
    for (let i = 0; i < 20; i++) {
      windows.push(new Window(Math.random() * 500, Math.random() * 500))
      // windows.push(new Window(i * 50, 0))
    }
    animate();
  }
  close.onclick = function () {
    for (let w of windows) {
      w.win.close();
    }
  }

  let t = 0;

  function animate() {
    // t += 0.05;
    // t += 0.1;

    for (let i = 0; i < windows.length; i++) {
      windows[i].update();
      // windows[i].setPos(windows[i].pos.x, HEIGHT / 2 + Math.cos(t + i/2) * 50)
      // windows[i].setPos(WIDTH / 2 + Math.cos(t + i) * mouse.y, HEIGHT / 2 + Math.sin(t + i) * mouse.x)
    }

    requestAnimationFrame(animate);
  }
}