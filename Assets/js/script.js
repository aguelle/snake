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
let snakeHeadUp = document.getElementById("snake-head-up");
// let snakeRight = document.getElementById("snakeRight");
// let snakeDown = document.getElementById("snakeDown");
// let snakeLeft = document.getElementById("snakeLeft");

// to see it, we have to draw it (interesting, hu)
function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    ctx.drawImage(snakeHeadUp
        , snakePart.x, snakePart.y, 50, 50);
}

// but sometimes we need to clear this fellow englis-- uh snake, sorry
function clearSnake() {
    snake.forEach(clearSnakePart);
}

function clearSnakePart(snakePart) {
    ctx.clearRect(snakePart.x, snakePart.y, 50, 50);
}

// some randomize makes game more exciting
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// in this game, there is also an apple (not the computer, please keep focus)
let apple = document.getElementById("apple");

// to draw this apple
let positionAppleLeft = 0;
let positionAppleTop = 0;

function drawApple(apple) {
    positionAppleLeft = getRandom(0, 10) * 50;
    positionAppleTop = getRandom(0, 10) * 50;
    ctx.drawImage(apple, positionAppleLeft, positionAppleTop, 50, 50);
}

// our snake loves to eat apple
function eatApple() {
    if (snake[0].y === positionAppleTop && snake[0].x === positionAppleLeft) {
        clearApple();
        drawApple(apple);
        score += 50;
        console.log(score);
    }
}

function clearApple() {
    ctx.clearRect(positionAppleLeft, positionAppleTop, 50, 50);
}

// we need a score to be the best
let score = 0;
document.getElementById('game-score').textContent = score;

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
            eatApple();
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
            eatApple();
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
            eatApple();
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
            eatApple();
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
            eatApple();
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
            eatApple();
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
            eatApple();
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
            eatApple();
            drawSnake();
            lastMove = event.target.getAttribute('class');
            break;
    }
}

function btnReplay() {
    let hiddenBtn = document.getElementById("window-message");
    hiddenBtn.style.display = "block";
}

function runGame() {
    drawGrid(10);
    drawSnake();
    drawApple(apple);
}

window.onload = runGame;