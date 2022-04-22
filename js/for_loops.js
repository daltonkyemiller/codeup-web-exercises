'use strict';
// import { randomBetween } from '../playground/utils/utils.js';
(() => {
    const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    // Function that logs the multiplication table from 1 to 10 for a given input
    function showMultiplicationTable(num) {
        for (let i = 1; i <= 10; i++) {
            console.log(`${num} x ${i} = ${num * i}`);
        }
    }

    showMultiplicationTable(7);

    // Loop to generate 10 random numbers and determine if they are even or odd
    for (let i = 0; i < 10; i++) {
        const randomNum = randomBetween(20, 200);
        let output = `${randomNum} is `;
        if (randomNum % 2 === 0)
            output += 'even';
        else
            output += 'odd';
        console.log(output);
    }

    // Logging number pyramid from 1 to 9
    for (let i = 1; i <= 9; i++) {
        console.log(i.toString().repeat(i));
    }

    // Logging output of a number minus 5 starting from 100
    for (let i = 100; i > 0; i -= 5) {
        console.log(i);
    }
    
})();






