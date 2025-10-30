const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    color: 'blue',
    speed: 1000,
    targetX: canvas.width / 2,
    targetY: canvas.height / 2
};

function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

function update() {
    const dx = circle.targetX - circle.x;
    const dy = circle.targetY - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > circle.speed) {
        circle.x += (dx / distance) * circle.speed;
        circle.y += (dy / distance) * circle.speed;
    }

    else {
        circle.x = circle.targetX;
        circle.y = circle.targetY;
    }

    drawCircle();
    requestAnimationFrame(update);
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    circle.targetX = event.clientX - rect.left;
    circle.targetY = event.clientY - rect.top;
});

drawCircle();
update();