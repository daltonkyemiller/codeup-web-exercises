import { Particle } from './Particle.js';

let particles = [];

function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(0, 100);
    // blendMode(SCREEN);

    for (let i = 0; i < particles.length; i++) {

        stroke(255, 25);
        strokeWeight(15);

        line(particles[i].x, particles[i].y, particles[(i + 1) % particles.length].x, particles[(i + 1) % particles.length].y);
        particles[i].update();
        fill(255, 100);
        particles[i].show();

    }

}

function mousePressed() {
}

function mouseDragged() {
    particles.push(new Particle(mouseX, mouseY));

}

window.mouseDragged = mouseDragged;
window.mousePressed = mousePressed;
window.setup = setup;
window.draw = draw;



