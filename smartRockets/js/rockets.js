function Rocket(dna) {
  this.pos = new Vector(100, height / 2);
  this.vel = new Vector(1, 0);
  this.acc = new Vector(0, 0);

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;
  this.complete = false;
  this.crashed = false;
  this.crashedWithWall = false;
  this.timeTaken = 0;
  this.tooClose = false;


  this.canvasWidth = width;
  this.canvasHeight = height;

  this.radius = 10;
  this.maxSpeed = 2;


  this.calcFitness = function () {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = (map(d, 0, width, width, 0));
    // this.fitness = -1/d;

    if (this.complete) {
      this.fitness *= 10;
    }
    if (this.tooClose) {
      this.fitness *= 5;
    }
    if (this.crashed) {
      this.fitness /= 1;
    }
    if (this.crashedWithWall) {
      // this.fitness = 0;
      this.fitness /= 1;
    }

    return this.fitness;
  }

  this.applyForce = function (f) {
    this.acc.add(f);
  }
  // Update Position
  this.update = function () {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);

    if (d < 10) {
      this.complete = true;
      this.pos = target.copy();
    }
    if (d < 30) {
      this.tooClose = true;
    }

    for (let i = 0; i < obstacles.length; i++) {
      let rect = obstacles[i];
      if ((this.pos.x > rect.x && this.pos.x < rect.x + rect.w) &&
        (this.pos.y > rect.y && this.pos.y < rect.y + rect.h)) {
        // this.crashed = true;
        this.crashedWithWall = true;
      }
    }

    if (this.pos.x < 0 || this.pos.x > width) {
      this.crashed = true;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.crashed = true;
    }

    
    if (!this.complete && !this.crashed && !this.crashedWithWall) {
      this.applyForce(this.dna.genes[count]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(this.maxSpeed);
      this.timeTaken = count;
    }
  }

  /**
   * Render Agent
   */
  this.render = function () {

    if (true) {

      ctx.beginPath();

      ctx.fillStyle = 'rgba(0,0,0,0.4)';

      let angle = this.vel.heading();

      ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.rotate(angle);
      ctx.moveTo(this.radius, 0);
      ctx.lineTo(-this.radius, -this.radius + 2);
      ctx.lineTo(-this.radius, this.radius - 4);
      ctx.lineTo(this.radius, 0);
      ctx.fill();

      ctx.closePath();
      ctx.restore();
    }

  }
}