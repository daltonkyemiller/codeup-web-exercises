import {randomColor, randomHSL, randomIntFromInterval} from '../utils/utils.js';

const Dialog = (title, message, pos = {
    x: randomIntFromInterval(0, 75),
    y: randomIntFromInterval(0, 75)
}, button = {
    good: 'Good',
    bad: 'Bad'
}) => {
    return `
    <div class="dialogContainer" 
        style="left: ${pos.x}%; top: ${pos.y}%; background-image: linear-gradient(${randomHSL()}, ${randomHSL()} );"
    >
        <h1 class="dialogTitle">${title}</h1>
        <p class="dialogMessage">${message}</p>
        <button class="dialogButton dialogGood" onclick="dialogGoodClicked(event)">${button.good}</button>
        <button class="dialogButton dialogBad" onclick="dialogGoodClicked(event)">${button.bad}</button>
    </div>
    `;
};

export default Dialog;
