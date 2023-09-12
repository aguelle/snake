// to listen keyboard on the window, and if keyboard is pressed we call moveSnake function
window.addEventListener('keydown', moveSnakeWithKeyboard);

// to record snake position, we have to know where he is everytime
let positionTop = 0;
let positionLeft = 0;

// to get canvas dimension, this is the snake's playground
let canvasHeight = document.getElementById('canvas').getAttribute('height');
let canvasWidth = document.getElementById('canvas').getAttribute('width');

// target canvas element in html and make a 2d context in it, that's how canvas works
let ctx = document.getElementById('canvas').getContext('2d');

// target and choose which snake, a little hack to have a good snake's boy who move his head
let snakeUp = document.getElementById('snakeUp');
let snakeRight = document.getElementById('snakeRight');
let snakeDown = document.getElementById('snakeDown');
let snakeLeft = document.getElementById('snakeLeft');

// to draw the snake
function drawSnake(whichSnake) {
    ctx.drawImage(whichSnake, positionLeft, positionTop, 50, 50);
}

// to clear the snake
function clearSnake() {
    ctx.clearRect(positionLeft, positionTop, 50, 50);
}

// call function to start with a snake already visible, if not we have nothing on the canvas at the start
drawSnake(snakeUp);

// main engine, function to move snake. That's THE function of the game for the moment
let lastMove;

function moveSnakeWithKeyboard(event) {
    // listen to keyboard event
    switch (event.key) {
        // in case of arrowdown
        case 'ArrowDown':
            // if lastMove was arrowup, don't do anything (to prevent snake to go back)
            if (lastMove === 'ArrowUp') break;
            // erase actual snake (that's the method with canvas, we clear all and we draw with all changes after)
            clearSnake();
            drawGrid(10)
            // to backup snake's move and to know where he is
            positionTop += 50;
            // if snake arrives to border we send him to the opposite side
            if (positionTop === 500) positionTop = 0;
            // draw actual snake with changes
            drawSnake(snakeDown);
            // record last move to prevent snake to go back on the next move
            lastMove = event.key;
            break;
        case "ArrowUp":
            if (lastMove === 'ArrowDown') break;
            clearSnake();
            drawGrid(10)
            positionTop -= 50;
            if (positionTop === -50) positionTop = 450;
            drawSnake(snakeUp);
            lastMove = event.key;
            break;
        case "ArrowLeft":
            if (lastMove === 'ArrowRight') break;
            clearSnake();
            drawGrid(10)
            positionLeft -= 50;
            if (positionLeft === -50) positionLeft = 450;
            drawSnake(snakeLeft);
            lastMove = event.key;
            break;
        case "ArrowRight":
            if (lastMove === 'ArrowLeft') break;
            clearSnake();
            drawGrid(10)
            positionLeft += 50;
            if (positionLeft === 500) positionLeft = 0;
            drawSnake(snakeRight);
            lastMove = event.key;
            break;
    }
}

// function to draw the grid in canvasHeight, with length in parameter
function drawGrid(gridLength) {
    let positionX = 0;
    let positionY = 0;
    for (let y = 0; y < gridLength; y++) {
        for (let x = 0; x < gridLength; x++) {
            ctx.strokeRect(positionX, positionY, 50, 50);
            positionX += 50;
        }
        positionX = 0;
        positionY += 50;
    }
}

// to draw a grid with 10 square length
drawGrid(10);

// to listen mouse and use arrows
document.body.addEventListener('click', moveSnakeWithMouse)

// function to use arrows
function moveSnakeWithMouse(event) {
    switch (event.target.getAttribute('class')) {
        case 'arrow arrowDown':
            if (lastMove === 'arrow arrowUp') break;
            clearSnake();
            drawGrid(10)
            positionTop += 50;
            if (positionTop === 500) positionTop = 0;
            drawSnake(snakeDown);
            lastMove = event.target.getAttribute('class');
            break;
        case "arrow arrowUp":
            if (lastMove === 'arrow arrowDown') break;
            clearSnake();
            drawGrid(10)
            positionTop -= 50;
            if (positionTop === -50) positionTop = 450;
            drawSnake(snakeUp);
            lastMove = event.target.getAttribute('class');
            break;
        case "arrow arrowLeft":
            if (lastMove === 'arrow arrowRight') break;
            clearSnake();
            drawGrid(10)
            positionLeft -= 50;
            if (positionLeft === -50) positionLeft = 450;
            drawSnake(snakeLeft);
            lastMove = event.target.getAttribute('class');
            break;
        case "arrow arrowRight":
            if (lastMove === 'arrow arrowLeft') break;
            clearSnake();
            drawGrid(10)
            positionLeft += 50;
            if (positionLeft === 500) positionLeft = 0;
            drawSnake(snakeRight);
            lastMove = event.target.getAttribute('class');
            break;
    }
}
