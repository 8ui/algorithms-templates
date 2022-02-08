const readline = require('readline');

class MyQueueSized {
    constructor() {
        this.queue = null
        this.tail = null; // конец очереди
        this.queueSize = 0; // длина очереди
    }

    get isEmpty() {
        return this.queueSize === 0
    }

    size = () => {
        return this.queueSize;
    }

    put = (num) => {
        const tail = { value: Number(num), next: null }
        if (this.tail) {
            this.tail.next = tail
        } else {
            this.queue = tail;
        }
        this.tail = tail;
        this.queueSize += 1;
    }

    get = () => {
        if (this.isEmpty) return "error"
        const el = this.queue.value;
        this.queue = this.queue.next;
        this.queueSize -= 1;
        if (!this.queueSize) this.tail = null;
        return el;
    }
}

function getResult(methods) {
    const stack = new MyQueueSized();
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