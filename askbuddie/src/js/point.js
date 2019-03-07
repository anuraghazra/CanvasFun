/**
 * @class Point
 * @param {number} x
 * @param {number} y
 * @param {string} color
 */
class Point {
  constructor(x, y, color) {
    this.pos = new Vector(random(width), random(height));
    this.vel = Vector.random2D();
    this.acc = new Vector(0, 0);
    this.target = new Vector(x, y);
    this.maxSpeed = 10;
    this.maxForce = 1;
    this.color = color;
    this.fleeRadius = 70;
    this.attractRadius = 80;
  }


  behaviour(fleetarget) {
    let arrive = this.arrive(this.target);
    let flee = this.flee(fleetarget);
    let attract = this.attract(fleetarget);
    flee.mult(0.3);
    arrive.mult(0.2);
    attract.mult(0.8);
    this.applyForce(arrive);
    this.applyForce(flee);
    mouseDown && this.applyForce(attract);
  };

  applyForce(f) { this.acc.add(f) };

  arrive() {
    let desire = Vector.sub(this.target, this.pos);
    let d = desire.mag();
    let speed = this.maxSpeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    desire.setMag(speed);
    let steer = Vector.sub(desire, this.vel);
    steer.limit(this.maxForce);
    return steer;
  };

  flee(target) {
    let desire = Vector.sub(target, this.pos);
    let d = desire.mag();
    if (d < this.fleeRadius) {
      // desire.setMag(this.maxSpeed);
      desire.mult(-1);
      let steer = Vector.sub(desire, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }
    else {
      return new Vector(0, 0);
    }
  };

  attract(target) {
    let desire = Vector.sub(target, this.pos);
    let d = desire.mag();
    if (d < this.attractRadius) {
      desire.setMag(this.maxSpeed);
      desire.mult(1);
      let steer = Vector.sub(desire, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }
    else {
      return new Vector(0, 0);
    }
  };

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  };

  render() {
    c.fill(this.color);
    c.rect(this.pos.x, this.pos.y, pointSize, pointSize);
  };
}
