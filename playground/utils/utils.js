// Generates random integer between min and max
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Generates random hex color
const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

// Generate random HSL with high saturation and brightness (random pastel color)
const randomHSL = () => `hsla(${~~(360 * Math.random())},90%,75%,1)`;

export { randomIntFromInterval, randomColor, randomHSL };