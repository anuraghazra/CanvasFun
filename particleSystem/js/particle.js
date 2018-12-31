function Particle(x, y, radius, img) {
  this.pos = new Vector(x, y);
  this.vel = new Vector(random(-0.5, 1), random(0, -3));
  this.acc = new Vector(random(-0.5, 0.5), random(-0.5, 0.5));

  this.img = img;

  this.size = 32;
  this.alpha = 1;

  this.radius = radius;
  this.dieRate = 0.013;

  this.update = function () {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
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
    if (this.pos.y < 0) {
      this.acc.y -= this.acc.y; 
      this.vel.y -= this.vel.y; 
    }
    if (this.pos.y > CANVAS_HEIGHT-0) {
      this.acc.y -= this.acc.y; 
      this.vel.y -= this.vel.y; 
    }
    if (this.pos.x < 0) {
      this.acc.x -= this.acc.x; 
      this.vel.x -= this.vel.x; 
    }
    if (this.pos.x > CANVAS_WIDTH-0) {
      this.acc.x -= this.acc.x; 
      this.vel.x -= this.vel.x; 
    }
  }

  this.render = function() {
    c.push();
    c.blendMode(ADD);
    if (this.alpha < 0.19) {
      c.blendMode(DEST_OUT);
    }
    c.alpha(this.alpha);
    c.image(this.img, this.pos.x, this.pos.y, this.radius, this.radius);
    c.pop();
  }

}