import Phaser from "phaser";

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
  }
}
