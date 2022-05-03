import { htmlToElement } from '../playground/utils/utils.js';

const main = document.querySelector('#with-js');


const box = ({ width, height, color } = {}) => {

    //language=HTML
    return htmlToElement(`
        <div class="box js-box"
             style="${width ? `width: ${width};` : ''} ${height ? `width: ${height};` : ''} ${color ? `background-color: ${color};` : ''}"></div>
    `);
};

let greenSect = document.createElement('section');
greenSect.style.backgroundColor = 'lightgreen';
main.appendChild(greenSect);
for (let i = 0; i < 4; i++) {
    let boxEl = box();
    boxEl.classList.add('green-box');
    if (i === 3) boxEl.style.alignSelf = 'flex-start';
    greenSect.appendChild(boxEl);
}
