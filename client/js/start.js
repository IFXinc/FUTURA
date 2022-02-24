import { stage00 } from "./stage00.js";

var start = new Phaser.Scene("start");

start.preload = function () {
  this.load.image("fundo", "./assets/start/start-fundo.png");
  this.load.image("iniciar", "./assets/start/start-button-iniciar.png");
  this.load.image("close", "./assets/start/start-button-close.png");
};

start.create = function () {
  this.add.image(960, 540, "fundo");
  this.add.image(1770, 40.3533, "close");
  this.add.image(960 + 1920, 540, "fundo");
  this.add.image(1770 + 1920, 40.3533, "close");

  var button = this.add.image(960, 750, "iniciar", 0).setInteractive();

  button.on(
    "pointerdown",
    function () {
      this.scene.start(stage00);
    },
    this
  );

  var button = this.add.image(960 + 1920, 750, "iniciar", 0).setInteractive();

  button.on(
    "pointerdown",
    function () {
      this.scene.start(stage00);
    },
    this
  );
};

start.update = function () {};

export { start };
