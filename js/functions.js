'use strict';
(function () {
    /**
     * @param {string} name a name.
     * @returns {string}
     */
    function sayHello(name) {
        return 'Hello, ' + name;
    }

// Testing the sayHello function with string literal
    let helloMessage = sayHello('Dalton');
    console.log(helloMessage);

// Testing the sayHello function with a variable
    let myName = 'Dalton';
    console.log(sayHello(myName));

    let number = 1;
    console.log(number === 2);

// Don't modify the following line, it generates a random number between 1 and 3
// and stores it in a variable named random
    let random = Math.floor((Math.random() * 3) + 1);

    /**
     * @isTwo
     * Determines if a number is equal to '2'
     * @param {number} number the number
     * @returns {boolean}
     */
    function isTwo(number) {
        return number === 2;
    }

    console.log(isTwo(random));

    /**
     * Calculates a tip amount based on a tip percentage as a decimal and a bill total
     * @param tipPercentageAsDecimal the tip percentage as a decimal value
     * @param billTotal the total of the bill
     * @returns {number} the final tip dollar amount
     */
    function calculateTip(tipPercentageAsDecimal, billTotal) {
        return billTotal * tipPercentageAsDecimal;
    }

// Testing the calculateTip function
    console.log(calculateTip(.20, 20));

// Using the calculateTip function with user values
    let billTotal = parseFloat(prompt('What is the total of the bill?'));
    let tipPercentage = parseFloat(prompt('What is the % as a decimal (ex. 15% is .15)?'));
    let tip = calculateTip(tipPercentage, billTotal);
    alert('To tip ' + (tipPercentage * 100) + '% on a $' + billTotal + ' bill, you would tip $' + tip);


    /**
     * @param {number} price the initial price
     * @param discountPercentageAsDecimal the percentage discount as a decimal value
     * @returns {number} price with discount applied
     */
    function applyDiscount(price, discountPercentageAsDecimal) {
        return price - (price * discountPercentageAsDecimal);
    }


// Using the applyDiscount function with user input
    let originalPrice = parseFloat(prompt('What is the price of the item?'));
    let discount = parseFloat(prompt('What is the discount as a decimal (ex. 10% is .10)?'));
    let finalPrice = applyDiscount(originalPrice, discount);
    alert(finalPrice);
}());