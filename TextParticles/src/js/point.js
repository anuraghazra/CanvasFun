function Point(x, y, color) {
  this.pos = new Vector(random(width),random(height));
  this.vel = Vector.random2D();
  this.acc = new Vector(0, 0);
  this.target = new Vector(x, y);
  
  this.maxSpeed = 10;
  this.maxForce = 1;
  this.color = color;
  

  this.behaviour = function(fleetarget) {
    let arrive = this.arrive(this.target);
    let flee = this.flee(fleetarget);
    flee.mult(0.3);
    arrive.mult(0.2);
    
    this.applyForce(arrive);
    this.applyForce(flee);
  }
  this.applyForce = function(f) {
    this.acc.add(f);
  }

  this.arrive = function() {
    let desire = Vector.sub(this.target, this.pos);
    let d = desire.mag();
    let speed = this.maxSpeed;
    if(d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed)
    }
    desire.setMag(speed);
    let steer = Vector.sub(desire, this.vel);
    steer.limit(this.maxForce)
    return steer;
  }

  this.flee = function(target) {
    let desire = Vector.sub(target, this.pos);
    let d = desire.mag();
    if(d < 65) {
      // desire.setMag(this.maxSpeed);
      desire.mult(-1);
      let steer = Vector.sub(desire, this.vel);
      steer.limit(this.maxForce)
      return steer;
    } else {
      return new Vector(0,0);
    }
  }

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  this.render = function() {
    ctx.beginPath();
    // console.log(this.color)
    ctx.fillStyle = this.color;
    // ctx.arc(this.pos.x, this.pos.y, pointSize, 0, Math.PI*2)
    ctx.fillRect(this.pos.x, this.pos.y, pointSize,pointSize);
    ctx.fill();
    ctx.closePath();
  }
}