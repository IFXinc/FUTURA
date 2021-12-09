import { home } from "code/js/home.js";

var start = new Phaser.Scene("start")

start.preload = function () {
    this.load.image("fundo", "code/assets/fundo-pagestart.png")
    this.load.image("buttonstartup", "code/assets/button-pagestart-start.png")
};

start.create = function () {
    var button = this.add.image(240, 135, "buttonstartup", 0).setInteractive();

    button.on(
        "pointerdown",
        function () {
            this.scene.start(home);
        },
        this
    );
};

start.update = function () {};

export { start };