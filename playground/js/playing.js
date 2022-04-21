'use strict';
import dialog from '../components/Dialog.js';
import { animate, htmlToElement, prettyString, randomColor, randomHSL } from '../utils/utils.js';

const body = document.querySelector('body');

body.innerHTML += dialog('Hello', 'How are you?');

/**
 * @param {Event} event
 */
const dialogGoodClicked = (event) => {
    let ran = 0;

    setInterval(() => {
        body.innerHTML += dialog('WHY', 'WHY? '.repeat(ran * 5), undefined, {good: 'WHY', bad: 'WHY'});
        ran++;
    }, 100);
};

const pretty = prettyString('Hello');
document.body.appendChild(pretty);
await animate(pretty, {x: '50px', y: '50px'});

const letters = pretty.querySelector('h1').children;
setInterval(async () => {
    for (let i = 0; i < letters.length; i++) {
        await animate(letters[i], {opacity: Math.random()}, {duration: 500});
    }
}, 500);

window.dialogGoodClicked = dialogGoodClicked;

