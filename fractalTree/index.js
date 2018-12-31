const c = new Candy();
c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

let config = {
  rightRotation : 0.6,
  leftRotation : 0.6,
  rightBranch : 0.5,
  leftBranch : 0.5,
  size : 100
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


animate();
function animate() {
  c.clear('rgba(25,25,25,1)');

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

  c.push();
  c.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT);
  c.blendMode(ADD);
  branch(config.size);
  c.pop();

  c.loop(animate);
}


function branch(len) {
  c.stroke(['crimson', 'brown', 'black']);
  c.strokeWeight(len / 4);
  c.line(0, 0, 0, -len);
  c.translate(0, -len);

  if (len > 4) {
    c.push();
    c.rotate(config.rightRotation);
    branch(len * config.rightBranch);
    c.pop();
    c.push();
    c.rotate(-config.leftRotation);
    branch(len * config.leftBranch);
    c.pop();
  }
}

