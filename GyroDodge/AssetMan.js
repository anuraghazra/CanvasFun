class AssetMan {
  constructor() {
    this.sounds = {};
  }


  preload() {
    this.sounds.music = loadSound('./assets/sfx/music2.mp3');
    this.sounds.pew = loadSound('./assets/sfx/laser.mp3');
    this.sounds.gameover = loadSound('./assets/sfx/gameover.mp3');
    this.sounds.gamewin = loadSound('./assets/sfx/win.mp3');
  }
}