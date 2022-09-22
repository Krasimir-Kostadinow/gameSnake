import helper from "./helper.js";
import GameObject from "./gameObject.js";
import GameField from "./gameField.js";
import Food from "./food.js";
import Stone from "./stone.js";
import SnakeBody from "./snakeBody.js";
import Snake from "./snake.js";
import style from "./style.js";


let GameSpeed = 200;
function record() {
    fetch('https://virtual-plating-360306-default-rtdb.europe-west1.firebasedatabase.app/gameRecord.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('record').textContent = `Record: ${data.record} points`;
    });
}
record();

function newRecord() {
    let bestPoints = {
        record: Number(document.getElementById('points').textContent)
    };

    fetch('https://virtual-plating-360306-default-rtdb.europe-west1.firebasedatabase.app/gameRecord.json', 
    {method: 'PATCH', body: JSON.stringify(bestPoints)});

}

let playerRecord = `Record: ${document.getElementById('record').textContent} points`;
let recordPoints = Number(playerRecord.split(' ')[1]);

let $start = document.getElementById('btnStart');
let $startPhone = document.getElementById('btnStartPhone');
let $control = document.getElementsByClassName('control')[0];

style();
let gameObjects = [];
let canvas = document.getElementById('gameField');
let gameField = new GameField(canvas);
let intervalid = 0;
let snake = null;

$start.addEventListener('click', startGame);
$startPhone.addEventListener('click', startGame);


function startGame(e) {
    let snakeLength = parseInt(document.getElementById('snakeLength').value),
        numberOfStones = parseInt(document.getElementById('stonesNumber').value),
        numberOfFood = parseInt(document.getElementById('foodNumber').value),
        stone = null,
        food = null;

    if (e.target.textContent === 'Start Phone') {
        helper.FieldSize.WIDTH = 400;
        helper.FieldSize.HEIGHT = 400;
        gameField = new GameField(canvas);
        $control.style.display = 'block';
    } else {
        helper.FieldSize.WIDTH = 960;
        helper.FieldSize.HEIGHT = 500;
        gameField = new GameField(canvas);
        $control.style.display = 'none';
    }

    let GameSpeed = document.getElementById('speedSnake').value;
    gameObjects = [];

    clearInterval(intervalid);

    if (snakeLength > ((helper.FieldSize.WIDTH - 100) / helper.ObjectSize.WIDTH) || snakeLength <= 1) {
        snakeLength = 3;
    }

    if (numberOfStones < 0) {
        numberOfStones = 5;
    }

    if (numberOfFood <= 0) {
        numberOfFood = 5;
    }

    let x = (snakeLength + 1) * helper.ObjectSize.WIDTH;
    let y = helper.getRandomPositionY(0, helper.FieldSize.HEIGHT - helper.ObjectSize.HEIGHT);

    snake = new Snake(x, y, snakeLength - 1, helper.Directions.RIGHT);

    for (let i = 1; i < snakeLength; i++) {
        var position = {
            X: x - (i * helper.ObjectSize.WIDTH),
            Y: y
        }

        let part = new SnakeBody(position.X, position.Y);
        snake.bodyArray.unshift(part);
        snake.positionStack.unshift(position);

    }

    gameObjects.push(snake);

    for (let i = 0; i < numberOfStones; i++) {
        stone = new Stone(helper.getRandomPositionX(0, helper.FieldSize.WIDTH - helper.ObjectSize.WIDTH),
            helper.getRandomPositionY(0, helper.FieldSize.HEIGHT - helper.ObjectSize.HEIGHT));

        gameObjects.push(stone);

    }

    for (let i = 0; i < numberOfFood; i++) {
        food = new Food(helper.getRandomPositionX(0, helper.FieldSize.WIDTH - helper.ObjectSize.WIDTH),
            helper.getRandomPositionY(0, helper.FieldSize.HEIGHT - helper.ObjectSize.HEIGHT));

        gameObjects.push(food);

    }
    function control() {
        let up = document.getElementById('up');
        up.style.width = '80px';
        up.style.height = '80px';
        up.style.color = 'green';

        let down = document.getElementById('down');
        down.style.width = '80px';
        down.style.height = '80px';
        down.style.color = 'green';

        let left = document.getElementById('left');
        left.style.width = '80px';
        left.style.height = '80px';
        left.style.color = 'green';
        left.style.marginRight = '40px'

        let right = document.getElementById('right');
        right.style.width = '80px';
        right.style.height = '80px';
        right.style.marginLeft = '40px';
        right.style.color = 'green';

        up.addEventListener('click', function (e) {
            snake.changeDirection(helper.Directions.UP);
        });
        down.addEventListener('click', function (e) {
            snake.changeDirection(helper.Directions.DOWN);
        });
        left.addEventListener('click', function (e) {
            snake.changeDirection(helper.Directions.LEFT);
        });
        right.addEventListener('click', function (e) {
            snake.changeDirection(helper.Directions.RIGHT);
        });
    }
    control();
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
    gameField.ctx.clearRect(0, 0, helper.FieldSize.WIDTH, helper.FieldSize.HEIGHT);
    gameField.ctx.font = fondSize + 'px Arial';
    gameField.ctx.textAlign = 'center';
    gameField.ctx.fillStyle = 'green';


    if (Number(document.getElementById('points').textContent > recordPoints)) {
        gameField.ctx.fillText('Well done!', helper.FieldSize.WIDTH / 2, helper.FieldSize.HEIGHT / 2);
        gameField.ctx.fillText('New Record', helper.FieldSize.WIDTH / 2, helper.FieldSize.HEIGHT / 1.5);
        playerRecord = `Record: ${document.getElementById('points').textContent} points`;
        document.getElementById('record').textContent = playerRecord;
        recordPoints = Number(document.getElementById('points').textContent);
        newRecord();
    } else {
        gameField.ctx.fillText('Game Over', helper.FieldSize.WIDTH / 2, helper.FieldSize.HEIGHT / 2);
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
            snake.changeDirection(helper.Directions.LEFT);
            break;
        case 38:
            event.preventDefault();
            snake.changeDirection(helper.Directions.UP);
            break;
        case 39:
            event.preventDefault();
            snake.changeDirection(helper.Directions.RIGHT);
            break;
        case 40:
            event.preventDefault();
            snake.changeDirection(helper.Directions.DOWN);
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

export default {endGame, afterEndGameEvents};








