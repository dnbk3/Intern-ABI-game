import { AnimatedSprite, Container, Sprite, Texture, Ticker } from "pixi.js";

export class SmallFish extends Container {
    constructor(x, y, width, height, gameWidth, gameHeight) {
        super();

        this.height = height
        this.width = width
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.speed = 1

        this.timeLoop = 3000

        this.fish = Sprite.from("../assets/images/ca.png")
        this.fish.scale.x = -1
        this.fish.height = 100;
        this.fish.width = 100;
        this.fish.x = x
        this.fish.y = y
        this.fish.anchor.set(0.5)

        this.goLeft = true;
        this.goRight = false;
        this.goDown = false;
        this.goUp = false;
        this.currentTime = 0;

        this.randomDirection()

        this.addChild(this.fish)
        Ticker.shared.add(this.update, this);
        Ticker.shared.maxFPS = 60
        Ticker.shared.minFPS = 60

    }

    update(deltaTime) {

        if (this.goLeft) {
            this.fish.scale.x = 1
            this.fish.height = 100;
            this.fish.width = 100;
            this.fish.x = this.fish.x - (this.speed * deltaTime);
            if (this.fish.x + this.width / 2 < 0) this.fish.x = this.gameWidth + this.width / 2
        }

        if (this.goRight) {
            this.fish.scale.x = -1
            this.fish.height = 100;
            this.fish.width = 100;
            this.fish.x = this.fish.x + (this.speed * deltaTime);
            if (this.fish.x - this.width / 2 > this.gameWidth) this.fish.x = 0 - this.width / 2
        }

        if (this.goUp) {
            this.fish.y = this.fish.y - (this.speed * deltaTime);
            if (this.fish.y - this.height / 2 < 0 - this.height / 2) this.fish.y = this.gameWidth
        }

        if (this.goDown) {
            this.fish.y = this.fish.y + (this.speed * deltaTime);
            if (this.fish.y - this.height / 2 > this.gameHeight) this.fish.y = 0
        }

        if (this.timeLoop <= 0) {
            this.randomDirection()
            this.timeLoop = 3000;
        } else {
            this.timeLoop -= Ticker.shared.deltaMS
        }

        //console.log(1000 / Ticker.shared.deltaMS);
    }

    randomDirection() {
        var randomNumberX = Math.floor(Math.random() * 3)
        switch (randomNumberX) {
            case 0:
                this.goRight = false
                this.goLeft = false
                break
            case 1:
                this.goRight = true
                this.goLeft = false
                break
            case 2:
                this.goRight = false
                this.goLeft = true
                break
        }
        var randomNumberY = Math.floor(Math.random() * 3)
        if (randomNumberY === 0 && randomNumberX == 0) randomNumberY = 1

        switch (randomNumberY) {
            case 0:
                this.goDown = false
                this.goUp = false
                break
            case 1:
                this.goDown = true
                this.goUp = false
                break
            case 2:
                this.goDown = false
                this.goUp = true
                break
        }

    }

}