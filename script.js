// to listen keyboard on the window
window.addEventListener('keydown', moveSnake);

// to record snake position
let positionTop = 0;
let positionLeft = 0;

// to get canvas dimension
let canvasHeight = document.getElementById('canvas').getAttribute('height');
let canvasWidth = document.getElementById('canvas').getAttribute('width');

// target element we want to move :
let snake = document.getElementById('snake');

// target canvas element in html and make a 2d context in it
let ctx = document.getElementById('canvas').getContext('2d');

// to draw the snake
function drawSnake() {
    ctx.drawImage(snake, positionLeft, positionTop, 40, 40);
}

// to clear the snake
function clearSnake() {
    ctx.clearRect(positionLeft, positionTop, 40, 40);
}

// call function to start with a snake already visible
drawSnake();

// main engine, function to move snake
let lastMove;

function moveSnake(event) {
    switch (event.key) {
        case 'ArrowDown':
            if (lastMove == 'ArrowUp') break; 
            clearSnake();
            positionTop += 50;
            if (positionTop == 500) positionTop = 0;
            drawSnake();
            lastMove = event.key;
            break;
        case "ArrowUp":
            if (lastMove == 'ArrowDown') break;
            clearSnake();
            positionTop -= 50;
            if (positionTop == -50) positionTop = 450;
            drawSnake();
            lastMove = event.key;
            break;
        case "ArrowLeft":
            if (lastMove == 'ArrowRight') break;
            clearSnake();
            positionLeft -= 50;
            if (positionLeft == -50) positionLeft = 450;
            drawSnake();
            lastMove = event.key;
            break;
        case "ArrowRight":
            if (lastMove == 'ArrowLeft') break;
            clearSnake();
            positionLeft += 50;
            if (positionLeft == 500) positionLeft = 0;
            drawSnake();
            lastMove = event.key;
            break;
        default:
            console.log(event.key, event.keyCode);
            return;
    }
    event.preventDefault();
}

