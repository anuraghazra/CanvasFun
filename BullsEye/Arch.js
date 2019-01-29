class Arch {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.angle = 0;
    this.arrows = [];
    this.force = 10;

    this.forceA = 0;
    this.forceB = 0;

    c.canvas.addEventListener('mousemove', () => {
      let mouse = new Vector(mouseX, mouseY);
      let d = mouse.dist(this.pos);
      this.force = -(d / -1) / 7;
    });

    c.canvas.addEventListener('mouseup', () => {
      this.forceA = this.pos.x - this.pos.y;
      let arr = new Arrow(this.pos.x, this.pos.y);
      arr.setForce(this.force);
      arr.setAngle(this.angle);
      this.arrows.push(arr);
    });
  }

  update() {
    let x = mouseX - this.pos.x;
    let y = mouseY - this.pos.y;
    let angle = Math.atan2(y, x);
    this.angle = angle;

    for (let i = 0; i < this.arrows.length; i++) {
      this.arrows[i].update();
    }
  }
  
  render() {

    c.push();
    c.translate(this.pos.x, this.pos.y);
    c.rotate(this.angle);
    c.fill(255);
    c.rect(1, -25, 2, 50);

    c.begin();
    c.line(0, 0, 2, 50)
    c.close();
    c.pop();
    for (let i = 0; i < this.arrows.length; i++) {
      this.arrows[i].render();
      this.arrows[i].handleCollision(target);
    }
  }
}