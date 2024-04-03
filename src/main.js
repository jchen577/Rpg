/*
Name: Jacky Chen
Sources: https://www.youtube.com/watch?v=Yma-IddcyMM&list=WL&index=144&t=33s
        https://kasayaa.itch.io/kasayas-inventory-and-frames?download
        
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
    scene: [Load, Play, Menu, GameOver]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
