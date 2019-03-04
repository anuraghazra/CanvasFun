let ship;
let rocks = [];
let verlet;
function setup() {
  pd = displayDensity();
  createCanvas(window.innerWidth, window.innerHeight);
  verlet = new Verlet();
  verlet.init(window.innerWidth*pd, window.innerHeight*pd, '#defaultCanvas0', 0, 0.5, 1);

  ship = new Player();
  for (let i = 0; i < 10; i++) {
    rocks.push(new Rock());
  }
}

function draw() {
  background(35, 255)

  ship.update();
  ship.render();

  for (const rock of rocks) {
    if (ship.hit(rock)) {
      console.log('Game Over')
    };
    rock.update();
    rock.render();
  }
}