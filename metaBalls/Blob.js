class Blob {

  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.r = 80;

    this.vel = new Vector(random(3, 5), random(-2, 3));
  }


  update() {
    this.pos.add(this.vel);

    if (this.pos.x < 0 || this.pos.x > CANVAS_WIDTH) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > CANVAS_HEIGHT) {
      this.vel.y *= -1;
    }
  }

  render() {
    c.noFill();
    c.stroke(0);
    c.circle(this.pos.x, this.pos.y, this.r);
  }

}