const values = [];
const states = [];
let engine;
let world;
let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
let boxes = [];
let mixed = [];
let ground;

let barWidth;

for (let i = 0; i < 10; i++) {
  values.push(Math.floor(20 + Math.random() * 255))
  states.push(-1)
  // boxes.push(new Box(0, 0, 1, Math.floor(20 + Math.random() * 255), true))
}
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  barWidth = (windowWidth) / values.length;
  engine = Engine.create();
  world = engine.world;
  // Engine.run(engine);
  ground = Bodies.rectangle(0, height, width, 10, { isStatic: true });

  for (let i = 0; i < 10; i++) {
    mixed.push(new Box(random(0, 300), 100, random(10, 40), random(10, 40)));
  }

  values.forEach((v, i) => {
    boxes.push(new Box(0, 0, 10, 100, true))
  })

  World.add(world, ground);
}

function draw() {
  background(5, 15, 15);
  boxes = []

  values.forEach((v, i) => {
    strokeWeight(0)
    if (states[i] === 0) {
      fill('#00ff15')
    } else if (states[i] === 1) {
      fill(80, v, 80 + v)
    } else {
      fill(250 + v, v, 80)
    }
    // boxes[i].body.setPosition( Matter.Vector.create(i * barWidth, windowHeight - 200));
    // boxes[i].body.x = i * barWidth;
    // boxes[i].body.y = windowHeight - 200;
    // Matter.Body.scale(boxes[i].body, barWidth, (1 - v) * 2);
    // boxes[i].body.x = i * barWidth;
    // boxes[i].body.y = windowHeight;
    // boxes[i].body.w = barWidth;
    // boxes[i].body.h = (1 - v) * 2;
    // Matter.Composite.remove(world, boxes[i].body)
    // boxes.splice(i, 1)
    boxes[i] = new Box(i * barWidth, windowHeight, barWidth, (1 - v) * 2, true);
    rect(i * barWidth, windowHeight, barWidth, (1 - v) * 2)
  })
  boxes.forEach(box => box.render())
  mixed.forEach(mix => mix.render())
  Engine.update(engine);
}


// QUICK SORT ALGORITHM
async function swap(array, a, b) {
  await sleep(100);
  let tmp = array[a];
  array[a] = array[b];
  array[b] = tmp;
}

async function quickSort(array, start, end) {
  if (start >= end) return;

  let pivotIndex = start;
  let pivotValue = array[end];
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }
  for (let i = start; i < end; i++) {
    if (array[i] < pivotValue) {
      await swap(array, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(array, pivotIndex, end);

  states[pivotIndex] = -1;
  for (let i = start; i < end; i++) {
    if (i !== pivotIndex) {
      states[i] = -1;
    }
  }
  await Promise.all([
    quickSort(array, start, pivotIndex - 1),
    quickSort(array, pivotIndex + 1, end)
  ]);
}

quickSort(values, 0, values.length - 1);



// var Engine = Matter.Engine,
//   Render = Matter.Render,
//   World = Matter.World,
//   Bodies = Matter.Bodies;

// var engine = Engine.create();

// var render = Render.create({
//   element: document.body.querySelector('canvas'),
//   engine: engine,
//   options: {
//     width: 800,
//     height: 400,
//     wireframes: false
//   }
// });

// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var ballA = Bodies.circle(380, 100, 40, 10);
// var ballB = Bodies.circle(460, 10, 40, 10);
// var ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });

// World.add(engine.world, [boxA, ballA, ballB, ground]);

// Engine.run(engine);
// Render.run(render);