class Display {
  constructor(x, y) {
    this.segments = 0;
    this.x = x || 0;
    this.y = y || 0;
    this.w = 20;
    this.h = 20;
    this.initialCoords = [
      [this.x + 20, this.y, 80, 20],
      [this.x + 100, this.y + 20, 20, 100],
      [this.x + 100, this.y + 140, 20, 100],
      [this.x + 20, this.y + 240, 80, 20],
      [this.x, this.y + 140, 20, 100],
      [this.x, this.y + 20, 20, 100],
      [this.x + 20, this.y + 120, 80, 20],
    ];
    // reduce size
    this.initialCoords = this.initialCoords.map((i) => {
      return i.map((j) => {
        return (j - 5) * 0.5;
      });
    });
  }

  

  getColor(rgb, val, shift) {
    let r = rgb[0];
    let b = rgb[1];
    let g = rgb[2];
    let a = 255 * ((val >> shift) & 1) + 20;
    return rgba(r, g, b, a);
  }
  drawSegment(x, y, w, h) {
    c.rect(x, y, w, h, 5);
  }
  render(val, rgb) {
    // c.push();
    for (let i = 0; i < this.initialCoords.length; i++) {
      c.blendMode(ADD);
      let color = this.getColor((rgb || [0, 0, 255]), val, Math.abs(i - 6))
      c.fill(color);
      c.shadow(0, 0, 15, color);
      this.drawSegment.apply(this, this.initialCoords[i]);
    }
    // c.pop();
  }
}