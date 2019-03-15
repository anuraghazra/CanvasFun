class Block {
  constructor(x, w, v, m) {
    this.x = x;
    this.y = height - w - 2;
    this.w = w;
    this.v = v;
    this.m = m;
    this.hits = 0;
  }

  hitWall() {
    return (this.x < 0);
  }
  collide(other) {
    return !(this.x + this.w < other.x || this.x > other.x + other.w);
  }

  bounce(other) {
    let sumM = this.m + other.m
    let newV = (this.m - other.m) / sumM * this.v;
    newV += (2 * other.m / sumM) * other.v;
    return newV;
  }

  update() {
    this.x += this.v;
  }
  render() {
    noStroke();
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(this.hits, this.x + this.w / 2, this.y + this.w / 2);
    noFill();
    stroke(255);
    rect(this.x, this.y, this.w, this.w);
  }
}