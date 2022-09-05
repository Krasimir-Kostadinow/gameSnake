

export default function style() {

    let inputspeedSnake = document.getElementById('speedSnake');
    inputspeedSnake.style.width = '40px';
    inputspeedSnake.style.marginTop = '5px';
    inputspeedSnake.style.marginLeft = '5px';
    inputspeedSnake.style.marginRight = '8px';
    inputspeedSnake.style.marginBottom = '5px';

    let snakeLength = document.getElementById('snakeLength');
    snakeLength.style.width = '40px';
    snakeLength.style.marginTop = '5px';
    snakeLength.style.marginLeft = '5px';
    snakeLength.style.marginRight = '95px';
    snakeLength.style.marginBottom = '5px';

    let numberOfStones = document.getElementById('stonesNumber');
    numberOfStones.style.width = '40px';
    numberOfStones.style.marginTop = '5px';
    numberOfStones.style.marginLeft = '5px';
    numberOfStones.style.marginRight = '6px';
    numberOfStones.style.marginBottom = '5px';

    let numberOfFood = document.getElementById('foodNumber');
    numberOfFood.style.width = '40px';
    numberOfFood.style.marginTop = '5px';
    numberOfFood.style.marginLeft = '5px';
    numberOfFood.style.marginRight = '4px';
    numberOfFood.style.marginBottom = '5px';


    let $start = document.getElementById('btnStart');
    $start.style.width = '80px';
    $start.style.height = '50px';
    $start.style.color = 'green';

    let $startPhone = document.getElementById('btnStartPhone');
    $startPhone.style.width = '80px';
    $startPhone.style.height = '50px';
    $startPhone.style.color = 'green';

    let $control = document.getElementsByClassName('control')[0];
    $control.style.display = 'none';
}