const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// Função para desenhar um retângulo
let square = {
    x: 200,
    y: 200,
    size: 50,
    color: 'red',
    speed: 5
}

function drawSquare() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.size, square.size);
}

function moveSquare(direction) {
    const key = event.key;

    if (key === 'ArrowUp' && square.y > 0) {
        square.y -= square.speed;
    } else if (key === 'ArrowDown' && square.y < canvas.height - square.size) {
        square.y += square.speed;
    } else if (key === 'ArrowLeft' && square.x > 0) {
        square.x -= square.speed;
    } else if (key === 'ArrowRight' && square.x < canvas.width - square.size) {
        square.x += square.speed;
    }
    drawSquare();
}

// Evento de teclado
window.addEventListener('keydown', moveSquare);

// Desenha o quadrado inicialmente
drawSquare();