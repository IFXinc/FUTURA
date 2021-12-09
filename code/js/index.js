import { start } from "code/js/start";
import { home } from "code/js/home";
import { lobby } from "code/js/lobby";
import { intro } from "code/js/stageintro";
import { stage01 } from "code/js/stageeasy";
import { stage02 } from "code/js/stageeasy";
import { stage03 } from "code/js/stageeasy";
import { stage04 } from "code/js/stagemedium";
import { stage05 } from "code/js/stagemedium";
import { stage06 } from "code/js/stagemedium";
import { stage07 } from "code/js/stagehard";
import { stage08 } from "code/js/stagehard";
import { stage09 } from "code/js/stagehard";
import { stage10 } from "code/js/stageboss";

const config = {
    type: Phaser.AUTO,
    width: 240,
    height: 135,
    parent: "game-container",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      parent: "game",
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 240,
      height: 135,
    },
    scene: [start, home, lobby, intro, stage01, stage02, stage03, stage04, stage05, stage06, stage07, stage08, stage09, stage10],
  };
  
  const game = new Phaser.Game(config);