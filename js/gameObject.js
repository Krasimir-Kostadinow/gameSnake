import helper from "./helper.js";


export default class GameObject {
    constructor(positionX, positionY, canBeEaten, icon) {
        this.size = helper.ObjectSize;
        this.position = {
            X: positionX,
            Y: positionY
        };

        this.icon = icon;
        this.isDistroyed = false;
        this.canBeEaten = canBeEaten;
    }

    onCollision() {
        if (this.canBeEaten) {
            this.isDistroyed = true;
        }
    }

    update() {
        throw new Error('Not Implemented');
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.moveTo(this.position.X, this.position.Y);

        if (this.icon) {
            ctx.drawImage(this.icon, this.position.X, this.position.Y);
        } else {
            ctx.fillRect(this.position.X, this.position.Y, this.size.WIDTH, this.size.HEIGHT);
        }
    }
}