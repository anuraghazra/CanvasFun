class Game {
  constructor() {
    this.score = 0;
    this.gameover = false;
    this.countDown = 1;
    this.ship = new Player();
    this.bullets = [];
    this.rocks = [];

    this.domRestart = document.getElementById('game-restart');
    this.domGamestart = document.getElementById('game-start');
    this.domGamestartTimer = document.getElementById('game-start-timer');
    this.domGameover = document.getElementById('game-over');
    this.domScore = document.getElementById('score');

    this.domRestart.addEventListener('click', () => {
      this.restart();
    });

    this.countDownTimer();
    let timer = window.setInterval(() => {
      this.countDownTimer();
    }, 1000);
    window.setTimeout(() => {
      this.hideStartScreen();
      window.clearInterval(timer);
    }, 2000);
  }

  restart() {
    console.log('restart');
    this.hideGameOver();
    this.init();
    this.countDown = -1;
    loop();
  }

  countDownTimer() {
    this.domGamestartTimer.textContent = this.countDown;
    this.countDown--;
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
  }
  hideGameOver() {
    this.domGameover.classList.add('hide');
    this.domGameover.classList.remove('show');
    this.domScore.classList.remove('animate');
  }

  init() {
    this.score = 0;
    this.gameover = false;
    this.countDown = 1;
    this.ship = new Player();
    this.bullets = [];
    this.rocks = [];
    for (let i = 0; i < 10; i++) {
      this.rocks.push(new Rock());
    }
  }

}