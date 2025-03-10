const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');
let color = '#000000';

canvas.addEventListener('mousemove', (e) => {
    if (e.buttons === 1) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, 10, 0, Math.PI * 2);
        ctx.fill();
    }
});

function cambiarColor() {
    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function borrarLienzo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function guardarArte() {
    const imagen = canvas.toDataURL('image/png');
    fetch('/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagen: imagen }),
    })
    .then(response => response.json())
    .then(data => {
        const link = document.createElement('a');
        link.href = data.imagen;
        link.download = 'arte_abstracto.png';
        link.click();
    });
}