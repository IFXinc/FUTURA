import { start } from "./start.js";
import { stage00 } from "./stage00.js";
import { stage01 } from "./stage01.js";
import { stage02 } from "./stage02.js";
import { win } from "./win.js";
import { gameover } from "./gameover.js";

const config = {
  type: Phaser.AUTO,
  width: 3840,
  height: 1080,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 3840,
    height: 1080,
  },
  scene: [start, stage00, stage01, stage02, gameover, win],
};

const game = new Phaser.Game(config);
