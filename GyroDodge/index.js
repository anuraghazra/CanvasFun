/**
 * @game GyroDodge
 * @author <hazru.anurag@gmail.com>
 * @github
 * https://anuraghazra.github.io/GyroDodge 
 */

let game;
let ww = window.innerWidth;
let wh = window.innerHeight;
let assets = new AssetMan();

function preload() {
  assets.preload();
}

function setup() {
  createCanvas(ww, wh);
  game = new Game(assets);
  game.init();
}

function mouseReleased() {
  game.ship.shoot();
}

function draw() {
  background(35, 105);

  // pause the game until the timer runs out
  if (game.countDown >= 0) return;
  if (game.rocks.length < 1) {
    game.win();
    noLoop();
  }
  // pause the game on gameover
  if (game.gameover) {
    game.over();
    noLoop();
  }
  game.showScore();

  // all the updates and logics
  game.ship.update();
  game.ship.render();
  for (const rock of game.rocks) {
    if (game.ship.hit(rock)) {
      game.gameover = true;
    };
    rock.update();
    rock.render();
  }

  for (let i = game.bullets.length - 1; i >= 0; i--) {
    game.bullets[i].update();
    game.bullets[i].render();
    if (game.bullets[i].offscreen()) {
      game.bullets.splice(i, 1);
    } else {
      for (let j = game.rocks.length - 1; j >= 0; j--) {
        if (game.bullets[i].hits(game.rocks[j])) {
          // if rock is bigger the break it up
          if (game.rocks[j].radius >= game.rockBreakRadius) {
            let newRocks = game.rocks[j].breakup();
            game.rocks = game.rocks.concat(newRocks);
          }
          // delete the rock and bullet
          game.rocks.splice(j, 1);
          game.bullets.splice(i, 1);
          game.score += 100;
          break;
        }
      }
    }
  } // - for
}