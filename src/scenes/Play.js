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
        this.mobSpeed = 20;
        this.mobHP = 3;

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
            slime.hit = false;
            slime.hp = this.mobHP;
            slime.lastHit = this.time.now;
            slime.hitTimer = this.time.now;
            this.mobs.add(slime);
        }
        //Setup player statemachine
        this.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            idleSwing: new IdleSwingState(),
            hurt: new hurtState(),
        }, [this, this.player]);
        this.player.body.allowGravity = false;
        this.player.body.setImmovable = false;


        //Add collision check when player swings
        this.physics.add.overlap(this.swordHitbox,this.mobs,(sword,enemy)=>{
            if(enemy.lastHit > enemy.hitTimer +350){
                enemy.hitTimer = enemy.lastHit;
                enemy.hit = true;
                enemy.hp -=1;
                if(enemy.hp <=0){
                    enemy.destroy();
                }
                else{
                    enemy.setTint(0xFF0000);
                    enemy.setVelocityY(500 * this.player.direction.y);
                    enemy.setVelocityX(500 * this.player.direction.x);
                    this.time.delayedCall(300, () => {
                        enemy.clearTint();
                        enemy.setVelocity(0);
                        enemy.hit = false;
                    })
                }
            }
            enemy.lastHit = this.time.now;
        });
        this.physics.add.overlap(this.swordHitbox2,this.mobs,(sword,enemy)=>{
            if(enemy.lastHit > enemy.hitTimer +350){
                enemy.hitTimer = enemy.lastHit;
                enemy.hit = true;
                enemy.hp -=1;
                if(enemy.hp <=0){
                    enemy.destroy();
                }
                else{
                    enemy.setTint(0xFF0000);
                    enemy.setVelocityY(500 * this.player.direction.y);
                    enemy.setVelocityX(500 * this.player.direction.x);
                    this.time.delayedCall(300, () => {
                        enemy.clearTint();
                        enemy.setVelocity(0);
                        enemy.hit = false;
                    })
                }
            }
            enemy.lastHit = this.time.now;
        });

        this.healthBar = this.add.rectangle(-100,config.height-100,20,20,0x00FF00).setAlpha(0);
        this.blackBar = this.add.rectangle(-100,config.height-100+25,80,2,0x000000).setAlpha(0);
        this.blackBar2 = this.add.rectangle(-100,config.height-100-25,80,2,0x000000).setAlpha(0);
        this.blackBar3 = this.add.rectangle(-100,config.height-100,2,20,0x000000).setAlpha(0);
        this.blackBar4 = this.add.rectangle(-100,config.height-100,2,20,0x000000).setAlpha(0);

        this.hitTimer = this.time.now;
        this.lastHit = this.time.now;
        this.hpShowStart = this.time.now;
        this.hpShowTime = this.time.now+1000;

        this.physics.add.collider(this.player,this.mobs,(player,enemy)=>{
            let dirX = this.player.direction.x;
            let dirY = this.player.direction.y;
            if(this.lastHit > this.hitTimer +100){
                this.player.setTint(0xFF0000);
                this.input.keyboard.enabled = false;
                this.input.keyboard.resetKeys();
                this.time.delayedCall(300,inputOn,[],this);
                this.playerHP -= 10;
                this.hitTimer = this.lastHit;
                this.player.setVelocityX(-300*dirX);
                this.player.setVelocityY(-300*dirY);
            }
            this.hpShowStart = this.time.now;
            this.lastHit = this.time.now;
        })

    }

    update(){
        this.playerFSM.step();
        if(this.playerHP > 0){
            this.healthBar.width = (this.playerHP/400)*80;
        }
        else{
            this.healthBar.width = 0;
        }

        if(this.hpShowTime < this.hpShowStart + 1000){
            this.healthBar.x = this.player.x-30;
            this.blackBar.x = this.player.x;
            this.blackBar2.x = this.player.x;
            this.blackBar3.x = this.player.x+40;
            this.blackBar4.x = this.player.x-40;
            this.healthBar.y = this.player.y+80;
            this.blackBar.y = this.player.y+90;
            this.blackBar2.y = this.player.y+70;
            this.blackBar3.y = this.player.y+80;
            this.blackBar4.y = this.player.y+80;
            this.healthBar.setAlpha(1);
            this.blackBar.setAlpha(1);
            this.blackBar2.setAlpha(1);
            this.blackBar3.setAlpha(1);
            this.blackBar4.setAlpha(1);
        }
        else{
            this.healthBar.setAlpha(0);
            this.blackBar.setAlpha(0);
            this.blackBar2.setAlpha(0);
            this.blackBar3.setAlpha(0);
            this.blackBar4.setAlpha(0);
        }
        this.hpShowTime = this.time.now;
        this.mobs.children.each(function(enemy) {
            if(!enemy.hit){
            if(Phaser.Math.Distance.BetweenPoints(enemy, this.player) < 300) {

                // if player to left of enemy AND enemy moving to right (or not moving)
                if (this.player.x < enemy.x && enemy.body.velocity.x >= 0) {
                    // move enemy to left
                    enemy.body.velocity.x = -this.mobSpeed;
                }
                // if player to right of enemy AND enemy moving to left (or not moving)
                else if (this.player.x > enemy.x && enemy.body.velocity.x <= 0) {
                    // move enemy to right
                    enemy.body.velocity.x = this.mobSpeed;
                }

                if (this.player.y < enemy.y && enemy.body.velocity.y >= 0) {
                    // move enemy to left
                    enemy.body.velocity.y = -this.mobSpeed;
                }
                // if player to right of enemy AND enemy moving to left (or not moving)
                else if (this.player.y > enemy.y && enemy.body.velocity.y <= 0) {
                    // move enemy to right
                    enemy.body.velocity.y = this.mobSpeed;
                }
            }
            else{
                enemy.body.velocity.x = 0;
                enemy.body.velocity.y = 0;
            }
        }
        }, this);

    }

}

function inputOn(){
    this.input.keyboard.enabled = true;
    this.player.clearTint(0xFF0000);
    this.player.setVelocity(0);
}
