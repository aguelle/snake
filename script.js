// create function to move snake

window.addEventListener('keydown', moveSnake);

function moveSnake() {
    switch (event.key) {
        case 'ArrowDown':
            console.log('ArrowDown');
            break;
        case "ArrowUp":
            console.log("ArrowUp");
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            break;
        default:
            console.log(event.key, event.keyCode);
            return;
    }

    event.preventDefault();
}
