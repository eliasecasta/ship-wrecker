import Phaser from "phaser";
import config from "../Config/config";
import { getScores } from "../Config/scoresApi";
import Button from "../Objects/Button";
import { ScrollingBackground } from "../Entities";

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super("Leaderboard");
  }

  preload() {}

  create() {
    (async () => {
      this.backgrounds = [];
      for (let i = 0; i < 5; i++) {
        let keys = ["sprBg0", "sprBg1"];
        let key = keys[Phaser.Math.Between(0, keys.length - 1)];
        let bg = new ScrollingBackground(this, key, i * 10);
        this.backgrounds.push(bg);
      }

      this.title = this.add.text(
        config.width / 2,
        config.height / 2 - 250,
        "Leaderboard",
        {
          fontSize: 40,
          fontFamily: "monospace",
        }
      );

      this.title.setOrigin(0.5);
      let completeLeaderboard = await getScores();
      let orderedLeaderboard = completeLeaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      orderedLeaderboard.forEach((element, index) => {
        this.add
          .text(
            config.width / 2,
            (config.height / 2 - 250) * (index + 3),
            `#${index + 1}:  ${element.user}  ${element.score}`,
            {
              fontSize: 25,
              fontFamily: "monospace",
            }
          )
          .setOrigin(0.5);
      });

      this.menuButton = new Button(
        this,
        400,
        500,
        "blueButton1",
        "blueButton2",
        "Menu",
        "Title"
      );
    })();
  }
}
