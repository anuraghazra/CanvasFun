let c = new Candy();

c.createCanvas(500, 500);

c.createScreenBuffer('trails');

let points = [];

points[0] = new Point(0, 100, 0.03, 'rgba(255,0,0,0.2)');
points[1] = new Point(0, 150, 0.1, 'rgba(0,255,255,0.2)');
points[2] = new Point(0, 10, 0.2, 'rgba(255,0,0,0.5)');
points[3] = new Point(0, 250, -0.005, 'rgba(0,255,0,0.2)');

function Point(angle, r, time, color) {
  this.angle = angle;
  this.r = r,
  this.time = time;
  this.t = 0;
  this.color = color || 'rgba(255,255,255,0.2)';
}
Point.prototype.update = function () {
  this.t += this.time;
  this.x = Math.cos(this.angle + this.t) * this.r;
  this.y = Math.sin(this.angle + this.t) * this.r;
}
Point.prototype.render = function () {
  c.push()
  c.translate(250, 250);
  c.fill('white');
  c.circle(this.x, this.y, 2);
  c.fill();
  c.pop()
}

let t = 0;
animate();

c.screenBuffers.trails.strokeWeight(0.5);

function animate() {
  c.clear('black');


  for (let i = 0; i < points.length; i++) {
    points[i].update();
    points[i].render();
  
    c.screenBuffers.trails.push();
    c.screenBuffers.trails.stroke(points[i].color);
    c.screenBuffers.trails.translate(250, 250);
    c.screenBuffers.trails.begin();
    c.screenBuffers.trails.from(points[0].x, points[0].y);
    c.screenBuffers.trails.to(points[(i)%points.length].x, points[(i)%points.length].y);
    c.screenBuffers.trails.stroke();
    c.screenBuffers.trails.close();
    c.screenBuffers.trails.pop();
    
  }
  c.putScreenBuffer(c.screenBuffers.trails);

  c.loop(animate);
}