function Particle(x, y, radius, img) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(-5, 1), random(0, -10));
  this.acc = createVector(random(-5, 10), random(-5, 10));

  this.img = img;

  this.size = 32;
  this.alpha = 1;

  this.radius = radius || 5;
  this.dieRate = 0.013;
  this.gravity = createVector(0, 0.1);

  this.update = function () {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.add(this.gravity)
    this.acc.mult(0);

    this.alpha -= this.dieRate;
    if (this.alpha < 0) {
      this.alpha = 0;
    }
  }

  this.isDead = function () {
    if (this.alpha <= 0) {
      return true;
    }
    return false;
  }

  this.boundary = function () {
    if (this.pos.y < 100) {
      this.vel.y = -this.vel.y;
      this.vel.mult(0.99);
    }
    if (this.pos.y > 500) {
      this.vel.y = -this.vel.y; 
      this.vel.mult(0.99);
    }
    if (this.pos.x < 0) {
      this.acc.x -= this.acc.x; 
      this.vel.x = -this.vel.x; 
    }
    if (this.pos.x > width-0) {
      this.vel.x = -this.vel.x; 
      this.vel.mult(0.99);
    }
  }

  this.render = function() {
    push();
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.radius);
    pop();
  }

}