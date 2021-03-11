import Phaser from "phaser";
import Button from "../Objects/Button";

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  preload() {}

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: "monospace",
      fontSize: 48,
      fontStyle: "bold",
      color: "#ffffff",
      align: "center",
    });
    this.title.setOrigin(0.5);

    this.btnRestart = new Button(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 - 100,
      "blueButton1",
      "blueButton2",
      "Restart",
      "Game"
    );

    this.btnMenu = new Button(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2,
      "blueButton1",
      "blueButton2",
      "Main Menu",
      "Title"
    );

    let score2 = localStorage.getItem("playerScore");
    console.log(`Final Score: ${score2}`);
  }
}
