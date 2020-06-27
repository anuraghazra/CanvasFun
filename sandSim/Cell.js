class Cell {
  constructor({ x, y, type = EMPTY }) {
    this.type = type;
    this.x = x;
    this.y = y;
  }

  setType(type) {
    this.type = type;
  }

  render() {
    if (this.type == SAND) {
      // stroke(0)
      fill(255, 150, 0);
    } else if (this.type == WATER) {
      // stroke(0)
      fill(155, 0, 255);
    } else {
      fill(255, 255, 255);
    }
    rect(this.x * gridCellSize, this.y * gridCellSize, 9, 9);
  }
}


class SandCell extends Cell {
  constructor({ x, y, type = SAND }) {
    super(props);
    this.type = type;
    this.x = x;
    this.y = y;
  }

  act() {
    
  }
}