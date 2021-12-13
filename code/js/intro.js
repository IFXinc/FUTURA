var intro = new Phaser.Scene("Introdução");

cena1.preload = function () {

    // Tilemap
    this.load.tilemapTiledJSON("map", "assets/cena1.json");
  
    // Jogador 1
    this.load.spritesheet("player1", "assets/player1.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  
    // Jogador 2
    this.load.spritesheet("player2", "assets/player2.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  
    // Trilha sonora
    this.load.audio("trilha", "assets/cena1.mp3");
  
    // Efeitos sonoros
    this.load.audio("parede", "assets/parede.mp3");
    this.load.audio("voz", "assets/voz.mp3");
  
    // Tela cheia
    this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  
    // D-pad
    this.load.spritesheet("esquerda", "assets/esquerda.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("direita", "assets/direita.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("cima", "assets/cima.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("baixo", "assets/baixo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  };