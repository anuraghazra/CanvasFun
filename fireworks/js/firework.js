function Firework(x, y) {
  this.hue = random(0, 360);

  if (x && y) {
    this.firework = new Particle(x, CANVAS_HEIGHT, this.hue);
  } else {
    this.firework = new Particle(random(CANVAS_WIDTH), CANVAS_HEIGHT, this.hue);
  }
  this.exploded = false;

  this.particles = [];

  this.update = function () {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1)
      }
    }
  }

  this.explode = function () {
    for (let i = 0; i < 100; i++) {
      this.hue = random(minHue.value, maxHue.value);
      let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hue, true);
      this.particles.push(p);
    }
  }

  this.isDead = function () {
    if (this.particles.length === 0 && this.exploded) {
      return true;
    } else {
      return false;
    }
  }

  this.render = function () {
    if (!this.exploded) {
      this.firework.render();
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].render();
    }
  }

}