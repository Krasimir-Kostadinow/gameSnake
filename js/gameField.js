import helper from "./helper.js";

export default class GameField {

    constructor(canvas) {
        canvas.height = helper.FieldSize.HEIGHT;
        canvas.width = helper.FieldSize.WIDTH;
        this.ctx = canvas.getContext('2d');
    }

    draw(gameObjects) {

        this.ctx.clearRect(0, 0, helper.FieldSize.WIDTH, helper.FieldSize.HEIGHT);
        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].draw(this.ctx);
        }
    }


}