function renderOnCanvas(text) {
  oscandy.clear();
  oscandy.noFill();
  oscandy.strokeWeight(3);
  oscandy.textAlign(CENTER);
  oscandy.textBaseline(MIDDLE);
  oscandy.textFont('Fugaz One');
  oscandy.textSize(150);
  oscandy.text(text, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2,CANVAS_WIDTH,100);
}

function getPixelCoords() {
  let gridX = gridY = 3;
  let width = CANVAS_WIDTH;
  let height = CANVAS_HEIGHT;

  let newPos = [];
  let idata = oscandy.ctx.getImageData(0, 0, width, height);
  let buffer32 = new Int32Array(idata.data.buffer);
  for (let y = 0; y < height; y += gridY) { //h
    for (let x = 0; x < width; x += gridX) { //w
      if (buffer32[(y * width + x)]) {
        newPos.push({ x, y })
      }
    }
  }
  idata = [];
  buffer32 = [];

  // while (newPos.length < particles.length) {
  //   particles.splice(random(0, particles.length - 1), 1)
  // }
  while (newPos.length > particles.length) {
    particles.push(new Point(particles[randomInt(0,particles.length-1)].pos.x,
                             particles[randomInt(0,particles.length-1)].pos.y, 
                             'rgba(255,255,255,0.9)', true))
  }
  let requireLen = (particles.length - newPos.length);

  // reset random
  if (particles.length > requireLen) {
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      if(p.active) {
        p.target.x = random(CANVAS_WIDTH);
        p.target.y = random(CANVAS_HEIGHT);
        p.color = 'rgba(255,255,255,0.3)';
        p.active = false;
      }
    }
  }

  // set as text
  for (let i = 0; i < particles.length; i++) {
    if (i > requireLen) {
      let p = particles[i];
      for (let j = 0; j < newPos.length; j++) {
        p.acc.x = random(-5, 5);
        p.acc.y = random(-5, 5);
        p.target.x = newPos[(i + j) % newPos.length].x;
        p.target.y = newPos[(i + j) % newPos.length].y;
        p.color = 'rgba(255,255,255,0.9)';
        p.active = true;
      }
    }
  }
}