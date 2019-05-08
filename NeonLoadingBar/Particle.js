/**
 * @class Particle
 * @author <https://anuraghazra.github.io>
 */
class Particle {
  constructor() {
    const random = Math.random()
    this.speed = 0.5 + random * 1.3;

    this.x = 0;
    this.y = (HEIGHT / 2) + (Math.random() * 10 - Math.random() * 10)

    this.offset = 0.1 + Math.random() * 0.2;
    this.a = 0;

    this.radius = random * 1.3;
    this.color = "rgba(25, 255, 157, 0.05)";
  }

  render(ctx) {
    ctx.beginPath();
    ctx.globalCompositeOperation = 'lighter';
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    if (this.x > WIDTH / 5.5) {
      this.offset = 0.1 + Math.random() * 0.8;
    }

    this.x += Math.cos(this.a) * this.offset + 1.0;
    this.y += Math.sin(this.a) * this.offset;
    this.a += Math.random() * 0.7 - 0.4;
  }
}