import helper from "./helper.js";
import GameObject from "./gameObject.js";


  export default class Food extends GameObject {
        constructor(x, y) {
            super(x, y, true, document.getElementById('apple'));
            this.color = 'red';
        }

        update() {
            if (this.isDistroyed) {
                this.position.X = helper.getRandomPositionX(0, helper.FieldSize.WIDTH - this.size.WIDTH);
                this.position.Y = helper.getRandomPositionY(0, helper.FieldSize.HEIGHT - this.size.HEIGHT);

                this.isDistroyed = false;
            }

        }
    }