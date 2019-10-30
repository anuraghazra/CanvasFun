
let sandpile = [];

function setup() {
  createCanvas(200, 200);

  sandpile = [...Array(width)].map(e => Array(width).fill(0));
}

function topple() {
  let nextpile = [...Array(width)].map(e => Array(width).fill(0));
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpile[x][y];
      if (num < 1) {
        nextpile[x][y] = num;
      }
    }
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpile[x][y];
      if (num >= 1) {
        nextpile[x][y] += num - 1;
        if (x + 1 < width) {
          nextpile[x + 1][y]++;
        }
        if (x - 1 >= 0) {
          nextpile[x - 1][y]++;
        }
        if (y + 1 < height && nextpile[x][y + 1] < sandpile[x][y + 1]) {
          nextpile[x][y + 1]++;
        }
        // if (y-1 >= 0) nextpile[x][y-1]++;
      }
    }
  }
  sandpile = nextpile;
}


function mousePressed() {
  sandpile[floor(mouseX)][floor(mouseY)] = 1;
}

function draw() {
  background(25);

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpile[x][y];

      let col = [255, 255, 255];
      if (num == 0) {
        col = [25, 25, 25];
      }
      set(x, y, color.apply(null, col))
    }
  }
  updatePixels();

  for (let i = 0; i < 10; i++) {
    topple();
  }
}
