window.onload = function () {
  let canvas = document.getElementById('c');
  let ctx = canvas.getContext('2d');
  let WIDTH = canvas.width = 800;
  let HEIGHT = canvas.height = 800;
  let v = 0;

  let noise = new Noise();

  function perlinize(x, y) {
    const scale = 0.01;
    const strength = 50;
    const angle = noise.perlin2(x * scale, y * scale) + Math.PI
    return {
      x: x + Math.cos(angle) * strength,
      y: y + Math.sin(angle) * strength,
    }
  }
  function getShading(x, y) {
    const scale = 0.01;
    const n = (noise.perlin2(x * scale, y * scale) + 1) / 2;
    const shade = map(n, -1, 1, 255, 0);
    return "rgb(" + shade + "," + shade + "," + shade + ")";
  }

  function hexagon(x, y, r) {
    let angle = 0;
    for (let i = 0; i < 6; i++) {
      const p = perlinize(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
      ctx.lineTo(p.x, p.y);
      angle += Math.PI / 3;
    }
    ctx.closePath();
  }



  function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    v += 0.1

    const radius = 5;
    const ydelta = Math.sin(Math.PI / 3) * radius;
    let even = true;
    // draw grid
    for (let y = 0; y < 900; y += ydelta) {
      ctx.save();
      even && ctx.translate(radius * 1.5, 0);
      for (let x = 0; x < 900; x += radius * 3) {
        ctx.beginPath();
        hexagon(x + 3, y + 3, radius);
        ctx.fillStyle = getShading(x + 3, y + 3);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
      even = !even;
    }

    requestAnimationFrame(animate);
  }
  animate();

}