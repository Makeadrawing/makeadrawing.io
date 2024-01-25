const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('color');

let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;

    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = colorPicker.value;

    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}

function downloadDrawing() {
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    window.location.href = image;
}

function shareDrawing() {
    // Implement sharing functionality (e.g., upload to a server or share a link)
    alert('Sharing functionality not implemented yet.');
}
