// here we listen everything everywhere everytime
document.addEventListener("keydown", moveSnakeWithKeyboard);
window.addEventListener("click", moveSnakeWithMouse);

// target canvas element in html and make a 2d context in it, that's how canvas works
let ctx = document.getElementById("canvas").getContext("2d");

// to get canvas dimension, this is the snake's playground
let canvasHeight = document.getElementById("canvas").getAttribute("height");
let canvasWidth = document.getElementById("canvas").getAttribute("width");

// we call the value of gridSize saved in the local storage
let gridSize = localStorage.getItem("gridSize");
console.log(gridSize);

// we calculate the each box's size depending on gridSize
let boxSize = canvasWidth / gridSize;
console.log(boxSize);

// function to draw the grid in canvas, with length in parameter
function drawGrid() {
    let positionX = 0;
    let positionY = 0;
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.strokeRect(positionX, positionY, boxSize, boxSize);
            positionX += boxSize;
        }
        positionX = 0;
        positionY += boxSize;
    }
}

// each snake segment's positions
let snake = [
    { x: 200, y: 500 - boxSize * 3 },
    { x: 200, y: 500 - boxSize * 2 },
    { x: 200, y: 500 - boxSize },
];

// to not be able to go back
let lastMove = "ArrowUp";

let dx = 0;
let dy = 0;

let changingDirection = false;

function moveSnake() {
  if (changingDirection === false) return;
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const eatApple = snake[0].y === positionAppleTop && snake[0].x === positionAppleLeft
    if (eatApple) {
        clearApple();
        drawApple(apple);
        score += 50;
        gameSpeed = gameSpeed * (1 - 10/100);
        snakeTailIndex += 1;
    } else {
        snake.pop();
    }
  }

// target and choose which snake, a little hack to have a good snake's boy who move his head
let snakeHeadUp = document.getElementById("snake-head-up");
let snakeHeadDown = document.getElementById("snake-head-down");
let snakeHeadLeft = document.getElementById("snake-head-left");
let snakeHeadRight = document.getElementById("snake-head-right");
let snakeBodyX = document.getElementById('snake-body-x');
let snakeBodyY = document.getElementById('snake-body-y');
let snakeTailUp = document.getElementById('snake-tail-up');
let snakeTailDown = document.getElementById('snake-tail-down');
let snakeTailLeft = document.getElementById('snake-tail-left');
let snakeTailRight = document.getElementById('snake-tail-right');

// to see it, we have to draw it (interesting, hu)
function drawSnake(snakeHead, snakeTail) {
    snake.forEach(drawSnakeBody);
    drawSnakeHead(snakeHead);
    drawSnakeTail(snakeTail);
}

function drawSnakeHead(snakeHead) {
    ctx.drawImage(snakeHead, snake[0].x, snake[0].y, boxSize, boxSize);
}

let snakeTailIndex = snake.length - 1;

function drawSnakeTail(snakeTail) {
    ctx.drawImage(snakeTail, snake[snakeTailIndex].x, snake[snakeTailIndex].y, boxSize, boxSize);
}

function drawSnakeBody(snakeBody) {
    if (snakeBody === snake[0] || snakeBody === snake[snakeTailIndex]) return;
    if (lastMove === "ArrowUp" || lastMove === "arrow arrowUp" || lastMove === "ArrowDown" || lastMove === "arrow arrowDown") {
        ctx.drawImage(snakeBodyY, snakeBody.x, snakeBody.y, boxSize, boxSize);
    }
    if (lastMove === "ArrowLeft" || lastMove === "arrow arrowLeft" || lastMove === "ArrowRight" || lastMove === "arrow arrowRight") {
        ctx.drawImage(snakeBodyX, snakeBody.x, snakeBody.y, boxSize, boxSize);
    }
}

// but sometimes we need to clear this fellow englis-- uh snake, sorry
function clearSnake() {
    snake.forEach(clearSnakePart);
}

function clearSnakePart(snakePart) {
    ctx.clearRect(snakePart.x, snakePart.y, boxSize, boxSize);
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
    // if we want a cat later
    // let maybe = getRandom(1, 10);
    // maybe === 10 ? apple = document.getElementById('kitty') : apple = document.getElementById('apple');
    positionAppleLeft = getRandom(0, gridSize - 1) * boxSize;
    positionAppleTop = getRandom(0, gridSize - 1) * boxSize;
    snake.forEach(function (snakePart) {
        if (snakePart.x === positionAppleLeft && snakePart.y === positionAppleTop) {
            drawApple();
        }
    });
    ctx.drawImage(apple, positionAppleLeft, positionAppleTop, boxSize, boxSize);
}

function clearApple() {
    ctx.clearRect(positionAppleLeft, positionAppleTop, boxSize, boxSize);
}

// US11 - Snake die if it touch himself.
function deadSnake() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].y === snake[i].y && snake[0].x === snake[i].x) {
            changingDirection = false;
            clearSnake();
            drawGrid();
            displayGameOver();
            endTimer();
            saveScoreInformation();
        }
    }
}

// US17 -function timer to know duration of a game

let millisecondes = 0;
let secondes = 0;
let minutes = 0;
let counter;

function timer(){
  counter = setInterval(function(){
    if (changingDirection === false) return;
      time.textContent = minutes + ' : ' + secondes + ' : ' + millisecondes;
      millisecondes += 1;
      if(millisecondes >= 10){millisecondes = 0; secondes += 1;}
      if(secondes >= 60){secondes = 0; minutes += 1;}
  }, 100)
}

function endTimer() {
    clearInterval(counter);
    gameOverTime = document.getElementById('time').textContent;
}

// we need a score to be the best
let score = 0;
function displayScore() {
    document.getElementById("game-score").textContent = score;
    document.getElementById('end-game-score').textContent = score;
}

function displayTime() {
    document.getElementById('end-time').textContent = counter;
    document.getElementById('end-game-time').textContent = counter;
}

function borderMirror() {
    if (snake[0].y === 500) snake[0].y = 0;
    if (snake[0].y === -boxSize) snake[0].y = 500 - boxSize;
    if (snake[0].x === -boxSize) snake[0].x = 500 - boxSize;
    if (snake[0].x === 500) snake[0].x = 0;
}

// moving this snake with keyboard
function moveSnakeWithKeyboard(event) {
  changingDirection = true;
    switch (event.key) {
        case "ArrowDown":
            if (lastMove === "ArrowUp" || lastMove === "arrow arrowUp") break;
            lastMove = event.key;
            dy = boxSize;
            dx = 0;
            break;
        case "ArrowUp":
            if (lastMove === "ArrowDown" || lastMove === "arrow arrowDown") break;
            lastMove = event.key;
            dy = -boxSize;
            dx = 0;
            break;
        case "ArrowLeft":
            if (lastMove === "ArrowRight" || lastMove === "arrow arrowRight") break;
            lastMove = event.key;
            dx = -boxSize;
            dy = 0;
            break;
        case "ArrowRight":
            if (lastMove === "ArrowLeft" || lastMove === "arrow arrowLeft") break;
            lastMove = event.key;
            dx = boxSize;
            dy = 0;
            break;
    }
}

// to set snake's speed
let gameSpeed = 1000;

function loopTheGame() {
    setTimeout(function timer() {
        clearSnake();
        drawGrid();
        moveSnake();
        borderMirror();
        if (lastMove === "ArrowUp" || lastMove === "arrow arrowUp") {
            drawSnake(snakeHeadUp, snakeTailUp);
        }
        if (lastMove === "ArrowDown" || lastMove === "arrow arrowDown") {
            drawSnake(snakeHeadDown, snakeTailDown);
        }
        if (lastMove === "ArrowLeft" || lastMove === "arrow arrowLeft") {
            drawSnake(snakeHeadLeft, snakeTailLeft);
        }
        if (lastMove === "ArrowRight" || lastMove === "arrow arrowRight") {
            drawSnake(snakeHeadRight, snakeTailRight);
        }
        displayScore();
        loopTheGame();
        deadSnake();
    }, gameSpeed);
}

function runGame() {
    drawGrid();
    drawSnake(snakeHeadUp, snakeTailUp);
    drawApple();
    displayScore();
    timer();
    loopTheGame();
}

window.onload = runGame;

function displayGameOver() {
    let hiddenBtn = document.getElementById("window-message");
    hiddenBtn.style.display = "block";
}

// moving it with mouse or fingers
function moveSnakeWithMouse(event) {
    changingDirection = true;

    switch (event.target.getAttribute("class")){
        case "arrow arrowDown":
            if ( lastMove == "ArrowUp" || lastMove === "arrow arrowUp") break;
            lastMove = event.target.getAttribute("class");
            dy = boxSize;
            dx = 0;
            break;
        case "arrow arrowUp":
            if (lastMove == "ArrowDown" || lastMove === "arrow arrowDown") break;
            lastMove = event.target.getAttribute("class");
            dy = -boxSize;
            dx = 0;
            break;
        case "arrow arrowLeft":
            if (lastMove == "ArrowRight" || lastMove === "arrow arrowRight") break;
            lastMove = event.target.getAttribute("class");
            dx = -boxSize;
            dy = 0;
            break;
        case "arrow arrowRight":
            if (lastMove == "ArrowLeft" || lastMove === "arrow arrowLeft") break;
            lastMove = event.target.getAttribute("class");
            dx = boxSize;
            dy = 0;
            break;
    }
}

let storeGameInformations = {};
let gameOverTime;

function saveScoreInformation() {
    let gamerName = document.getElementById('gamer-name').value;
    storeGameInformations["name"] = gamerName;
    storeGameInformations["score"] = score;
    storeGameInformations["time"] = gameOverTime;
    console.log(storeGameInformations);
    let scoreJson = JSON.stringify(storeGameInformations);
    localStorage.setItem('party', scoreJson);

}
