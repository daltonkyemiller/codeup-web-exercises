'use strict';

const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};


const randomColor = Math.floor(Math.random() * 16777215).toString(16);

const body = document.querySelector('body');


const dialog = (title, message, pos = {x: randomIntFromInterval(0, 50), y: randomIntFromInterval(0, 50)}) => {
    return `
    <div class="dialogContainer" style="left: ${pos.x}%; top: ${pos.y}%; background-color: #${randomColor}">
        <h1 class="dialogTitle">${title}</h1>
        <p class="dialogMessage">${message}</p>
        <button class="dialogButton dialogGood" onclick="dialogGoodClicked()">Good</button>
        <button class="dialogButton dialogBad" onclick="dialogGoodClicked()">Bad</button>
    </div>
    `;
};

body.innerHTML += dialog('Hello', 'How are you?');

const dialogGoodClicked = () => {
    let ran = 0;
    setInterval(() => {
        body.innerHTML += dialog('WHY', 'WHY? '.repeat(ran));
        ran++;
    }, 100);
};