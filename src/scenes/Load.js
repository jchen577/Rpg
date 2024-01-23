class Load extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }
    preload(){
        this.load.spritesheet('playerS','./assets/sprites/characters/player.png',{frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('slimeS','./assets/sprites/characters/slime.png',{frameWidth: 32, frameHeight: 32});
    }

    create(){

        this.keys = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D',});
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
        this.greenB = this.add.rectangle(320,240,640,480,0x355E3B);
        //Create hitboxes for when player attacks
        this.swordHitbox = this.add.rectangle(0,0,48,64,0xffffff);
        this.physics.add.existing(this.swordHitbox);
        this.swordHitbox.setAlpha(0);
        this.swordHitbox2 = this.add.rectangle(0,0,64,48,0xffffff);
        this.physics.add.existing(this.swordHitbox2);
        this.swordHitbox2.setAlpha(0);

        this.player = new Player(this,120,300,'playerS').setScale(3,3);//Create player
        this.player.setSize(14,16);
        this.player.setOffset(18,24);
        //Have camera track player
        this.player.body.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0,0,640,480);
        this.cameras.main.startFollow(this.player,true,0.25,0.25);
        this.physics.world.setBounds(0,0,640,480);
        this.slime = this.physics.add.sprite(200,200,'slimeS').setScale(3,3);
        this.slime.anims.play('slimeIdle');
        //Setup player statemachine
        this.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            idleSwing: new IdleSwingState(),
        }, [this, this.player]);
        this.player.body.allowGravity = false;
        this.player.body.setImmovable = true;

        //Add collision check when player swings
        this.physics.add.collider(this.swordHitbox,this.slime,(sword,enemy)=>{
            enemy.setTint(0xFF0000);
            enemy.setVelocityX(100);
            this.time.delayedCall(1000, () => {
                enemy.clearTint();
                enemy.setVelocity(0);
            })
        });
        this.physics.add.collider(this.swordHitbox2,this.slime,(sword,enemy)=>{
            console.log('hit');
        });
    }

    update(){
        this.playerFSM.step();
    }
}