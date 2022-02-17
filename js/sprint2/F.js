const readline = require('readline');

class StackMax {
    constructor() {
        this.list = [];
    }

    push = (num) => {
        this.list.push(Number(num))
    }

    pop = () => {
        if (this.list.length === 0) return "error"
        this.list.pop();
    }

    get_max = () => {
        if (this.list.length === 0) return "None"
        return Math.max(...this.list)
    }
}

function getResult(methods) {
    const stack = new StackMax();
    const result = [];

    methods.forEach(([method, param]) => {
        if (typeof stack[method] === "function") {
            const res = stack[method](param)
            if (res !== undefined) result.push(res);
        }
    })

    return result;
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
    }

    solve = () => {
        const length = this.readInt();
        const matrix = this.readMatrix(length);

        process.stdout.write(`${this.cb(matrix).join("\n")}`);
    }

    readInt = () => {
        const n = Number(this.inputLines[this.curLine]);
        this.curLine++;
        return n;
    }

    readArray = () => {
        const arr = this.inputLines[this.curLine].trim(" ").split(" ");
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

new FileSystem(getResult);