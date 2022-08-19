import * as GameObject from './gameObject.js';
import * as Helper from './helper.js';


export default class Food {
    constructor(x, y) {
        new GameObject(x, y, true, document.getElementById('apple'));
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