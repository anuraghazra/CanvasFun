/**
 * @class Bubble
 */
class Bubble {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = Vector.random2D().mult(2);

    this.color = colors[Math.floor(random(colors.length - 1))];
  }


  /**
   * 
   * @param {Vector} target 
   */
  repeal(target) {
    let radius = 100;
    let diff = Vector.sub(this.pos, target)
    let dist = Vector.dist(this.pos, target);
    if (dist < radius) {
      diff.mult(radius / dist);
      this.pos = diff.add(target);
    }
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;

    // have to do this extra step because of mouse deviation
    if (this.pos.x < 0) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = 0;
    if (this.pos.x > width) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = height;
  }

  update() {
    this.edges();
    this.pos.add(this.vel);
  }

  render() {
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}