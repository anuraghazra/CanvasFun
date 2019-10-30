let sandGrid = [];
let row, col;

function generateSandGrid() {
  let grid = [];
  for (let y = 0; y < cols; y++) {
    grid[y] = [];
    for (let x = 0; x < rows; x++) {
      grid[y][x] = 0;
    }
  }
  return grid;
}

function setup() {
  createCanvas(200, 200);

  rows = width / 2;
  cols = height / 2;

  sandGrid = generateSandGrid();
}

function mousePressed() {
  sandGrid[floor(mouseY / 10)][floor(mouseX / 10)] = 1;
}

function simulate() {
  // let newSandGrid = []
  newSandGrid = generateSandGrid();
  // for (let y = 0; y < cols; y++) {
  //   newSandGrid[y] = []
  //   for (let x = 0; x < rows; x++) {
  //     let num = sandGrid[y][x];
  //     if (num < 1) {
  //       newSandGrid[y][x] = num;
  //     }
  //   }
  // }
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      let sand = sandGrid[y][x];
      if (sand == 1) {

        let randX = floor(random(1, -1))
        if (y + 1 > 19) {
          newSandGrid[y][x] = 1;
        }
        if (newSandGrid[y + 1][x] == 0) {
          newSandGrid[y + 1][x] = 1;
        }
        if (newSandGrid[y][x + 1] == 0) {
          newSandGrid[y][x + 1] = 1;
        } 
        if (newSandGrid[y][x] == newSandGrid[y + 1][x]) {
          newSandGrid[y - 1][x] = 1;
        }

        // fall
        // newSandGrid[y + 1][x] = sand;

        // // check left
        // if (newSandGrid[y][x - 1] == 0) {
        //   newSandGrid[y][x - 1] = 1;
        // } else if (newSandGrid[y][x + 1] == 0) {
        //   newSandGrid[y][x + 1] = 1;
        // }

        // // check bottom
        // if (newSandGrid[y][x] == newSandGrid[y + 1][x]) {
        //   newSandGrid[y - 1][x] = 1;
        // }

        // // check border bottom

      }
    }
  }

  sandGrid = newSandGrid;
}

function draw() {
  background(35);

  strokeWeight(0.1);
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      rect(x * 10, y * 10, 9, 9);
      if (sandGrid[y][x] == 1) {
        fill(255, 150, 0);
      } else {
        fill(255, 255, 255);
      }
    }
  }

  simulate()

}
