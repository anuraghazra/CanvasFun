class Grid {
  constructor(cols, rows, tsw) {
    this.blocks = [];
    this.cols = cols;
    this.rows = rows;
    this.tileWidth = tsw;

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.blocks.push(new Block(i, j, 1, this.tileWidth));
      }
    }
  }


  createGrid(cols, rows) {
    let grid = [];
    for (let i = 0; i < cols; i++) {
      grid[i] = [];
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
      }
    }
    return grid;
  }

  applyHeightMap(map) {
    for (let y = 0; y < map.length; y++) {
      let row = map[y];
      for (let x = 0; x < row.length; x++) {
        this.blocks[x * map.length + y].setZ(row[x]);
      }
    }

  }

  render() {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].render();
    }
  }
}