
import { stage00 } from "./stage00.js";


const config = {
    type: Phaser.AUTO,
    width: 3840,
    height: 1080,
    parent: "game-container",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: true
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      parent: "game",
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 3840,
      height: 1080,
    },
    scene: [stage00],
  };
  
  const game = new Phaser.Game(config);