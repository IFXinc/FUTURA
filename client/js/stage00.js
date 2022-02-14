//import { stage01 } from "./stage01.js";

var stage00 = new Phaser.Scene("Introdução");

var map;
var dica;
var texto;
var pagedica;
var cursors;
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
var life;
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
  this.load.image("map", "./assets/fundo-pagegame-fundo01.png");
  this.load.image("pc", "./assets/object-pagegame-pc.png");
  this.load.spritesheet("close", "./assets/button-pagegame-close.png", {
    frameWidth: 236,
    frameHeight: 43.1429,
  });
  this.load.spritesheet("dicas", "./assets/object-pagegame-dicas.png", {
    frameWidth: 202,
    frameHeight: 202,
  });
  this.load.image("entrada", "./assets/object-pagegame-entrada.png");
  this.load.spritesheet("saida", "./assets/object-pagegame-saida.png", {
    frameWidth: 314,
    frameHeight: 93,
  });
  this.load.image("status01", "./assets/player1-pagegame-status.png");
  this.load.image("status02", "./assets/player2-pagegame-status.png");
  this.load.image("senha", "./assets/senha-pagegame-inserir.png");
  this.load.image("confirmar", "./assets/subpage-pagegame-confirmar.png");
  this.load.image("subpage", "./assets/subpage-pagegame-fundo.png");
  this.load.image("dica01", "./assets/subpage-pagegame-fundo.png");
  this.load.spritesheet("player1", "./assets/player1.png", {
    frameWidth: 100,
    frameHeight: 150,
  });
  this.load.spritesheet("player2", "./assets/player2.png", {
    frameWidth: 100,
    frameHeight: 150,
  });
  this.load.image("pagedica", "./assets/subpage-pagegame-fundo.png");
};

stage00.create = function () {
  life = "";

  this.add.image(960, 540, "map");
  this.add.image(2880, 540, "map");
  player1 = this.physics.add.sprite(960, 771, "player1");
  player2 = this.physics.add.sprite(2880, 771, "player2");
  this.add.image(2880, 540, "pc");
  this.add.image(960, 46.5, "saida");
  this.add.image(2880, 46.5, "saida", 2);
  this.add.image(960, 1033.5, "entrada");
  this.add.image(2880, 1033.5, "entrada");
  this.add.image(214.5, 94, "status01");
  this.add.image(2134.5, 94, "status02");
  this.add.image(1802, 21.5715, "close");
  this.add.image(3721, 21.5715, "close");

  dica = this.physics.add.staticGroup();

  dica.create(1434, 771, "dicas");

  pagedica = this.physics.add.sprite(960, 540, "pagedica");
  pagedica.disableBody(false, true);

  this.physics.add.collider(player1, dica, hitdica1, null, this);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stopped",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Frames para movimentaçao beatriz
  this.anims.create({
    key: "left1",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right1",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stopped1",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "up1",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down1",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();

  texto = this.add.text(960, 540, life, {
    fontSize: "32px",
    fill: "#cccccc",
  });
};

stage00.update = function (time, delta) {
  if (cursors.left.isDown) {
    player1.body.setVelocityX(-500);
  } else if (cursors.right.isDown) {
    player1.body.setVelocityX(500);
  } else {
    player1.body.setVelocityX(0);
  }
  if (cursors.up.isDown) {
    player1.body.setVelocityY(-500);
  } else if (cursors.down.isDown) {
    player1.body.setVelocityY(500);
  } else {
    player1.body.setVelocityY(0);
  }
  // Animação player1
  if (cursors.left.isDown) {
    player1.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player1.anims.play("right", true);
  } else if (cursors.up.isDown) {
    player1.anims.play("up", true);
  } else if (cursors.down.isDown) {
    player1.anims.play("down", true);
  } else {
    player1.anims.play("stopped", true);
  }
};

function hitdica1(player1, dicas) {
  life = "texto teste";
  pagedica.enableBody(true, 960, 540, true, true);
}

export { stage00 };
