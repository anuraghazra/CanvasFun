class Block {
  constructor(x, y, z, tileWidth) {
    this.top = '#eeeeee';
    this.right = '#cccccc';
    this.left = '#999999';
    this.tileWidth = tileWidth || 50;
    this.tileHeight = this.tileWidth/2;
    this.x = (x - y) * this.tileWidth / 2;
    this.y = (x + y) * this.tileHeight / 2;
    this.z = z;
  }

  setZ(value) {
    this.z = value || 0;
  }

  render() {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    // draw top
    ctx.beginPath();
    ctx.moveTo(0, -this.z * this.tileHeight);
    ctx.lineTo(this.tileWidth/2, this.tileHeight/2 - this.z * this.tileHeight);
    ctx.lineTo(0, this.tileHeight - this.z * this.tileHeight);
    ctx.lineTo(-this.tileWidth/2, this.tileHeight/2 - this.z * this.tileHeight);
    ctx.closePath();
    ctx.fillStyle = this.top;
    ctx.fill();
  
    // left 
    ctx.beginPath();
    ctx.moveTo(-this.tileWidth/2, this.tileHeight/2 - this.z*this.tileHeight)  
    ctx.lineTo(0,this.tileHeight - this.z*this.tileHeight);
    ctx.lineTo(0, this.tileHeight);
    ctx.lineTo(-this.tileWidth / 2, this.tileHeight/2)
    ctx.closePath();
    ctx.fillStyle = this.left;
    ctx.fill();
  
    // right 
    ctx.beginPath();
    ctx.moveTo(this.tileWidth/2, this.tileHeight/2 - this.z*this.tileHeight)  
    ctx.lineTo(0,this.tileHeight - this.z*this.tileHeight);
    ctx.lineTo(0, this.tileHeight);
    ctx.lineTo(this.tileWidth / 2, this.tileHeight/2)
    ctx.closePath();
    ctx.fillStyle = this.right;
    ctx.fill();
  
    ctx.restore();
  
  }
}
