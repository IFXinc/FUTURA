//import { stage01 } from "./stage01.js";

var stage00 = new Phaser.Scene("Introdução");

var ARCas;
var cursors;
var dica;
var divisao
var ice_servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
var jogador;
var life;
var localConnection;
var map;
var midias;
var pagedica;
var parede;
var player1;
var player2;
var pointer;
var remoteConnection;
var terreno;
var texto;
var tileset0;
var tileset1;
var timedEvent;
var timer = -1;
var timerText;
var touchX;
var touchY;
var trilha;
var voz;
const audio = document.querySelector("audio");

stage00.preload = function () {
  this.load.image("divisao", "./assets/division.png");
  this.load.image("confirmar", "./assets/subpage-pagegame-confirmar.png");
  this.load.image("dica01", "./assets/subpage-pagegame-fundo.png");
  this.load.image("entrada", "./assets/object-pagegame-entrada.png");
  this.load.image("map", "./assets/fundo-pagegame-fundo01.png");
  this.load.image("pagedica", "./assets/subpage-pagegame-fundo.png");
  this.load.image("pc", "./assets/object-pagegame-pc.png");
  this.load.image("senha", "./assets/senha-pagegame-inserir.png");
  this.load.image("status01", "./assets/player1-pagegame-status.png");
  this.load.image("status02", "./assets/player2-pagegame-status.png");
  this.load.image("subpage", "./assets/subpage-pagegame-fundo.png");
  this.load.image("dicas", "./assets/object-pagegame-dicas.png");

  this.load.spritesheet("saida", "./assets/object-pagegame-saida.png", {
    frameWidth: 36.247,
    frameHeight: 8.6522,
  });

  this.load.spritesheet("player1", "./assets/player1.png", {
    frameWidth: 16,
    frameHeight: 16,
  });

  this.load.spritesheet("player2", "./assets/player2.png", {
    frameWidth: 16,
    frameHeight: 16,
  });

  this.load.spritesheet("closestage", "./assets/button-pagegame-close.png", {
    frameWidth: 32.2826,
    frameHeight: 10.7609,
  });
};

stage00.create = function () {
  this.socket = io();

  this.add.image(128, 72, "map");
  this.add.image(384, 72, "map");
  player1 = this.physics.add.sprite(128, 126, "player1");
  player2 = this.physics.add.sprite(384, 126, "player2");
  this.add.image(384, 72, "pc");
  this.add.image(128, 4.3261, "saida");
  this.add.image(384, 4.3261, "saida", 2);
  this.add.image(128, 139.6739, "entrada");
  this.add.image(384, 139.6739, "entrada");
  this.add.image(28.5, 12.4895, "status01");
  this.add.image(28.5+256, 12.4895, "status02");
  this.add.image(236.8587, 5.3804, "closestage");
  this.add.image(492.8587, 5.3804, "closestage");
  
  divisao = this.physics.add.sprite(256, 72, "divisao");
  divisao.body.immovable = true;
  divisao.visible = false;
  this.physics.add.collider(player1, divisao, null, null, this);

  dica = this.physics.add.staticGroup();
  dica.create(178, 98, "dicas");

  pagedica = this.physics.add.sprite(128, 72, "pagedica");
  pagedica.disableBody(false, true);

  this.physics.add.collider(player1, dica, hitdica1, null, this);

  this.anims.create({
    key: "left1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stopped1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "up1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Frames para movimentaçao player2
  this.anims.create({
    key: "left2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stopped2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "up2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();

  // Disparar evento quando jogador entrar na partida
  var self = this;
  var physics = this.physics;
  var time = this.time;

  this.socket.on("jogadores", function (jogadores) {
    if (jogadores.primeiro === self.socket.id) {
      // Define jogador como o primeiro
      jogador = 1;

      // Personagens colidem com os limites da cena
      player1.setCollideWorldBounds(true);

      // Detecção de colisão: terreno
      // physics.add.collider(player1, terreno, hitCave, null, this);

      // Detecção de colisão e disparo de evento: ARCas
      // physics.add.collider(player1, ARCas, hitARCa, null, this);
    } else if (jogadores.segundo === self.socket.id) {
      // Define jogador como o segundo
      jogador = 2;

      // Personagens colidem com os limites da cena
      player2.setCollideWorldBounds(true);

      // Detecção de colisão: terreno
      // physics.add.collider(player2, terreno, hitCave, null, this);

      // Detecção de colisão e disparo de evento: ARCas
      // physics.add.collider(player2, ARCas, hitARCa, null, this);

      // Câmera seguindo o personagem 2
      // cameras.main.startFollow(player2);
    }

    // Os dois jogadores estão conectados
    console.log(jogadores);
    if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {
      // Contagem regressiva em segundos (1.000 milissegundos)
      timer = 60;
      timedEvent = time.addEvent({
        delay: 1000,
        callbackScope: this,
        loop: true,
      });
    }
  });

  // Desenhar o outro jogador
  this.socket.on("desenharOutroJogador", ({ frame, x, y }) => {
    if (jogador === 1) {
      player2.setFrame(frame);
      player2.x = x;
      player2.y = y;
    } else if (jogador === 2) {
      player1.setFrame(frame);
      player1.x = x;
      player1.y = y;
    }
  });
};

stage00.update = function (time, delta) {
  if (cursors.left.isDown) {
    player1.body.setVelocityX(-100);
  } else if (cursors.right.isDown) {
    player1.body.setVelocityX(100);
  } else {
    player1.body.setVelocityX(0);
  }
  if (cursors.up.isDown) {
    player1.body.setVelocityY(-100);
  } else if (cursors.down.isDown) {
    player1.body.setVelocityY(100);
  } else {
    player1.body.setVelocityY(0);
  }
  // Animação player1
  if (cursors.left.isDown) {
    player1.anims.play("left1", true);
  } else if (cursors.right.isDown) {
    player1.anims.play("right1", true);
  } else if (cursors.up.isDown) {
    player1.anims.play("up1", true);
  } else if (cursors.down.isDown) {
    player1.anims.play("down1", true);
  } else {
    player1.anims.play("stopped1", true);
  }
};

function hitdica1(player1, dicas) {
  pagedica.enableBody(true, 128, 72, true, true);
}

export { stage00 };
