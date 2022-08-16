import * as GameObject from './GameObject.js';
import * as Helper from './helper';


export default class Food extends GameObject {
    constructor(x, y) {
        super(x, y, true, document.getElementById('apple'));
        this.color = 'red';
    }

    update() {
        if (this.isDistroyed) {
            this.position.X = Helper.getRandomPositionX(0, Helper.FieldSize.WIDTH - this.size.WIDTH);
            this.position.Y = Helper.getRandomPositionY(0, Helper.FieldSize.HEIGHT - this.size.HEIGHT);
            
            this.isDistroyed = false;
        }

    }
}