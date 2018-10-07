function Branch(start, end) {
  this.start = start;
  this.end = end;

  this.done = false;
  this.dir = new Vector();

  this.show = function () {
    c.stroke('white');
    c.line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  this.branch = function (angle) {
    this.done = true;
    this.dir = Vector.sub(this.end, this.start);
    this.dir.rotate(angle);
    this.dir.mult(0.67);
    let newEnd = Vector.add(this.end, this.dir);
    let right = new Branch(this.end, newEnd);
    return right;
  }
}