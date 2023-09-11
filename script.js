// create function to move snake

window.addEventListener('keydown', moveSnake);

let positionTop = 0;
let positionLeft = 0;

// target element we want to move :
let ballPosition = document.getElementById('ball');

// console.log to see movements, for futures functions
function moveSnake() {
    switch (event.key) {
        case 'ArrowDown':
            positionTop += 50;
            console.log('ArrowDown' + ` Y : ${positionTop} - X : ${positionLeft}`);
            ballPosition.style.top = positionTop + 'px';
            break;
        case "ArrowUp":
            positionTop -= 50;
            console.log('ArrowUp' + ` Y : ${positionTop} - X : ${positionLeft}`);
            ballPosition.style.top = positionTop + 'px';
            break;
        case "ArrowLeft":
            positionLeft -= 50;
            console.log('ArrowLeft' + ` Y : ${positionTop} - X : ${positionLeft}`);
            ballPosition.style.left = positionLeft + 'px';
            break;
        case "ArrowRight":
            positionLeft += 50;
            console.log('ArrowRight' + ` Y : ${positionTop} - X : ${positionLeft}`);
            ballPosition.style.left = positionLeft + 'px';
            break;
        default:
            console.log(event.key, event.keyCode);
            return;
    }
    event.preventDefault();
}
