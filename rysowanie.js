const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const toggleDrawModeButton = document.getElementById('toggleDrawMode');
const colorPicker = document.getElementById('colorPicker');

let isDrawingMode = false;
let isDrawing = false;
let currentColor = '#000000';

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function startDrawing(event) {
    if (!isDrawingMode) return;
    isDrawing = true;
    ctx.beginPath();
}

function draw(event) {
    if (!isDrawing || !isDrawingMode) return;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2;
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
}

function stopDrawing() {
    if (!isDrawingMode) return;
    isDrawing = false;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

toggleDrawModeButton.addEventListener('click', () => {
    isDrawingMode = !isDrawingMode;

    if (isDrawingMode) {
        toggleDrawModeButton.textContent = 'Wyłącz tryb rysowania';
        canvas.style.pointerEvents = 'auto';
        colorPicker.style.display = 'block';
        canvas.style.cursor = 'crosshair';
    } else {
        toggleDrawModeButton.textContent = 'Włącz tryb rysowania';
        canvas.style.pointerEvents = 'none';
        colorPicker.style.display = 'none';
        canvas.style.cursor = 'default';
    }
});

colorPicker.addEventListener('input', (event) => {
    currentColor = event.target.value;
});
