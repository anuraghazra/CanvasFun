function Particle(x, y, hue, firework) {
  this.pos = new Vector(x, y);

  this.firework = firework;
  if (this.firework) {
    this.vel = Vector.random2D()
    this.vel.mult(random(3,5));
    this.size = 1.5;
  } else {
    this.vel = new Vector(0, random(-8,-12));
    this.size = 2;
  }

  this.hue = hue;
  this.alpha = 1;
  
  this.acc = new Vector(0, random(-1,-2));


  this.dieRate = 0.02;


  this.applyForce = function(f) {
    this.acc.add(f)
  }

  this.update = function () {
    if(this.firework) {
      this.vel.mult(0.95);
      this.alpha -= this.dieRate;
      if (this.alpha < 0) {
        this.alpha = 0;
      }
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.isDead = function () {
    if (this.alpha <= 0) {
      return true;
    }
    return false;
  }

  this.render = function () {
    this.brightness = random(10,100);
    this.staturation = random(50,90);
    c.push();
    c.blendMode(ADD);
    c.fill(hsla(this.hue, this.staturation, this.brightness, this.alpha));
    c.circle(this.pos.x, this.pos.y, this.size);
    c.pop();
  }

}