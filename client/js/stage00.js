//import { stage01 } from "./stage01.js";

var stage00 = new Phaser.Scene("Introdução");

var ARCas;
var cursors;
var dica;
var divisao;
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
  this.add.image(28.5 + 256, 12.4895, "status02");
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

  this.socket = io();
  var self = this;
  var physics = this.physics;
  var socket = this.socket;

  // Disparar evento quando jogador entrar na partida
  this.socket.on("jogadores", function (jogadores) {
    if (jogadores.primeiro === self.socket.id) {
      // Define jogador como o primeiro
      jogador = 1;

      // Personagens colidem com os limites da cena
      player1.setCollideWorldBounds(true);

      // Captura o microfone
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
        })
        .catch((error) => console.log(error));
    } else if (jogadores.segundo === self.socket.id) {
      // Define jogador como o segundo
      jogador = 2;

      // Personagens colidem com os limites da cena
      player2.setCollideWorldBounds(true);

      // Captura o microfone e convida a outra parte para trocar áudio
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
          localConnection = new RTCPeerConnection(ice_servers);
          midias
            .getTracks()
            .forEach((track) => localConnection.addTrack(track, midias));
          localConnection.onicecandidate = ({ candidate }) => {
            candidate &&
              socket.emit("candidate", jogadores.primeiro, candidate);
          };
          console.log(midias);
          localConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
          };
          localConnection
            .createOffer()
            .then((offer) => localConnection.setLocalDescription(offer))
            .then(() => {
              socket.emit(
                "offer",
                jogadores.primeiro,
                localConnection.localDescription
              );
            });
        })
        .catch((error) => console.log(error));
    }

    // Os dois jogadores estão conectados
    console.log(jogadores);
  });

  this.socket.on("offer", (socketId, description) => {
    remoteConnection = new RTCPeerConnection(ice_servers);
    midias
      .getTracks()
      .forEach((track) => remoteConnection.addTrack(track, midias));
    remoteConnection.onicecandidate = ({ candidate }) => {
      candidate && socket.emit("candidate", socketId, candidate);
    };
    remoteConnection.ontrack = ({ streams: [midias] }) => {
      audio.srcObject = midias;
    };
    remoteConnection
      .setRemoteDescription(description)
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => {
        socket.emit("answer", socketId, remoteConnection.localDescription);
      });
  });

  this.socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  this.socket.on("candidate", (candidate) => {
    const conn = localConnection || remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
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

stage00.update = function () {
  if (jogador === 1) {
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
    this.socket.emit("estadoDoJogador", {
      frame: player1.anims.getFrameName(),
      x: player1.body.x + 8,
      y: player1.body.y + 8,
    });
  } else if (jogador === 2) {
    if (cursors.left.isDown) {
      player2.body.setVelocityX(-100);
    } else if (cursors.right.isDown) {
      player2.body.setVelocityX(100);
    } else {
      player2.body.setVelocityX(0);
    }
    if (cursors.up.isDown) {
      player2.body.setVelocityY(-100);
    } else if (cursors.down.isDown) {
      player2.body.setVelocityY(100);
    } else {
      player2.body.setVelocityY(0);
    }
    this.socket.emit("estadoDoJogador", {
      frame: player2.anims.getFrameName(),
      x: player2.body.x + 8,
      y: player2.body.y + 8,
    });
  }
};

function hitdica1(player1, dicas) {
  pagedica.enableBody(true, 128, 72, true, true);
}

export { stage00 };
