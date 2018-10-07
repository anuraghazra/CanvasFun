function Renderer(context) {
  this.ctx = context;
  this.canvas = this.ctx.canvas;

  this.doFill = true;
  this.doStroke = true;

  this.font = ['Arial', '24px'];
}

Renderer.prototype.noFill = function () {
  this.doFill = false;
  return this;
}
Renderer.prototype.noStroke = function () {
  this.doStroke = false;
  return this;
}

Renderer.prototype.fill = function (r, g, b, a) {
  let color = r;
  if (typeof r === 'number') {
    color = 'rgba(' + (r || 0) + ',' + (g || 0) + ',' + (b || 0) + ',' + a + ')';
    if (arguments.length === 1) {
      color = 'rgba(' + (r || 0) + ',' + (r || 0) + ',' + (r || 0) + ',' + a + ')';
    }
  }
  this.ctx.fillStyle = color;
  this.doFill = true;
  return this;
}
Renderer.prototype.stroke = function (r, g, b, a) {
  let color = r;
  if (typeof r === 'number') {
    color = 'rgba(' + (r || 0) + ',' + (g || 0) + ',' + (b || 0) + ',' + a + ')';
    if (arguments.length === 1) {
      color = 'rgba(' + (r || 0) + ',' + (r || 0) + ',' + (r || 0) + ',' + a + ')';
    }
  }
  this.ctx.strokeStyle = color;
  this.doStroke = true;
  return this;
}
Renderer.prototype.strokeWeight = function (width) {
  this.ctx.lineWidth = width;
  return this;
}
Renderer.prototype.clear = function (w, h) {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  return this;
}
Renderer.prototype.rect = function (x, y, w, h) {
  if (h === undefined) { h = w };
  this.ctx.beginPath();
  this.ctx.rect(x, y, w, h);

  this.doFill && this.ctx.fill();
  this.doStroke && this.ctx.stroke();

  this.ctx.closePath();
  return this;
}

Renderer.prototype.circle = function (x, y, radius) {
  this.ctx.beginPath();
  this.ctx.arc(x, y, radius, 0, Math.PI * 2);
  this.doFill && this.ctx.fill();
  this.doStroke && this.ctx.stroke();
  this.ctx.closePath();
  return this;
}

Renderer.prototype.line = function (x1, y1, x2, y2) {
  this.ctx.beginPath();
  this.ctx.moveTo(x1, y1);
  this.ctx.lineTo(x2, y2);
  this.doFill && this.ctx.fill();
  this.doStroke && this.ctx.stroke();
  this.ctx.closePath();
  return this;
}

Renderer.prototype.image = function(img, x, y, w, h) {
  this.ctx.drawImage(img, x, y, w, h)
}

Renderer.prototype.textFont = function (font) {
  this.font[1] = font;
  return this;
}
Renderer.prototype.textSize = function (size) {
  this.font[0] = size + 'px';
  return this;
}
Renderer.prototype.text = function (str, x, y, w, h) {
  this.ctx.font = this.font.join(' ');
  this.doFill && this.ctx.fillText(str, x, y, w, h)
  this.doStroke && this.ctx.strokeText(str, x, y, w, h)
  return this;
}

Renderer.prototype.blendMode = function(mode) {
  this.ctx.globalCompositeOperation = mode;
}
Renderer.prototype.setAlpha = function(value) {
  this.ctx.globalAlpha = value;
}

Renderer.prototype.translate = function (x, y) {
  if (y === undefined) { y = x }
  this.ctx.translate(x, y);
  return this;
}

Renderer.prototype.rotate = function (deg) {
  this.ctx.rotate(deg);
  return this;
}

Renderer.prototype.transRot = function (x, y, deg) {
  this.ctx.translate(x, y);
  this.ctx.rotate(deg);
  return this;
}

Renderer.prototype.push = function () {
  this.ctx.save();
}
Renderer.prototype.pop = function () {
  this.ctx.restore();
}

Renderer.prototype.smooth = function(qulty) {
  if ('imageSmoothingEnabled' in this.ctx) {
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = qulty;
  }
}

Renderer.prototype.noSmooth = function() {
  if ('imageSmoothingEnabled' in this.ctx) {
    this.ctx.imageSmoothingEnabled = false;
  }
}
