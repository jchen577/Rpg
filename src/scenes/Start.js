class Start extends Phaser.Scene{
    constructor(){
        super("startScene");
    }

    create(){
        this.fontSize = 48
        this.offset = 0.05
        this.bg = this.add.sprite(config.width/2,config.height/2,"loadbg");
        this.playerL = this.add.sprite(config.width/2-300,config.height/2, "playerS",6).setScale(8);
        this.playText2 = this.add.bitmapText(config.width/2,config.height/2,'gem_font','PLAY',this.fontSize).setOrigin(1+this.offset,1+this.offset);
        this.playText = this.add.bitmapText(config.width/2,config.height/2,'gem_font','PLAY',this.fontSize).setOrigin(1,1);
        this.playText2.setCharacterTint(0,-1,true,0x000000);
        this.cText2 = this.add.bitmapText(config.width/2,config.height/2,'gem_font','CREDITS',this.fontSize).setOrigin(0.5+this.offset/1.5+this.playText.width/100/4,-1+this.offset);
        this.cText2.setCharacterTint(0,-1,true,0x000000);
        this.cText = this.add.bitmapText(config.width/2,config.height/2,'gem_font','CREDITS',this.fontSize).setOrigin(0.5+this.playText.width/100/4,-1);
        this.playText.setInteractive({
            useHandCursor: true,
        });
        this.playText.on('pointerdown', ()=>{
            this.scene.start('playScene')
        });
        this.cText.setInteractive({
            useHandCursor: true,
        });
        this.cText.on('pointerdown', ()=>{
            this.scene.start('creditScene')
        });
    }
    update(){

    }
}