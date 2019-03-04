// GAME STATE

let game = {
  score: 0,
  gameover: false,
  startTimer: 3
}

function hideGameover() {
  domGameover.style.opacity = '0';
  domGameover.style.pointerEvents = 'none';
  domScore.style.left = "20px";
  domScore.style.top = "20px";
  domScore.style.transform = "translate(0%, 0%)";
  domScore.style.fontSize = "15px";
}

function showGameover() {
  domGameover.style.opacity = '1';
  domGameover.style.pointerEvents = 'all';
  domScore.style.left = "50%";
  domScore.style.top = "57%";
  domScore.style.transform = "translate(-50%, -50%)";
  domScore.style.fontSize = "20px";
}

function showScore() {
  domScore.innerHTML = 'score : ' + game.score;
}


let ship;
let bullets;
let rocks;
let verlet;

let domRestart = document.getElementById('game-restart');
let domGamestart = document.getElementById('game-start');
let domGamestartTimer = document.getElementById('game-start-timer');
let domGameover = document.getElementById('game-over');
let domScore = document.getElementById('score');
let ww = window.innerWidth;
let wh = window.innerHeight;

// start the game after 3 seconds
window.setTimeout(() => {
  domGamestart.style.opacity = 0;
}, 3000);

// reset the game
domRestart.addEventListener('click', () => {
  resetGame();
  hideGameover();
  loop();
})

// countdown timer for starting game
function startCountDown() {
  startTimerCount()
  function startTimerCount() {
    domGamestartTimer.textContent = game.startTimer;
    game.startTimer--;
  }
  window.setInterval(startTimerCount, 1000);
}

function resetGame() {
  game = {
    score: 0,
    gameover: false,
    startTimer: 3
  }
  startCountDown();

  let pd = displayDensity();
  verlet = new Verlet();
  verlet.init(ww * pd, wh * pd, '#defaultCanvas0', 0, 0.5, 1);

  bullets = [];
  rocks = [];
  ship = new Player();
  for (let i = 0; i < 10; i++) {
    rocks.push(new Rock());
  }
}


// -----
function setup() {
  createCanvas(ww, wh);
  resetGame();
}

function mouseReleased() {
  bullets.push(new Bullet(ship.pos, ship.vel.heading()));
}

function draw() {
  background(35, 255);

  // pause the game until the timer runs out
  if (game.startTimer > -1) return;
  // pause the game on gameover
  if (game.gameover) {
    showGameover();
    noLoop();
  }
  showScore();

  // all the updates and logics
  ship.update();
  ship.render();
  for (const rock of rocks) {
    if (ship.hit(rock)) {
      game.gameover = true;
    };
    rock.update();
    rock.render();
  }

  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].render();
    if (bullets[i].offscreen()) {
      bullets.splice(i, 1);
    } else {
      for (let j = rocks.length - 1; j >= 0; j--) {
        if (bullets[i].hits(rocks[j])) {
          // if rock is bigger the break it up
          if (rocks[j].radius > 15) {
            let newRocks = rocks[j].breakup();
            rocks = rocks.concat(newRocks);
          }
          // delete the rock and bullet
          rocks.splice(j, 1);
          bullets.splice(i, 1);
          game.score += 100;
          break;
        }
      }
    }
  } // - for
}