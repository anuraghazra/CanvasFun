class Player {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.radius = 10;
    this.tailDots = [];
    this.tailCons = [];

    this.tiltLR = 0;
    this.tiltFB = 0;
    window.addEventListener('deviceorientation', (e) => {
      this.tiltLR = e.gamma;
      this.tiltFB = e.beta;
      let gyro = createVector(this.tiltLR, this.tiltFB);
      this.applyForce(gyro);
    });

  }
  applyForce(f) { this.acc.add(f) }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }


  collidePointPoly(px, py, target, vertices) {
    var collision = false;
    // go through each of the vertices, plus the next vertex in the list
    var next = 0;
    for (var current = 0; current < vertices.length; current++) {
      // get next vertex in list if we've hit the end, wrap around to 0
      next = current + 1;
      if (next == vertices.length) next = 0;
      // get the PVectors at our current position this makes our if statement a little cleaner
      var vc = vertices[current];
      var vn = vertices[next];
      let vcy = target.pos.y + vc.y;
      let vny = target.pos.y + vn.y;
      let vcx = target.pos.x + vc.x;
      let vnx = target.pos.x + vn.x;
      if (((vcy > py && vny < py) || (vcy < py && vny > py)) &&
        (px < (vnx - vcx) * (py - vcy) / (vny - vcy) + vcx)) {
        collision = !collision;
      }
    }
    return collision;
  }
  hit(target) {
    return this.collidePointPoly(this.pos.x, this.pos.y, target, target.vertices);
  }

  render() {

    push();
    translate(this.pos.x, this.pos.y);
    // text(this.tailDots.length, 100, 100)
    fill(255);

    ellipse(0, 0, this.radius, this.radius);
    // triangle(-this.radius, this.radius, this.radius, this.radius,0, -this.radius);
    pop();
  }
}