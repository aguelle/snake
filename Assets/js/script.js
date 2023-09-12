// to listen keyboard on the window, and if keyboard is pressed we call moveSnake function
window.addEventListener('keydown', main);

// to record snake position, we have to know where he is everytime
let snake = [
    {x: 250, y: 250},
    {x: 250, y: 200},
    {x: 250, y: 150}
];
// let positionTop = 0;
// let positionLeft = 0;

// to get canvas dimension, this is the snake's playground
let canvasHeight = document.getElementById('canvas').getAttribute('height');
let canvasWidth = document.getElementById('canvas').getAttribute('width');

// target canvas element in html and make a 2d context in it, that's how canvas works
let ctx = document.getElementById('canvas').getContext('2d');

// target and choose which snake, a little hack to have a good snake's boy who move his head
// let snakeUp = document.getElementById('snakeUp');
// let snakeRight = document.getElementById('snakeRight');
// let snakeDown = document.getElementById('snakeDown');
// let snakeLeft = document.getElementById('snakeLeft');

// to draw the snake
function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightgreen';
    //ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 50, 50);
    //ctx.strokeRect(snakePart.x, snakePart.y, 50, 50);
}

// function drawSnake(whichSnake) {
//     ctx.drawImage(whichSnake, positionLeft, positionTop, 40, 40);
// }

// to clear the snake
function clearSnake() {
    snake.forEach(clearSnakePart);
}

function clearSnakePart(snakePart) {
    ctx.clearRect(snakePart.x, snakePart.y, 50, 50);
}

// function clearSnake() {
//     ctx.clearRect(positionLeft, positionTop, 50, 50);
// }

// call function to start with a snake already visible, if not we have nothing on the canvas at the start
drawSnake();

//drawSnake(snakeUp);

// main engine, function to move snake. That's THE function of the game for the moment
let lastMove;

let dx = 0;
let dy = 0;

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop()
}

function main(event) {
    switch (event.key) {
        case 'ArrowDown':
            if (lastMove === 'ArrowUp') break;
            clearSnake();
            dy = +50;
            dx = 0;
            moveSnake();
            if (snake[0].y > 500) snake[0].y = 0;
            drawSnake();
            lastMove = event.key;
            break;
        case 'ArrowUp':
            if (lastMove === 'ArrowDown') break;
            clearSnake();
            dy = -50;
            dx = 0;
            moveSnake();
            if (snake[0].y < 0) snake[0].y = 500;
            drawSnake();
            lastMove = event.key;
            break;
        case 'ArrowLeft':
            if (lastMove === 'ArrowRight') break;
            clearSnake();
            dx = -50;
            dy = 0;
            moveSnake();
            if (snake[0].x < 0) snake[0].x = 500;
            drawSnake();
            lastMove = event.key;
            break;
        case 'ArrowRight':
            if (lastMove === 'ArrowLeft') break;
            clearSnake();
            dx = 50;
            dy = 0;
            moveSnake();
            if (snake[0].x > 500) snake[0].x = 0;
            drawSnake();
            lastMove = event.key;
            break;
    }
}

// function moveSnake(event) {
//     // listen to keyboard event
//     switch (event.key) {
//         // in case of arrowdown
//         case 'ArrowDown':
//             // if lastmove was arrowup, don't do anything (to prevent snake to go back)
//             if (lastMove == 'ArrowUp') break;
//             // erase actual snake (that's the method with canvas, we clear all and we draw with all changes after)
//             clearSnake();
//             drawGrid(10)
//             // to backup snake's move and to know where he is
//             positionTop += 50;
//             // if snake arrives to border we send him to the opposite side
//             if (positionTop == 500) positionTop = 0;
//             // draw actual snake with changes
//             drawSnake(snakeDown);
//             // record last move to prevent snake to go back on the next move
//             lastMove = event.key;
//             break;
//         case "ArrowUp":
//             if (lastMove == 'ArrowDown') break;
//             clearSnake();
//             drawGrid(10)
//             positionTop -= 50;
//             if (positionTop == -50) positionTop = 450;
//             drawSnake(snakeUp);
//             lastMove = event.key;
//             break;
//         case "ArrowLeft":
//             if (lastMove == 'ArrowRight') break;
//             clearSnake();
//             drawGrid(10)
//             positionLeft -= 50;
//             if (positionLeft == -50) positionLeft = 450;
//             drawSnake(snakeLeft);
//             lastMove = event.key;
//             break;
//         case "ArrowRight":
//             if (lastMove == 'ArrowLeft') break;
//             clearSnake();
//             drawGrid(10)
//             positionLeft += 50;
//             if (positionLeft == 500) positionLeft = 0;
//             drawSnake(snakeRight);
//             lastMove = event.key;
//             break;
//         default:
//             console.log(event.key, event.keyCode);
//             return;
//     }
//     event.preventDefault();
// }

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