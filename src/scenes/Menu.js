let invArr = [[1,0,0,0,0,0,0,0],[0,0,0,0,0,2,0,0],[0,0,0,0,0,0,0,0],[0,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
    }
    create(){
        this.itemG = this.add.group();
        this.sprites = {0: 'invSlot',1:'fish',2:'sKey', 3:'coin'};

        this.keys = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D', shift: 'SHIFT', reset: 'R', inter: 'E', openInv: 'Q'});

        this.add.sprite(this.cameras.main.centerX,this.cameras.main.centerY,'inventory').setScale(3).setScrollFactor(0);
        for(let i = 0; i < invArr.length;i++){ 
            for(let j = 0; j < invArr[i].length;j++){
                let slot = this.physics.add.sprite(this.cameras.main.centerX-178+(51*j),this.cameras.main.centerY-76+(51*i),this.sprites[invArr[i][j]]).setScale(3).setSize(12,12).setInteractive();
                //let slot = this.physics.add.sprite(this.cameras.main.centerX-178+(51*j),this.cameras.main.centerY-76+(51*i),'invSlot').setScale(3).setScrollFactor(0).setInteractive();
                if(invArr[i][j] != 0){
                    slot.on(Phaser.Input.Events.POINTER_DOWN,startDrag);
                }
                this.itemG.add(slot);
            }
        }
        this.physics.add.overlap(this.itemG,this.itemG,(it,it2)=>{
            console.log('overlapping');
        });
        this.input.setTopOnly(false);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keys.openInv)){
            this.scene.switch('playScene');
        }
        //this.input.on(Phaser.Input.Events.POINTER_UP,refresh);
    }
}

/*function refresh(){
    this.scene.itemG.destroy(true,true);
    this.scene.itemG = this.scene.add.group();
    for(let i = 0; i < invArr.length;i++){ 
        for(let j = 0; j < invArr[i].length;j++){
            let slot = this.scene.physics.add.sprite(this.scene.cameras.main.centerX-178+(51*j),this.scene.cameras.main.centerY-76+(51*i),this.scene.sprites[invArr[i][j]]).setScale(3).setSize(16,16).setInteractive();
            //let slot = this.physics.add.sprite(this.cameras.main.centerX-178+(51*j),this.cameras.main.centerY-76+(51*i),'invSlot').setScale(3).setScrollFactor(0).setInteractive();
            slot.on(Phaser.Input.Events.POINTER_DOWN,startDrag);
            this.scene.itemG.add(slot);
        }
    }
}*/
function refresh(scene){
    this.console.log(scene)
    scene.itemG.clear(true,true);
    for(let i = 0; i < invArr.length;i++){ 
        for(let j = 0; j < invArr[i].length;j++){
            let slot = scene.physics.add.sprite(scene.cameras.main.centerX-178+(51*j),scene.cameras.main.centerY-76+(51*i),scene.sprites[invArr[i][j]]).setScale(3).setSize(16,16).setInteractive();
            //let slot = this.physics.add.sprite(this.cameras.main.centerX-178+(51*j),this.cameras.main.centerY-76+(51*i),'invSlot').setScale(3).setScrollFactor(0).setInteractive();
            if(invArr[i][j] != 0){
                slot.on(Phaser.Input.Events.POINTER_DOWN,startDrag);
            }
            scene.itemG.add(slot);
        }
    }
}

/*swap(scene,pointer){
    
}*/

function startDrag(){
    console.log(this.scene);
    this.off(Phaser.Input.Events.POINTER_DOWN,startDrag);
    this.on(Phaser.Input.Events.POINTER_UP,stopDrag);
    this.on(Phaser.Input.Events.POINTER_MOVE,onDrag);

}

function stopDrag(){
    console.log(this);
    refresh(this.scene);
    this.on(Phaser.Input.Events.POINTER_DOWN,startDrag);
    this.off(Phaser.Input.Events.POINTER_UP,stopDrag);
    this.off(Phaser.Input.Events.POINTER_MOVE,onDrag);
    
}

function onDrag(pointer){
    this.x = pointer.x;
    this.y = pointer.y;
}