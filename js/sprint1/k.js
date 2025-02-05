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

function getSum(listNumber, number) {
    // Ваше решение
    return (Number(listNumber.join("")) + number).toString().split("")
}

function solve() {
    const length = readInt();
    const listNumber = readArray()
    const number = readInt();

    process.stdout.write(`${getSum(listNumber, number).join(' ')}`);
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