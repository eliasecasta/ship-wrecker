import Phaser from "phaser";
import Button from "../Objects/Button";
import { setScore } from "../Config/scoresApi";

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  preload() {}

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 64, "GAME OVER", {
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

    const userScore = localStorage.getItem("playerScore");

    console.log(`Final Score: ${userScore}`);

    this.text = this.add.text(
      this.game.config.width / 2,
      128,
      `Your score was: ${userScore}`,
      {
        fontFamily: "monospace",
        fontSize: 24,
        fontStyle: "italic",
        color: "#ffffff",
        align: "center",
      }
    );
    this.text.setOrigin(0.5);

    // Use this for leaderboard scores
    // const initAPI = async () => {
    //   let scores = await getScores();
    //   return scores.result;
    // };

    // let scores = initAPI();
    // console.log(scores[0]);

    const playerNameForm = this.add.dom(400, 400).createFromCache("nameForm");

    playerNameForm.addListener("click");
    playerNameForm.on(
      "click",
      (event) => {
        check(event);
      },
      this
    );

    function check(event) {
      if (event.target.name === "submitButton") {
        const inputText = playerNameForm.node.firstChild;
        let inputStyle = playerNameForm.node.firstChild.style;

        if (
          inputText.value !== "" &&
          inputText.value !== undefined &&
          inputText.value !== null
        ) {
          playerNameForm.removeListener("click");
          playerNameForm.visible = false;
          console.log(inputText.value);

          let playerScore = localStorage.getItem("playerScore");
          playerScore = parseInt(playerScore)

          const playerNameScore = {
            user: inputText.value,
            score: playerScore,
          };
          setScore(playerNameScore);
        } else {
          inputStyle.border = "3px solid red";
          playerNameForm.updateSize();
        }
      }
    }
  }
}
