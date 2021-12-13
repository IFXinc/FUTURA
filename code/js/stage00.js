//import { stage00 } from "./stage00.js";

var stage00 = new Phaser.Scene("Introdução");

var map;
var tileset0;
var terreno;
var tileset1;
var ARCas;
var player1;
var player2;
var parede;
var voz;
var pointer;
var touchX;
var touchY;
var timedEvent;
var timer = -1;
var timerText;
var life = 0;
var lifeText;
var trilha;
var jogador;
var ice_servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");

stage00.preload = function () {

  this.load.spritesheet("map", "./code/assets/fundo-pagegame-fundo01.png", {
    frameWidth: 1920,
    frameHeight: 1080,
  });
};
 
export { stage00 };