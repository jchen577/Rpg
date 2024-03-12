/*
Name: Jacky Chen
*/
const tileSize = 16;

let config = {
    type: Phaser.WEBGL,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [Load, Play , GameOver]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
