class Start extends Phaser.Scene{
    constructor(){
        super("startScene");
    }

    create(){
        this.fontSize = 48
        this.offset = 10
        this.bg = this.add.sprite(config.width/2,config.height/2,"loadbg");
        this.playerL = this.add.sprite(config.width/2-300,config.height/2, "playerS",6).setScale(8);
        this.playText2 = this.add.bitmapText(config.width/2-this.fontSize-this.offset/2,config.height/2-this.fontSize+this.offset/2,'gem_font','PLAY',this.fontSize);
        this.playText = this.add.bitmapText(config.width/2-this.fontSize,config.height/2-this.fontSize,'gem_font','PLAY',this.fontSize);
        this.playText2.setCharacterTint(0,-1,true,0x000000);
        this.cText2 = this.add.bitmapText(config.width/2-(this.playText.width/4)-this.fontSize-this.offset/2,config.height/2+100-this.fontSize+this.offset/2,'gem_font','CREDITS',this.fontSize);
        this.cText2.setCharacterTint(0,-1,true,0x000000);
        this.cText = this.add.bitmapText(config.width/2-(this.playText.width/4)-this.fontSize,config.height/2+100-this.fontSize,'gem_font','CREDITS',this.fontSize);
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