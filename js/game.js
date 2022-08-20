
const Directions = Object.freeze({
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
});

const ObjectSize = Object.freeze({
    HEIGHT: 20,
    WIDTH: 20
});

const FieldSize = Object.freeze({
    WIDTH: 960,
    HEIGHT: 500
});

let GameSpeed = 160;
let recordPoints = 0;
let playerRecord = 'no Record';
document.getElementById('record').textContent = playerRecord;


function getRandomPositionX(start, end) {
    return Math.floor((Math.random() * (end - start + 1) + start) / ObjectSize.WIDTH) * ObjectSize.WIDTH;
}

function getRandomPositionY(start, end) {
    return Math.floor((Math.random() * (end - start + 1) + start) / ObjectSize.HEIGHT) * ObjectSize.HEIGHT;
}


class GameField {

    constructor(canvas) {
        canvas.height = FieldSize.HEIGHT;
        canvas.width = FieldSize.WIDTH;
        this.ctx = canvas.getContext('2d');
    }

    draw(gameObjects) {

        this.ctx.clearRect(0, 0, FieldSize.WIDTH, FieldSize.HEIGHT);
        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].draw(this.ctx);
        }
    }


}

class GameObject {
    constructor(positionX, positionY, canBeEaten, icon) {
        this.size = ObjectSize;
        this.position = {
            X: positionX,
            Y: positionY
        };

        this.icon = icon;
        this.isDistroyed = false;
        this.canBeEaten = canBeEaten;
    }

    onCollision() {
        if (this.canBeEaten) {
            this.isDistroyed = true;
        }
    }

    update() {
        throw new Error('Not Implemented');
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.moveTo(this.position.X, this.position.Y);

        if (this.icon) {
            ctx.drawImage(this.icon, this.position.X, this.position.Y);
        } else {
            ctx.fillRect(this.position.X, this.position.Y, this.size.WIDTH, this.size.HEIGHT);
        }
    }
}

class Food extends GameObject {
    constructor(x, y) {
        super(x, y, true, document.getElementById('apple'));
        this.color = 'red';
    }

    update() {
        if (this.isDistroyed) {
            this.position.X = getRandomPositionX(0, FieldSize.WIDTH - this.size.WIDTH);
            this.position.Y = getRandomPositionY(0, FieldSize.HEIGHT - this.size.HEIGHT);

            this.isDistroyed = false;
        }

    }
}

class Stone extends GameObject {
    constructor(x, y) {
        super(x, y, false, document.getElementById('stone'));
        this.color = 'grey';
    }

    update() {

    }
}

class SnakeBody extends GameObject {
    constructor(x, y) {
        super(x, y, false);
        this.color = 'lightgreen';
    }

    update() {

    }
}

class Snake extends GameObject {
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
            case Directions.DOWN:
                this.position.Y += this.size.HEIGHT;
                break;
            case Directions.UP:
                this.position.Y -= this.size.HEIGHT;
                break;
            case Directions.RIGHT:
                this.position.X += this.size.WIDTH;
                break;
            case Directions.LEFT:
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
                endGame();
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
        this.direction = Directions.RIGHT;
        let x = (this.length + 2) * this.size.WIDTH;
        let y = getRandomPositionY(0, FieldSize.HEIGHT - this.size.HEIGHT);
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
            this.position.X > FieldSize.WIDTH ||
            this.position.Y < 0 ||
            this.position.Y > FieldSize.HEIGHT;
    }


}

var gameObjects = [];
let canvas = document.getElementById('gameField');
var gameField = new GameField(canvas);
var intervalid = 0;
var snake = null;

document.getElementById('btnStart').addEventListener('click', startGame);

function startGame() {
    var snakeLength = parseInt(document.getElementById('snakeLength').value),
        numberOfStones = parseInt(document.getElementById('stonesNumber').value),
        numberOfFood = parseInt(document.getElementById('foodNumber').value),
        stone = null,
        food = null,

        GameSpeed = document.getElementById('speedSnake').value;
    gameObjects = [];
    clearInterval(intervalid);

    if (snakeLength > ((FieldSize.WIDTH - 100) / ObjectSize.WIDTH) || snakeLength <= 1) {
        snakeLength = 3;
    }

    if (numberOfStones < 0) {
        numberOfStones = 10;
    }

    if (numberOfFood <= 0) {
        numberOfFood = 5;
    }

    let x = (snakeLength + 1) * ObjectSize.WIDTH;
    let y = getRandomPositionY(0, FieldSize.HEIGHT - ObjectSize.HEIGHT);

    snake = new Snake(x, y, snakeLength - 1, Directions.RIGHT);

    for (let i = 1; i < snakeLength; i++) {
        var position = {
            X: x - (i * ObjectSize.WIDTH),
            Y: y
        }

        let part = new SnakeBody(position.X, position.Y);
        snake.bodyArray.unshift(part);
        snake.positionStack.unshift(position);

    }

    gameObjects.push(snake);

    for (let i = 0; i < numberOfStones; i++) {
        stone = new Stone(getRandomPositionX(0, FieldSize.WIDTH - ObjectSize.WIDTH),
            getRandomPositionY(0, FieldSize.HEIGHT - ObjectSize.HEIGHT));

        gameObjects.push(stone);

    }

    for (let i = 0; i < numberOfFood; i++) {
        food = new Food(getRandomPositionX(0, FieldSize.WIDTH - ObjectSize.WIDTH),
            getRandomPositionY(0, FieldSize.HEIGHT - ObjectSize.HEIGHT));

        gameObjects.push(food);

    }

    document.addEventListener('keydown', getKey, false);

    gameField.draw(gameObjects);

    intervalid = setInterval(update, GameSpeed);
}

function endGame() {
    clearInterval(intervalid);
    setTimeout(afterEndGameEvents, GameSpeed);
}

function afterEndGameEvents() {
    var fondSize = 60;
    gameField.ctx.clearRect(0, 0, FieldSize.WIDTH, FieldSize.HEIGHT);
    gameField.ctx.font = fondSize + 'px Arial';
    gameField.ctx.textAlign = 'center';
    gameField.ctx.fillStyle = 'green';
    

    if (Number(document.getElementById('points').textContent > recordPoints)) {
        gameField.ctx.fillText('Congratulations! new record.', FieldSize.WIDTH / 2, FieldSize.HEIGHT / 2);
        playerRecord = `The record is held by player ${document.getElementById('namePlayer').value} with points:${document.getElementById('points').textContent}, speed ${document.getElementById('speedSnake').value}, start length ${document.getElementById('snakeLength').value}, stones ${document.getElementById('stonesNumber').value}, food ${document.getElementById('foodNumber').value}.`;
        document.getElementById('record').textContent = playerRecord;
    } else {
        gameField.ctx.fillText('Game Over', FieldSize.WIDTH / 2, FieldSize.HEIGHT / 2);
    }
}

function update() {
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update();
    }
    collisionDetect();
    gameField.draw(gameObjects);
}

function collisionDetect() {

    if (snake.isOutOfGameField()) {
        snake.onCollision(snake);
    }

    if (snake.hasBittenHerSelf()) {
        snake.onCollision(snake);
    }

    for (let i = 1; i < gameObjects.length; i++) {
        if (collide(snake, gameObjects[i])) {
            snake.onCollision(gameObjects[i]);
            gameObjects[i].onCollision();
        }
    }
}

function collide(snakeObj, obj) {
    let result = false;

    if (snakeObj.position.X === obj.position.X && snakeObj.position.Y === obj.position.Y) {
        result = true;
    }
    return result;
}

function getKey(event) {

    switch (event.keyCode) {
        case 37:
            event.preventDefault();
            snake.changeDirection(Directions.LEFT);
            break;
        case 38:
            event.preventDefault();
            snake.changeDirection(Directions.UP);
            break;
        case 39:
            event.preventDefault();
            snake.changeDirection(Directions.RIGHT);
            break;
        case 40:
            event.preventDefault();
            snake.changeDirection(Directions.DOWN);
            break;
        case 81:
            event.preventDefault();
            if (confirm('Are you sure?')) {
                endGame();
            }
            break;
        case 80:
            alert('Paused, Press OK to continue.');
            break;

        default:
            break;
    }


}




