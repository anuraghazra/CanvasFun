class Rock {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.radius = random(10, 30);
    this.vertices = [];
    this.offsets = [];
    this.total = random(5, 15);

    for (let i = 0; i < this.total; i++) {
      this.offsets[i] = random(-5, 5)
    }
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let r = (this.radius + this.offsets[i]);
      let x = r * cos(angle);
      let y = r * sin(angle);
      this.vertices.push({ x, y });
    }
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x > (width + this.radius) || this.pos.x < this.radius) {
      this.vel.x *= -1;
    }
    if (this.pos.y > (height + this.radius) || this.pos.y < this.radius) {
      this.vel.y *= -1;
    }
  }

  render() {
    noFill();
    stroke(255);
    beginShape();
    for (const v of this.vertices) {
      vertex(this.pos.x + v.x, this.pos.y + v.y);
    }
    endShape(CLOSE);
  }
}