const c = new Candy();
c.createCanvas(window.innerWidth, window.innerHeight - 120);


let angle1 = document.getElementById('angle1');
let angle2 = document.getElementById('angle2');
let slider1 = document.getElementById('leftTrunk');
let slider2 = document.getElementById('rightTrunk');
let size = document.getElementById('size');



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


function animate() {
  c.clear('rgba(25,25,25,1)');

  // for (let i = 0; i < tree.length; i++) {
  //   tree[i].end.rotate(angle1);
  //   tree[i].start.rotate(angle2);
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
  branch(size.value);
  c.pop();

  c.loop(animate);
}

size.onchange = function() {
  c.clear('rgba(25,25,25,1)');

  // animate()
}

function branch(len) {
  c.stroke(['crimson', 'brown', 'black']);
  c.strokeWeight(len / 4);
  c.line(0, 0, 0, -len);
  c.translate(0, -len);

  if (len > 4) {
    c.push();
    c.rotate(angle1.value);
    branch(len * slider1.value);
    c.pop();
    c.push();
    c.rotate(-angle2.value);
    branch(len * slider2.value);
    c.pop();
  }
}

