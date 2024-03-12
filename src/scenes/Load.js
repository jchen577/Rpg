class Load extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }
    preload(){
        this.load.spritesheet('playerS','./assets/sprites/characters/player.png',{frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('slimeS','./assets/sprites/characters/slime.png',{frameWidth: 32, frameHeight: 32});
        this.load.tilemapTiledJSON('tilemap','assets/wipMap.tmj');
        this.load.image('baseTiles','assets/spritesheet.png ');
    }

    create(){
        this.anims.create({ 
            key: 'walkR', 
            frames: this.anims.generateFrameNumbers('playerS',{
                start: 24,
                end: 29,
            }), 
            frameRate: 12,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'walkUp', 
            frames: this.anims.generateFrameNumbers('playerS',{
                start: 30,
                end: 35,
            }), 
            frameRate: 12,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'walkD', 
            frames: this.anims.generateFrameNumbers('playerS',{
                start: 18,
                end: 23,
            }), 
            frameRate: 12,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'swingR', 
            frames: this.anims.generateFrameNumbers('playerS',{
                start: 42,
                end: 45,
            }), 
            frameRate: 12,
            repeat: 0 
        });
        this.anims.create({ 
            key: 'swingDown', 
            frames: this.anims.generateFrameNumbers('playerS',{
                start: 36,
                end: 39,
            }), 
            frameRate: 12,
            repeat: 0 
        });
        this.anims.create({ 
            key: 'swingUp', 
            frames: this.anims.generateFrameNumbers('playerS',{
                start: 48,
                end: 51,
            }), 
            frameRate: 12,
            repeat: 0 
        });
        this.anims.create({
            key: 'slimeIdle', 
            frames: this.anims.generateFrameNumbers('slimeS',{
                start: 0,
                end: 3,
            }), 
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'slimeDeath', 
            frames: this.anims.generateFrameNumbers('slimeS',{
                start: 28,
                end: 32,
            }), 
            frameRate: 6,
            repeat: 0,
        });
        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('playerS',{
                start:54,
                end: 56,
            }),
            frameRate: 1,
            repeat: 0,
        });
        this.scene.start('playScene');
    }

    update(){
    }
}