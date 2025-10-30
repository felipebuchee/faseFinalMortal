/*
  Animação com múltiplas bolas.
  - Canvas fullscreen (dimensionado no load/resize)
  - Cada vez que uma bola quica nas bordas, ela se duplica (com cooldown para evitar spam)
  - Limite máximo de bolas para evitar sobrecarga
*/

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('Canvas');
    if (!canvas) {
        console.warn('movimento/funcoes.js: canvas não encontrado.');
        return;
    }
    const ctx = canvas.getContext('2d');

    // redimensiona canvas para a tela inteira
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // configuração
    // (removido limite de multiplicação — bolas podem multiplicar indefinidamente)

    // cria uma cor aleatória simples
    function randColor() {
        const r = Math.floor(100 + Math.random() * 155);
        const g = Math.floor(30 + Math.random() * 200);
        const b = Math.floor(30 + Math.random() * 200);
        return `rgb(${r},${g},${b})`;
    }

    // cria bola
    function createBall(x, y, radius = 20, dX = (Math.random() * 4 - 2), dY = (Math.random() * 4 - 2)) {
        return {
            x: x,
            y: y,
            radius: radius,
            color: randColor(),
            dX: dX || 1,
            dY: dY || 1,
            cooldown: 0 // frames antes de poder duplicar novamente
        };
    }

    // array de bolas
    const balls = [];

    // bola inicial: centro da tela
    balls.push(createBall(canvas.width / 2, canvas.height / 2));

    function drawBall(b) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.closePath();
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < balls.length; i++) {
            const b = balls[i];

            // mover
            b.x += b.dX;
            b.y += b.dY;

            let bounced = false;

            // colisões nas bordas
            if (b.x + b.radius > canvas.width) {
                b.x = canvas.width - b.radius;
                b.dX = -b.dX;
                bounced = true;
            } else if (b.x - b.radius < 0) {
                b.x = b.radius;
                b.dX = -b.dX;
                bounced = true;
            }
            if (b.y + b.radius > canvas.height) {
                b.y = canvas.height - b.radius;
                b.dY = -b.dY;
                bounced = true;
            } else if (b.y - b.radius < 0) {
                b.y = b.radius;
                b.dY = -b.dY;
                bounced = true;
            }

            // reduz cooldown
            if (b.cooldown > 0) b.cooldown--;

            // quando quicar, duplicar (se cooldown == 0). Não há mais limite de número de bolas.
            if (bounced && b.cooldown === 0) {
                b.cooldown = 8; // evitar duplicações contínuas imediatas

                // cria nova bola próxima, com velocidade aleatória
                const angle = Math.random() * Math.PI * 2;
                const speed = 1 + Math.random() * 3;
                const nx = Math.min(Math.max(b.x + Math.cos(angle) * (b.radius + 6), b.radius), canvas.width - b.radius);
                const ny = Math.min(Math.max(b.y + Math.sin(angle) * (b.radius + 6), b.radius), canvas.height - b.radius);

                const newBall = createBall(nx, ny, Math.max(6, b.radius * 0.9), (Math.cos(angle) * speed), (Math.sin(angle) * speed));
                // pequeno ajuste de cor e tamanho
                newBall.color = b.color;
                balls.push(newBall);
            }

            // desenha
            drawBall(b);
        }
    }

    function animate() {
        update();
        requestAnimationFrame(animate);
    }

    animate();
});