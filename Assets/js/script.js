// here we listen everything everywhere everytime
window.addEventListener('keydown', moveSnakeWithKeyboard);
window.addEventListener('click', moveSnakeWithMouse);

// every good game needs a battlefield. here he is
// target canvas element in html and make a 2d context in it, that's how canvas works
let ctx = document.getElementById("canvas").getContext("2d");

// to get canvas dimension, this is the snake's playground
let canvasHeight = document.getElementById("canvas").getAttribute("height");
let canvasWidth = document.getElementById("canvas").getAttribute("width");

// function to draw the grid in canvas, with length in parameter
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

// in this game, there is a snake
// and we have to know where this good boy is
let snake = [
    { x: 250, y: 250 },
    { x: 250, y: 200 },
    { x: 250, y: 150 }
];

let lastMove;

let dx = 0;
let dy = 0;

function keepSnakePosition() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop()
}

// target and choose which snake, a little hack to have a good snake's boy who move his head
let snakeUp = document.getElementById("snakeUp");
let snakeRight = document.getElementById("snakeRight");
let snakeDown = document.getElementById("snakeDown");
let snakeLeft = document.getElementById("snakeLeft");

// to see it, we have to draw the snake (interesting, hu)
function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    ctx.drawImage(snakeUp, snakePart.x, snakePart.y, 50, 50);
}

// here he comes for good times
drawSnake();

// but sometimes we need to clear this fellow snake
function clearSnake() {
    ctx.clearRect(positionLeft, positionTop, 50, 50);
    snake.forEach(clearSnakePart);
}

function clearSnakePart(snakePart) {
    ctx.clearRect(snakePart.x, snakePart.y, 50, 50);
}

// in this game, there is also an apple
let positionTop = 0;
let positionLeft = 0;
let apple = document.getElementById("apple");
let positionAppleTop = getRandom(0, 10) * 50;
let positionAppleLeft = getRandom(0, 10) * 50; 

// to draw this apple
function drawApple(apple) {
    ctx.drawImage(apple, positionAppleLeft, positionAppleTop, 50, 50);
}

drawApple(apple);

// our snake loves to eat apple
function clearApple() {
    ctx.clearRect(positionAppleLeft, positionAppleTop, 50, 50);
  }

function eatApple() {
    if (positionTop == positionAppleTop && positionLeft == positionAppleLeft) {
        clearApple();
    }
}

// some randomize makes game more exciting
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// moving this ####### snake with keyboard
function moveSnakeWithKeyboard(event) {
    switch (event.key) {
        case 'ArrowDown':
            if (lastMove === 'ArrowUp') break;
            clearSnake();
            drawGrid(10);
            dy = +50;
            dx = 0;
            keepSnakePosition();
            if (snake[0].y === 500) snake[0].y = 0;
            drawSnake();
            lastMove = event.key;
            break;
        case 'ArrowUp':
            if (lastMove === 'ArrowDown') break;
            clearSnake();
            drawGrid(10);
            dy = -50;
            dx = 0;
            keepSnakePosition();
            if (snake[0].y === -50) snake[0].y = 450;
            drawSnake();
            lastMove = event.key;
            break;
        case 'ArrowLeft':
            if (lastMove === 'ArrowRight') break;
            clearSnake();
            drawGrid(10);
            dx = -50;
            dy = 0;
            keepSnakePosition();
            if (snake[0].x === -50) snake[0].x = 450;
            drawSnake();
            lastMove = event.key;
            break;
        case 'ArrowRight':
            if (lastMove === 'ArrowLeft') break;
            clearSnake();
            drawGrid(10);
            dx = 50;
            dy = 0;
            keepSnakePosition();
            if (snake[0].x === 500) snake[0].x = 0;
            drawSnake();
            lastMove = event.key;
            break;
    }
}

// moving it with mouse or fingers
function moveSnakeWithMouse(event) {
    switch (event.target.getAttribute('class')) {
        case 'arrow arrowDown':
            if (lastMove === 'arrow arrowUp') break;
            clearSnake();
            drawGrid(10);
            dy = +50;
            dx = 0;
            keepSnakePosition();
            if (snake[0].y === 500) snake[0].y = 0;
            drawSnake();
            lastMove = event.target.getAttribute('class');
            break;
        case "arrow arrowUp":
            if (lastMove === 'arrow arrowDown') break;
            clearSnake();
            drawGrid(10)
            dy = -50;
            dx = 0;
            keepSnakePosition();
            if (snake[0].y === -50) snake[0].y = 450;
            drawSnake();
            lastMove = event.target.getAttribute('class');
            break;
        case "arrow arrowLeft":
            if (lastMove === 'arrow arrowRight') break;
            clearSnake();
            drawGrid(10)
            dx = -50;
            dy = 0;
            keepSnakePosition();
            if (snake[0].x === -50) snake[0].x = 450;
            drawSnake();
            lastMove = event.target.getAttribute('class');
            break;
        case "arrow arrowRight":
            if (lastMove === 'arrow arrowLeft') break;
            clearSnake();
            drawGrid(10)
            dx = 50;
            dy = 0;
            keepSnakePosition();
            if (snake[0].x === 500) snake[0].x = 0;
            drawSnake();
            lastMove = event.target.getAttribute('class');
            break;
    }
}
