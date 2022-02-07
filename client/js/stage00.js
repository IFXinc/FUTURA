//import { stage01 } from "./stage01.js";

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

  this.load.image("map", "../assets/fundo-pagegame-fundo01.png");
  this.load.image("pc", "..//assets/object-pagegame-pc.png");
  this.load.spritesheet("close", "../assets/button-pagegame-close.png", { frameWidth: 236, frameHeight: 43.1429});
  this.load.spritesheet("dicas", "../assets/object-pagegame-dicas.png", { frameWidth: 202, frameHeight: 202}); 
  this.load.image("entrada", "../assets/object-pagegame-entrada.png");
  this.load.spritesheet("saida", "../assets/object-pagegame-saida.png", { frameWidth: 314, frameHeight: 93});
  this.load.image("status01", "../assets/player1-pagegame-status.png");
  this.load.image("status02", "../assets/player2-pagegame-status.png");
  this.load.image("senha", "../assets/senha-pagegame-inserir.png");
  this.load.image("confirmar", "../assets/subpage-pagegame-confirmar.png");
  this.load.image("subpage", "../assets/subpage-pagegame-fundo.png");
  this.load.image("dica01", "../assets/subpage-pagegame-fundo.png");
  this.load.spritesheet("player01", "../assets/players.png",
    { frameWidth: 100, frameHeight: 150});
  this.load.spritesheet("player02", "./code/assets/players.png",
    { frameWidth: 100, frameHeight: 150});
};

stage00.create = function () {
  this.add.image(960, 540, 'map');
  this.add.image(2880, 540, 'map');
  this.add.image(2880, 540, 'pc');
  this.add.image(1434, 771, 'dicas');
  this.add.image(1673, 445, 'dicas');
  this.add.image(960, 1033.5, 'entrada');
  this.add.image(2880, 1033.5, 'entrada');
  this.add.image(960, 46.5, 'saida'); 
  this.add.image(214.5, 94, 'status01');
  this.add.image(2134.5, 94, 'status02');
  this.add.image(1802, 21.5715, 'close');
  this.add.image(3721, 21.5715, 'close');
}
 
export { stage00 };