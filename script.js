const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const eraserCheckbox = document.getElementById('eraser');
const undoButton = document.getElementById('undo');
const brushSizeSelect = document.getElementById('brushSize');

let isDrawing = false;
let isErasing = false;
let drawingMoves = [];  // Tableau pour stocker les mouvements
let paths = []; // Tableau pour stocker les trajectoires individuelles

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);

    // Commencer un nouveau mouvement
    drawingMoves.push([]);
}

function draw(e) {
    if (!isDrawing && !isErasing) return;

    context.lineWidth = parseInt(brushSizeSelect.value, 10);
    context.lineCap = 'round';
    context.strokeStyle = isErasing ? '#ffffff' : colorPicker.value;

    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;

    context.lineTo(mouseX, mouseY);
    context.stroke();
    context.beginPath();
    context.moveTo(mouseX, mouseY);

    // Ajouter le point au mouvement actuel
    drawingMoves[drawingMoves.length - 1].push({ x: mouseX, y: mouseY });
}

function stopDrawing() {
    isDrawing = false;
    paths.push([...drawingMoves[drawingMoves.length - 1]]);
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

undoButton.addEventListener('click', undoDrawing);

function undoDrawing() {
    if (paths.length > 0) {
        paths.pop();
        context.clearRect(0, 0, canvas.width, canvas.height);
        redrawAllPaths();
    }
}

function redrawAllPaths() {
    for (const path of paths) {
        if (path.length > 0) {
            context.beginPath();
            context.moveTo(path[0].x, path[0].y);
            for (const point of path) {
                context.lineTo(point.x, point.y);
            }
            context.stroke();
        }
    }
}
