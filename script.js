const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const eraserCheckbox = document.getElementById('eraser');
const undoButton = document.getElementById('undo');
const brushSizeSelect = document.getElementById('brushSize');

let isDrawing = false;
let isErasing = false;
let drawingMoves = [];  // Tableau pour stocker les mouvements

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
    if (drawingMoves.length > 0) {
        // Retirer le dernier mouvement
        drawingMoves.pop();

        // Effacer le canevas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Redessiner en utilisant les mouvements restants
        for (const moves of drawingMoves) {
            if (moves.length > 0) {
                context.beginPath();
                context.moveTo(moves[0].x, moves[0].y);
                for (const move of moves) {
                    context.lineTo(move.x, move.y);
                }
                context.stroke();
            }
        }
    }
}
