let hearts = [];
let fallingHearts = [];

function preload() {
  font = loadFont("./HappyMonkey-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  hearts[0] = new Heart(width / 2, height / 2);
  for (let i = 0; i < 100; i++) {
    fallingHearts.push(new HeartRain());
  }

  textFont(font);
  textAlign(CENTER, CENTER);
}


window.addEventListener('click', function () {
  hearts.push(new Heart(mouseX, mouseY, random(2, 5), random(10, 15)))
})

function draw() {
  background(255);
  for (let i = 0; i < fallingHearts.length; i++) {
    fallingHearts[i].update();
    fallingHearts[i].render();
  }

  for (let heart of hearts) {
    heart.update();
    heart.render();
  }

  noStroke();
  fill(255);
  textSize(hearts[0].pulse * 25)
  text("Happy V-Day", width / 2, (height / 2))
}