function Particle(x, y, radius, img) {
  this.pos = new Vector(x, y);
  this.vel = new Vector(rand(-0.5, 1), rand(0, -3));
  this.acc = new Vector(rand(-0.5, 0.5), rand(-0.2, 2));

  this.img = img;

  this.size = 5;
  this.alpha = 1;

  this.radius = radius;
  this.dieRate = 0.013

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
    if (this.pos.y < 10) {
      this.acc.y -= this.acc.y; 
      this.vel.y -= this.vel.y; 
    }
    if (this.pos.y > CANVAS_HEIGHT-10) {
      this.acc.y -= this.acc.y; 
      this.vel.y -= this.vel.y; 
    }
    if (this.pos.x < 10) {
      this.acc.x -= this.acc.x; 
      this.vel.x -= this.vel.x; 
    }
    if (this.pos.x > CANVAS_WIDTH-10) {
      this.acc.x -= this.acc.x; 
      this.vel.x -= this.vel.x; 
    }
  }

  this.render = function() {
    c.push();
    c.blendMode('lighter');
    if (this.alpha < 0.09) {
      c.blendMode('destination-out');
    }
    c.alpha(this.alpha);
    c.image(this.img, this.pos.x, this.pos.y, 32, 32);
    c.pop();
    // rr.noStroke();
    // rr.fill(255,255,255,this.alpha);
    // rr.circle(this.pos.x, this.pos.y, this.size,);
  }

}