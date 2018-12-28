const c = new Candy();
c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT-90);

let gravity = new Vector(0, 0.15);


let fireworks = [];
let stars = [];

let minHue = document.getElementById('minHue');
let maxHue = document.getElementById('maxHue');

for (let i = 0; i < 200; i++) {
  stars.push(new Vector(random(CANVAS_WIDTH), random(CANVAS_HEIGHT)));
}

c.canvas.addEventListener('mousedown', function() {
  fireworks.push(new Firework(mouseX, mouseY))
});


c.noStroke();
function animate() {
  c.clear(15, 0.3);
  c.noStroke();
  
  if (random(1) < 0.1) {
    fireworks.push(new Firework())
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].render();
    if (fireworks[i].isDead()) {
      fireworks.splice(i, 1);
    }
  }

  for (let i = 0; i < stars.length; i++) {
    c.push();
    c.fill(255,0.1);
    c.circle(stars[i].x,stars[i].y,1);
    stars[i].add(new Vector(0.2,0.2));
    if(stars[i].x > CANVAS_WIDTH) {
      stars[i].x = 0;
    }
    if(stars[i].y > CANVAS_HEIGHT) {
      stars[i].y = 0;
    }
    c.pop();
  }


  c.loop(animate);
}

animate();