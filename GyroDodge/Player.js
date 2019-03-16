/**
 * @class Player
 */
class Player {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.radius = 8;
    this.tailDots = [];
    this.tailCons = [];

    this.tiltLR = 0;
    this.tiltFB = 0;

    this.isUsingKeyboard = false;

    this.rightPressed = false;
    this.leftPressed = false;
    this.downPressed = false;
    this.upPressed = false;

    if (!(window.DeviceOrientationEvent && 'ontouchstart' in window)) {
      // alert("Sorry, your browser doesn't support Device Orientation")
      this.isUsingKeyboard = true;
      window.addEventListener('keydown', (e) => {
        if (event.keyCode == 39) {
          this.rightPressed = true;
        }
        else if (event.keyCode == 37) {
          this.leftPressed = true;
        }
        if (event.keyCode == 40) {
          this.downPressed = true;
        }
        else if (event.keyCode == 38) {
          this.upPressed = true;
        }
      });
      window.addEventListener('keyup', (e) => {
        if (event.keyCode == 39) {
          this.rightPressed = false;
        }
        if (event.keyCode == 37) {
          this.leftPressed = false;
        }
        if (event.keyCode == 40) {
          this.downPressed = false;
        }
        if (event.keyCode == 38) {
          this.upPressed = false;
        }
      });
    } else {
      window.addEventListener('deviceorientation', (e) => {
        this.tiltLR = e.gamma;
        this.tiltFB = e.beta;
        let gyro = createVector(this.tiltLR, this.tiltFB);
        this.applyForce(gyro);
      });
    }
  }

  useKeyboard() {
    if (this.rightPressed) {
      this.tiltLR = +20;
    }
    else if (this.leftPressed) {
      this.tiltLR = -20;
    }
    if (this.downPressed) {
      this.tiltFB = +20;
    }
    else if (this.upPressed) {
      this.tiltFB = -20;
    }
    let gyro = createVector(this.tiltLR, this.tiltFB);
    this.applyForce(gyro);
  }

  applyForce(f) { this.acc.add(f) }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.isUsingKeyboard) {
      this.useKeyboard()
    }
  }

  shoot() {
    if (!game.gameover) {
      game.bullets.push(new Bullet(this.pos, this.vel.heading()));
      game.sounds.pew.amp(0.3);
      game.sounds.pew.play();
    };
  }

  collidePointPoly(px, py, target, vertices) {
    var collision = false;
    // go through each of the vertices, plus the next vertex in the list
    var next = 0;
    for (var current = 0; current < vertices.length; current++) {
      // get next vertex in list if we've hit the end, wrap around to 0
      next = current + 1;
      if (next == vertices.length) next = 0;
      // get the PVectors at our current position this makes our if statement a little cleaner
      var vc = vertices[current];
      var vn = vertices[next];
      let vcy = target.pos.y + vc.y;
      let vny = target.pos.y + vn.y;
      let vcx = target.pos.x + vc.x;
      let vnx = target.pos.x + vn.x;
      if (((vcy > py && vny < py) || (vcy < py && vny > py)) &&
        (px < (vnx - vcx) * (py - vcy) / (vny - vcy) + vcx)) {
        collision = !collision;
      }
    }
    return collision;
  }
  hit(target) {
    return this.collidePointPoly(this.pos.x, this.pos.y, target, target.vertices);
  }

  render() {

    push();
    translate(this.pos.x, this.pos.y);
    // text(this.tailDots.length, 100, 100)
    fill(255);

    ellipse(0, 0, this.radius, this.radius);
    // triangle(-this.radius, this.radius, this.radius, this.radius,0, -this.radius);
    pop();
  }
}