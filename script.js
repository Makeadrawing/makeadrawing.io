const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const eraserCheckbox = document.getElementById('eraser');

let isDrawing = false;
let isErasing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing && !isErasing) return;

    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = isErasing ? '#ffffff' : colorPicker.value;

    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;

    context.lineTo(mouseX, mouseY);
    context.stroke();
    context.beginPath();
    context.moveTo(mouseX, mouseY);
}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}

eraserCheckbox.addEventListener('change', function () {
    isErasing = this.checked;
});

function downloadDrawing() {
    const downloadLink = document.createElement('a');
    const image = canvas.toDataURL('image/png');
    downloadLink.href = image;
    downloadLink.download = 'drawing.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function shareDrawing() {
    alert('Sharing functionality not implemented yet.');
}

function undoDrawing() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
