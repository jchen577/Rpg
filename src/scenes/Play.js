class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
    }

    create(){
        this.maxSpawns = 10;
        this.currSpawns = 0;
        this.playerHP = 400;
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D',});

        const map = this.make.tilemap({key:'tilemap'});//Tilemap
        const tileset = map.addTilesetImage('adventureTiles','baseTiles');

        const Layer2 = map.createLayer('Tile Layer 2',tileset);
        const Layer1 = map.createLayer('Tile Layer 1',tileset);

        //enemy spawn points
        this.enemyS = map.findObject('Spawns',obj => obj.name === 'S1');
        this.enemyS2 = map.findObject('Spawns',obj => obj.name === 'S2');
        this.enemyS3 = map.findObject('Spawns',obj => obj.name === 'S3');
        this.enemyS4 = map.findObject('Spawns',obj => obj.name === 'S4');
        this.enemyS5 = map.findObject('Spawns',obj => obj.name === 'S5');
        this.enemyS6 = map.findObject('Spawns',obj => obj.name === 'S6');
        this.enemyS7 = map.findObject('Spawns',obj => obj.name === 'S7');
        this.enemyS8 = map.findObject('Spawns',obj => obj.name === 'S8');
        this.enemyS9 = map.findObject('Spawns',obj => obj.name === 'S9');
        this.enemyS10 = map.findObject('Spawns',obj => obj.name === 'S10');

        this.spawnLoc = [];
        this.spawnLoc[0] = this.enemyS;
        this.spawnLoc[1] = this.enemyS2;
        this.spawnLoc[2] = this.enemyS3;
        this.spawnLoc[3] = this.enemyS4;
        this.spawnLoc[4] = this.enemyS5;
        this.spawnLoc[5] = this.enemyS6;
        this.spawnLoc[6] = this.enemyS7;
        this.spawnLoc[7] = this.enemyS8;
        this.spawnLoc[8] = this.enemyS9;
        this.spawnLoc[9] = this.enemyS10;

        //this.greenB = this.add.rectangle(config.width/2,config.height/2,config.width,config.height,0x355E3B);
        //Create hitboxes for when player attacks
        this.swordHitbox = this.add.rectangle(0,0,48,64,0xffffff);
        this.physics.add.existing(this.swordHitbox);
        this.swordHitbox.setAlpha(0);
        this.swordHitbox2 = this.add.rectangle(0,0,64,48,0xffffff);
        this.physics.add.existing(this.swordHitbox2);
        this.swordHitbox2.setAlpha(0);

        this.mobs = this.add.group();//Mob group
        this.mobSpeed = 40;
        this.mobHP = 3;

        this.player = new Player(this,120,300,'playerS').setScale(3,3);//Create player
        this.player.setSize(14,16);
        this.player.setOffset(18,24);
        //Have camera track player
        this.player.body.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.startFollow(this.player,true,0.25,0.25);
        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);

        Layer1.setCollisionByProperty({
            collisions: true,
        });
        this.physics.add.collider(this.player,Layer1);
        this.physics.add.collider(this.mobs,Layer1)

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
        this.physics.add.overlap(this.swordHitbox,this.mobs,(sword,enemy)=>{//Collision on side swing
            if(enemy.lastHit > enemy.hitTimer +350){
                enemy.hitTimer = enemy.lastHit;
                enemy.hit = true;
                enemy.hp -=1;
                if(enemy.hp <=0){
                    enemy.destroy();
                    this.currSpawns--;
                    this.player.exp += 1;
                    if(this.player.exp >= this.player.expToNextLvl){//level up logic
                        this.player.lvl +=1;
                        this.player.exp = 0;
                        this.player.expToNextLvl = Math.floor(Math.pow(this.player.lvl/0.5,2));
                        console.log(this.player.lvl);
                    }
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
        this.physics.add.overlap(this.swordHitbox2,this.mobs,(sword,enemy)=>{//Collision on vertical swing
            if(enemy.lastHit > enemy.hitTimer +350){
                enemy.hitTimer = enemy.lastHit;
                enemy.hit = true;
                enemy.hp -=1;
                if(enemy.hp <=0){
                    enemy.destroy();
                    this.currSpawns--;
                    this.player.exp += 1;
                    if(this.player.exp >= this.player.expToNextLvl){//level up logic
                        this.player.lvl +=1;
                        this.player.exp = 0;
                        this.player.expToNextLvl = Math.floor(Math.pow(this.player.lvl/0.5,2));
                        console.log(this.player.lvl);
                    }
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

        //Player health bar
        this.healthBar = this.add.rectangle(-100,config.height-100,20,20,0x00FF00).setAlpha(0);
        this.blackBar = this.add.rectangle(-100,config.height-100+25,80,2,0x000000).setAlpha(0);
        this.blackBar2 = this.add.rectangle(-100,config.height-100-25,80,2,0x000000).setAlpha(0);
        this.blackBar3 = this.add.rectangle(-100,config.height-100,2,20,0x000000).setAlpha(0);
        this.blackBar4 = this.add.rectangle(-100,config.height-100,2,20,0x000000).setAlpha(0);

        //Player xp bar
        this.xpBlack = this.add.rectangle(-100,-100,225,35,0x000000).setScrollFactor(0,0);
        this.xp = this.add.rectangle(this.cameras.main.centerX -100, this.cameras.main.centerY -100,200,20,0xFFA500);
        this.xp.setScrollFactor(0,0);
        this.xpText = this.add.text(-100,-100,'EXP').setScrollFactor(0,0);

        this.hitTimer = this.time.now;
        this.lastHit = this.time.now;
        this.hpShowStart = this.time.now;
        this.hpShowTime = this.time.now+1000;

        this.physics.add.overlap(this.player,this.mobs,(player,enemy)=>{//Player gets hit collision
            let dirX = this.player.direction.x;
            let dirY = this.player.direction.y;
            if(dirX == 0){
                if(enemy.body.velocity.x >0){
                    dirX = -1;
                }else{
                    dirX = 1;
                }
                if(enemy.body.velocity.y >0){
                    dirY = -1;
                }else{
                    dirY = 1;
                }
            }
            if(this.lastHit > this.hitTimer +100){//Hit delay
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
        if(this.currSpawns <= 10){
            this.currSpawns++;
            this.time.delayedCall(1000, mobSpawn, [this,'slimeS']);
            //mobSpawn(this,'slimeS');
        }
        this.xp.setPosition(this.cameras.main.centerX - config.width/2+150,this.cameras.main.centerY + config.height/2 -50);
        this.xpBlack.setPosition(this.cameras.main.centerX - config.width/2+150,this.cameras.main.centerY + config.height/2 -50);
        this.xpText.setPosition(this.cameras.main.centerX - config.width/2+50,this.cameras.main.centerY + config.height/2 -55)

        this.xp.width = (this.player.exp/this.player.expToNextLvl)*200;

        if(this.playerHP > 0){
            this.healthBar.width = (this.playerHP/400)*80;
        }
        else{
            this.healthBar.width = 0;
        }

        if(this.hpShowTime < this.hpShowStart + 1000){//Showing playerhp bar
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
        this.mobs.children.each(function(enemy) {//Mobs check distance from player and move accordingly
            if(!enemy.hit){
                if(Phaser.Math.Distance.BetweenPoints(enemy, this.player) < 300) {

                    // if player to left of enemy AND enemy moving to right (or not moving)
                    if (this.player.x < enemy.x && enemy.body.velocity.x >= 0) {
                        // move enemy to left
                        enemy.setVelocityX(-this.mobSpeed);
                    }
                    // if player to right of enemy AND enemy moving to left (or not moving)
                    else if (this.player.x > enemy.x && enemy.body.velocity.x <= 0) {
                        // move enemy to right
                        enemy.setVelocityX(this.mobSpeed);
                    }

                    if (this.player.y < enemy.y && enemy.body.velocity.y >= 0) {
                        // move enemy to left
                        enemy.setVelocityY(-this.mobSpeed);
                    }
                    // if player to right of enemy AND enemy moving to left (or not moving)
                    else if (this.player.y > enemy.y && enemy.body.velocity.y <= 0) {
                        // move enemy to right
                        enemy.setVelocityY(this.mobSpeed);
                    }
                }
                else{
                    if(enemy.currSpeed > enemy.lastSpeed + 1000){//enemy randomized movement
                        let direc = Math.floor(Math.random()*5);
                        if(direc == 0){
                            enemy.setVelocity(0);
                        }
                        else if(direc == 1){
                            enemy.setVelocityY(this.mobSpeed);
                        }
                        else if(direc == 2){
                            enemy.setVelocityY(-this.mobSpeed);
                        }
                        else if(direc == 3){
                            enemy.setVelocityX(this.mobSpeed);
                        }
                        else{
                            enemy.setVelocityX(-this.mobSpeed);
                        }
                        enemy.lastSpeed = this.time.now;
                    }
                    enemy.currSpeed = this.time.now;
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

function mobSpawn(scene,mobName){
    let spaw = Math.floor(Math.random()*10);
    let slime = scene.physics.add.sprite(scene.spawnLoc[spaw].x,scene.spawnLoc[spaw].y,mobName).setScale(3,3);
    slime.setSize(16,16);
    slime.anims.play('slimeIdle');
    slime.body.setCollideWorldBounds(true);
    slime.body.setImmovable();
    slime.hit = false;
    slime.hp = scene.mobHP;
    slime.lastHit = scene.time.now;
    slime.hitTimer = scene.time.now;
    slime.lastSpeed = scene.time.now;
    slime.currSpeed = scene.time.now;
    scene.mobs.add(slime);
    //scene.currSpawns++;
}