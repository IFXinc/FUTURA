var win = new Phaser.Scene("win");

win.preload = function () {
  this.load.image("win", "./assets/win/win.png");
};

win.create = function () {
  this.add.image(1920, 540, "win");
};

win.update = function () {};

export { win };