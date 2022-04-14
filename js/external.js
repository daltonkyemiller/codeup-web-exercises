'use strict';
console.log('Hello from external JavaScript');

alert('Welcome to my website \n' +
    '⊂_ヽ\n' +
    '　 ＼＼\n' +
    '　　 ＼( ͡° ͜ʖ ͡°)\n' +
    '　　　 >　⌒ヽ\n' +
    '　　　/ 　 へ＼\n' +
    '　　 /　　/　＼＼\n' +
    '　　 ﾚ　ノ　　 ヽ_つ\n' +
    '　　/　/\n' +
    '　 /　/|\n' +
    '　(　(ヽ\n' +
    '　|　|、＼\n' +
    '　| 丿 ＼ ⌒)\n' +
    '　| |　　) /\n' +
    'ノ )　　Lﾉ\n' +
    '(_／');

let userFavColor = prompt('What\'s your favorite color?');
alert('My favorite color is also ' + userFavColor + '. We are so much alike... buy my product.');


// Movies Exercise
let littleMermaidRentalTime = parseInt(prompt('How many days did you rent The Little Mermaid?'));
let brotherBearRentalTime = parseInt(prompt('How many days did you rent Brother Bear?'));
let herculesRentalTime = parseInt(prompt('How many days did you rent Hercules'));

let priceOfRentalPerDay = parseFloat(prompt('How much(in dollars) is each rental per day?'));
let totalCost = (littleMermaidRentalTime + brotherBearRentalTime + herculesRentalTime) * priceOfRentalPerDay;

alert('The total cost of your rentals is: $' + totalCost + '.');

// Companies Exercise
let googlePay = parseFloat(prompt('How much(hourly) does Google pay?'));
let googleHoursWorked = parseFloat(prompt('How many hours did you work for Google?'));
let googleTotalPay = googlePay * googleHoursWorked;

let amazonPay = parseFloat(prompt('How much(hourly) does Amazon pay?'));
let amazonHoursWorked = parseFloat(prompt('How many hours did you work for Amazon?'));
let amazonTotalPay = amazonPay * amazonHoursWorked;

let facebookPay = parseFloat(prompt('How much(hourly) does Facebook pay?'));
let facebookHoursWorked = parseFloat(prompt('How many hours did you work for Facebook?'));
let facebookTotalPay = facebookPay * facebookHoursWorked;

let paycheck = googleTotalPay + amazonTotalPay + facebookTotalPay;

alert('Your paycheck is $' + paycheck);

// Student Exercise
let isClassFull = confirm('Click "Ok" if the class is full.');
let conflictsWithSchedule = confirm('Click "Ok" if the class conflicts with your schedule.');
let enrollable = !isClassFull && !conflictsWithSchedule;

// lil' ternary action ;)
alert(enrollable ? 'Great! You can be enrolled' : 'Sorry, you cannot be enrolled');


// Product Offer Exercise
let isPremium = confirm('Click "Ok" if you are a premium member.');
let itemsBought = parseInt(prompt('How many items did you buy?'));
let offerExpired = confirm('Click "Ok" if the offer has expired.');
let offerAvailable = (itemsBought > 2 && !offerExpired) || isPremium;


alert(offerAvailable ? 'Awesome! You can use use the offer.' : 'Sorry, you can\'t use the offer');
