class Player {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.radius = 10;
    this.tailDots = [];
    this.tailCons = [];
    this.tail = verlet.Poly.rope({
      x: this.pos.x,
      y: this.pos.y,
      segs: 5,
      gap: 10,
      pinned: true
    }, this.tailDots, this.tailCons);

    window.setTimeout(() => {
      let last = this.tailDots[this.tailDots.length - 1];
      this.tailDots.push({ x: last.x + 10, y: last.y + 10, oldx: last.oldx, oldy: last.oldy });
      let newj = []
      for (const n of this.tailCons) {
        newj.push(n.id);
      }
      newj.push([this.tailDots.length - 2, this.tailDots.length - 1]);
      verlet.clamp(newj, this.tailDots, this.tailCons)
    }, 1000);

    this.initLR = 0;
    this.initFB = 0;
    this.tiltLR = 0;
    this.tiltFB = 0;
    window.setTimeout(() => {
      const getInitialOri = (e) => {
        console.log(this)
        this.initLR = e.gamma;
        this.initFB = e.beta;

        window.removeEventListener('deviceorientation', getInitialOri);
      }
      window.addEventListener('deviceorientation', getInitialOri);
      window.addEventListener('deviceorientation', (e) => {
        this.tiltLR = e.gamma;
        this.tiltFB = e.beta;
        let gyro = createVector(this.initLR - this.tiltLR, this.initFB - this.tiltFB);
        this.applyForce(gyro);
      });
    }, 200)

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
    this.tailDots[0].x = this.pos.x;
    this.tailDots[0].y = this.pos.y;
    verlet.superUpdate(this.tailDots, this.tailCons, 50);
    text(this.initLR, 220, 100)
    text(this.initFB, 220, 120)
    text(this.tiltLR, 100, 100)
    text(this.tiltFB, 100, 120)

    push();

    verlet.superRender(this.tailDots, this.tailCons, {
      renderDots: false,
      lineColor: 'white',
      debug: false
    });
    translate(this.pos.x, this.pos.y);
    // text(this.tailDots.length, 100, 100)
    fill(255);

    ellipse(0, 0, this.radius, this.radius);
    // triangle(-this.radius, this.radius, this.radius, this.radius,0, -this.radius);
    pop();
  }
}