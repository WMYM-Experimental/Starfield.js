// DOM manipulation
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.translate(canvas.width / 2, canvas.height / 2); // make a new Origin reference
ctx.moveTo(0, 0); // move to new Origin

// stars for the starfield
const stars = [];
let newX;
let newY;

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
        this.z = 100; // just the iluttion of 3D (2d project) from x to a new value
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
        // Project star only viewport
        this.z /= 2;
        if (this.z < 1) {
            newX = this.x;
            newY = this.y;
            this.z = 100;
        } else {
            newX = this.x / this.z;
            newY = this.y / this.z;
        }
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
                "#fff"
            )
        );
    }
};

// recursive function for render the animation
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(
        -canvas.width,
        -canvas.height,
        canvas.width * 2,
        canvas.height * 2
    );
    stars.forEach((star) => {
        star.update();
    });
};

init();
animate();
