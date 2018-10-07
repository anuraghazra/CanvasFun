const canvas = document.querySelector('#c');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

let text = document.getElementById('text');

const c = new Candy(canvas);
let oscandy = c.createOffscreenBuffer();

let particles = [];

let target = new Vector(mouseX, mouseY)

for (let i = 0; i < 500; i++) {
  particles.push(new Point(c.utils.random(CANVAS_WIDTH),
    c.utils.random(CANVAS_HEIGHT),
    'rgba(255,255,255,0.3)', false)
  );
}

let bgcolor = 'rgba(155,155,255,1)';

let textindex = 0;
let strs = [
  [ 'Hello', 'rgba(155,155,255,0.3)' ],
  [ 'i\'m', 'rgba(155,155,255,0.3)' ],
  [ 'Anurag', 'rgba(155,155,255,0.3)' ],
  [ 'a', 'rgba(155,155,255,0.3)' ],
  [ 'passionate', 'rgba(155,155,255,0.3)' ],
  [ 'web', 'rgba(155,155,255,0.3)' ],
  [ 'designer', 'rgba(155,155,255,0.3)' ],
  [ 'have ↓ Fun', 'rgba(155,155,255,0.3)' ],
];

function changeText() {
  text.value = strs[textindex][0];
  initAndRenderText();
  textindex++;
  // bgcolor = strs[textindex][1];
}

window.setInterval(function () {
  if (textindex < strs.length) {
    changeText();
  }
}, 2500)

function initAndRenderText() {
  oscandy.clear();
  renderOnCanvas(text.value);
  getPixelCoords();
}
initAndRenderText();
text.addEventListener('keyup', function () {
  initAndRenderText();
});

function animate() {
  c.clear(bgcolor);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].shake();
    particles[i].behaviour(target);
    particles[i].render(c.ctx);
  }

  c.loop();
}
