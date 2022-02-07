import { home } from "code/js/home.js";

var start = new Phaser.Scene("start")

start.preload = function () {
    this.load.image("fundo", "../assets/fundo-pagehome.png")
    this.load.image("buttonnewgame", "../assets/button-pagehome-newgame.png")
    this.load.image("buttononline", "../assets/button-pagehome-online.png")
    this.load.image("buttonoptions", "../assets/button-pagehome-options.png")
    this.load.image("buttoncredits", "../assets/button-pagehome-credits.png")
    this.load.image("subpagenewgame", "../assets/subpage-pagehome-newgame.png")
    this.load.image("subpageline", "../assets/subpage-pagehome-online.png")
    this.load.image("subpageoptions", "../assets/subpage-pagehome-options.png")
    this.load.image("subpagecredits", "../assets/subpage-pagehome-credits.png")
};
