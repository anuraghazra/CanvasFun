class Tile {
  constructor(x, y, color) {
    this.tileWidth = 50;
    this.tileHeight = 25;
    this.x = (x - y) * this.tileWidth / 2;
    this.y = (x + y) * this.tileHeight / 2;
    this.color = color;
  }


  render() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.tileWidth / 2, this.tileHeight / 2);
    ctx.lineTo(0, this.tileHeight);
    ctx.lineTo(-this.tileWidth / 2, this.tileHeight / 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  
    ctx.restore();
  }
  
}