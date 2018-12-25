class Particle {

  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.r = 2;
  }

  update() {
    this.pos.x -= 1;
    this.pos.y += random(-3, 3);

    let angle = this.pos.heading();
    angle = clamp(angle, 0, Math.PI/6);
    let mag = this.pos.mag();
    this.pos = Vector.fromAngle(angle);
    this.pos.setMag(mag);
  }

  finished() {
    return this.pos.x < 1;
  }

  intersects(snowflakes) {
    let ishit = false;
    for (const s of snowflakes) {
      let d = dist(s.pos.x, s.pos.y, this.pos.x, this.pos.y);

      if(d < this.r*2) {
        ishit = true;
        break;
      }
    }

    return ishit;
  }

  render(c) {
    c.noStroke();
    c.fill(255);
    c.circle(this.pos.x, this.pos.y, this.r);
  }
}