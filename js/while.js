'use strict';
// import { randomBetween } from '../playground/utils/utils.js';
(() => {
    const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    // Start iterator at two and multiply itself by two until reaching 65536
    let i = 2;
    while (i <= 65536) {
        console.log(i);
        i *= 2;
    }

    // Use randomBetween function to generate a number between 50 and 100
    let allCones = randomBetween(50, 100);
    let conesBought = 0;
    do {
        // Use randomBetween function to generate a number between 1 and 5
        conesBought = randomBetween(1, 5);
        // If the cones bought is too high for current inventory, log a message and move to next iteration.
        if ((allCones - conesBought) < 0) {
            console.log(`Cannot sell you ${conesBought}, I only have ${allCones}`);
            continue;
        }
        // Else, subtract the cones bought from the total cones and log a message
        allCones -= conesBought;
        console.log(`Sold ${conesBought} cone(s)...${allCones} left`);
    } while (allCones > 0);

})();