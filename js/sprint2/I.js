const readline = require('readline');

class MyQueueSized {
    constructor(size) {
        this.queue = Array(size);
        this.maxSize = size; // максимальный размер
        this.head = 0; // голова очереди
        this.tail = 0; // конец очереди
        this.queueSize = 0; // длина очереди

    }

    get isEmpty() {
        return this.queueSize === 0
    }

    size = () => {
        return this.queueSize;
    }

    peek = () => {
        if (this.isEmpty) return "None"
        return this.queue[this.head];
    }

    push = (num) => {
        if (this.maxSize === this.queueSize) return "error";
        this.queue[this.tail] = Number(num)
        this.tail = (this.tail + 1) % this.maxSize;
        this.queueSize += 1;
    }

    pop = () => {
        if (this.isEmpty) return "None"
        const el = this.queue[this.head];
        this.queue[this.head] = undefined;
        this.head = (this.head + 1) % this.maxSize;
        this.queueSize -= 1;
        return el;
    }
}

function getResult(size, methods) {
    const stack = new MyQueueSized(size);
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
        const size = this.readInt();
        const matrix = this.readMatrix(length);

        process.stdout.write(`${this.cb(size, matrix).join("\n")}`);
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