'use strict';
import { randomBetween } from '../playground/utils/utils.js';

(function () {
    function showMultiplicationTable(num) {
        for (let i = 1; i <= 10; i++) {
            console.log(`${num} x ${i} = ${num * i}`);
        }
    }

    showMultiplicationTable(7);

    for (let i = 0; i < 10; i++) {
        const randomNum = randomBetween(20, 200);
        let output = `${randomNum} is `;
        if (randomNum % 2 === 0)
            output += 'even';
        else
            output += 'odd';
        console.log(output);
    }
    for (let i = 1; i <= 9; i++) {
        console.log(i.toString().repeat(i));
    }

    for (let i = 100; i > 0; i -= 5) {
        console.log(i);
    }
}());






