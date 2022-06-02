// DOM manipulation
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.translate(canvas.width / 2, canvas.height / 2); // make a new Origin reference
ctx.moveTo(0, 0); // move to new Origin

// stars for the starfield
const colorArray = [
    "#d6d9de",
    "#fce0d4",
    "#e0858c",
    "#b84f60",
    "#b57389",
    "#a88893",
    "#005f73",
    "#0a9396",
    "#b7094c",
    "#a663cc",
    "#ffc857",
    "#f6b684",
    "#b7b7a4",
    "#a8dadc",
    "#ffafcc",
];

const stars = [];
let newX = 0;
let newY = 0;

//functions
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min, max) => {
    return Math.random() * (max - min + 1) + min;
};

const getRandomColor = (colors) => {
    return colorArray[getRandomInt(0, colors.length - 1)];
};

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
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 15;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        // this method makes the effect works
        // Project star only viewport
        this.z -= 2;
        if (this.z < 1) {
            ctx.clearRect(
                -canvas.width,
                -canvas.height,
                canvas.width * 2,
                canvas.height * 2
            );
            ctx.beginPath();
            ctx.arc(newX, newY, this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            this.x = getRandomFloat(-canvas.width, canvas.width) * 80;
            this.y = getRandomFloat(-canvas.height, canvas.height) * 80;
            newX = this.x;
            newY = this.y;
            this.z = 80;
        } else {
            newX = this.x / this.z;
            newY = this.y / this.z;
            this.z -= 2;
        }
        ctx.beginPath();
        ctx.arc(newX, newY, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const init = () => {
    for (let index = 0; index < 600; index++) {
        stars.push(
            new Star(
                getRandomFloat(-canvas.width, canvas.width),
                getRandomFloat(-canvas.height, canvas.height),
                getRandomInt(2, 6),
                getRandomColor(colorArray)
            )
        );
    }
};

// recursive function for render the animation
const animate = () => {
    stars.forEach((star) => {
        star.update();
    });
    ctx.fillStyle = `rgba(10, 10, 10, 0.5`;
    ctx.fillRect(
        -canvas.width,
        -canvas.height,
        canvas.width * 2,
        canvas.height * 2
    );
    requestAnimationFrame(animate);
};

window.addEventListener("resize", () => {
    stars.splice(0, stars.length);;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2); // make a new Origin reference
    ctx.moveTo(0, 0); // move to new Origin
    init();
  });

init();
animate();
