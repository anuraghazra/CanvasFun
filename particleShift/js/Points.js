/**
 * @class Point
 * @param {Number} x
 * @param {Number} y
 * @param {String} color
 * @param {Boolean} active
 */
class Point {
  constructor(x, y, color, active) {
    this.pos = new Vector(x, y);
    this.vel = Vector.random2D();
    this.acc = new Vector(0, 0);
    this.target = new Vector(x, y);
    this.maxSpeed = config.maxSpeed;
    this.maxForce = config.maxForce;
    this.color = color;
    this.arriveRadius = 50;
    this.active = active;
  }

  behaviour(target) {
    let arrive = this.arrive(this.target);
    let repel = this.repel(target);
    let attract = this.attract(target);
    repel.mult(0.2);
    attract.mult(0.3);
    arrive.mult(0.1);
    this.applyForce(arrive);
    this.applyForce(repel);
    mouseDown && this.applyForce(attract);
  }

  applyForce(f) {
    this.acc.add(f);
  }
  
  arrive() {
    let desire = Vector.sub(this.target, this.pos);
    let d = desire.mag();
    let speed = this.maxSpeed;
    if (d < this.arriveRadius) {
      speed = map(d, 0, 50, 0, this.maxSpeed);
    }
    desire.setMag(speed);
    let steer = Vector.sub(desire, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  repel(target) {
    let desire = Vector.sub(target, this.pos);
    let d = desire.mag();
    if (d < config.repelRadius) {
      desire.setMag(6);
      desire.mult(-1);
      let steer = Vector.sub(desire, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }
    else {
      return new Vector(0, 0);
    }
  }

  attract(target) {
    let desire = Vector.sub(target, this.pos);
    let d = desire.mag();
    if (d < config.attractRadius) {
      desire.setMag(this.maxSpeed);
      desire.mult(1);
      let steer = Vector.sub(desire, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }
    else {
      return new Vector(0, 0);
    }
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.maxSpeed = config.maxSpeed;
    this.maxForce = config.maxForce;
  }

  shake() {
    if (!this.active) {
      this.acc = new Vector(random(-0.2, 0.2), random(-0.2, 0.2));
    }
    this.acc.x = random(-0.1, 0.1);
    this.acc.y = random(-0.1, 0.1);
  }

  blast() {
    this.acc.x = random(-5, 5);
    this.acc.y = random(-5, 5);
  }

  setTarget(x, y) {
    this.target.x = x;
    this.target.y = y;
  }

  reset() {
    this.target.x = random(CANVAS_WIDTH);
    this.target.y = random(CANVAS_HEIGHT);
    this.color = 'rgba(255,255,255,0.3)';
    this.active = false;
  }

  render() {
    let wh = 5;
    if (this.active) {
      wh = 3;
    }
    else {
      wh = 5;
    }
    c.alpha((1 / wh + 0.3));
    c.fill(this.color);
    c.rect(this.pos.x, this.pos.y, wh + this.acc.x, wh + this.acc.y);
  }
}








