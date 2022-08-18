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

}