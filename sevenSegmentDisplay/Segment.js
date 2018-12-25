function Display() {
  this.segments = 0;

  this.initialCoords = [
    [60, 20, 80, 20], // A
    [140, 40, 20, 100], // B
    [140, 160, 20, 100], // C
    [60, 260, 80, 20], // D
    [40, 160, 20, 100], // D
    [40, 40, 20, 100], // E
    [60, 140, 80, 20], // F
  ];
  
  this.hex = [
    // 123456789
    0x7E, 0x30,
    0x6D, 0x79,
    0x33, 0x5B,
    0x5F, 0x70,
    0x7F, 0x7B,
    // abcdef
    0x77, 0x1F,
    0x4E, 0x3D,
    0x4F, 0x47
  ];
}

Display.prototype.getColor = function (val, shift) {
  let r = 0;
  let b = 0;
  let g = 255;
  let a = 255 * ((val >> shift) & 1) + 20;
  return rgba(r, g, b, a);
}

Display.prototype.drawSegment = function (x, y, w, h) {
  c.rect(x, y, w, h, 10);
}

Display.prototype.render = function (val) {
  c.push();
  for (let i = 0; i < this.initialCoords.length; i++) {
    c.fill(this.getColor(val, Math.abs(i-6)));
    this.drawSegment.apply(this, this.initialCoords[i]);
  }
  c.pop();
}