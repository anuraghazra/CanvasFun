
class Particle {
  constructor(x, y, mass) {
    this.pos = new Vector(x || random(CANVAS_WIDTH), y || random(CANVAS_HEIGHT));
    this.vel = new Vector(0, random(-2, 2));
    this.acc = new Vector(0, 0);
    this.mass = mass || 1;
    this.maxSpeed = 10;
  }

  edges() {
    if (this.pos.x < 0) {
      this.pos.x = CANVAS_WIDTH;
    } else if (this.pos.x > CANVAS_WIDTH) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = CANVAS_HEIGHT;
    } else if (this.pos.y > CANVAS_HEIGHT) {
      this.pos.y = 0;
    }
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
  };

  applyForce(force) {
    this.acc.add(force.div(this.mass));
  }

  attracted(target) {
    const G = 1;
    let desire = Vector.sub(target.pos, this.pos);
    let dSq = desire.magSq();
    let strength = G * ((target.mass*this.mass) / (dSq));
    desire.normalize()
    desire.setMag(strength);
    
    this.applyForce(desire);
  
    // let grav = new Vector(0, 0);
    // let dist = Vector.dist(target.pos, this.pos);

    // grav.rotate(target.pos.heading());
    // grav.mult(target.mass / (dist*dist));
    
  }

  render() {
    c.noStroke();
    c.fill(255);
    c.circle(this.pos.x, this.pos.y, 2);
  };
}


class Attractor extends Particle {
  constructor(x, y, mass) {
    super(x, y, mass);
    this.vel = new Vector(0, 0);
  }

  render() {
    c.noStroke();
    c.fill(0, 255, 100);
    c.circle(this.pos.x, this.pos.y, 5);
  }
}