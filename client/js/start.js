import { stage00 } from "./stage00.js";

var start = new Phaser.Scene("start");

start.preload = function () {
  this.load.image("fundo", "./assets/start-fundo.png");
  this.load.image("iniciar", "./assets/start-button-iniciar.png");
  this.load.image("close", "./assets/start-button-close.png");
};

start.create = function () {
  this.add.image(128, 72, "fundo");
  this.add.image(236.858, 5.3804, "close");
  this.add.image(128 + 256, 72, "fundo");
  this.add.image(236.858 + 256, 5.3804, "close");

  var button = this.add.image(128, 100, "iniciar", 0).setInteractive();
  var button = this.add.image(128+256, 100, "iniciar", 0).setInteractive();

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
