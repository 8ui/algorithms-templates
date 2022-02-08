const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

function getIndex(matrix, x, y) {
    if (matrix[x]) return matrix[x][y]
    return undefined;
}

function getNeighbours(matrix, row, col) {
    const r = []
    // top
    if (getIndex(matrix, row - 1, col) !== undefined) r.push(matrix[row - 1][col])
    // left
    if (matrix[row][col - 1] !== undefined) r.push(matrix[row][col - 1])
    // right
    if (matrix[row][col + 1] !== undefined) r.push(matrix[row][col + 1])
    // bottom
    if (getIndex(matrix, row + 1, col) !== undefined) r.push(matrix[row + 1][col])
    return r.sort((a, b) => a > b ? 1 : (a === b ? 0 : -1));
}

function solve() {
    const rows = readInt();
    const cols = readInt();
    const matrix = readMatrix(rows);
    const rowId = readInt();
    const colId = readInt();
    
    process.stdout.write(`${getNeighbours(matrix, rowId, colId).join(' ')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}

function readMatrix(rowsCount) {
    var arr = [];
    for (let i = 0; i !== rowsCount; i++) {
        arr.push(readArray())
    }
    return arr;
}
