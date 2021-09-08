let sandpile = [];

function setup() {
  createCanvas(40, 40);

  sandpile = [...Array(width)].map((e) => Array(width).fill(1));
}

function topple() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpile[x][y];
      let dx = random() > 0.5 ? -1 : 1;
      if (num >= 2) {
        const isNextEmpty =
          sandpile[x][y + 1] !== undefined && sandpile[x][y + 1] == 1;
        if (isNextEmpty) {
          sandpile[x][y + 1] = 2;
          sandpile[x][y] = 1;
          break;
        } else if (
          !isNextEmpty &&
          sandpile[x + dx]?.[y + 1] !== undefined &&
          sandpile[x + dx]?.[y + 1] == 1
        ) {
          sandpile[x + dx][y + 1] = 2;
          sandpile[x][y] = 1;
        }
      }
    }
  }
}

function mousePressed() {
  try {
    sandpile[floor(mouseX)][floor(mouseY)] = 2;
  } catch (e) {
    console.log(e);
  }
}

let t = 0;
function draw() {
  t++;
  background(25);

  if (t % 10 == 0) {
    sandpile[floor(20)][floor(5)] = 2;
    t = 0;
  }

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpile[x][y];

      let col = [255, 255, 255];
      if (num == 2) {
        col = [188, 100, 50];
      }
      set(x, y, color.apply(null, col));
    }
  }
  updatePixels();
  // for (let x = 0; x < sandpile.length; x++) {
  //   for (let y = 0; y < sandpile[x].length; y++) {
  //     fill(255);
  //     rect(x * 20, y * 20, 5, 5);
  //   }
  // }
  topple();
}
