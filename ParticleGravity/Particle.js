
class Particle {
  constructor(x, y) {
    this.pos = new Vector(x || random(CANVAS_WIDTH), y || random(CANVAS_HEIGHT));
    this.vel = new Vector(random(-2,2), random(-2,2));
    this.acc = new Vector(0, 0);
    this.mass = 1;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  };

  applyForce(force) {
    this.acc.add(force.div(this.mass));
  }
  attracted(target) {
    let attraction = Vector.sub(target.pos, this.pos);

    let dSq = attraction.mag();

    // if (dSq*dSq > this.mass+target.mass) {
      dSq = clamp(dSq, 50, 100);
      let G = 6.6;
      let strength = G * ((this.mass*target.mass) / (dSq*dSq));
      // let strength = G * ((this.mass * target.mass) / dSq);
      attraction.normalize();
      attraction.mult(strength);

      this.applyForce(attraction);
    // }
  }

  render() {
    c.noStroke();
    c.fill(255);
    c.circle(this.pos.x, this.pos.y, 2);
  };
}


class Attractor extends Particle {
  constructor(x, y, mass) {
    super(x, y);
    this.vel = new Vector(0, 0);
    this.mass = mass || 1;
  }

  render() {
    c.noStroke();
    c.fill(0, 255, 100);
    c.circle(this.pos.x, this.pos.y, 5);
  }
}