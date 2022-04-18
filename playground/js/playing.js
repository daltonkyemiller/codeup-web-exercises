'use strict';
import dialog from '../components/Dialog.js';

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

window.dialogGoodClicked = dialogGoodClicked;

