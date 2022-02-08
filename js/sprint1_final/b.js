const readline = require('readline');

// ID посылки
// 64913877
function getScore(k, array) {
    const players = 2;
    const maxKeyValue = k * players; // количество нажатых клавиш

    let score = 0;

    // Сохраняем повторения
    // ключ - число из массива, значение - кол-во вхождений
    // прим. {'1': 4, '2': 1}
    const keysRepetitions = {};
    array.forEach((item) => {
        if (item !== ".") {
            if (keysRepetitions[item] === undefined) keysRepetitions[item] = 0;
            keysRepetitions[item] += 1;
        }
    })

    // Если пройтись по объекту с вхождениями получается 0...9 итераций
    // 0 если все элементы в матрице будут "."
    // Решение с объектом вхождений 16 + 0...9 итеараций
    Object.keys(keysRepetitions).forEach(key => {
        const count = keysRepetitions[key];
        if (0 < count && count <= maxKeyValue) score += 1;
    })

    // Решение с time 16 + 9 итераций
    // const time = 9;
    // for (let i = 1; i <= time; i += 1) {
    //     const count = keysRepetitions[i];
    //     if (0 < count && count <= maxKeyValue) score += 1;
    // }

    return score;
}

class FileSystem {
    constructor(cb) {
        this.curLine = 0;
        this.inputLines = [];
        this.cb = cb;

        this.reader = readline.createInterface({
            input: process.stdin
        });

        this.reader.on('line', line => {
            this.inputLines.push(line);
        });

        process.stdin.on('end', this.solve)
        // process.on('SIGINT', this.solve);
    }

    solve = () => {
        const k = this.readInt();
        const array = this.readMatrix(4).flat();

        process.stdout.write(`${this.cb(k, array)}`)
    }

    readInt = () => {
        const n = Number(this.inputLines[this.curLine]);
        this.curLine++;
        return n;
    }

    readArray = () => {
        const arr = this.inputLines[this.curLine].trim(" ").split("");
        this.curLine++;
        return arr;
    }

    readMatrix = (rowsCount) => {
        const arr = [];
        for (let i = 0; i !== rowsCount; i++) {
            arr.push(this.readArray())
        }
        return arr;
    }
}

new FileSystem(getScore);
