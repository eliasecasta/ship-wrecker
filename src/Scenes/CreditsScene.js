/* eslint-disable no-unused-expressions, func-names */

import Phaser from 'phaser';
import config from '../Config/config';
import { ScrollingBackground } from '../Entities';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.madeByText = this.add.text(0, 0, 'Created By: Elias Castañeda', {
      fontSize: '26px',
      fill: '#fff',
    });

    this.assetsText = this.add.text(0, 0, 'Assets: gamesupply.itch.io', {
      fontSize: '26px',
      fill: '#fff',
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);
    Phaser.Display.Align.In.Center(this.madeByText, this.zone);
    Phaser.Display.Align.In.Center(this.assetsText, this.zone);

    this.madeByText.setY(500);
    this.assetsText.setY(700);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 500,
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 7000,
      delay: 500,
      onComplete: function () {
        this.madeByTween.destroy;
      }.bind(this),
    });

    this.assetsTween = this.tweens.add({
      targets: this.assetsText,
      y: -200,
      ease: 'Power1',
      duration: 7000,
      delay: 1000,
      onComplete: function () {
        this.assetsTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}

/* eslint-enable no-unused-expressions, func-names */
