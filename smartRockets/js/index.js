const canvas = document.querySelector('#c');
let time = document.getElementById('time');
let speed = document.querySelector('#speed');

const ctx = canvas.getContext('2d');
const width = 1300;
const height = 400;

let lifespan = 1000;
let maxforce = 0.2;
let mutationRate = 0.01;
let agents = 500;
let count = 0;

let target = new Vector(width - 50, height / 2-100);

canvas.width = width;
canvas.height = height;

let population;

let obstacles = [
  // {
  //   x : 450, y : 0,
  //   w : 10, h : 300
  // },
  // {
  //   x : 900, y : 100,
  //   w : 10, h : 300
  // }
];
drawObstacle();

window.onload = function () {

  function setup() {
    population = new Population();
  }
  setup();

  function animate() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    population.run();
    count++;
    if (count === lifespan) {
      population.evaluate();
      population.selection();
      count = 0;
    }

    
    renderObstacles();
    population.renderDebug();
    
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(target.x, target.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    
    time.innerText = count;

    if(speed.value != 0) {
      requestAnimationFrame(animate);
    } else {
      console.log('0')
    }
  }

  speed.onchange = function() {
    if(this.value !== 0) {
      for (let i = 0; i < this.value; i++) {
        animate();
      }
    } 
  }

  animate();

}
