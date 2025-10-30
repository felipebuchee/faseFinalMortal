const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.rect(0, 0, 500, 500);
ctx.fillStyle = 'green';
ctx.fill();
ctx.strokeStyle = 'black';
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(250,250,100,0,Math.PI*2, false);
ctx.fillStyle = 'blue';
ctx.fill();
ctx.strokeStyle = 'black';
ctx.stroke();
ctx.closePath();

