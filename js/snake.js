import helper from "./helper.js";
import SnakeBody from "./snakeBody.js";
import GameObject from "./gameObject.js";
import gameEngine from "./gameEngine.js";

export default class Snake extends GameObject {
    constructor(x, y, length, direction) {
        super(x, y, false, document.getElementById('snake'));
        this.lives = 5;
        this.length = length;
        this.color = 'green';
        this.positionStack = [];
        this.bodyArray = [];
        this.direction = direction;
        this.foodEaten = 0;
        this.totalFood = 0;
    }
    update() {

        let position = {
            X: this.position.X,
            Y: this.position.Y
        };

        this.positionStack.unshift(position);
        this.positionStack.pop();

        switch (this.direction) {
            case helper.Directions.DOWN:
                this.position.Y += this.size.HEIGHT;
                break;
            case helper.Directions.UP:
                this.position.Y -= this.size.HEIGHT;
                break;
            case helper.Directions.RIGHT:
                this.position.X += this.size.WIDTH;
                break;
            case helper.Directions.LEFT:
                this.position.X -= this.size.WIDTH;
                break;
            default:
                throw new Error('Please, use Directions enumerations');
        }

        for (let i = 0; i < this.length; i++) {

            this.bodyArray[i].position = this.positionStack[i];

        }

        if (this.foodEaten === 3) {
            this.foodEaten = 0;
            this.grow();
        }

    }

    changeDirection(direction) {
        this.direction = direction;
    }

    onCollision(collisonObject) {

        if (collisonObject.canBeEaten) {
            this.foodEaten++;
            this.totalFood++;
        } else {
            if (this.lives === 0) {
                gameEngine.endGame();
            } else {
                this.lives--;
                this.reset();
            }
        }
    }

    grow() {
        let position = {
            X: this.bodyArray[this.length - 1].position.X,
            Y: this.bodyArray[this.length - 1].position.Y
        }

        var bodyPart = new SnakeBody(position.X, position.Y);
        this.bodyArray.push(bodyPart);
        this.positionStack.push(position);
        this.length++;
    }

    reset() {
        this.direction = helper.Directions.RIGHT;
        let x = (this.length + 2) * this.size.WIDTH;
        let y = helper.getRandomPositionY(0, helper.FieldSize.HEIGHT - this.size.HEIGHT);
        this.position.X = x;
        this.position.Y = y;

        for (let i = 0; i < this.length; i++) {

            this.bodyArray[i].position.Y = y;
            this.bodyArray[i].position.X = x - ((i + 1) * this.size.WIDTH);
            this.positionStack[i] = this.bodyArray[i].position;
        }
    }

    draw(ctx) {
        super.draw(ctx);

        for (let i = 0; i < this.length; i++) {
            this.bodyArray[i].draw(ctx);
        }

        document.getElementById('lives').innerHTML = this.lives;
        document.getElementById('points').innerHTML = this.totalFood;
    }

    hasBittenHerSelf() {
        let result = false;

        for (let i = 0; i < this.length; i++) {
            if (this.position.X === this.bodyArray[i].position.X &&
                this.position.Y === this.bodyArray[i].position.Y
            ) {
                result = true;
                break;
            }

        }

        return result;
    }

    isOutOfGameField() {
        return this.position.X < 0 ||
            this.position.X > helper.FieldSize.WIDTH ||
            this.position.Y < 0 ||
            this.position.Y > helper.FieldSize.HEIGHT;
    }


}