class Point {
  constructor(r, time, color, angle) {
    this.angle = angle || 0;
    this.r = r,
    this.time = time;
    this.t = 0;
    this.color = color || 'rgba(255,255,255,0.2)';
  }
  update() {
    this.t += this.time;
    this.x = Math.cos(this.angle + this.t) * this.r;
    this.y = Math.sin(this.angle + this.t) * this.r;
  }
  render() {
    c.push();
    c.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    c.fill('white');
    c.circle(this.x, this.y, 2);
    c.fill();
    c.pop();
  }
}
