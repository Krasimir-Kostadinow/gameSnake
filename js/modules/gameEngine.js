import * as GameField from './GameField.js';
import * as Snake from './Snake.js';
import * as SnakeBody from './SnakeBody.js';
import * as Food from './Food.js';
import * as Stone from './Stone.js';
import * as Helper from './helper.js';




var gameObjects = [],
    gameField = new GameField(document.getElementById('gameField')),
    intervalid = 0,
    snake = null;

function startGame() {
    var snakeLength = parseInt(document.getElementById('snakeLength').value),
        numberOfStones = parseInt(document.getElementById('stonesNumber').value),
        numberOfFood = parseInt(document.getElementById('foodNumber').value),
        stone = null,
        food = null,
        snakeBody = null,
        i = 0;

    gameObjects = [];
    clearInterval(intervalid);

    if (snakeLength > ((Helper.GameField.WIDTH - 100) / Helper.ObjectSize.WIDTH) || snakeLength <= 1) {
        snakeLength = 3;
    }

    if (numberOfStones < 0) {
        numberOfStones = 10;
    }

    if (numberOfFood <= 0) {
        numberOfFood = 5;
    }

    let x = (snakeLength + 1) * Helper.ObjectSize.WIDTH;
    let y = Helper.getRandomPositionY(0, Helper.FieldSize.HEIGHT - Helper.ObjectSize.HEIGHT);

    snake = new Snake(x, y, snakeLength - 1, Helper.Directions.RIGHT);

    for (let i = 0; i < snakeLength; i++) {
        var position = {
            X: x - (i * Helper.ObjectSize.WIDTH),
            Y: y
        }

        let part = new SnakeBody(position.X, position.Y);
        snake.bodyArray.unshift(part);
        snake.positionStack.unshift(position);

    }

    gameObjects.push(snake);

    for (let i = 0; i < numberOfStones; i++) {
        stone = new Stone(Helper.getRandomPositionX(0, Helper.FieldSize.WIDTH - Helper.ObjectSize.WIDTH),
            Helper.getRandomPositionY(0, Helper.FieldSize.HEIGHT - Helper.ObjectSize.HEIGHT));

        gameObjects.push(stone);

    }

    for (let i = 0; i < numberOfFood; i++) {
        food = new Food(Helper.getRandomPositionX(0, Helper.FieldSize.WIDTH - Helper.ObjectSize.WIDTH),
            Helper.getRandomPositionY(0, Helper.FieldSize.HEIGHT - Helper.ObjectSize.HEIGHT));

        gameObjects.push(food);

    }

    document.addEventListener('keydown', getKey, false);

    gameField.drow(gameObjects);

    intervalid = setInterval(update, Helper.GameSpeed);
}

function endGame() {
    clearInterval(intervalid);
    setTimeout(afterEndGameEvents, Helper.GameSpeed);
}

function afterEndGameEvents() {
    var fondSize = 60;
    gameField.ctx.clearRect(0, 0, Helper.FieldSize.WIDTH, Helper.FieldSize.HEIGHT);
    gameField.ctx.font = fondSize + 'px Arial';
    gameField.ctx.textAlign = 'center';
    gameField.ctx.fillStyle = 'green';
    gameField.ctx.fillText('Game Over', Helper.FieldSize.WIDTH / 2, Helper.FieldSize.HEIGHT / 2);
}

function update() {
    var i = 0;
    for (i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update();
    }
    collisionDetect();
    gameField.draw(gameObjects);
}

function collisionDetect() {
    var i = 0;

    if (snake.isOutOfGameField()) {
        snake.onCollision(snake);
    }

    if (hasBittenHerSelf()) {
        snake.onCollision(snake);
    }

    for (i = 0; i < gameObjects.length; i++) {
        if (collide(snake, gameObjects[i])) {
            snake.onCollision(gameObjects[i]);
            gameObjects[i].onCollision();
        }
    }
}

function collide(snakeObj, obj) {
    var result = false;

    if (snakeObj.position.X === obj.position.X && snakeObj.position.Y === obj.position.Y) {
        result = true;
    }
    return result;
}

function getKey(event) {

    switch (event.keyCode) {
        case 37:
            event.preventDefault();
            snake.changeDirection(Helper.Directions.LEFT);
            break;
        case 38:
            event.preventDefault();
            snake.changeDirection(Helper.Directions.UP);
            break;
        case 39:
            event.preventDefault();
            snake.changeDirection(Helper.Directions.RIGHT);
            break;
        case 40:
            event.preventDefault();
            snake.changeDirection(Helper.Directions.DOWN);
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

export {startGame, endGame};