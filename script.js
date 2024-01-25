const canvas = document.getElementById('drawing-canvas');
const context = canvas.getContext('2d');
const colorInput = document.getElementById('color');
const lineWidthInput = document.getElementById('line-width');
const downloadLink = document.getElementById('download');

let drawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!drawing) return;
    context.strokeStyle = colorInput.value;
    context.lineWidth = lineWidthInput.value;
    context.lineCap = 'round';

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    drawing = false;
}

function erase() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function openColorPicker() {
    // Ouvre le sélecteur de couleur quand le bouton est cliqué
    colorInput.click();
}

function downloadCanvas() {
    const dataURL = canvas.toDataURL('image/png');
    downloadLink.href = dataURL;
}
