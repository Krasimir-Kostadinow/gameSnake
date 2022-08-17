import * as GameObject from './GameObject.js';

export default class SnakeBody extends GameObject {
    constructor(x, y) {
        super(x, y, false);
        this.color = 'lightgreen';
    }

    update() {

    }
}