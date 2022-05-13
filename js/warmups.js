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

    // ############################## Warmup 04/28 ############################## //
    function alphabetize(str) {
        return str.split('').sort().join('');
    }

    console.group('04/28');
    console.log(alphabetize('codeup'));
    console.groupEnd();


    // ############################## Warmup 05/02 ############################## //
    function sumOfElements(arr) {
        let total = 0;
        arr.forEach(num => {
            let parsedNum = parseFloat(num);
            if (isNaN(parsedNum)) return console.warn(num + ' is NaN and cannot be coerced into a number...skipping');
            total += parsedNum;
        });

        return total;
    }

    console.group('05/02');
    console.log('Total is: ' + sumOfElements([1, 2, 'abc', 3, '4', 5]));
    console.groupEnd();

    // ############################## Warmup 05/03 ############################## //
    function returnProductEssentialDetails(obj) {
        return { name: obj.name, priceInCents: obj.priceInCents };
    }

    let product1 = {
        name: 'Hammer',
        priceInCents: 400,
        description: 'It is a hammer.',
        inventory: 25034
    };
    let product2 = {
        name: 'Computer',
        priceInCents: 40000,
        description: 'It is a computer.',
        inventory: 33000
    };

    let product3 = {
        name: 'Ruler',
        priceInCents: 1000,
        description: 'It is a ruler.',
        inventory: 2200
    };
    console.group('05/03');
    console.log(returnProductEssentialDetails(product1));

    // ############################## Warmup 05/03 BONUS ############################## //

    function returnAllProductsEssentialDetails(arrOfObjs) {
        return arrOfObjs.map(obj => returnProductEssentialDetails(obj));
    }

    console.log(returnAllProductsEssentialDetails([product1, product2, product3]));
    console.groupEnd();

    // ############################## Warmup 05/09 ############################## //
    const hamsters = [
        {
            name: 'Hamtaro',
            heightInMM: 86,
            fur: ['orange', 'white'],
            gender: 'male',
            dateOfBirth: 'August 6'
        }, {
            name: 'Bijou',
            heightInMM: 75,
            fur: ['white'],
            gender: 'female',
            dateOfBirth: 'July 10'
        }, {
            name: 'Oxnard',
            heightInMM: 100,
            fur: ['grey', 'white'],
            gender: 'male',
            dateOfBirth: 'May 3'
        }, {
            name: 'Boss',
            heightInMM: 120,
            fur: ['brown', 'white'],
            gender: 'male',
            dateOfBirth: 'Spetember 21'
        }, {
            name: 'Snoozer',
            heightInMM: 85,
            fur: ['brown', 'white', 'pink'],
            gender: 'male',
            dateOfBirth: 'January 14'
        }
    ];

    function getTallestHamster(arr) {
        return arr.reduce((acc, current) => acc.heightInMM > current.heightInMM ? acc : current);
    }

    console.group('05/09');
    console.log(getTallestHamster(hamsters));
    console.groupEnd();

    // ############################## Warmup 05/10 ############################## //
    function getMostColorfulHamster(arr) {
        return arr.reduce((acc, curr) => acc.fur.length > curr.fur.length ? acc : curr);
    }

    console.group('05/10');
    console.log(getMostColorfulHamster(hamsters));
    console.groupEnd();

    // ############################## Warmup 05/11 ############################## //
    function makeObjectFromString(str) {

        return {
            string: str,
            size: str.length,
            containsLettersFromRSTLNE: ['r', 's', 't', 'l', 'n', 'e'].some((letter) => str.toLowerCase().includes(letter)),
            isOneWord: str.split(' ').length <= 1
        };
    }

    console.group('05/11');
    console.log(makeObjectFromString('tacocat'));
    console.log(makeObjectFromString('John Jacob'));
    console.groupEnd();


}());
