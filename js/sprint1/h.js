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

function sumOfBinaries(a, b) {
    // Ваше решение
    let result = ""
    let carry = 0;

    while(a || b || carry){
        let sum = +a.slice(-1) + +b.slice(-1) + carry;

        if(sum > 1) {
            result = sum % 2 + result;
            carry = 1;
        } else {
            result = sum + result;
            carry = 0;
        }

        a = a.slice(0, -1)
        b = b.slice(0, -1)
    }

    return result;
}

function solve() {
    const firstNumber = readLine();
    const secondNumber = readLine();
    process.stdout.write(`${sumOfBinaries(firstNumber, secondNumber)}`);
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

function readLine() {
    const line = _inputLines[_curLine];
    _curLine++;
    return line;
}