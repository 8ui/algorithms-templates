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

function isPowerOfFour(number) {
    // Ваше решение
    while (number > 1) {
        number /= 4
        if (number % 1 > 0) return false;
    }
    return true;
}

function solve() {
    const number = readInt();
    if (isPowerOfFour(number)) {
        console.log("True");
    } else {
        console.log("False");
    }
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