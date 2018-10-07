function norm(value, min, max) {
  return (value - min) / (max - min);
}

function lerp(norm, min, max) {
  return (max - min) * norm + min;
}

function map(value, sMin, sMax, dMin, dMax) {
  return lerp(norm(value, sMin, sMax), dMin, dMax)
}

function dist(px, py, qx, qy) {
  let dx = px-qx;
  let dy = py-qy;
  return Math.sqrt(dx*dx+dy*dy);
}

function renderObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    let rect = obstacles[i];
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fill();
  }
}

function random(min, max) {
  if (max === undefined) {
    return Math.random() * min;
  } else {
    return min + Math.random() * (max - min);
  }
}
function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1))
}


function drawObstacle(x, y, w, h) {
  let m = {};
  canvas.addEventListener('mousedown', function(e) {
    m.dx = e.offsetX;
    m.dy = e.offsetY;
  })
  canvas.addEventListener('mouseup', function(e) {
    m.ux = e.offsetX;
    m.uy = e.offsetY;
    m.w = m.ux-m.dx;
    m.h = m.uy-m.dy;

    obstacles.push({
      x : m.dx,
      y : m.dy,
      w : m.w,
      h : m.h 
    });

    population.reEvaluate();
    population.evaluate();
    population.selection();
    count = 0;

  });

}
