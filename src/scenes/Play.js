class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
    }

    create(){
        this.playerHP = 400;
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D',});

        this.greenB = this.add.rectangle(config.width/2,config.height/2,config.width,config.height,0x355E3B);
        //Create hitboxes for when player attacks
        this.swordHitbox = this.add.rectangle(0,0,48,64,0xffffff);
        this.physics.add.existing(this.swordHitbox);
        this.swordHitbox.setAlpha(0);
        this.swordHitbox2 = this.add.rectangle(0,0,64,48,0xffffff);
        this.physics.add.existing(this.swordHitbox2);
        this.swordHitbox2.setAlpha(0);

        this.mobs = this.add.group();

        this.player = new Player(this,120,300,'playerS').setScale(3,3);//Create player
        this.player.setSize(14,16);
        this.player.setOffset(18,24);
        //Have camera track player
        this.player.body.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0,0,640,480);
        this.cameras.main.startFollow(this.player,true,0.25,0.25);
        this.physics.world.setBounds(0,0,config.width,config.height);

        for(let i = 0; i <3 ; i++){//Spawn 3 Slimes on the map
            let slime = this.physics.add.sprite(Math.random()*(config.width-100)+50,Math.random()*(config.height-50)+25,'slimeS').setScale(3,3);
            slime.anims.play('slimeIdle');
            slime.body.setCollideWorldBounds(true);
            slime.body.setImmovable();
            this.mobs.add(slime);
        }
        //Setup player statemachine
        this.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            idleSwing: new IdleSwingState(),
        }, [this, this.player]);
        this.player.body.allowGravity = false;
        this.player.body.setImmovable = false;

        //Add collision check when player swings
        this.physics.add.collider(this.swordHitbox,this.mobs,(sword,enemy)=>{
            enemy.setTint(0xFF0000);
            enemy.setVelocityX(500 * this.player.direction.x);
            enemy.setVelocityY(500 * this.player.direction.y);
            this.time.delayedCall(300, () => {
                enemy.clearTint();
                enemy.setVelocity(0);
            })
        });
        this.physics.add.collider(this.swordHitbox2,this.mobs,(sword,enemy)=>{
            enemy.setTint(0xFF0000);
            enemy.setVelocityY(500 * this.player.direction.y);
            enemy.setVelocityX(500 * this.player.direction.x);
            this.time.delayedCall(300, () => {
                enemy.clearTint();
                enemy.setVelocity(0);
            })
        });

        this.hitTimer = this.time.now;
        this.lastHit = this.time.now;
        this.physics.add.collider(this.player,this.mobs,(player,enemy)=>{
            if(this.lastHit > this.hitTimer +100){
                this.playerHP -= 10;
                this.hitTimer = this.lastHit;
            }
            this.lastHit = this.time.now;
        })

        this.healthBar = this.add.rectangle(config.width/2,config.height-100,400,50,0x00FF00);
        this.blackBar = this.add.rectangle(config.width/2,config.height-100+25,400,5,0x000000);
        this.blackBar2 = this.add.rectangle(config.width/2,config.height-100-25,400,5,0x000000);
        this.blackBar3 = this.add.rectangle(config.width/2-200,config.height-100,5,55,0x000000);
        this.blackBar3 = this.add.rectangle(config.width/2+200,config.height-100,5,55,0x000000);
    }

    update(){
        this.playerFSM.step();
        if(this.playerHP > 0){
            this.healthBar.width = this.playerHP;
        }
        else{
            this.healthBar.width = 0;
        }
    }

}