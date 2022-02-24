var gameover = new Phaser.Scene("gameover");

gameover.preload = function () {
  this.load.image("gameover", "./assets/gameover/gameover.png");
};

gameover.create = function () {
  this.add.image(1920, 540, "gameover");
};

gameover.update = function () {};

export { gameover };