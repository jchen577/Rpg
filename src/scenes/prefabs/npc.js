class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame,poss) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Player to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        this.possiblities = [0,1];
    }

    activity(){
        console.log('working act');
        this.addInv(3);
        //this.freezeKeys();
    }

    freezeKeys(){
        this.scene.player.anims.stop();
        this.scene.player.setVelocity(0);
        this.scene.input.keyboard.resetKeys();
        this.scene.input.keyboard.enabled = false;
    }

    unFreezeKeys(){
        this.scene.input.keyboard.enabled = true;
    }

    addInv(item){
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
}