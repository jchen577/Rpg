class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
    }

    create(){

        this.dead = false;
        this.maxSpawns = 20;
        this.currSpawns = 0;
        this.gold = 0;
        this.playerDMGMult = 1;
        this.bound1X = 1600;
        this.bound1Y = 1600;
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D', shift: 'SHIFT', reset: 'R', inter: 'E', openInv: 'Q'});

        const map = this.make.tilemap({key:'tilemap'});//Tilemap
        const tileset = map.addTilesetImage('adventureTiles','baseTiles');
        const tileset2 = map.addTilesetImage('extraTiles','bonusTiles');
    
        const Layer2 = map.createLayer('Tile Layer 2',tileset);
        const Layer3 = map.createLayer('Tile Layer 3',tileset2);
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
        this.enemyS11 = map.findObject('Spawns',obj => obj.name === 'S11');
        this.enemyS12 = map.findObject('Spawns',obj => obj.name === 'S12');
        this.enemyS13 = map.findObject('Spawns',obj => obj.name === 'S13');
        this.enemyS14 = map.findObject('Spawns',obj => obj.name === 'S14');
        this.enemyS15 = map.findObject('Spawns',obj => obj.name === 'S15');
        this.enemyS16 = map.findObject('Spawns',obj => obj.name === 'S16');
        this.enemyS17 = map.findObject('Spawns',obj => obj.name === 'S17');
        this.enemyS18 = map.findObject('Spawns',obj => obj.name === 'S18');
        this.enemyS19 = map.findObject('Spawns',obj => obj.name === 'S19');

        this.slimeB = map.findObject('bossSpawns', obj => obj.name === 'slimeBoss');

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
        this.spawnLoc[10] = this.enemyS11;
        this.spawnLoc[11] = this.enemyS12;
        this.spawnLoc[12] = this.enemyS13;
        this.spawnLoc[13] = this.enemyS14;
        this.spawnLoc[14] = this.enemyS15;
        this.spawnLoc[15] = this.enemyS16;
        this.spawnLoc[16] = this.enemyS17;
        this.spawnLoc[17] = this.enemyS18;
        this.spawnLoc[18] = this.enemyS19;
        this.spawnLoc[19] = this.enemyS20;

        //Create hitboxes for when player attacks
        this.swordHitbox = this.add.rectangle(0,0,48,64,0xffffff);
        this.physics.add.existing(this.swordHitbox);
        this.swordHitbox.setAlpha(0);
        this.swordHitbox2 = this.add.rectangle(0,0,64,48,0xffffff);
        this.physics.add.existing(this.swordHitbox2);
        this.swordHitbox2.setAlpha(0);

        this.npcs = this.add.group();

        this.mobs = this.add.group();//Mob group
        bossSpawn(this,'slimeS','slimeIdle',300,100,100,50,this.slimeB,300,100);//slime Boss

        this.player = new Player(this,120,300,'playerS').setScale(3,3);//Create player
        this.player.setSize(14,16);
        this.player.setOffset(18,24);
        //Have camera track player
        this.player.body.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.startFollow(this.player,true,0.25,0.25);
        this.physics.world.setBounds(0,0,this.bound1X,this.bound1Y);

        this.merchant = new NPC(this,200,48,'merchant',0,0).setScale(3.5);
        this.merchant.setImmovable();
        this.npcs.add(this.merchant);

        this.quester = new NPC(this,400,48,'quester',0,1).setScale(3.5);
        this.quester.setImmovable();
        this.npcs.add(this.quester);

        this.fish = this.add.sprite(140,100,'fish').setScale(3);
        this.sKey = this.add.sprite(200,100,'sKey').setScale(3);
        this.katana = this.add.sprite(260,100,'katana').setScale(3);
        
        this.coin = this.add.sprite(this.cameras.main.centerX - config.width/2+50,this.cameras.main.centerY + config.height/2-100,'coin').setScale(3).setScrollFactor(0,0);
        this.coinC = this.add.bitmapText(this.cameras.main.centerX - config.width/2+50,this.cameras.main.centerY + config.height/2-120,'gem_font',`x${this.gold}`,24).setScrollFactor(0);

        this.physics.add.overlap(this.npcs,this.player,(npc,pla)=>{
            if(Phaser.Input.Keyboard.JustDown(this.keys.inter)){
                npc.activity(); 
            }
        });

        Layer1.setCollisionByProperty({
            collisions: true,
        });
        this.physics.add.collider(this.player,Layer1);
        this.physics.add.collider(this.mobs,Layer1)
///////////////////////////////////////////////////////////////
        this.test = new Grid(8)
        this.test.start(map)
//////////////////////////////////////////////////////////////
        //Setup player statemachine
        this.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            idleSwing: new IdleSwingState(),
            hurt: new hurtState(),
            dash: new DashState(),
        }, [this, this.player]);
        this.player.body.allowGravity = false;
        this.player.body.setImmovable = false;
        this.player.body.onWorldBounds = true;

        this.player.body.world.on('worldbounds', function(player) {
            if(player.x > 200){
                console.log('level up!');
            }
            if(player.y > 200){
                console.log('level up!');
            }
          }, this.player);

        //Add collision check when player swings
        this.physics.add.overlap(this.swordHitbox,this.mobs,(sword,enemy)=>{//Collision on side swing
            if(enemy.lastHit > enemy.hitTimer +350){
                enemy.hitTimer = enemy.lastHit;
                enemy.hit = true;
                enemy.hp -= this.player.playerDmg * this.playerDMGMult;
                if(enemy.hp <=0){
                    enemy.anims.play('slimeDeath');
                    this.gold += enemy.gDrop;
                    enemy.setVelocity(0);
                    this.mobs.remove(enemy,false,false);
                    enemy.once('animationcomplete', () => {
                        enemy.destroy();
                    });
                    this.currSpawns--;
                    this.player.exp += enemy.xpAdd;
                    while(this.player.exp >= this.player.expToNextLvl){//level up logic
                        let overfill = this.player.exp - this.player.expToNextLvl;
                        this.player.lvl +=1;
                        this.player.exp = overfill;
                        this.player.expToNextLvl = Math.floor(Math.pow(this.player.lvl/0.5,2));
                        this.player.playerDmg += .5;
                        this.player.playerHPMax += 100;
                        this.player.playerHP = this.player.playerHPMax;
                        console.log(this.player.lvl, this.player.playerDmg);
                    }
                }
                else{
                    enemy.setTint(0xFF0000);
                    enemy.setVelocityY(500 * this.player.direction.y);
                    enemy.setVelocityX(500 * this.player.direction.x);
                    this.time.delayedCall(enemy.kb, () => {
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
                enemy.hp -= this.player.playerDmg * this.playerDMGMult;
                if(enemy.hp <=0){
                    enemy.anims.play('slimeDeath');
                    this.gold += enemy.gDrop;
                    enemy.setVelocity(0);
                    this.mobs.remove(enemy,false,false);
                    enemy.once('animationcomplete', () => {
                        enemy.destroy();
                    });
                    this.currSpawns--;
                    this.player.exp += enemy.xpAdd;
                    while(this.player.exp >= this.player.expToNextLvl){//level up logic
                        let overfill = this.player.exp - this.player.expToNextLvl;
                        this.player.lvl +=1;
                        this.player.exp = overfill;
                        this.player.expToNextLvl = Math.floor(Math.pow(this.player.lvl/0.5,2));
                        this.player.playerDmg += .5;
                        this.player.playerHPMax += 100;
                        this.player.playerHP = this.player.playerHPMax;
                        console.log(this.player.lvl,this.player.playerDmg);
                    }
                }
                else{
                    enemy.setTint(0xFF0000);
                    enemy.setVelocityY(500 * this.player.direction.y);
                    enemy.setVelocityX(500 * this.player.direction.x);
                    this.time.delayedCall(enemy.kb, () => {
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

        this.deadText = this.add.bitmapText(-300,0,'gem_font','Press R to Restart',40).setAlpha(0);

        //Player xp bar
        this.xpBlack = this.add.rectangle(-100,-100,225,35,0x000000).setScrollFactor(0,0);
        this.xp = this.add.rectangle(this.cameras.main.centerX -100, this.cameras.main.centerY -100,200,20,0xFFA500);
        this.xp.setScrollFactor(0,0);
        this.xpText = this.add.bitmapText(-100,-100,'gem_font','EXP',24).setScrollFactor(0,0);

        this.hitTimer = this.time.now;
        this.lastHit = this.time.now;
        this.hpShowStart = this.time.now;
        this.hpShowTime = this.time.now+1000;

        this.physics.add.overlap(this.player,this.mobs,(player,enemy)=>{//Player gets hit collision
            if(this.dead == false){
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
                if(this.lastHit > this.hitTimer +200){//Hit delay
                    this.player.setTint(0xFF0000);
                    this.input.keyboard.enabled = false;
                    this.input.keyboard.resetKeys();
                    this.time.delayedCall(300,inputOn,[],this);
                    this.player.playerHP -= enemy.dmg;
                    this.hitTimer = this.lastHit;
                    this.player.setVelocityX(-300*dirX);
                    this.player.setVelocityY(-300*dirY);
                }
                this.hpShowStart = this.time.now;
                this.lastHit = this.time.now;
            }
        });
        /*this.counter = 0;
        this.ty = true;
        this.path = findPath([this.player.x,this.player.y],[2400,2240],this.test)*/
    }

    /*onEvent(path){
        this.ty = true;
    }*/

    update(){
        /*if(this.counter < this.path.length && this.ty){
            this.player.x = this.path[this.counter].worldPos[0]
            this.player.y = this.path[this.counter].worldPos[1]
            this.counter++;
            this.ty = false;
            this.timedEvent = this.time.delayedCall(1000, this.onEvent, [this.path], this,true);
        }*/
        ///////////////////////////////////////////////////////////////////////
        //console.log(findPath([this.player.x,this.player.y],[2400,2240],this.test))
        findPath([this.player.x,this.player.y],[2400,2240],this.test)
        ///////////////////////////////////////////////////////////////////
        if(Phaser.Input.Keyboard.JustDown(this.keys.openInv)){
            openInv = true;
            this.scene.switch('menuScene');
        }
        if(this.player.playerHP > 0){
            this.playerFSM.step();
            if(this.currSpawns <= 10){
                this.currSpawns++;
                this.time.delayedCall(1000, mobSpawn, [this,'slimeS','slimeIdle',1,1,3,40,this.spawnLoc,100,300]);
                //mobSpawn(this,'slimeS');
            }
            this.xp.setPosition(this.cameras.main.centerX - config.width/2+150,this.cameras.main.centerY + config.height/2 -50);
            this.xpBlack.setPosition(this.cameras.main.centerX - config.width/2+150,this.cameras.main.centerY + config.height/2 -50);
            this.xpText.setPosition(this.cameras.main.centerX - config.width/2+50,this.cameras.main.centerY + config.height/2 -60);

            this.coinC.text = `x${this.gold}`;

            this.xp.width = (this.player.exp/this.player.expToNextLvl)*200;

            this.healthBar.width = (this.player.playerHP/this.player.playerHPMax)*80;

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
                            enemy.setVelocityX(-enemy.speed);
                        }
                        // if player to right of enemy AND enemy moving to left (or not moving)
                        else if (this.player.x > enemy.x && enemy.body.velocity.x <= 0) {
                            // move enemy to right
                            enemy.setVelocityX(enemy.speed);
                        }

                        if (this.player.y < enemy.y && enemy.body.velocity.y >= 0) {
                            // move enemy to left
                            enemy.setVelocityY(-enemy.speed);
                        }
                        // if player to right of enemy AND enemy moving to left (or not moving)
                        else if (this.player.y > enemy.y && enemy.body.velocity.y <= 0) {
                            // move enemy to right
                            enemy.setVelocityY(enemy.speed);
                        }
                    }
                    else{
                        if(enemy.currSpeed > enemy.lastSpeed + 700){//enemy randomized movement
                            let direcY = Math.floor(Math.random()*3);
                            if(direcY == 0){
                                enemy.setVelocity(0);
                            }
                            else if(direcY == 1){
                                enemy.setVelocityY(enemy.speed);
                            }
                            else{
                                enemy.setVelocityY(-enemy.speed);
                            }
                            let direcX = Math.floor(Math.random()*3);
                            if(direcX == 0){
                                enemy.setVelocityX(enemy.speed);
                            }
                            else if(direcX == 1){
                                enemy.setVelocityX(-enemy.speed);
                            }
                            else{
                                enemy.setVelocity(0);
                            }
                            enemy.lastSpeed = this.time.now;
                        }
                        enemy.currSpeed = this.time.now;
                    }
                }
            }, this);
            this.children.bringToTop(this.xpBlack);
            this.children.bringToTop(this.xp);
            this.children.bringToTop(this.xpText);
        }
        else{
            this.healthBar.setAlpha(0);
            this.blackBar.setAlpha(0);
            this.blackBar2.setAlpha(0);
            this.blackBar3.setAlpha(0);
            this.blackBar4.setAlpha(0);
            if(this.dead == false){
                this.player.anims.play('death');
                this.player.once('animationcomplete', () => {
                    this.deadText.setAlpha(1);
                    this.deadText.x = this.player.x - this.deadText.width/2;
                    this.deadText.y = this.player.y -50;
                })
            }
            this.dead = true;
            if(this.keys.reset.isDown){
                this.scene.start('playScene')
            }
        }
    }

}

function inputOn(){
    this.input.keyboard.enabled = true;
    this.player.clearTint(0xFF0000);
    this.player.setVelocity(0);
}

function mobSpawn(scene,mobName,anim,money,expWorth,mobHP,mobSpeed,spawns,mobDmg,knockback){
    let spaw = Math.floor(Math.random()*(spawns.length-1));
    let slime = scene.physics.add.sprite(spawns[spaw].x,spawns[spaw].y,mobName).setScale(3,3);
    slime.setSize(16,16);
    slime.anims.play(anim);
    slime.body.setCollideWorldBounds(true);
    slime.body.setImmovable();
    slime.hit = false;
    slime.hp = mobHP;
    slime.lastHit = scene.time.now;
    slime.hitTimer = scene.time.now;
    slime.lastSpeed = scene.time.now;
    slime.currSpeed = scene.time.now;
    slime.gDrop = money;
    slime.xpAdd = expWorth;
    slime.speed = mobSpeed;
    slime.dmg = mobDmg;
    slime.kb = knockback;
    scene.mobs.add(slime);
}

function bossSpawn(scene,mobName,anim,money,expWorth,mobHP,mobSpeed,spawns,mobDmg,knockback){
    let slime = scene.physics.add.sprite(spawns.x,spawns.y,mobName).setScale(10,10);
    slime.setSize(16,16);
    slime.anims.play(anim);
    slime.body.setCollideWorldBounds(true);
    slime.body.setImmovable();
    slime.hit = false;
    slime.hp = mobHP;
    slime.lastHit = scene.time.now;
    slime.hitTimer = scene.time.now;
    slime.lastSpeed = scene.time.now;
    slime.currSpeed = scene.time.now;
    slime.gDrop = money;
    slime.xpAdd = expWorth;
    slime.speed = mobSpeed;
    slime.dmg = mobDmg;
    slime.kb = knockback;
    scene.mobs.add(slime);
}

function addInv(item){
    for(let i = 0; i < invArr.length;i++){ 
        for(let j = 0; j < invArr[i].length;j++){
            if(invArr[i][j] == 0){
                invArr[i][j] = item;
                return;
            }
        }
    }
    return;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function findPath(startPos, targetPos, grid){
    let startNode = grid.nodeFromWP(startPos);
    let targetNode = grid.nodeFromWP(targetPos);
    let openNodes = [];
    let closedNodes = new Set();
    openNodes.push(startNode);
    while (openNodes.length > 0){
        let current = openNodes[0];
        for(let i = 1; i < openNodes.length; i ++){
            if(openNodes[i].fCost < current.fCost || ((openNodes[i].fCost == current.fCost) && openNodes[i].hCost < current.hCost)){
                current = openNodes[i];
            }
        }
        openNodes.pop(current);
        closedNodes.add(current);
        if(current == targetNode){
            return retracePath(startNode,targetNode);
        }
        grid.getNeighbors(current).forEach((neighbor)=>{
            if(neighbor.walkable || closedNodes.has(neighbor)){
            }
            else{
                let newNeighborCost = current.gCost + getDistance(current,neighbor);
                if(newNeighborCost < neighbor.gCost || !openNodes.includes(neighbor)){
                    neighbor.gCost = newNeighborCost;
                    neighbor.hCost = getDistance(neighbor,targetNode);
                    neighbor.fCost = neighbor.gCost + neighbor.hCost;
                    neighbor.parent = current;
                    if(!openNodes.includes(neighbor)){
                        openNodes.push(neighbor);
                    }
                }
            }
        });
    }
}

function getDistance(node1, node2){
    let distance = 0;
    let xDist = Math.abs(node1.gridX - node2.gridX);
    let yDist = Math.abs(node1.gridY - node2.gridY);
    if(xDist < yDist){
        distance += 14*xDist;
        distance += 10*(yDist - xDist);
    }
    else{
        distance += 14*yDist;
        distance += 10*(xDist - yDist);
    }
    return distance;
}

function retracePath(startNode, endNode){
    let path = [];
    let current = endNode;
    while(current != startNode){
        path.push(current);
        current = current.parent;
    }
    path.reverse();
    return path;
}