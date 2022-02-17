const readline = require('readline');

class StackMaxEffective {
    constructor() {
        this.list = [];
        this.max = [];
    }

    get getMax() {
        return this.max[this.max.length - 1]
    }

    addMax = (num) => {
        if (this.max.length === 0 || this.getMax <= num) {
            this.max.push(num);
        }
    }

    delMax = (num) => {
        if (this.max.length !== 0 && this.getMax === num) {
            this.max.pop();
        }
    }

    push = (num) => {
        const number = Number(num);
        this.list.push(number)
        this.addMax(number);
    }

    pop = () => {
        if (this.list.length === 0) return "error"
        const num = this.list.pop();
        this.delMax(num)
    }

    get_max = () => {
        if (this.getMax === undefined) return "None"
        return this.getMax;
    }
}

function getResult(methods) {
    const stack = new StackMaxEffective();
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
        // process.on('SIGINT', this.solve)
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