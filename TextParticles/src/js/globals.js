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
  let dx = px - qx;
  let dy = py - qy;
  return Math.sqrt(dx * dx + dy * dy);
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


function renderImage(x, y, w, h) {
  oSCtx.drawImage(img, x, y, w, h);

}

function renderText(text, x, y) {
  oSCtx.fillStyle = 'red';
  oSCtx.font = '120px cursive';
  oSCtx.fillText(text, x, y);
  oSCtx.fill();

  oSCtx.fillStyle = 'blue';
  oSCtx.font = '120px cursive';
  oSCtx.fillText('blue', 50, 80);
  oSCtx.fill();
}

function getPixelCoords() {
  let gridX = gridY = pointSize;
  var idata = oSCtx.getImageData(0, 0, width, height);
  var buffer32 = new Int32Array(idata.data.buffer);
  let colors = [];
  
  for (var i = 0; i < idata.data.length; i+=4) {
    color = 'rgb('+idata.data[i+0]+','+idata.data[i+1]+','+idata.data[i+2]+')';
    colors.push(color);
  }
  for (var y = 0; y < height; y += gridY) {
    
    for (var x = 0; x < width; x += gridX) {
      if (buffer32[(y * width + x)]) {
        points.push(new Point(x,y,colors[y*height+x]));        
      }
    }
  }
}