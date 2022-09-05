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

const FieldSize = {
    WIDTH: 960,
    HEIGHT: 500
};


function getRandomPositionX(start, end) {
    return Math.floor((Math.random() * (end - start + 1) + start) / ObjectSize.WIDTH) * ObjectSize.WIDTH;
}

function getRandomPositionY(start, end) {
    return Math.floor((Math.random() * (end - start + 1) + start) / ObjectSize.HEIGHT) * ObjectSize.HEIGHT;
}

export default {Directions, ObjectSize, FieldSize, getRandomPositionX, getRandomPositionY};