const c = new Candy();
c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

let config = {
  rightRotation: 0.6,
  leftRotation: 0.6,
  rightBranch: 0.7,
  leftBranch: 0.7,
  size: 150
}
let gui = new dat.GUI();
gui.add(config, 'rightRotation', -2.0, 2.0, 0.1);
gui.add(config, 'leftRotation', -2.0, 2.0, 0.1);
gui.add(config, 'rightBranch', 0.0, 0.7, 0.1);
gui.add(config, 'leftBranch', 0.0, 0.7, 0.1);
gui.add(config, 'size', 20, 200, 1);

// let tree = [];
// let leaves = [];
// function setup() {
//   let s = new Vector(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
//   let e = new Vector(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 120);
//   root = new Branch(s, e);
//   tree[0] = root;
// }
// setup();
// count = 0;

// for (let i = 0; i < 5; i++) {
//   generateTree();
// }

// function generateTree() {
//   for (let i = tree.length - 1; i >= 0; i--) {
//     if (!tree[i].done) {
//       tree.push(tree[i].branch(Math.PI / 6));
//       tree.push(tree[i].branch(-Math.PI / 4));
//     }
//     tree[i].done = true;
//   }
//   count++;

//   if (count >= 4) {
//     for (let i = 0; i < tree.length; i++) {
//       if (!tree[i].done) {
//         leaf = tree[i].end.copy();
//         leaves.push(leaf);
//       }
//     }
//   }
// }
// window.onclick = generateTree;


let time = 0;

c.clear('black');
animate();
function animate() {

  // for (let i = 0; i < tree.length; i++) {
  //   tree[i].end.rotate(rightRotation);
  //   tree[i].start.rotate(leftRotation);
  //   tree[i].show();
  // }

  // // /leaves
  // for (let i = 0; i < leaves.length; i++) {
  //   c.noStroke();
  //   c.fill(255,255,255,0.5);
  //   c.circle(leaves[i].x,leaves[i].y,5);
  // }
  time += 0.02;
  config.rightRotation = clamp(Math.cos(time), random(0.15, 0.7), random(0.2, 0.7))
  config.rightBranch = clamp(Math.sin(time), random(0.0, 0.7), random(0.2, 0.7))
  config.leftRotation = clamp(Math.cos(time), random(0.3, 0.7), random(0.2, 0.7))
  config.leftBranch = clamp(Math.sin(time), random(0.5, 0.7), random(0.2, 0.7))
  config.size = clamp(Math.tan(time), random(0.6, 0.7), random(0.2, 0.7)) * 200



  c.push();
  c.translate(random(CANVAS_WIDTH), random(CANVAS_HEIGHT, CANVAS_HEIGHT + 20));
  // c.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
  // c.blendMode(ADD);
  branch(config.size);
  c.pop();

  c.loop(animate);
}


function branch(len) {
  c.stroke(['crimson', 'tomato']);
  c.strokeWeight(len / 50);
  c.rotate(random(-0.2, 0.1))
  c.line(0, 0, 0, -len + random(50));
  c.translate(0, -len  + random(50));

  if (len > 3) {
    c.push();
    c.rotate(config.rightRotation + random(-0.3, 0.8));
    branch(len * config.rightBranch + random(-0.3, 0.8));
    c.pop();
    c.push();
    c.rotate(-config.leftRotation + random(-0.3, 0.8));
    branch(len * config.leftBranch + random(-0.3, 0.8));
    c.pop();
  }
}

