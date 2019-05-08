class Window {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = Vector.random2D().mult(10);

    this.win = window.window.open("", Math.random(), "resizable=1, menubar=yes");
    this.win.moveTo(this.pos.x, this.pos.y);

    this.width = this.win.outerWidth;
    this.height = this.win.outerHeight;

  }

  close() {
    this.win.close();
  }

  hits(other) {
    let left = this.pos.x
    let right = this.pos.x + this.width;
    // let top = this.pos.y;
    // let bottom = this.pos.y + this.height;

    let oleft = other.pos.x
    let oright = other.pos.x + other.width;
    // let otop = other.pos.y;
    // let obottom = other.pos.y + other.height;

    return !(left >= oright ||
      right <= oleft)
  }

  update() {
    this.width = this.win.outerWidth;
    this.height = this.win.outerHeight;
    if (this.pos.x + this.width >= window.screen.availWidth || this.pos.x <= 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y + this.height >= window.screen.availHeight || this.pos.y <= 0) {
      this.vel.y *= -1;
    }

    this.vel.add(gravity);
    this.vel.mult(0.99);
    this.pos.add(this.vel);

    this.win.moveTo(this.pos.x, this.pos.y);

    console.log(this.pos.x, this.pos.y, this.width, this.height);
  }
}