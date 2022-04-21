'use strict';
import { htmlToElement, randomBetween } from '../../utils/utils.js';
import { position as foodPos, render as renderFood, spawn as spawnFood } from './food.js';


export const gridSize = {x: 21, y: 21};
const scoreElement = document.querySelector('#score');
let snakeParts = [{x: 3, y: 3}];
let snakeSpeed = 10;
let renderTime = 0;
let move = {x: 0, y: 0};
let prevMove = {x: 0, y: 0};
let gameOver = false;

export const grid = htmlToElement(`<div id="grid"></div>`);
grid.style.gridTemplateRows = `repeat(${gridSize.y}, 1fr)`;
grid.style.gridTemplateColumns = `repeat(${gridSize.x}, 1fr)`;

let snakeElement = htmlToElement(`<div class="block"></div>`);


document.body.appendChild(grid);
spawnFood(10, 10);

function handleInput(e) {
    switch (e.code) {
        case 'ArrowLeft':
            if (prevMove.x !== 0) break;
            move = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (prevMove.x !== 0) break;
            move = {x: 1, y: 0};
            break;
        case 'ArrowUp':
            if (prevMove.y !== 0) break;
            move = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (prevMove.y !== 0) break;
            move = {x: 0, y: 1};
            break;

    }
}


function eatFood() {
    console.log(scoreElement);
    spawnFood();
    for (let i = 0; i < 5; i++) {
        snakeParts.push({});
    }
    scoreElement.innerText = 'Score: ' + (snakeParts.length + 1);

}


function frame(time) {
    if (gameOver) {
        alert('You lost!');
        window.location.reload();
        return;
    }
    window.requestAnimationFrame(frame);

    const timeSinceLastRender = (time - renderTime) / 1000;
    if (timeSinceLastRender < 1 / snakeSpeed) return;


    update();
    render();
    renderFood();
    renderTime = time;
}

function update() {
    if (
        snakeParts[0].x === gridSize.x + 1
        || snakeParts[0].x === 0
        || snakeParts[0].y === gridSize.y + 1
        || snakeParts[0].y === 0
        || snakeParts.filter((part) => part.x === snakeParts[0].x && part.y === snakeParts[0].y).length > 1
    ) {
        gameOver = true;
    }
    if (snakeParts[0].x === foodPos.x && snakeParts[0].y === foodPos.y) {
        eatFood();
    }
    for (let i = snakeParts.length - 2; i >= 0; i--) {
        snakeParts[i + 1] = {...snakeParts[i]};
    }
    snakeParts[0].x += prevMove.x;
    snakeParts[0].y += prevMove.y;
    prevMove = move;

}


function render() {
    grid.innerHTML = '';

    snakeParts.forEach((part, idx) => {
        const instance = snakeElement.cloneNode(true);
        if (idx === 0)
            instance.classList.add('head');
        else
            instance.classList.add('body');
        instance.style.gridColumnStart = part.x;
        instance.style.gridRowStart = part.y;
        grid.appendChild(instance);

    });
}

window.requestAnimationFrame(frame);

window.addEventListener('keydown', handleInput);
