const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const toggleDrawModeButton = document.getElementById('toggleDrawMode');
const colorPicker = document.getElementById('colorPicker');

let isDrawingMode = false; // Domyślnie tryb rysowania jest wyłączony
let isDrawing = false;
let currentColor = '#000000'; // Domyślny kolor czarny

// Dopasowanie rozmiaru canvas do okna przeglądarki
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Funkcje rysowania
function startDrawing(event) {
    if (!isDrawingMode) return; // Rysowanie działa tylko w trybie rysowania
    isDrawing = true;
    ctx.beginPath();
}

function draw(event) {
    if (!isDrawing || !isDrawingMode) return;

    ctx.strokeStyle = currentColor; // Ustaw aktualny kolor
    ctx.lineWidth = 2; // Grubość linii
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
}

function stopDrawing() {
    if (!isDrawingMode) return;
    isDrawing = false;
}

// Obsługa zdarzeń myszy
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Przełączanie trybu rysowania
toggleDrawModeButton.addEventListener('click', () => {
    isDrawingMode = !isDrawingMode;

    if (isDrawingMode) {
        toggleDrawModeButton.textContent = 'Wyłącz tryb rysowania';
        canvas.style.pointerEvents = 'auto';
        colorPicker.style.display = 'block'; // Pokaż okno wyboru koloru
        canvas.style.cursor = 'crosshair';
    } else {
        toggleDrawModeButton.textContent = 'Włącz tryb rysowania';
        canvas.style.pointerEvents = 'none';
        colorPicker.style.display = 'none'; // Ukryj okno wyboru koloru
        canvas.style.cursor = 'default';
    }
});

// Zmiana koloru rysowania
colorPicker.addEventListener('input', (event) => {
    currentColor = event.target.value; // Zapisz wybrany kolor
});
