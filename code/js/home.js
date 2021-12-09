import { home } from "code/js/home.js";

var start = new Phaser.Scene("start")

start.preload = function () {
    this.load.image("fundo", "code/assets/fundo-pagehome.png")
    this.load.image("buttonnewgame", "code/assets/button-pagehome-newgame.png")
    this.load.image("buttononline", "code/assets/button-pagehome-online.png")
    this.load.image("buttonoptions", "code/assets/button-pagehome-options.png")
    this.load.image("buttoncredits", "code/assets/button-pagehome-credits.png")
    this.load.image("subpagenewgame", "code/assets/subpage-pagehome-newgame.png")
    this.load.image("subpageline", "code/assets/subpage-pagehome-online.png")
    this.load.image("subpageoptions", "code/assets/subpage-pagehome-options.png")
    this.load.image("subpagecredits", "code/assets/subpage-pagehome-credits.png")
};
