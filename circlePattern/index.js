let c = new Candy();

c.createCanvas(500, 500);

c.createScreenBuffer('trails');

let points = [];

points.push(new Point(0, 100, 0.03, 'rgba(255,0,0,0.2)'));
points.push(new Point(0, 150, 0.1, 'rgba(0,255,255,0.2)'));
points.push(new Point(0, 10, 0.2, 'rgba(255,0,0,0.5)'));
points.push(new Point(0, 250, -0.005, 'rgba(0,255,0,0.2)'));

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


let osc = c.screenBuffers.trails
osc.strokeWeight(0.5);

animate();
function animate() {
  c.clear('black');


  for (let i = 0; i < points.length; i++) {
    points[i].update();
    points[i].render();
  
    osc.push();
    osc.stroke(points[i].color);
    osc.translate(250, 250);
    osc.begin();
    osc.from(points[0].x, points[0].y);
    osc.to(points[(i)%points.length].x, points[(i)%points.length].y);
    osc.stroke();
    osc.close();
    osc.pop();
    
  }
  c.putScreenBuffer(osc);

  c.loop(animate);
}