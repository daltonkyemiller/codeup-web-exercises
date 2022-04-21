'use strict';
(function () {
    let userNum;
    while (true) {
        userNum = parseFloat(prompt('Enter an odd number between 1 and 50'));
        if (userNum < 50 && userNum > 0 && !isNaN(userNum) && userNum % 2 === 1) break;
    }
    for (let i = 1; i <= 50; i++) {
        if (i % 2 === 0) continue;
        let output = ``;
        i === userNum
            ? output = `Yikes! Skipping ${i}`
            : output = `Here is an odd number: ${i}`;
        console.log(output);
    }
}());