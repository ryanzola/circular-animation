import utils from './utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = [
  '#F89CAF',
  '#FEC6CD',
  '#FBB669',
  '#FBE588',
  '#B8E983',
  '#4ACFDA',
  '#BAECE0',
  '#AAAFEB',
  '#E7C0F7'
];
const gravity = 1;
const yFriction = 0.29;
const xFriction = 0.99;

// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('click', () => {
  init();
})

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = function() {

    // apply gravity unless collision with the floor
    if (this.y + this.radius + this.dy > canvas.height) {
			this.dy = -this.dy;
			this.dy = this.dy * yFriction;
    } else {
      this.dy += gravity;
    }

    // collision with the walls
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx
    }

    // so balls dont roll infinitely
    if((Math.floor(this.y) + Math.floor(this.radius)).toFixed(0) == canvas.height) {
      this.dx = this.dx * xFriction;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };
}

// Implementation
let ball;
let ballArray;
function init() {
  ballArray = [];
  for(var i = 0; i < 1000; i++) {
    let radius = utils.randomIntFromRange(10, 30);
    let x = utils.randomIntFromRange(radius, canvas.width - radius);
    let y = utils.randomIntFromRange(0, canvas.height - radius);
    let dx = utils.randomIntFromRange(-5, 5);
    let dy = utils.randomIntFromRange(-2, 2);
    let color = utils.randomColor(colors);
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

init();
animate();
