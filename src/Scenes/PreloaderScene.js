import Phaser from "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }
  init() {
    this.readyCount = 0;
  }
  preload() {
    // add logo image
    this.add.image(400, 150, "logo");

    // display progress bar
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
    });

    // remove progress bar when complete
    this.load.on(
      "complete",
      function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      }.bind(this)
    );

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in game
    this.load.image("blueButton1", "/src/assets/blue_button02.png");
    this.load.image("blueButton2", "/src/assets/blue_button03.png");
    this.load.image("phaserLogo", "/src/assets/logo.png");
    this.load.image("box", "/src/assets/grey_box.png");
    this.load.image("checkedBox", "/src/assets/blue_boxCheckmark.png");
    this.load.audio("bgMusic", "/src/assets/Music_BG.mp3");
    this.load.html("nameForm", "/src/assets/text/nameForm.html");
    this.load.image("sprBg0", "/src/assets/sprBg0.png");
    this.load.image("sprBg1", "/src/assets/sprBg1.png");

    this.load.spritesheet("sprExplosion", "/src/assets/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("sprEnemy0", "/src/assets/sprEnemy0.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.image("sprEnemy1", "/src/assets/sprEnemy1.png");
    this.load.spritesheet("sprEnemy2", "/src/assets/sprEnemy2.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.image("sprLaserEnemy0", "/src/assets/sprLaserEnemy0.png");
    this.load.image("sprLaserPlayer", "/src/assets/sprLaserPlayer.png");
    this.load.spritesheet("sprPlayer", "/src/assets/sprPlayer.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.audio("sndExplode0", "/src/assets/sndExplode0.wav");
    this.load.audio("sndExplode1", "/src/assets/sndExplode1.wav");
    this.load.audio("sndLaser", "/src/assets/sndLaser.wav");

    this.load.image("bigShip1", "/src/assets/BigShip1.png");
    this.load.image("bigShip2", "/src/assets/BigShip2.png");
    this.load.image("carrier1", "/src/assets/carrier1.png");
    this.load.image("carrier2", "/src/assets/carrier2.png");
  }

  ready() {
    this.scene.start("Title");

    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start("Title");
    }
  }
}
