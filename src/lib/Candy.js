/**
 * Candy.js
 * @version v1.0.1
 * @constructor Candy
 * @author Anurag Hazra <hazru.anurag@gmail.com>
 * @description Easy to use canvas renderer similar to p5.Renderer
 * @param {string} canvas 
 */
function Candy(canvas) {
  // optional constructor
  if (!(this instanceof Candy)) {
    return new Candy(canvas);
  };

  if (canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    CANVAS_WIDTH = this.canvas.width;
    CANVAS_HEIGHT = this.canvas.height;
  }

  // id of canvas
  this.idIndex = 0;

  // Rendering Context
  this.doFill = true;
  this.doStroke = true;

  this.font = ['Arial', '24px'];

  // loop?
  this.animateLoop = true;

  this._initCanvas();
}

Candy.prototype.createCanvas = function (w, h) {
  this.canvas = document.createElement('canvas');
  this.canvas.id = 'CandyCanvas-' + this.idIndex;
  this.canvas.width = (w || 200);
  this.canvas.height = (h || 200);
  CANVAS_WIDTH = this.canvas.width;
  CANVAS_HEIGHT = this.canvas.height;
  this.ctx = this.canvas.getContext('2d');

  document.body.appendChild(this.canvas);
  this.index++;
  return this;
}

Candy.prototype.createOffscreenBuffer = function () {
  let canvas = document.createElement('canvas');
  canvas.id = 'CandyCanvasOffscreen-' + this.idIndex;
  canvas.width = this.canvas.width;
  canvas.height = this.canvas.height;
  let ctx = canvas.getContext('2d');
  return new Candy(canvas);
}

Candy.prototype._initCanvas = function () {
  window.addEventListener('DOMContentLoaded', function () {
    if (window.animate) {
      animate();
    }
  }.bind(this));
}

Candy.prototype.noLoop = function () {
  this.animateLoop = false;
}
Candy.prototype.loop = function (func) {
  if (this.animateLoop) {
    if (window.animate) {
      requestAnimationFrame(animate);
    } else {
      requestAnimationFrame(func)
    }
  }
}

Candy.prototype._parseColor = function (r, g, b, a) {
  let color = r;
  if (typeof r === 'number') {
    color = rgb(r, g, b);
  }
  if (typeof r === 'number' && (g) && (!b) && (!a)) {
    a = g;
    color = rgb(r, r, r, g)
  }
  if (typeof r === 'number' && typeof g === 'number' && typeof b === 'number') {
    color = rgb(r, g, b, a)
  }
  return color;
}

Candy.prototype.noFill = function () {
  this.doFill = false;
  return this;
}
Candy.prototype.noStroke = function () {
  this.doStroke = false;
  return this;
}

Candy.prototype.fill = function (r, g, b, a) {
  let color = this._parseColor(r, g, b, a)

  // Array
  if (typeof r === 'object') {
    color = this._parseColor(r[0], r[1], r[2], (r[3] || 1));
    this.ctx.fillStyle = color;
    this.doFill = true;
    return this;
  }

  this.ctx.fillStyle = color;
  this.doFill = true;
  if (r === undefined) {
    this.ctx.fill();
    return this;
  }
  return this;
}
Candy.prototype.stroke = function (r, g, b, a) {
  let color = this._parseColor(r, g, b, a);

  // Array
  if (typeof r === 'object') {
    color = this._parseColor(r[0], r[1], r[2], (r[3] || 1));
    this.ctx.strokeStyle = color;
    this.doStroke = true;
    return this;
  }
  this.ctx.strokeStyle = color;
  this.doStroke = true;
  if (r === undefined) {
    this.ctx.stroke();
    return this;
  }
  return this;
}

// Gradient
Candy.prototype.linearGradient = function (x, y, a, s, colors) {
  let grad = this.ctx.createLinearGradient(x, y, a, s);
  for (let i = 0; i < colors.length; i++) {
    let ratio = i / colors.length
    let percent = colors[i].split('-');
    if (percent[1] !== undefined) {
      ratio = percent[1];
    }
    grad.addColorStop(ratio, percent[0]);
  }
  return grad;
}
// Gradient
Candy.prototype.radialGradient = function (x, y, innerRadius, outerRadius, colors) {
  let grad = this.ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
  for (let i = 0; i < colors.length; i++) {
    let ratio = i / colors.length
    let percent = colors[i].split('-');
    if (percent[1] !== undefined) {
      ratio = percent[1];
    }
    grad.addColorStop(ratio, percent[0]);
  }
  return grad;
}

Candy.prototype.strokeWeight = function (width) {
  this.ctx.lineWidth = width;
  return this;
}

Candy.prototype.clear = function (r, g, b, a) {
  let c = this._parseColor(r, g, b, a);
  if (c) {
    this.ctx.fillStyle = c;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  } else {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  }
}

Candy.prototype.rect = function (x, y, w, h, tl, tr, br, bl) {
  if (h === undefined) { h = w };
  if (tr === undefined) { tr = tl };
  if (br === undefined) { br = tr };
  if (bl === undefined) { bl = br };
  if (tl) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + tl, y);
    this.ctx.arcTo(x + w, y, x + w, y + h, tr);
    this.ctx.arcTo(x + w, y + h, x, y + h, br);
    this.ctx.arcTo(x, y + h, x, y, bl);
    this.ctx.arcTo(x, y, x + w, y, tl);
    this.doFill && this.ctx.fill();
    this.doStroke && this.ctx.stroke();
    this.ctx.closePath();
    return this;
  } else {
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);

    this.doFill && this.ctx.fill();
    this.doStroke && this.ctx.stroke();

    this.ctx.closePath();
    return this;
  }
}

Candy.prototype.triangle = function (x, y, w, h) {
  this.ctx.beginPath();
  this.ctx.moveTo(x, y);
  this.ctx.lineTo(x + (w / 2), y - h);
  this.ctx.lineTo(x + w, y);
  this.ctx.closePath();

  this.doFill && this.ctx.fill();
  this.doStroke && this.ctx.stroke();
}

Candy.prototype.circle = function (x, y, radius) {
  this.ctx.beginPath();
  this.ctx.arc(x, y, radius, 0, Math.PI * 2);
  this.doFill && this.ctx.fill();
  this.doStroke && this.ctx.stroke();
  this.ctx.closePath();
  return this;
}

Candy.prototype.line = function (x1, y1, x2, y2) {
  this.ctx.beginPath();
  this.ctx.moveTo(x1, y1);
  this.ctx.lineTo(x2, y2);
  this.doFill && this.ctx.fill();
  this.doStroke && this.ctx.stroke();
  this.ctx.closePath();
  return this;
}

Candy.prototype.begin = function () {
  this.ctx.beginPath();
}
Candy.prototype.close = function () {
  this.ctx.closePath();
}
Candy.prototype.from = function (x, y) {
  if (typeof x === 'object') {
    this.ctx.moveTo(x.x, x.y)
  }
  this.ctx.moveTo(x, y);
  return this;
}
Candy.prototype.to = function (x, y) {
  if (typeof x === 'object') {
    this.ctx.lineTo(x.x, x.y)
  }
  this.ctx.lineTo(x, y)
  return this;
}

Candy.prototype.image = function (img, x, y, w, h) {
  this.ctx.drawImage(img, x, y, w, h)
}

Candy.prototype.textAlign = function (value) {
  this.ctx.textAlign = value;
}
Candy.prototype.textBaseline = function (value) {
  this.ctx.textBaseline = value;
}

Candy.prototype.textFont = function (font) {
  this.font[1] = font;
  return this;
}
Candy.prototype.textSize = function (size) {
  this.font[0] = size + 'px';
  return this;
}
Candy.prototype.text = function (str, x, y, w, h) {
  // this.ctx.textAlign = 'end';
  // this.ctx.textBaseline = 'bottom';
  this.ctx.font = this.font.join(' ');
  this.doFill && this.ctx.fillText(str, x, y, w, h)
  this.doStroke && this.ctx.strokeText(str, x, y, w, h)
  return this;
}

Candy.prototype.blendMode = function (mode) {
  this.ctx.globalCompositeOperation = mode;
}
Candy.prototype.alpha = function (value) {
  this.ctx.globalAlpha = value;
}

Candy.prototype.translate = function (x, y) {
  if (y === undefined) { y = x }
  this.ctx.translate(x, y);
  return this;
}

Candy.prototype.rotate = function (deg) {
  this.ctx.rotate(deg);
  return this;
}

Candy.prototype.transRot = function (x, y, deg) {
  this.ctx.translate(x, y);
  this.ctx.rotate(deg);
  return this;
}

Candy.prototype.push = function () {
  this.ctx.save();
}
Candy.prototype.pop = function () {
  this.ctx.restore();
}

Candy.prototype.smooth = function (qulty) {
  if ('imageSmoothingEnabled' in this.ctx) {
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = qulty;
  }
}

Candy.prototype.noSmooth = function () {
  if ('imageSmoothingEnabled' in this.ctx) {
    this.ctx.imageSmoothingEnabled = false;
  }
}


/////////////////////////
//Global Utils///////////
/////////////////////////

// UTILITY FUNCTIONS
function rgb(r, g, b, a) {
  if (g === undefined) g = r;
  if (b === undefined) b = r;
  if (a === undefined) a = 1;
  if (a > 1) { a = a / 255 };
  return 'rgba(' + clamp(r, 0, 255) + ',' + clamp(g, 0, 255) + ',' + clamp(b, 0, 255) + ',' + clamp(a, 0, 1) + ')'
}
function hsla(h, s, l, a) {
  return 'hsla(' + h + ', ' + clamp(s, 0, 100) + '%, ' + clamp(l, 0, 100) + '%, ' + clamp((a||1), 0, 1) + ')';
};
function randomRGB() {
  let r = randomInt(255);
  let g = randomInt(255);
  let b = randomInt(255);
  return rgb(r, g, b);
}
function randomHSLA(a) {
  let h = random(360);
  let s = random(100);
  let l = random(100);
  a = (a === undefined) ? 1 : a;
  return hsla(h, s, l, a);
}

function norm(value, min, max) {
  return (value - min) / (max - min);
}
function lerp(norm, min, max) {
  return (max - min) * norm + min;
}
function map(value, sMin, sMax, dMin, dMax) {
  return this.lerp(this.norm(value, sMin, sMax), dMin, dMax)
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
function clamp(value, min, max) {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}
function tween(pos, target, speed) {
  if (speed == undefined) speed = 20;
  pos += (target - pos) / speed;
  return pos;
}

function radians(a) {
  return a * Math.PI/180;
}



//  ((((((())))))))
// (((( GLOBALS ))))
//  ((((((())))))))
let mouseX = 0;
let mouseY = 0;
let CANVAS_WIDTH = 0;
let CANVAS_HEIGHT = 0;
window.addEventListener('mousemove', function (e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});

// BlendModes
const ADD = 'lighter';
const DIFFERENCE = 'difference';
const EXCLUSION = 'exclusion';
const SCREEN = 'screen';
const XOR = 'xor';
const COPY = 'copy';

const SRC_OVER = 'source-over';
const SRC_OUT = 'source-out';
const SRC_IN = 'source-in';
const SRC_TOP = 'source-atop';

const DEST_OVER = 'destination-over';
const DEST_OUT = 'destination-out';
const DEST_IN = 'destination-in';
const DEST_TOP = 'destination-atop';

// TEXT
const CENTER = 'center'
const MIDDLE = 'middle'
