'use strict';
(function () {
    // Scoping userNum outside the while loop
    let userNum;
    // Continue asking the user for an odd number between 1 and 50
    while (true) {
        userNum = parseFloat(prompt('Enter an odd number between 1 and 50'));
        if (userNum <= 50 && userNum >= 1 && !isNaN(userNum) && userNum % 2 === 1) break;
    }

    // Loop from 1 to 50 only logging odd numbers
    for (let i = 1; i <= 50; i++) {
        // If number is even, move to next iteration.
        if (i % 2 === 0) continue;

        // Else, log the number, but "skip" the user's number
        let output = ``;
        i === userNum
            ? output = `Yikes! Skipping ${i}`
            : output = `Here is an odd number: ${i}`;
        console.log(output);
    }
}());