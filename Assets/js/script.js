// here we listen everything everywhere everytime
window.addEventListener("keydown", moveSnakeWithKeyboard);
// window.addEventListener("click", moveSnakeWithMouse);

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

// each snake segment's positions
let snake = [
    { x: 200, y: 250 },
    { x: 200, y: 300 },
    { x: 200, y: 350 },
];

// to not be able to go back
let lastMove = "ArrowUp";

let dx = 0;
let dy = 0;

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const eatApple = snake[0].y === positionAppleTop && snake[0].x === positionAppleLeft
    if (eatApple) {
        clearApple();
        drawApple(apple);
        score += 50;
        gameSpeed = gameSpeed * (1 - 10/100);
        console.log(gameSpeed);
    } else {
        snake.pop();
    }
}

// target and choose which snake, a little hack to have a good snake's boy who move his head
let snakeHeadUp = document.getElementById("snake-head-up");
let snakeHeadDown = document.getElementById("snake-head-down");
let snakeHeadLeft = document.getElementById("snake-head-left");
let snakeHeadRight = document.getElementById("snake-head-right");

// to see it, we have to draw it (interesting, hu)
function drawSnake(snakeHead) {
    snake.forEach(drawSnakeBody);
    drawSnakeHead(snakeHead);
}

function drawSnakeHead(snakeHead) {
    ctx.drawImage(snakeHead, snake[0].x, snake[0].y, 50, 50);
}

function drawSnakeBody(snakeBody) {
    if (snakeBody === snake[0]) return;
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(snakeBody.x, snakeBody.y, 50, 50);
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

let positionAppleLeft = 0;
let positionAppleTop = 0;

function drawApple() {
    positionAppleLeft = getRandom(0, 9) * 50;
    positionAppleTop = getRandom(0, 9) * 50;
    snake.forEach(function (snakePart) {
        if (snakePart.x === positionAppleLeft && snakePart.y === positionAppleTop) {
            drawApple();
        }
    });
    ctx.drawImage(apple, positionAppleLeft, positionAppleTop, 50, 50);
}

function clearApple() {
    ctx.clearRect(positionAppleLeft, positionAppleTop, 50, 50);
}

// US11 - Snake die if it touch himself.
function deadSnake() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].y === snake[i].y && snake[0].x === snake[i].x) {
            displayGameOver();
            // btnReplay();
        }
    }
}

// US14 - Function Game Over end display score
let endgame;
let endgameFeatures = "left=100;top=100;width=320;height=320";

function displayGameOver() {
    endgame = window.open("endgame.html", endgameFeatures);
}

// US17 -function timer to know duration of a game
let timer = 0;
function grow() {
    timer++;
    document.getElementById("timer").innerHTML = timer;
}
setInterval("grow()", 1000);

// we need a score to be the best
let score = 0;
function displayScore() {
    document.getElementById("game-score").textContent = score;
    // document.getElementById("end-game-score").textContent = score;
}

function borderMirror() {
    if (snake[0].y === 500) snake[0].y = 0;
    if (snake[0].y === -50) snake[0].y = 450;
    if (snake[0].x === -50) snake[0].x = 450;
    if (snake[0].x === 500) snake[0].x = 0;
}

// moving this snake with keyboard
function moveSnakeWithKeyboard(event) {
    switch (event.key) {
        case "ArrowDown":
            if (lastMove === "ArrowUp") break;
            lastMove = event.key;
            dy = +50;
            dx = 0;
            break;
        case "ArrowUp":
            if (lastMove === "ArrowDown") break;
            lastMove = event.key;
            dy = -50;
            dx = 0;
            break;
        case "ArrowLeft":
            if (lastMove === "ArrowRight") break;
            lastMove = event.key;
            dx = -50;
            dy = 0;
            break;
        case "ArrowRight":
            if (lastMove === "ArrowLeft") break;
            lastMove = event.key;
            dx = 50;
            dy = 0;
            break;
    }
}

// to set snake's speed
let gameSpeed = 1000;

function loopTheGame() {
    setTimeout(function timer() {
        deadSnake();
        clearSnake();
        drawGrid(10);
        moveSnake();
        borderMirror();
        if (lastMove === "ArrowUp") {
            drawSnake(snakeHeadUp);
        }
        if (lastMove === "ArrowDown") {
            drawSnake(snakeHeadDown);
        }
        if (lastMove === "ArrowLeft") {
            drawSnake(snakeHeadLeft);
        }
        if (lastMove === "ArrowRight") {
            drawSnake(snakeHeadRight);
        }
        displayScore();
        loopTheGame();
    }, gameSpeed);
}

function btnReplay() {
    let hiddenBtn = document.getElementById("window-message");
    hiddenBtn.style.display = "block";
}

function runGame() {
    drawGrid(10);
    drawSnake(snakeHeadUp);
    drawApple();
    displayScore();
    loopTheGame();
}

window.onload = runGame;

// moving it with mouse or fingers
// function moveSnakeWithMouse(event) {
//     switch (event.target.getAttribute("class")) {
//         case "arrow arrowDown":
//             if (lastMove === "arrow arrowUp" || lastMove === 'ArrowUp') break;
//             clearSnake();
//             drawGrid(10);
//             dy = +50;
//             dx = 0;
//             moveSnake();
//             displayScore();
//             if (snake[0].y === 500) snake[0].y = 0;
//             drawSnake(snakeHeadDown);
//             deadSnake();
//             lastMove = event.key;
//             break;
//         case "arrow arrowUp":
//             if (lastMove === "ArrowDown") break;
//             clearSnake();
//             drawGrid(10);
//             dy = -50;
//             dx = 0;
//             moveSnake();
//             displayScore();
//             if (snake[0].y === -50) snake[0].y = 450;
//             drawSnake(snakeHeadUp);
//             deadSnake();
//             lastMove = event.key;
//             break;
//         case "arrow arrowLeft":
//             if (lastMove === "ArrowRight") break;
//             clearSnake();
//             drawGrid(10);
//             dx = -50;
//             dy = 0;
//             moveSnake();
//             displayScore();
//             if (snake[0].x === -50) snake[0].x = 450;
//             drawSnake(snakeHeadLeft);
//             deadSnake();
//             lastMove = event.key;
//             break;
//         case "arrow arrowRight":
//             if (lastMove === "ArrowLeft") break;
//             clearSnake();
//             drawGrid(10);
//             dx = 50;
//             dy = 0;
//             moveSnake();
//             displayScore();
//             if (snake[0].x === 500) snake[0].x = 0;
//             drawSnake(snakeHeadRight);
//             deadSnake();
//             lastMove = event.key;
//             break;
//     }
// }