import * as Helper from './helper.js';


export default class GameField {
    
    constructor(canvas) {
        canvas.height = Helper.FieldSize.HEIGHT;
        canvas.width = Helper.FieldSize.WIDTH;
        this.ctx = canvas.getContext('2d');
    }

    draw(gameObjects) {
        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].draw(this.ctx);
        }
    }




}

