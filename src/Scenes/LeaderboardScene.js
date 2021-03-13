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
      console.log(completeLeaderboard);
      let orderedLeaderboard = completeLeaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      console.log(orderedLeaderboard);

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

    // this.creditsText = this.add.text(0, 0, "Credits", {
    //   fontSize: "32px",
    //   fill: "#fff",
    // });
    // this.madeByText = this.add.text(0, 0, "Created By: Elias Castañeda", {
    //   fontSize: "26px",
    //   fill: "#fff",
    // });
    // this.zone = this.add.zone(
    //   config.width / 2,
    //   config.height / 2,
    //   config.width,
    //   config.height
    // );

    // Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    // Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    // this.madeByText.setY(1000);

    // this.creditsTween = this.tweens.add({
    //   targets: this.creditsText,
    //   y: -100,
    //   ease: "Power1",
    //   duration: 3000,
    //   delay: 1000,
    //   onComplete: function () {
    //     this.destroy;
    //   },
    // });

    // this.madeByTween = this.tweens.add({
    //   targets: this.madeByText,
    //   y: -300,
    //   ease: "Power1",
    //   duration: 8000,
    //   delay: 1000,
    //   onComplete: function () {
    //     this.madeByTween.destroy;
    //     this.scene.start("Title");
    //   }.bind(this),
    // });
  }
}
