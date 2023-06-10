import { Container, Sprite, BlurFilter, Rectangle, Graphics, Texture } from "pixi.js";
import dataGame from "../../assets/jsondata/dataGame.json"
import { Bg } from "../model/bg"
import { GameRun } from "./gamerun";
import { manifest } from "../gameload/assets";
import { Game } from "../game";



export class GameOver extends Container {
    constructor(app) {
        super()

        this.app = app
        this.x = 0
        this.y = 0

        this.bg = new Bg()
        this.addChild(this.bg);

        var myBlurFilter = new BlurFilter();
        myBlurFilter.blur = 10

        // Add it to the `.filters` array of any DisplayObject
        this.bg.filters = [myBlurFilter];

        const bgGameOver = manifest.bundles.find(bundle => bundle.name === 'background');
        const texture = Texture.from(bgGameOver.assets['bgGameOver']);
        this.menu = new Sprite(texture.clone())
        this.menu.x = dataGame.game.width / 2 - this.menu.width / 2 + 50
        this.menu.y = dataGame.game.height / 2 - this.menu.height / 2 - 100
        this.menu.texture.frame = new Rectangle(0, 0, this.menu.width, 300);
        this.addChild(this.menu)

        // cat chu yes
        this.containerYes = new Container()
        this.yes = new Sprite(texture.clone())
        this.containerYes.x = dataGame.game.width / 2 - this.yes.width / 2
        this.containerYes.y = dataGame.game.height / 2 - this.yes.height / 2 + 200
        this.yes.x = 0
        this.yes.y = 0
        this.yes.texture.frame = new Rectangle(0, 300, this.yes.width / 2 - 160, this.yes.height - 300 - 35);
        this.backgroundYes = new Graphics();
        this.backgroundYes.beginFill(0xFFFFFF);
        this.backgroundYes.drawRect(30, 10, this.yes.width - 10, this.yes.height);
        this.backgroundYes.endFill();
        this.containerYes.addChild(this.backgroundYes)
        this.containerYes.addChild(this.yes)
        this.addChild(this.containerYes)
        this.containerYes.interactive = true;
        this.containerYes.on('pointerover', this.onPointerOver.bind(this.backgroundYes));
        this.containerYes.on('pointerout', this.onPointerOut.bind(this.backgroundYes));
        this.containerYes.on('click', this.onClickYes.bind(this))

        //cat chu no
        this.containerNo = new Container()
        this.no = new Sprite(texture.clone())
        this.containerNo.x = dataGame.game.width / 2 - this.no.width / 2 + 50 + this.no.width / 2
        this.containerNo.y = dataGame.game.height / 2 - this.no.height / 2 + 200
        this.no.x = 25
        this.no.y = 0
        this.no.texture.frame = new Rectangle(this.no.width / 2, 300, this.no.width / 2 - 160, this.no.height - 300 - 35);
        this.backgroundNo = new Graphics();
        this.backgroundNo.beginFill(0xFFFFFF);
        this.backgroundNo.drawRect(0, 10, this.no.width - 10, this.no.height);
        this.backgroundNo.endFill();
        this.containerNo.addChild(this.backgroundNo)
        this.containerNo.addChild(this.no)
        this.addChild(this.containerNo)
        this.containerNo.interactive = true;
        this.containerNo.on('pointerover', this.onPointerOver.bind(this.backgroundNo));
        this.containerNo.on('pointerout', this.onPointerOut.bind(this.backgroundNo));
        this.containerYes.on('click', this.onclickNo.bind(this))
    }


    onPointerOver(background) {
        this.tint = 0x00FF00;
    }

    onPointerOut() {
        this.tint = 0xFFFFFF;
    }

    onClickYes() {
        Game.chanceScene(new GameRun())
        this.destroy()
    }

    onclickNo() {

    }


}