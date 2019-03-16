/**
 * @class Game
 * manages all the game states
 */
class Game {
  constructor(assets) {
    this.score = 0;
    this.gameover = false;
    this.gamewin = false;

    this.countDown = 1;
    this.ship = new Player();
    this.bullets = [];
    this.rocks = [];
    this.sounds = assets.sounds;
    this.level = 3;
    this.rockBreakRadius = 25;

    this.domRestart = document.getElementById('game-restart');
    this.domGamestart = document.getElementById('game-start');
    this.domGamestartTimer = document.getElementById('game-start-timer');
    this.domGameover = document.getElementById('game-over');
    this.domScore = document.getElementById('score');
    this.domLevel = document.getElementById('level');
    this.domGameWin = document.getElementById('game-win');
    this.domGameNextLevel = document.getElementById('next-level');
    this.domGameWinLevel = document.getElementById('game-win-level');
    this.domLevel.textContent = 'Level: ' + (this.level)

    this.domRestart.addEventListener('click', () => {
      this.restart();
    });

    this.domGameNextLevel.addEventListener('click', () => {
      this.restart();
      this.hideGameWin()
    });

    this.countDownTimer();
    let timer = window.setInterval(() => {
      this.countDownTimer();
    }, 1000);
    window.setTimeout(() => {
      this.hideStartScreen();
      window.clearInterval(timer);
    }, 2000);

    this.sounds.music.setLoop(true)
    this.sounds.music.amp(0.2);
    this.sounds.music.play();
  }

  restart() {
    console.log('restart');
    this.hideGameOver();
    this.init();
    this.countDown = -1;
    loop();
  }

  finish() {
    this.level = 1;
    this.domGameWinLevel.textContent = 'You Win! The Game. Congratulations'
    this.domLevel.textContent = 'Level: ' + (this.level);
    this.domGameNextLevel.textContent = 'Finish'
    this.restart();
  }
  win() {
    this.domGameNextLevel.textContent = 'Play Next Level'   
    this.domLevel.textContent = 'Level: ' + (this.level + 1)
    this.domGameWinLevel.textContent = 'You Win! Level ' + (this.level) + ' Cleared!'
    this.showGameWin();
    this.gamewin = true;
    this.over();
    this.level++;
    if (this.level >= 5) {
      this.finish()
    }
  }

  countDownTimer() {
    this.domGamestartTimer.textContent = this.countDown;
    this.countDown--;
  }

  showGameWin() {
    this.domGameWin.classList.add('show');
  }
  hideGameWin() {
    this.domGameWin.classList.remove('show');
  }
  showStartScreen() {
    this.domGamestart.classList.remove('hide');
    this.domGamestart.classList.add('show');
  }
  hideStartScreen() {
    this.domGamestart.classList.remove('show');
    this.domGamestart.classList.add('hide');
  }

  showScore() {
    this.domScore.textContent = 'Score : ' + this.score;
  }

  over() {
    this.domGameover.classList.add('show');
    this.domScore.classList.add('animate');
    this.gameover && this.sounds.gameover.play();
    this.gamewin && this.sounds.gamewin.play();
  }

  hideGameOver() {
    this.domGameover.classList.add('hide');
    this.domGameover.classList.remove('show');
    this.domScore.classList.remove('animate');
  }

  init() {
    this.score = 0;
    this.gameover = false;
    this.gamewin = false;
    this.countDown = 1;
    // this.ship = new Player();
    this.bullets = [];
    this.rocks = [];
    if (this.level === 1) {
      let r = new Rock();
      r.radius = 15;
      this.rocks.push(r);
    }
    if (this.level === 2) {
      this.rockBreakRadius = 25;
      for (let i = 0; i < 10; i++) {
        this.rocks.push(new Rock(random(width), random(height), random(15, 20)));
      }
    }
    if (this.level === 3) {
      this.rockBreakRadius = 30;
      this.rocks.push(new Rock(random(width), random(height), 50));
    }
    if (this.level === 4) {
      this.rockBreakRadius = 20;
      for (let i = 0; i < 10; i++) {
        this.rocks.push(new Rock());
      }
    }
    if (this.level === 5) {
      this.rockBreakRadius = 25;
      for (let i = 0; i < 10; i++) {
        this.rocks.push(new Rock(random(width), random(height), 26));
      }
      this.rocks.push(new Rock(random(width), random(height), 100));
    }
  }

}