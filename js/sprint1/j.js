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

function factorize(number) {
    // Ваше решение
    let divider = 2;
    let num = number;
    let rem = 1;
    const r = []

    while (rem < number) {
        if (num % divider === 0) {
            num /= divider;
            rem = rem * divider;
            r.push(divider);
            divider = 2;
        } else {
            if (divider >= number / 2) divider = number;
            else divider += divider === 2 ? 1 : 2;
        }
    }
    return r;
}

function solve() {
    const number = readInt();
    const factorization = factorize(number)
    process.stdout.write(`${factorization.join(' ')}`);
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
