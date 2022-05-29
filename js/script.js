// DOM manipulation
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.translate(canvas.width / 2, canvas.height / 2); // make a new Origin reference
ctx.moveTo(canvas.width / 2, canvas.height / 2); // move to new Origin

// stars for the starfield
const stars = [];

//functions
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min, max) => {
    return Math.random() * (max - min + 1) + min;
};

const getRandomColor = () => {};

// class star for making dots in the screen
class Star {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.z = 1800; // just the iluttion of 3D (2d project) from x to a new value
        this.radius = radius;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.z = this.z - 1;
        if (this.z <= 0) {
            this.z = 1800;
        }
        let newX = this.x / this.z;
        let newY = this.y / this.z;
        ctx.beginPath();
        ctx.arc(newX, newY, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const init = () => {
    for (let index = 0; index < 200; index++) {
        stars.push(
            new Star(
                getRandomFloat(-canvas.width, canvas.width),
                getRandomFloat(-canvas.height, canvas.height),
                getRandomInt(2, 6),
                "#000"
            )
        );
    }
};

// recursive function for render the animation
const animate = () => {
    requestAnimationFrame(animate);
    stars.forEach((star) => {
        star.update();
    });
};

init();
animate();
