//import { stage01 } from "./stage01.js";

var stage00 = new Phaser.Scene("Introdução");

var ARCas;
var cursors;
var dica;
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

  this.load.spritesheet("dicas", "./assets/object-pagegame-dicas.png", {
    frameWidth: 202,
    frameHeight: 202,
  });

  this.load.spritesheet("saida", "./assets/object-pagegame-saida.png", {
    frameWidth: 314,
    frameHeight: 93,
  });

  this.load.spritesheet("player1", "./assets/player1.png", {
    frameWidth: 100,
    frameHeight: 150,
  });

  this.load.spritesheet("player2", "./assets/player2.png", {
    frameWidth: 100,
    frameHeight: 150,
  });

  this.load.spritesheet("close", "./assets/button-pagegame-close.png", {
    frameWidth: 236,
    frameHeight: 43.1429,
  });
};

stage00.create = function () {

  this.socket = io();

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
  var cameras = this.cameras;
  var time = this.time;
  var socket = this.socket;

  this.socket.on("jogadores", function (jogadores) {
    if (jogadores.primeiro === self.socket.id) {
      // Define jogador como o primeiro
      jogador = 1;

      // Personagens colidem com os limites da cena
      player1.setCollideWorldBounds(true);

      // Detecção de colisão: terreno
      physics.add.collider(player1, terreno, hitCave, null, this);

      // Detecção de colisão e disparo de evento: ARCas
      physics.add.collider(player1, ARCas, hitARCa, null, this);

      // Câmera seguindo o personagem 1
      cameras.main.startFollow(player1);

      // D-pad: para cada direção já os eventos
      // para tocar a tela ("pointerover")
      // e ao terminar essa interação ("pointerout")
      esquerda.on("pointerover", () => {
        if (timer > 0) {
          esquerda.setFrame(1);
          player1.setVelocityX(-160);
          player1.anims.play("left1", true);
        }
      });
      esquerda.on("pointerout", () => {
        if (timer > 0) {
          esquerda.setFrame(0);
          player1.setVelocityX(0);
          player1.anims.play("stopped1", true);
        }
      });
      direita.on("pointerover", () => {
        if (timer > 0) {
          direita.setFrame(1);
          player1.setVelocityX(160);
          player1.anims.play("right1", true);
        }
      });
      direita.on("pointerout", () => {
        if (timer > 0) {
          direita.setFrame(0);
          player1.setVelocityX(0);
          player1.anims.play("stopped1", true);
        }
      });
      cima.on("pointerover", () => {
        if (timer > 0) {
          cima.setFrame(1);
          player1.setVelocityY(-160);
          player1.anims.play("right1", true);
        }
      });
      cima.on("pointerout", () => {
        if (timer > 0) {
          cima.setFrame(0);
          player1.setVelocityY(0);
          player1.anims.play("stopped1", true);
        }
      });
      baixo.on("pointerover", () => {
        if (timer > 0) {
          baixo.setFrame(1);
          player1.setVelocityY(160);
          player1.anims.play("right1", true);
        }
      });
      baixo.on("pointerout", () => {
        if (timer > 0) {
          baixo.setFrame(0);
          player1.setVelocityY(0);
          player1.anims.play("stopped1", true);
        }
      });

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

      // Detecção de colisão: terreno
      physics.add.collider(player2, terreno, hitCave, null, this);

      // Detecção de colisão e disparo de evento: ARCas
      physics.add.collider(player2, ARCas, hitARCa, null, this);

      // Câmera seguindo o personagem 2
      cameras.main.startFollow(player2);

      // D-pad: para cada direção já os eventos
      // para tocar a tela ("pointerover")
      // e ao terminar essa interação ("pointerout")
      esquerda.on("pointerover", () => {
        if (timer > 0) {
          esquerda.setFrame(1);
          player2.setVelocityX(-160);
          player2.anims.play("left2", true);
        }
      });
      esquerda.on("pointerout", () => {
        if (timer > 0) {
          esquerda.setFrame(0);
          player2.setVelocityX(0);
          player2.anims.play("stopped2", true);
        }
      });
      direita.on("pointerover", () => {
        if (timer > 0) {
          direita.setFrame(1);
          player2.setVelocityX(160);
          player2.anims.play("right2", true);
        }
      });
      direita.on("pointerout", () => {
        if (timer > 0) {
          direita.setFrame(0);
          player2.setVelocityX(0);
          player2.anims.play("stopped2", true);
        }
      });
      cima.on("pointerover", () => {
        if (timer > 0) {
          cima.setFrame(1);
          player2.setVelocityY(-160);
          player2.anims.play("right2", true);
        }
      });
      cima.on("pointerout", () => {
        if (timer > 0) {
          cima.setFrame(0);
          player2.setVelocityY(0);
          player2.anims.play("stopped2", true);
        }
      });
      baixo.on("pointerover", () => {
        if (timer > 0) {
          baixo.setFrame(1);
          player2.setVelocityY(160);
          player2.anims.play("right2", true);
        }
      });
      baixo.on("pointerout", () => {
        if (timer > 0) {
          baixo.setFrame(0);
          player2.setVelocityY(0);
          player2.anims.play("stopped2", true);
        }
      });

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
    if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {
      // Contagem regressiva em segundos (1.000 milissegundos)
      timer = 60;
      timedEvent = time.addEvent({
        delay: 1000,
        callback: countdown,
        callbackScope: this,
        loop: true,
      });
    }
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

  socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  socket.on("candidate", (candidate) => {
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
}
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
  pagedica.enableBody(true, 960, 540, true, true);
}

export { stage00 };
