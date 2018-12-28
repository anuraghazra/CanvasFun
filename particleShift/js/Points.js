function Point(x, y, color, active) {
  this.pos = new Vector(x, y);
  this.vel = Vector.random2D();
  this.acc = new Vector(0, 0);
  this.target = new Vector(x, y);

  this.maxSpeed = 8;
  this.maxForce = 5;
  this.color = color;

  this.active = active;


  this.behaviour = function (fleetarget) {
    let arrive = this.arrive(this.target);
    let flee = this.flee(fleetarget);
    flee.mult(0.2);
    arrive.mult(0.1);

    this.applyForce(arrive);
    this.applyForce(flee);
  }
  this.applyForce = function (f) {
    this.acc.add(f);
  }

  this.arrive = function () {
    let desire = Vector.sub(this.target, this.pos);
    let d = desire.mag();
    let speed = this.maxSpeed;
    if (d < 50) {
      speed = map(d, 0, 50, 0, this.maxSpeed)
    }
    desire.setMag(speed);
    let steer = Vector.sub(desire, this.vel);
    steer.limit(this.maxForce)
    return steer;
  }

  this.flee = function (target) {
    let desire = Vector.sub(target, this.pos);
    let d = desire.mag();
    if (d < 10) {
      // desire.setMag(this.maxSpeed);
      desire.mult(-1);
      let steer = Vector.sub(desire, this.vel);
      steer.limit(this.maxForce)
      return steer;
    } else {
      return new Vector(0, 0);
    }
  }

  this.update = function () {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  this.shake = function () {
    if (!this.active) {
      this.acc = new Vector(random(-0.2, 0.2), random(-0.2, 0.2))
    }
    this.acc.x = random(-0.1, 0.1);
    this.acc.y = random(-0.1, 0.1);
  }

  this.render = function (ctx) {
    // console.log(this.color)
    // ctx.arc(this.pos.x, this.pos.y, pointSize, 0, Math.PI*2)
    // ctx.beginPath();
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pos.x, this.pos.y, 5,5);
    // ctx.fill();
    // ctx.closePath();
    // c.ctx.stroke
    let wh = 5;
    if(this.active) {
      wh = 3;
    } else {
      wh = 5;
    }
    c.noStroke();
    c.push();
    c.alpha(this.vel.mag()+(1/wh+0.3));
    c.fill(this.color);
    c.rect(this.pos.x, this.pos.y, wh+this.acc.x,wh+this.acc.y)
    c.pop();
  }
}