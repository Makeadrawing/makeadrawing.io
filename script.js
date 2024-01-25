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

// Événements tactiles
canvas.addEventListener('touchstart', startDrawingTouch);
canvas.addEventListener('touchmove', drawTouch);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!drawing) return;
    drawLine(lastX, lastY, e.offsetX, e.offsetY);
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function startDrawingTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    [lastX, lastY] = [touch.clientX, touch.clientY];
    drawing = true;
}

function drawTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    drawLine(lastX, lastY, touch.clientX, touch.clientY);
    [lastX, lastY] = [touch.clientX, touch.clientY];
}

function stopDrawing() {
    drawing = false;
}

function drawLine(startX, startY, endX, endY) {
    context.strokeStyle = colorInput.value;
    context.lineWidth = lineWidthInput.value;
    context.lineCap = 'round';

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
}

function erase() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function openColorPicker() {
    colorInput.click();
}

function downloadCanvas() {
    const dataURL = canvas.toDataURL('image/png');
    downloadLink.href = dataURL;
}
