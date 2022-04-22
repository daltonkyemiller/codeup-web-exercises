'use strict';
(function () {
    console.log('Yay! I completed the warm-up!');
    // FizzBuzz 1
    for (let i = 1; i <= 100; i++) {
        let output = '';
        if (i % 3 === 0) output += 'Fizz';
        if (i % 5 === 0) output += 'Buzz';
        console.log(output !== '' ? output : i);
    }

}());
