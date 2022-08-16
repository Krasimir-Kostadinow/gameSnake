import * as Helper from './helper.js';

export default class GameObject {
    constructor(positionX, positionY, canBeEaten, icon) {
        this.size = Helper.ObjectSize;
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
        ctx.moveTo(positionX, positionY);

        if (this.icon) {
            ctx.drawImage(this.icon, positionX, positionY);
        } else {
            ctx.fillRect(this.positionX, this.positionX, this.size.WIDTH, this.size.HEIGHT);
        }
    }
}