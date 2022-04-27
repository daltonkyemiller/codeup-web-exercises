'use strict';
(function () {
    // ############################## Warmup 1 ############################## //
    console.group('Warmup #1');
    console.log('Yay! I completed the warm-up!');
    console.groupEnd();

    console.group('Fizzbuzz');
    // ############################## FizzBuzz Warmup ############################## //
    for (let i = 1; i <= 100; i++) {
        let output = '';
        if (i % 3 === 0) output += 'Fizz';
        if (i % 5 === 0) output += 'Buzz';
        console.log(output !== '' ? output : i);
    }
    console.groupEnd();


    // ############################## Warmup 04/27 ############################## //
    function allFirstLetters(arrOfStr) {
        // return arrOfStr.map(str => str[0]).join('');
        let firstLets = '';
        arrOfStr.forEach(str => firstLets += str[0]);
        return firstLets;
    }

    console.group('All First Letters');
    let arr = ['some', 'string', 'another', 'tring', 'dalton', 'miller'];
    console.log(`Starting Array: ${arr}`);
    console.log(`Result: ${allFirstLetters(arr)}`);
    console.groupEnd();

}());
