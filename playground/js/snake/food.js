'use strict';
import { htmlToElement, randomBetween } from '../../utils/utils.js';
import { grid, gridSize } from './snake.js';

const prefab = htmlToElement(`<div class="block food"></div>`);
export let food = prefab;

export let position = {x: 0, y: 0};

export function render() {
    let instance = prefab.cloneNode(true);
    instance.style.gridRowStart = '' + position.y;
    instance.style.gridColumnStart = '' + position.x;
    grid.appendChild(instance);
}

export function update() {

}

export function spawn() {
    position = {x: randomBetween(1, gridSize.x), y: randomBetween(1, gridSize.y)};
    console.log(position);
}

export function kill() {
    food.remove();
}

