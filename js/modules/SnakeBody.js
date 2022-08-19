import * as GameObject from './gameObject.js';


export default class SnakeBody {
    constructor(x, y) {
        new GameObject(x, y, false);
        this.color = 'lightgreen';
    }

    update() {

    }
}