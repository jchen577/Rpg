
let swapped = false;
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
        for(let i = 0; i < invArr.length;i++){ //Make the inventory items
            for(let j = 0; j < invArr[i].length;j++){
                let slot = this.physics.add.sprite(this.cameras.main.centerX-178+(51*j),this.cameras.main.centerY-76+(51*i),this.sprites[invArr[i][j]]).setScale(3).setSize(12,12).setInteractive();
                //let slot = this.physics.add.sprite(this.cameras.main.centerX-178+(51*j),this.cameras.main.centerY-76+(51*i),'invSlot').setScale(3).setScrollFactor(0).setInteractive();
                slot.positionI = i;
                slot.positionJ = j;
                slot.val = this.sprites[invArr[i][j]];
                if(invArr[i][j] != 0){
                    slot.on(Phaser.Input.Events.POINTER_DOWN,startDrag);
                }
                this.itemG.add(slot);
            }
        }

        this.input.setTopOnly(false);
    }
    update(){
        if(openInv){
            refresh(this);
            openInv = false;
        }
        if(Phaser.Input.Keyboard.JustDown(this.keys.openInv)){
            this.scene.switch('playScene');
        }
        //this.input.on(Phaser.Input.Events.POINTER_UP,refresh);
    }
}

function refresh(scene){//Refresh inventory when stop dragging
    scene.itemG.clear(true,true);
    for(let i = 0; i < invArr.length;i++){ 
        for(let j = 0; j < invArr[i].length;j++){
            let slot = scene.physics.add.sprite(scene.cameras.main.centerX-178+(51*j),scene.cameras.main.centerY-76+(51*i),scene.sprites[invArr[i][j]]).setScale(3).setSize(12,12).setInteractive();
            slot.positionI = i;
            slot.positionJ = j;
            slot.val = scene.sprites[invArr[i][j]];
            if(invArr[i][j] != 0){
                slot.on(Phaser.Input.Events.POINTER_DOWN,startDrag);
            }
            scene.itemG.add(slot);
        }
    }
}

function startDrag(){//When start dragging, move item to front and start other inputs
    this.scene.children.bringToTop(this);
    this.off(Phaser.Input.Events.POINTER_DOWN,startDrag);
    this.on(Phaser.Input.Events.POINTER_UP,stopDrag);
    this.on(Phaser.Input.Events.POINTER_MOVE,onDrag);

}

function swap(bodyA,bodyB,collisionInfo){//Swap 2 items in slots
    if(!swapped){
        invArr[bodyA.positionI][bodyA.positionJ] = Object.keys(this.scene.sprites).find(key => this.scene.sprites[key] === bodyB.val);
        invArr[bodyB.positionI][bodyB.positionJ] = Object.keys(this.scene.sprites).find(key => this.scene.sprites[key] === bodyA.val);
        swapped = true;
    }
}
function stopDrag(){//When stop dragging swap items and refresh inventory
    this.scene.physics.overlap(this,this.scene.itemG,swap,function(){},this);
    swapped = false;
    refresh(this.scene);
    this.on(Phaser.Input.Events.POINTER_DOWN,startDrag);
    this.off(Phaser.Input.Events.POINTER_UP,stopDrag);
    this.off(Phaser.Input.Events.POINTER_MOVE,onDrag);
    
}

function onDrag(pointer){//make item follow mouse
    this.x = pointer.x;
    this.y = pointer.y;
}