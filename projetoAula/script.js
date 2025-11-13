const tela = document.getElementsByTagName("tela")[0];
canvas = document.createElement("canvas");
tela.appendChild(canvas);

canvas.width = tela.getAttribute("largura");
canvas.height = tela.getAttribute("altura");
canvas.style = "border:1px solid black"
const ctx = canvas.getContext("2d");

function desenhar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const arc of document.getElementsByTagName("arco")) {
        const x = arc.getAttribute("px") || 20;
        const y = arc.getAttribute("py") || 20;
        const raio = arc.getAttribute("raio") || 20;
        const color = arc.getAttribute("cor") || "red";
        const anguloInicial = arc.getAttribute("anguloInicial") || 0;
        const anguloFinal = arc.getAttribute("anguloFinal") || 2 * Math.PI;

        ctx.beginPath();
        ctx.arc(x, y, raio, anguloInicial, anguloFinal, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
}

function atualizar() {
    let velH = 5;
    for (const arc of document.getElementsByTagName("arco")) {
        arcoH = arc.getAttribute("moverH")
        if (arcoH) {
            let n = parseInt(arc.getAttribute("px"))
            arcoH === "direita" ? n += velH : n -= velH;
            if (n > canvas.width) n = 0
            if (n < 0) n = canvas.width
            arc.setAttribute("px", n)
        }

        let velV = 10;
        arcoV = arc.getAttribute("moverV")
        if (arcoV) {
            let n = parseInt(arc.getAttribute("py"))
            arcoV === "cima" ? n += velV : n -= velV;
            if (n > canvas.width) n = 0
            if (n < 0) n = canvas.width
            arc.setAttribute("py", n)
        }

    }
}

function animar() {
    desenhar();
    atualizar();
    requestAnimationFrame(animar)
}

animar();

