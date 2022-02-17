const readline = require('readline');

function getResult(data) {
    const map = {"}": "{", ")": "(", "]": "["};
    const result = [];

    data.forEach((item) => {
        if (result.length && result[result.length - 1] === map[item]) {
            result.pop();
        } else {
            result.push(item);
        }
    })

    return result.length === 0 ? "True" : "False";
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
        // process.on('SIGINT', this.solve)
    }

    solve = () => {
        const array = this.readArray();

        process.stdout.write(this.cb(array));
    }

    readArray = () => {
        const arr = this.inputLines[this.curLine].trim(" ").split("");
        this.curLine++;
        return arr;
    }
}

new FileSystem(getResult);