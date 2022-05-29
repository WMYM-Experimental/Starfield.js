// DOM manipulation
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// stars for the starfield
const stars = [];

//functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min + 1) + min;
}

// class star for making dots in the screen
class Star {
    constructor(x, y, z, radius, color) {
        this.x = x;
        this.y = y;
        this.z = z; // just the iluttion of 3D (2d project)
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
        this.draw();
    }
}

const star = new Star(canvas.width / 2, canvas.height / 2, 10, 10, "#1f1");

// recursive function for render the animation
const animate = () => {
    star.draw();
    requestAnimationFrame(animate);
};

animate();
