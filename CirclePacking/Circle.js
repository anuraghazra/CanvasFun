class Circle {

  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.r = 1;
    this.growing = true;
  }

  

  grow() {
    if (this.growing) {
      this.r += 0.3;
    }
  }

  edges() {
    return (
      this.x+this.r > CANVAS_WIDTH || this.x-this.r < 0 ||
      this.y+this.r > CANVAS_HEIGHT || this.y-this.r < 0
    )
  }

  render() {
    // c.stroke(255);
    c.noStroke();
    c.fill(this.color);
    c.circle(this.x, this.y, this.r);
  }
}