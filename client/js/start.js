import { stage00 } from "./stage00.js";

var start = new Phaser.Scene("start");

start.preload = function () {
  this.load.image("fundo", "./assets/start-fundo.png");
  this.load.image("iniciar", "./assets/start-button-iniciar.png");
};

start.create = function () {
  this.add.image(960, 540, "fundo");
  var button = this.add.image(960, 767, "iniciar", 0).setInteractive();

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
