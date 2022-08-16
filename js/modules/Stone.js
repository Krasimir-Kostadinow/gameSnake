import * as GameObject from './GameObject.js';

export default class Stone extends GameObject {
    constructor(x, y) {
        super(x, y, false, document.getElementById('stone'));
        this.color = 'grey';
    }

    update() {
        
    }
}