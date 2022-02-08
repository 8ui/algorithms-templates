const readline = require('readline');

// ID посылки
// 64915586
function getDistance(array) {
    // Принцип работы
    // Мы одновременно идём в двух направлениях слева направо и справа налево
    // Начинаем заполнять координаты только после втречи с нулём
    // Как только мы встречаем число меньше нашей координаты останавливаемся и ждем встречи со следующим нулём
    //
    //         0         0         0
    // [-------|---------|---------|------]
    //  *-->                          <--*
    //
    //         0         0         0
    // [-------|1234-----|-----4321|------]
    //             *-->     <--*
    //
    //         0         0         0
    // [-------|123456321|123654321|------]
    //             <--*     *-->
    //
    //         0         0         0
    // [----321|123454321|123454321|123---]
    //   <--*                         *-->

    // Массив с результатом
    const result = [];
    // Массив с предыдущими позициями нулей относительно текущией метки
    // всего два элемента
    // prev[0] - предыдущая позиция нуля в направлении слева направо
    // prev[1] - предыдущая позиция нуля в направлении справа налево
    const prev = [];

    for (let i = 0; i < array.length; i += 1) {
        // Число 2 - это количество направлений меток
        // Сначала проходим слева направо, потом справа налево
        for (let j = 0; j < 2; j += 1) {
            // Определяем индекс метки
            // Если слева направо то он равен i
            // Если справа налево то он равен длине массива - 1 - i
            const pos = j === 0 ? i : array.length - 1 - i;

            if (array[pos] === 0) {
                result[pos] = 0;
                prev[j] = pos;
            }
            // Если записана предыдущая позиция нуля
            else if (prev[j] !== undefined) {
                // Дистанция от нуля
                const dist = Math.abs(pos - prev[j]);

                // Число дб больше нашей координаты
                if (result[pos] === undefined || result[pos] > dist) {
                    result[pos] = dist;
                }
            }
        }
    }

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
        // process.on('SIGINT', this.solve);
    }

    solve = () => {
        this.curLine++;
        const array = this.readArray();
        const distances = this.cb(array)

        process.stdout.write(`${distances.join(" ")}`);
    }

    readArray = () => {
        const arr = this.inputLines[this.curLine].trim(" ").split(" ").map(n => Number(n));
        this.curLine++;
        return arr;
    }
}

new FileSystem(getDistance);
