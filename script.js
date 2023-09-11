// to listen keyboard on the window
window.addEventListener('keydown', moveSnake);

// to record snake position
let positionTop = 0;
let positionLeft = 0;

// target element we want to move :
let snake = document.getElementById('snake');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

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

// console.log to see movements, for futures functions
let lastMove;

function moveSnake(event) {
    console.log(lastMove)
    switch (event.key) {
        case 'ArrowDown':
            if (lastMove == 'ArrowUp') break; 
            clearSnake();
            positionTop += 50;
            console.log('ArrowDown' + ` Y : ${positionTop} - X : ${positionLeft}`);
            drawSnake();
            lastMove = event.key;
            break;
        case "ArrowUp":
            if (lastMove == 'ArrowDown') break;
            clearSnake();
            positionTop -= 50;
            console.log('ArrowUp' + ` Y : ${positionTop} - X : ${positionLeft}`);
            drawSnake();
            lastMove = event.key;
            break;
        case "ArrowLeft":
            if (lastMove == 'ArrowRight') break;
            clearSnake();
            positionLeft -= 50;
            console.log('ArrowLeft' + ` Y : ${positionTop} - X : ${positionLeft}`);
            drawSnake();
            lastMove = event.key;
            break;
        case "ArrowRight":
            if (lastMove == 'ArrowLeft') break;
            clearSnake();
            positionLeft += 50;
            console.log('ArrowRight' + ` Y : ${positionTop} - X : ${positionLeft}`);
            drawSnake();
            lastMove = event.key;
            break;
        default:
            console.log(event.key, event.keyCode);
            return;
    }
    event.preventDefault();
}

