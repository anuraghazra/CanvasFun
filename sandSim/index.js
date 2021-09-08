let cellGrid = [];
let rows, cols;
const gridCellSize = 10;

const EMPTY = 0;
const SAND = 1;
const WATER = 2;

function generateCellGrid() {
  let grid = [];
  for (let y = 0; y < cols; y++) {
    grid[y] = [];
    for (let x = 0; x < rows; x++) {
      grid[y][x] = new Cell({ x, y, type: EMPTY });
    }
  }
  return grid;
}

function setup() {
  createCanvas(200, 200);

  rows = width / 2;
  cols = height / 2;
  console.log({ rows, cols });
  cellGrid = generateCellGrid();
}

function mousePressed() {
  cellGrid[floor(mouseY / gridCellSize)][floor(mouseX / gridCellSize)].setType(
    SAND
  );
}
function mouseDragged() {
  cellGrid[floor(mouseY / gridCellSize)][floor(mouseX / gridCellSize)].setType(
    SAND
  );
}

class CellGrid {
  constructor(grid, rows, cols) {
    this.grid = grid;
    this.rows = rows;
    this.cols = cols;
    this.magic = (this.rows * 2) / 10; // 10 -> cell size
  }

  checkEdges(x, y) {
    if (y + 1 > this.magic - 1) {
      this.grid[y][x].setType(SAND);
    }
    // check screen right
    if (x + 1 > this.magic - 1) {
      this.grid[y][x].setType(SAND);
    }
  }

  update() {
    for (let y = this.cols - 1; y >= 0; y--) {
      for (let x = 0; x < this.rows; x++) {
        let cell = this.grid[y][x];
        this.checkEdges(x, y);
      }
    }
  }
}

function simulate() {
  // let newCellGrid = []
  newCellGrid = generateCellGrid();
  let cellGrid = new CellGrid(newCellGrid, rows, cols);

  cell.update();

  for (let y = cols - 1; y >= 0; y--) {
    for (let x = 0; x < rows; x++) {
      let cell = cellGrid[y][x];
      if (cell.type === EMPTY) {
        const magic = (rows * 2) / 10;
        // check screen bottom
        if (y + 1 > magic - 1) {
          newCellGrid[y][x].setType(SAND);
        }
        // check screen right
        if (x + 1 > magic - 1) {
          newCellGrid[y][x].setType(SAND);
          continue;
        }
        // check screen left
        if (x < 0) {
          newCellGrid[y][x].setType(SAND);
          continue;
        }

        let nextDown = newCellGrid[y + 1];

        // if next cell is empty move there
        if (nextDown && nextDown[x].type == EMPTY) {
          nextDown[x].setType(SAND);
          continue;
        }

        if (nextDown && nextDown[x - 1] && nextDown[x - 1].type == EMPTY) {
          // if (newCellGrid[y] && newCellGrid[y][x - 1] == EMPTY) {
          //   newCellGrid[y][x] = EMPTY;
          //   newCellGrid[y][x - 1] = SAND;
          // }
          nextDown[x - 1].setType(SAND);
          continue;
        } else if (nextDown && nextDown[x + 1] == EMPTY) {
          // if (newCellGrid[y] && newCellGrid[y][x + 1] == EMPTY) {
          //   newCellGrid[y][x] = EMPTY;
          //   newCellGrid[y][x + 1] = SAND;
          // }
          nextDown[x + 1].setType(SAND);
          continue;
        } else {
          newCellGrid[y][x].setType(SAND);
          continue;
        }
      }
    }
  }

  cellGrid = newCellGrid;
}

function draw() {
  background(35);
  simulate();
  frameRate(60);
  noStroke();
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      cellGrid[y][x].render();
      // if (sandGrid[y][x] == 1) {
      //   // stroke(0)
      //   fill(255, 150, 0);
      // } else if (sandGrid[y][x] == 2) {
      //   // stroke(0)
      //   fill(155, 0, 255);
      // } else {
      //   fill(255, 255, 255);
      // }
      // rect(x * gridCellSize, y * gridCellSize, 9, 9);
    }
  }
}
