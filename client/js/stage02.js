import { win } from "./win.js";
import { gameover } from "./gameover.js";

var stage02 = new Phaser.Scene("stage02");

var ARCas;
var cursors;
var dica01;
var dica02;
var dica03;
var dica04;
var divisao;
var gameOver;
var ice_servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
var jogador;
var life;
var localConnection;
var map;
var midias;
var opcao01;
var opcao02;
var opcao03;
var pagedica01;
var pagedica02;
var pagedica03;
var pagedica04;
var parede;
var pc;
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

stage02.preload = function () {
  this.load.image("divisao", "./assets/stage02/division.png");
  this.load.image("dica", "./assets/stage02/object-pagegame-dicas.png");
  this.load.image("entrada", "./assets/stage02/object-pagegame-entrada.png");
  this.load.image("map", "./assets/stage02/fundo-pagegame-fundo01.png");
  this.load.image("pagedica01", "./assets/stage02/subpage-pagegame-dica01.png");
  this.load.image("pagedica02", "./assets/stage02/subpage-pagegame-dica02.png");
  this.load.image("pagedica03", "./assets/stage02/subpage-pagegame-dica03.png");
  this.load.image("pagedica04", "./assets/stage02/subpage-pagegame-dica04.png");
  this.load.image("pc", "./assets/stage02/object-pagegame-pc.png");
  this.load.image("status01", "./assets/stage02/player1-pagegame-status.png");
  this.load.image("status02", "./assets/stage02/player2-pagegame-status.png");
  this.load.image("opcao01", "./assets/stage02/button-pc-opcao01.png");
  this.load.image("opcao02", "./assets/stage02/button-pc-opcao02.png");
  this.load.image("opcao03", "./assets/stage02/button-pc-opcao03.png");

  this.load.spritesheet("saida", "./assets/stage02/object-pagegame-saida.png", {
    frameWidth: 271.8523,
    frameHeight: 64.8913,
  });

  this.load.spritesheet("player1", "./assets/stage02/player1.png", {
    frameWidth: 120,
    frameHeight: 120,
  });

  this.load.spritesheet("player2", "./assets/stage02/player2.png", {
    frameWidth: 120,
    frameHeight: 120,
  });

  this.load.spritesheet("closestage", "./assets/stage02/button-pagegame-close.png", {
    frameWidth: 242.1196,
    frameHeight: 80.7065,
  });
};

stage02.create = function () {
  this.add.image(960, 540, "map");
  this.add.image(2880, 540, "map");
  player1 = this.physics.add.sprite(960, 945, "player1");
  player2 = this.physics.add.sprite(2880, 945, "player2");
  this.add.image(960, 32.4457, "saida");
  this.add.image(2880, 32.4457, "saida", 2);
  this.add.image(960, 1047.5543, "entrada");
  this.add.image(2880, 1047.5543, "entrada");
  this.add.image(213.75, 93.6713, "status01");
  this.add.image(213.75 + 1920, 93.6713, "status02");
  this.add.image(1770, 40.3533, "closestage");
  this.add.image(1770+1920, 40.3533, "closestage");

  gameOver = false

  pc = this.physics.add.staticGroup();
  pc.create(2880, 540, "pc");

  dica01 = this.physics.add.staticGroup();
  dica01.create(1431, 753, "dica");

  dica02 = this.physics.add.staticGroup();
  dica02.create(489, 753, "dica");

  dica03 = this.physics.add.staticGroup();
  dica03.create(439, 375, "dica");

  dica04 = this.physics.add.staticGroup();
  dica04.create(1481, 375, "dica");

  pagedica01 = this.physics.add.sprite(1431, 753, "pagedica01");
  pagedica01.disableBody(false, true,);
  
  pagedica02 = this.physics.add.sprite(489, 753, "pagedica02");
  pagedica02.disableBody(false, true,);

  pagedica03 = this.physics.add.sprite(439, 375, "pagedica03");
  pagedica03.disableBody(false, true,);

  pagedica04 = this.physics.add.sprite(1481, 375, "pagedica04");
  pagedica04.disableBody(false, true,);

  this.physics.add.collider(player1, dica01, hitdica1, null, this);
  this.physics.add.collider(player1, dica02, hitdica2, null, this);
  this.physics.add.collider(player1, dica03, hitdica3, null, this);
  this.physics.add.collider(player1, dica04, hitdica4, null, this);
  this.physics.add.collider(player2, pc, hitpc, null, this);

  divisao = this.physics.add.sprite(1920, 540, "divisao");
  divisao.body.immovable = true;
  divisao.visible = false;

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
      physics.add.collider(player1, divisao, null, null, this);

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
      physics.add.collider(player2, divisao, null, null, this);

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
  this.socket.on("desenharOutroJogador", ({ frame, x, y, scene }) => {
    if (jogador === 1) {
      player2.setFrame(frame);
      player2.x = x;
      player2.y = y;
    } else if (jogador === 2) {
      player1.setFrame(frame);
      player1.x = x;
      player1.y = y;
    }
    if (scene !== 1) {
      gameOver = true  
    }
  });
};

stage00.update = function () {
  if (gameOver) {this.scene.start(stage01)}

  if (jogador === 1) {
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
    this.socket.emit("estadoDoJogador", {
      frame: player1.anims.getFrameName(),
      x: player1.body.x + 8,
      y: player1.body.y + 8,
    });
  } else if (jogador === 2) {
    if (cursors.left.isDown) {
      player2.body.setVelocityX(-500);
    } else if (cursors.right.isDown) {
      player2.body.setVelocityX(500);
    } else {
      player2.body.setVelocityX(0);
    }
    if (cursors.up.isDown) {
      player2.body.setVelocityY(-500);
    } else if (cursors.down.isDown) {
      player2.body.setVelocityY(500);
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
  pagedica01.enableBody(true, 1431, 753, true, true);
};

function hitdica2(player1, dicas) {
  pagedica02.enableBody(true, 489, 753, true, true);
};

function hitdica3(player1, dicas) {
  pagedica03.enableBody(true, 439, 375, true, true);
};

function hitdica4(player1, dicas) {
  pagedica04.enableBody(true, 1481, 375, true, true);
};

function hitpc(player2, pc) {
  opcao01 = this.add.image(524+1920, 320, "opcao01", 0).setInteractive();

  opcao01.on(
    "pointerdown",
    function () {
      gameOver = true
    },
    this
  );

  opcao02 = this.add.image(960+1920, 320, "opcao02", 0).setInteractive();

  opcao02.on(
    "pointerdown",
    function () {
      gameOver = true
    },
    this
  );

  opcao03 = this.add.image(1396+1920, 320, "opcao03", 0).setInteractive();

  opcao03.on(
    "pointerdown",
    function () {
      gameOver = true
    },
    this
  );
};

export { stage02 };