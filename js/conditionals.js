'use strict';
(function () {
    const normalizeString = (str) => str.toLowerCase().trim().replace(/[^a-zA-Z ]/g, '');

    // analyzeColor function using if-else

    /*
     function analyzeColor(color) {
         let normalizedColor = normalizeString(color);
         if (normalizedColor === 'red') {
             return 'Correct. You passed the test.';
         } else if (normalizedColor === 'blue') {
             return 'Like the ocean...';
         } else if (normalizedColor === 'orange') {
             return 'Like oranges...';
         } else {
             return normalizedColor.charAt(0).toUpperCase() + color.slice(1) + ' is cool, I guess. It\'s no red though.';
         }
     }
    */

    console.log(analyzeColor('red'));
    console.log(analyzeColor('orange'));
    console.log(analyzeColor('blue'));
    console.log(analyzeColor('violet'));


    // Don't change the next two lines!
    // These lines create two variables for you:
    // - `colors`: a list of the colors of the rainbow
    // - `randomColor`: contains a single random color value from the list (this
    //                  will contain a different color every time the page loads)
    let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Testing analyzeColor function with a random color
    console.log(analyzeColor(randomColor));


    // Refactored analyzeColor function using switch-case
    function analyzeColor(color) {
        let normalizedColor = normalizeString(color);
        switch (normalizedColor) {
            case 'red':
                return 'Correct. You passed the test.';
            case 'blue':
                return 'Like the ocean...';
            case 'orange':
                return 'Like oranges..';
            default:
                return normalizedColor.charAt(0).toUpperCase() + color.slice(1) + ' is cool, I guess. It\'s no red though.';
        }
    }

    // Asking user their favorite color then analyzing the color.
    const preferredColor = prompt('What\'s your favorite color?');
    alert(analyzeColor(preferredColor));

    /**
     * @param {number} luckyNumber
     * @param {number} total
     * @returns {number}
     */

    function calculateTotal(luckyNumber, total) {
        switch (luckyNumber) {
            case 1:
                return total - (total * .1);
            case 2:
                return total - (total * .25);
            case 3:
                return total - (total * .35);
            case 4:
                return total - (total * .50);
            case 5:
                return 0;
            default:
                return total;
        }
    }

    console.log(calculateTotal(0, 100));
    console.log(calculateTotal(1, 100));
    console.log(calculateTotal(2, 100));
    console.log(calculateTotal(3, 100));
    console.log(calculateTotal(4, 100));
    console.log(calculateTotal(5, 100));


    // Generate a random number between 0 and 6
    let luckyNumber = Math.floor(Math.random() * 6);

    // Prompt for total, then apply discount based on lucky number
    let total = parseFloat(prompt('What is your total').replace('$', ''));
    let totalWDiscount = calculateTotal(luckyNumber, total);
    alert('You get a discount of ' + (total - totalWDiscount) / total * 100 + '%. Your new total is: $' + totalWDiscount);

    /**
     * Evaluates number and alerts assessments
     * @param {number} num - number to evaluate
     */
    function numberEval(num) {
        // If input is NOT a number, return with a message.
        if (typeof num !== 'number' || isNaN(num)) return alert('"' + num + '"' + ' is not a number.');

        // Alert the user of their number + 100
        alert(num + ' + 100 = ' + (num + 100));

        // Alert the user on whether their num is even or odd
        if (num % 2 === 0) {
            alert(num + ' is even!');
        } else {
            alert(num + ' is odd!');
        }

        // Alert the user on whether their number is positive or negative
        if (num < 0) {
            alert('You have a negative number');
        } else if (num > 0) {
            alert('You have a positive number');
        } else {
            alert(num + ' is neither negative nor positive.');
        }

    }

    // Ask the user if they want to enter a number
    let wantsToEnterNum = confirm('Would you like to enter a number?');

    // If they do, prompt them and evaluate their number using the numberEval function
    if (wantsToEnterNum) {
        let numberEntered = parseFloat(prompt('Okay...What is the number?'));
        numberEval(numberEntered);
    }

}());