import Phaser from 'phaser';
import $ from 'jquery';
import Button from '../Objects/Button';
import { setScore } from '../Config/scoresApi';
import { ScrollingBackground } from '../Entities';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
    this.title = this.add.text(this.game.config.width * 0.5, 64, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.btnRestart = new Button(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Restart',
      'Game',
    );

    this.btnMenu = new Button(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2,
      'blueButton1',
      'blueButton2',
      'Main Menu',
      'Title',
    );

    const userScore = localStorage.getItem('playerScore');

    this.text = this.add.text(
      this.game.config.width / 2,
      128,
      `Your score was: ${userScore}`,
      {
        fontFamily: 'monospace',
        fontSize: 24,
        fontStyle: 'italic',
        color: '#ffffff',
        align: 'center',
      },
    );
    this.text.setOrigin(0.5);

    const playerNameForm = this.add.dom(400, 400).createFromCache('nameForm');

    function check(event) {
      if (event.target.name === 'submitButton') {
        const inputText = $('.nameField').get(0);
        const inputStyle = $('.nameField').get(0).style;

        if (
          inputText.value !== ''
          && inputText.value !== undefined
          && inputText.value !== null
        ) {
          playerNameForm.removeListener('click');
          playerNameForm.visible = false;

          let playerScore = localStorage.getItem('playerScore');
          // eslint-disable-next-line radix
          playerScore = parseInt(playerScore);

          const playerNameScore = {
            user: inputText.value,
            score: playerScore,
          };
          setScore(playerNameScore);
        } else {
          inputStyle.border = '3px solid red';
          playerNameForm.updateSize();
        }
      }
    }
    playerNameForm.addListener('click');
    playerNameForm.on(
      'click',
      (event) => {
        check(event);
      },
      this,
    );
  }
}
