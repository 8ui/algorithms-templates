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

function getWeatherRandomness(temperatures) {
    // Ваше решение
    let count = 0;
    for (let i = 0; i < temperatures.length; i += 1) {
        const left = temperatures[i - 1];
        const center = temperatures[i]
        const right = temperatures[i + 1];
        if (left === undefined && right === undefined) {
            count += 1;
            continue;
        }
        if (left === undefined && right < center) {
            count += 1;
            continue;
        }
        if (right === undefined && left < center) {
            count += 1;
            continue;
        }
        if (left < center && center > right) {
            count += 1;
        }
    }
    return count;
}

function solve() {
    const n = readInt();
    const temperatures = readArray();
    process.stdout.write(`${getWeatherRandomness(temperatures)}`);
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
