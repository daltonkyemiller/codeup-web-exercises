export class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.history = [];
        this.xNoise = map(noise(this.x), 0, 1, -1, 1);
        this.yNoise = map(noise(this.y), 0, 1, -1, 1);
    }

    update() {
        this.x = (this.x + this.xNoise);
        this.y = (this.y + this.yNoise);


        let v = createVector(this.x, this.y);

        this.history.push(v);
        console.log(this.history);

        if (this.history.length > 100) {
            this.history.splice(0, 1);
        }
    }

    show() {
        noStroke();
        ellipse(this.x, this.y, 10, 10);
    }
}
