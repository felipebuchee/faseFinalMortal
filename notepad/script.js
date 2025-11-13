const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

// Configuração do círculo
const circle = {
    x: 50,
    y: 50,
    radius: 20,
    speed: 50,
    color: 'blue'
};

// Configuração do quadrado
const square = {
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    color: 'red'
};

// Referência ao texto de colisão
const collisionInfo = document.getElementById('collisionInfo');

// Função para desenhar o círculo
function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar o quadrado
function drawSquare() {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.width, square.height);
}
function checkCollision() {
    const distX = Math.abs(circle.x - (square.x + square.width / 2));
    const distY = Math.abs(circle.y - (square.y + square.height / 2));
    if (distX <= square.width / 2 + circle.radius && distY <= square.height /
        2 + circle.radius) {
        if (circle.y < square.y) {
            collisionInfo.textContent = 'Colisão por cima!';
        } else if (circle.y > square.y + square.height) {
            collisionInfo.textContent = 'Colisão por baixo!';
        } else if (circle.x < square.x) {
            collisionInfo.textContent = 'Colisão pela esquerda!';
        } else if (circle.x > square.x + square.width) {
            collisionInfo.textContent = 'Colisão pela direita!';
        }
        if (circle.x < square.x) circle.x = square.x - circle.radius;
        if (circle.x > square.x + square.width) circle.x = square.x + square.width +
            circle.radius;
        if (circle.y < square.y) circle.y = square.y - circle.radius;
        if (circle.y > square.y + square.height) circle.y = square.y + square.height +
            circle.radius;
    } else {
        collisionInfo.textContent = 'Nenhuma colisão';
    }
}
// Atualiza o canvas
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    drawSquare();
    checkCollision();
}

// Controle do teclado
window.addEventListener('keydown', (e) => {
    switch (e.key) {
case 'ArrowUp':
    circle.y -= circle.speed;
    break;
case 'ArrowDown':
    circle.y += circle.speed;
    break;
case 'ArrowLeft':
    circle.x -= circle.speed;
    break;
case 'ArrowRight':
    circle.x += circle.speed;
    break;
}
update();
});

// Inicializa o jogo
update();
