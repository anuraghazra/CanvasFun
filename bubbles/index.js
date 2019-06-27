const canvas = document.getElementById('c');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let colors = ['deepskyblue', 'tomato', 'yellowgreen', 'crimson', 'purple']
const random = (val) => Math.random() * val;

window.onload = function () {

  const bubbles = [];
  for (let i = 0; i < 100; i++) {
    bubbles.push(new Bubble(random(width), random(height)))
  }

  const mouse = new Vector(0, 0);
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  })
  window.addEventListener('touchmove', function (e) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  })

  
  function animate() {
    ctx.clearRect(0, 0, width, height)

    for (let bubble of bubbles) {
      bubble.update();
      bubble.repeal(mouse);
      bubble.render();
    }

    requestAnimationFrame(animate);
  }
  animate();
}