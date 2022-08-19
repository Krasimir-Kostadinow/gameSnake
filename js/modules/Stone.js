import * as GameObject from './gameObject.js';

export default class Stone {
    constructor(x, y) {
        new GameObject(x, y, false, document.getElementById('stone'));
        this.color = 'grey';
    }

    update() {
        
    }
}