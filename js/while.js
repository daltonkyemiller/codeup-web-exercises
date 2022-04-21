'use strict';
import { randomBetween } from '../playground/utils/utils.js';

(function () {
    let i = 2;
    while (i <= 65536) {
        console.log(i);
        i *= 2;
    }

    // This is how you get a random number between 50 and 100
    let allCones = randomBetween(50, 100);
    let conesBought = 0;
    do {
        conesBought = randomBetween(1, 5);
        if (allCones - conesBought < 0) {
            console.log(`Cannot sell you ${conesBought}, I only have ${allCones}`);
            continue;
        }
        allCones -= conesBought;
        console.log(`Sold ${conesBought} cones...${allCones} left`);
    } while (allCones > 0);
}());