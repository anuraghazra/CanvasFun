class CirclePattern {

  constructor() {
    this.points = [];
  }

  add(radius, speed, color, angle) {
    this.points.push(new Point(
      radius,
      speed,
      color,
      angle
    ));
    return this;
  }

  update() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].update();
      this.points[i].render();
    }
  }

  render(buffer) {
    for (let i = 0; i < this.points.length; i++) {
      buffer.push();
      buffer.stroke(this.points[i].color);
      buffer.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
      buffer.begin();
      buffer.from(this.points[0].x, this.points[0].y);
      buffer.to(this.points[(i) % this.points.length].x, this.points[(i) % this.points.length].y);
      buffer.stroke();
      buffer.close();
      buffer.pop();

    }
    c.putScreenBuffer(buffer);
  }

}