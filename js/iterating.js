(function () {
    'use strict';
    // Array of names + logging the length
    let names = ['Ashley', 'Dalton', 'Willow', 'Quinn'];
    console.log('Length:', names.length);

    // ######################### Logging Names Manually #########################
    console.group('Names');
    console.log(names[0]);
    console.log(names[1]);
    console.log(names[2]);
    console.log(names[3]);
    console.groupEnd();


    // ######################### Logging names array using a for loop #########################
    console.group('For Loop');
    for (let i = 0; i < names.length; i++) {
        console.log(names[i]);
    }
    console.groupEnd();

    // ######################### Logging names array using a foreach loop #########################
    console.group('Foreach');
    names.forEach(name => console.log(name));
    console.groupEnd();

    // ######################### Functions to log first, second and last element of an array #########################
    const first = (arr) => arr[0];
    const second = (arr) => arr[1];
    const last = (arr) => arr[arr.length - 1];

    console.group('Functions');
    console.log(`First: ${first(names)}`);
    console.log(`Second: ${second(names)}`);
    console.log(`Last: ${last(names)}`);


})();
