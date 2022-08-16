import * as Helper from './helper.js';


export default class GameField {
    
    constructor(canvas) {
        canvas.height = Helper.FieldSize.HEIGHT;
        canvas.width = Helper.FieldSize.WIDTH;
        this.ctx = canvas.getContext('2d');
    }

    draw(gameObkects) {
        for (let i = 0; i < gameObkects.length; i++) {
            gameObkects[i].draw(this.ctx);
        }
    }




}

