function renderOnCanvas(text) {
  // osc.clear();
  osc.noFill();
  osc.strokeWeight(3);
  osc.textAlign(CENTER);
  osc.textBaseline(MIDDLE);
  osc.textFont(config.fontFamily);
  osc.textSize((windowWidth / windowHeight) * FONT_SIZE);
  osc.text(text, windowWidth / 2, windowHeight / 2, windowWidth, 100);
}

function getPixelCoords() {
  let gridX = gridY = 3;
  let w = windowWidth;
  let h = windowHeight;

  let newPos = [];

  // get pixel coordinates
  let imagedata = osc.ctx.getImageData(0, 0, w, h);
  let pixels = new Int32Array(imagedata.data.buffer);
  for (let x = 0; x < w; x += gridX) {
    for (let y = 0; y < h; y += gridY) {
      if (pixels[(x + y * w)]) {
        newPos.push({ x, y })
      }
    }
  }

  // add new particles
  while (newPos.length > particles.length) {
    let newp = new Point(
      particles[randomInt(0, particles.length - 1)].pos.x,
      particles[randomInt(0, particles.length - 1)].pos.y,
      'rgba(255,255,255,0.9)', true
    )
    particles.push(newp);
  }
  let requireLen = (particles.length - newPos.length);

  // Set Text Target
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    if (p.active) p.reset();
    if (i > requireLen) {
      for (let j = 0; j < newPos.length; j++) {
        p.blast();
        p.setTarget(newPos[(i + j) % newPos.length].x, newPos[(i + j) % newPos.length].y)
        p.color = 'rgba(255,255,255,0.9)';
        p.active = true;
      }
    }
  }
}