class Target {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.width = 2;
    this.height = 50;
    this.time = 0;
  }

  update() {
    this.time += 0.1;
    this.pos.y += 20 * Math.cos(this.time * 0.5) * 0.5;
  }
  render() {
    c.fill(255);
    c.rect(this.pos.x, this.pos.y, this.width, this.height);
  }
}