const boat = document.getElementById('boat');
const scoreElement = document.getElementById('score');
const positionXElement = document.getElementById('position-x');
const positionYElement = document.getElementById('position-y');
let x = 5;
let y = 5;
let score = 0;
const trashItems = [
    document.getElementById('trash1'),
    document.getElementById('trash2'),
    document.getElementById('trash3')
];

function move(direction) {
    switch (direction) {
        case 'up':
            if (y < 10) y += 0.5;
            break;
        case 'down':
            if (y > 0) y -= 0.5;
            break;
        case 'left':
            if (x > 0) x -= 0.5;
            break;
        case 'right':
            if (x < 10) x += 0.5;
            break;
    }
    updateBoatPosition();
    checkCollision();
}

function updateBoatPosition() {
    boat.setAttribute('cx', x);
    boat.setAttribute('cy', 10 - y);  // Invert y-coordinate for SVG
    positionXElement.textContent = Math.round(x * 10) / 10;
    positionYElement.textContent = Math.round(y * 10) / 10;
}

function checkCollision() {
    trashItems.forEach((trash, index) => {
        const trashX = parseFloat(trash.getAttribute('cx'));
        const trashY = 10 - parseFloat(trash.getAttribute('cy'));  // Invert y-coordinate
        const distance = Math.sqrt((x - trashX) ** 2 + (y - trashY) ** 2);
        
        if (distance < 0.5) {
            score++;
            scoreElement.textContent = score;
            respawnTrash(trash);
        }
    });
}

function respawnTrash(trash) {
    const newX = Math.random() * 10;
    const newY = Math.random() * 10;
    trash.setAttribute('cx', newX);
    trash.setAttribute('cy', 10 - newY);  // Invert y-coordinate for SVG
}