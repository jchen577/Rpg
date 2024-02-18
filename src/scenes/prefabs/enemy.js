class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Player to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        //set player values
        this.direction = new Phaser.Math.Vector2(0)
        this.velocityS = 100;
        this.hit = false;

    }

}

class IdleState extends State {//Player idle state
    execute(){
        if(!this.hit){
            
        }
    }
}