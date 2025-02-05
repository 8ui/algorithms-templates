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

function isPalindrome(line) {
    // Ваше решение
    const l = line.replace(/[^A-z]/g, "").toLowerCase();
    let action = true;

    for (let i = 0; i <= l.length / 2 + 0.5; i++) {
        if (l.length - 1 - i > l.length / 2) continue;
        if (l[i] !== l[l.length - 1 - i]) action = false;
    }
    return action;
}

function solve() {
    const line = readLine();
    if (isPalindrome(line)) {
        console.log("True")
    } else {
        console.log("False")
    }
}


function readLine() {
    const line = _inputLines[_curLine];
    _curLine++;
    return line;
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