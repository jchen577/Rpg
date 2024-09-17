class Credit extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    create(){
        this.fontSize = 48
        this.playText = this.add.bitmapText(config.width/2,config.height/2,'gem_font','Developers: GDLearns',this.fontSize).setOrigin(0.6,2);
        this.credText = this.add.bitmapText(config.width/2,config.height/2,'gem_font','Art By:',this.fontSize).setOrigin(2.5,0);
        this.credText = this.add.bitmapText(config.width/2,config.height/2,'gem_font','Kasayas, Game Endeavor,',this.fontSize).setOrigin(0.4,0);
        this.credText = this.add.bitmapText(config.width/2,config.height/2,'gem_font','Pixel-Boy and AAA',this.fontSize).setOrigin(0.6,-1);
    }
}