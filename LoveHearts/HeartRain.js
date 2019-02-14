class HeartRain {
  constructor() {
    let startingX = floor(random(width) * 2);
    let startingY = floor(random(width) * 2);
    this.pos = createVector(startingX, startingY);
    this.vel = createVector(cos(random(-5, 5)), 0.5 + Math.random() * 5);
    this.acc = createVector(0, 0);
    this.heart = new Heart(this.pos.x, this.pos.y, random(1, 3), random(5, 10), true);
    this.heart.oneCycle();
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(5);

    if (this.pos.y > height) {
      this.pos.y = -10;
    }
    if (this.pos.x > width) {
      this.vel.x *= -1;
    } else if (this.pos.x < -10) {
      this.pos.x = width;
    }
    this.acc.mult(0)
  }

  render() {
    this.heart.render(this.pos.x, this.pos.y);
  }

}