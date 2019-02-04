class Arrow {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.gravity = new Vector(0, 0.3);
    this.force = 0;
    this.isCollided = false;
  }

  handleCollision(other) {
    if ((this.pos.x > other.pos.x &&
      this.pos.x < other.pos.x + other.width + 10) &&
      (this.pos.y > other.pos.y &&
        this.pos.y < other.pos.y + other.height)
    ) {
      this.isCollided = true;
    }
  }

  setAngle(a) {
    let angleVec = Vector.fromAngle(a);
    angleVec.mult(-this.force);
    this.acc.add(angleVec);
  }
  setForce(f) {
    this.force = f;
  }

  update() {
    let py = 0;
    if (this.isCollided) {
      this.pos.x = target.pos.x;
      this.pos.y = target.pos.y - (py);
    } else {
      this.pos.add(this.vel);
      this.vel.add(this.acc);
      this.vel.add(this.gravity);
    };
    this.acc.mult(0);
    py = this.pos.y - target.height;

  }

  render() {
    c.fill(255);
    c.push();
    c.translate(this.pos.x, this.pos.y);
    c.rotate(this.vel.heading())
    c.rect(-7, -1, 15, 2);
    c.pop();
  }
}