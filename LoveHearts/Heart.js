class Heart {
  constructor(x = 0, y = 0, radius = 10, pulseRadius = 5, falling = false) {
    this.x = x;
    this.y = y;
    this.points = [];
    this.angle = 0;
    this.radius = radius;
    this.pulse = 1;
    this.pulseRadius = pulseRadius;
    this.beat = true;
    this.falling = falling;
  }

  oneCycle() {
    this.radius += 0.005;
    for (let a = 0; a < TWO_PI; a += 0.3) {
      let x = this.radius * 16 * pow(sin(a), 3);
      let y = -this.radius * (13 * cos(a) - 6 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
      if (this.beat) {
        this.pulse = map(cos(a), 0, this.pulseRadius, 0.5, -1);
      }

      if (this.points.length < 500) {
        this.points.push(createVector(x, y));
      }
    }
  }


  update() {
    let x = this.radius * 16 * pow(sin(this.angle), 3);
    let y = -this.radius * (13 * cos(this.angle) - 6 * cos(2 * this.angle) - 2 * cos(3 * this.angle) - cos(4 * this.angle));
    this.radius += 0.005;
    this.angle += 0.05;
    if (this.beat) {
      this.pulse = map(cos(this.angle), 0, this.pulseRadius, 0.5, -1);
    }

    if (this.points.length < 500) {
      // this.points.pop();
      this.points.push(createVector(x, y));
    }
  }

  render(x, y) {
    stroke('white');
    strokeWeight(2);
    strokeJoin(ROUND);
    let opacity = 1;
    if (this.falling) {
      this.x = x;
      this.y = y;
      opacity = 0.6;
      noStroke();
    }
    push();
    translate(this.x, this.y);
    fill(255, 101, 186, opacity * 255);
    beginShape();
    for (let v of this.points) {
      vertex(this.pulse * v.x, this.pulse * v.y);
    }
    endShape();
    pop();
  }
}