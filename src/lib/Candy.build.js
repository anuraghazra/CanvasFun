(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
require('./globals');


/**
 * Candy.js
 * @version v1.2.0
 * @description Easy to use canvas renderer similar to p5.Renderer
 * @constructor Candy()
 * @author Anurag Hazra <hazru.anurag@gmail.com>
 * @param {string?} canvas 
 * @param {Number?} width 
 * @param {Number?} height 
 */
function Candy(canvas, width, height) {
  // optional constructor
  if (!(this instanceof Candy)) {
    return new Candy(canvas);
  };

  if (canvas !== undefined) {
    if (typeof canvas === 'string') {
      this.canvas = document.querySelector(canvas);
    } else {
      this.canvas = canvas;
    }
    this.ctx = this.canvas.getContext('2d');
    this.width = width;
    this.height = height;
    this.canvas.width = CANVAS_WIDTH = this.width;
    this.canvas.height = CANVAS_HEIGHT = this.height;
  }

  // Variables
  this.idIndex = 0;
  this.screenBuffers = {};
  this.fireCallback = false;
  this.resCount = 0;
  // Rendering States
  this.doFill = true;
  this.doStroke = true;
  this.rectmode = 'CORNER';
  this.font = ['24px', 'Arial'];
  this.animateLoop = true;

  this.preload = function(){return null};


  this.trypreload();

  this._initCanvas();

}





/**
 * FUNCTIONAL PROTOTYPES /////////////////
 */

Candy.prototype.trypreload = function() {
  if (window.preload || this.preload) {
    let timer = window.setInterval(function () {
      if (this.resCount <= 0) {
        let time = (performance.now() / 1000).toFixed(2);
        console.log('%cAll Resources Loaded in ' + time + 's', 'color : green');
        ((window.preload === undefined) ? this.preload : window.preload)();
        window.clearInterval(timer);
        return;
      }
    }.bind(this), 10);
  }
}






/**
 * @method Candy.resize()
 * @param {Boolean} cull
 */
Candy.prototype.resize = function (cull) {
  window.addEventListener('resize', function () {
    this.resizeCanvas(this.canvas, cull);
  }.bind(this));
  this.resizeCanvas(this.canvas, cull);
}




/**
 * @method Candy.createCanvas()
 * @param {Number} w 
 * @param {Number} h 
 */
Candy.prototype.createCanvas = function (w, h) {
  this.canvas = document.createElement('canvas');
  this.canvas.id = 'CandyCanvas-' + this.idIndex;
  this.canvas.width = w || 200;
  this.canvas.height = h || 200;
  CANVAS_WIDTH = this.canvas.width;
  CANVAS_HEIGHT = this.canvas.height;
  this.ctx = this.canvas.getContext('2d');
  document.body.appendChild(this.canvas);

  this.index++;
  return this;
}




/**
 * @method Candy.createScreenBuffer()
 * @param {String} name 
 */
Candy.prototype.createScreenBuffer = function (name) {
  let canvas = document.createElement('canvas');
  canvas.id = 'CandyCanvasOffscreen-' + this.idIndex;
  canvas.width = this.canvas.width;
  canvas.height = this.canvas.height;
  // this.resizeCanvas(canvas);
  this.screenBuffers[name] = new Candy(canvas, canvas.width, canvas.height);
}




/**
 * @method Candy.putScreenBuffer()
 * @param {imageData} data 
 */
Candy.prototype.putScreenBuffer = function (data) {
  this.ctx.drawImage(data.canvas, 0, 0);
}

Candy.prototype._initCanvas = function () {
  window.addEventListener('DOMContentLoaded', function () {
    if (window.animate && this.fireCallback) {
      animate();
    }
  }.bind(this));
}

Candy.prototype.noLoop = function () {
  this.animateLoop = false;
}




/**
 * @method Candy.loop()
 * @param {Function} func 
 */
Candy.prototype.loop = function (func) {
  if (this.animateLoop) {
    if (window.animate) {
      return requestAnimationFrame(animate);
    } else {
      return requestAnimationFrame(func)
    }
  } else {
    this.animateLoop = true;
  }
  // return requestAnimationFrame(func);
}




/**
 * @method Candy.loadImage()
 * @param {String} url 
 */
Candy.prototype.loadImage = function (url) {
  this.resCount++;
  let img = new Image();
  img.src = url;
  img.onload = function () { this.resCount--; }.bind(this);
  return img;
}




/**
 * @method Candy.loadJSON()
 * @param {String} url 
 */
Candy.prototype.loadJSON = function (url, callback) {
  this.resCount++;
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.onload = () => {
    this.resCount--;
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(null, xhr.responseText);
    } else {
      callback('Error loading JSON', null);
    }
  }
  xhr.send();

}




/**
 * @method Candy.drawJSON()
 * @param {JSON} json 
 */
Candy.prototype.drawJSON = function (json) {
  for (const i in json) {
    let key = (i).split('-')[0];
    switch (key) {
      case 'fill':
        this[key](json[key])
        break;
      case 'stroke':
        this[key](json[key])
        break;

      // do defaults 
      default:
        if (typeof json[key] === 'object') {
          this[key].apply(this, json[key])
        } else {
          this[key].call(this, json[key])
        }
        break;
    }
  }
}




/**
 * @method Candy.resizeCanvas()
 * @param {Element} canvas 
 * @param {Boolean} cull 
 */
Candy.prototype.resizeCanvas = function (canvas, cull) {
  let targetHeight = window.innerWidth * 9 / 16;

  if (window.innerHeight > targetHeight) {
    if (cull) {
      canvas.width = window.innerWidth;
      canvas.height = targetHeight;
    } else {
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = targetHeight + 'px';
    }
    canvas.style.left = '0px';
    canvas.style.top = (window.innerHeight - targetHeight) / 2 + 'px';
  } else {
    if (cull) {
      canvas.width = window.innerHeight * 16 / 9;
      canvas.height = window.innerHeight;
    } else {
      canvas.style.width = window.innerHeight * 16 / 9 + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }
    canvas.style.left = (window.innerWidth - (canvas.width)) / 2 + 'px';
    canvas.style.top = '0px';
  }
}




/**
 * @method Candy._parseColor()
 * @param {String|Number} r 
 * @param {String|Number} g 
 * @param {String|Number} b 
 * @param {String|Number} a 
 */
Candy.prototype._parseColor = function (r, g, b, a) {
  let color = r;
  if (typeof r === 'number') {
    color = rgba(r, g, b);
  }
  if (typeof r === 'number' && (g) && (!b) && (!a)) {
    a = g;
    color = rgba(r, r, r, g)
  }
  if (typeof r === 'number' && typeof g === 'number' && typeof b === 'number') {
    color = rgba(r, g, b, a)
  }
  return color;
}




/**
 * @method Candy.keyIsPressed()
 * @param {Number} key
 */
Candy.prototype.keyIsPressed = function (key) {
  // console.log(key, CURRENT_KEYS[key])
  if (CURRENT_KEYS[key] === true) {
    return true;
  }
  return false;
}




/**
 * RENDERING PROTOTYPES /////////////////
 */


 


/**
 * @method Candy.noFill()
 */
Candy.prototype.noFill = function () {
  this.doFill = false;
  return this;
}





/**
 * @method Candy.noStroke()
 */
Candy.prototype.noStroke = function () {
  this.doStroke = false;
  return this;
}




/**
 * @method Candy.fill()
 * @param {String|Number} r 
 * @param {String|Number} g 
 * @param {String|Number} b 
 * @param {String|Number} a 
 */
Candy.prototype.fill = function (r, g, b, a) {
  let color = this._parseColor(r, g, b, a)

  // Gradient
  if (typeof r === 'object' && !(r instanceof CanvasGradient)) {
    let grad = c.ctx.createLinearGradient(100, 0, 0, 100);
    for (let i = 0; i < r.length; i++) {
      grad.addColorStop(i / r.length, r[i]);
    }
    this.ctx.fillStyle = grad;
    this.doFill = true;
    return true;
  }

  this.ctx.fillStyle = color;
  this.doFill = true;
  if (r === undefined) {
    this.ctx.fill();
    return this;
  }
  return this;
}




/**
 * @method Candy.fill()
 * @param {String|Number} r 
 * @param {String|Number} g 
 * @param {String|Number} b 
 * @param {String|Number} a 
 */
Candy.prototype.stroke = function (r, g, b, a) {
  let color = this._parseColor(r, g, b, a);

  // Gradient
  if (typeof r === 'object' && !(r instanceof CanvasGradient)) {
    let grad = c.ctx.createLinearGradient(100, 0, 0, 100);
    for (let i = 0; i < r.length; i++) {
      grad.addColorStop(i / r.length, r[i]);
    }
    this.ctx.strokeStyle = grad;
    this.doStroke = true;
    return true
  }
  this.ctx.strokeStyle = color;
  this.doStroke = true;
  if (r === undefined) {
    this.ctx.stroke();
    return this;
  }
  return this;
}




/**
 * @method Candy.linearGradient()
 * @param {String} x 
 * @param {String} y 
 * @param {String} a 
 * @param {String} s 
 * @param {Array} colors 
 */
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





/**
 * @method Candy.radialGradient()
 * @param {String} x 
 * @param {String} y 
 * @param {String} innerRadius 
 * @param {String} outerRadius 
 * @param {Array} colors 
 */
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

Candy.prototype.shadow = function(x, y, blur, color) {
  this.ctx.shadowColor = color || "rgba(100,100,100,.4)";
  this.ctx.shadowOffsetX = x || 0;
  this.ctx.shadowOffsetY = y || 0;
  this.ctx.shadowBlur = blur || 0;
}
Candy.prototype.noShadow = function() {
  this.ctx.shadowColor = "rgba(0, 0, 0, 0)";
  this.ctx.shadowOffsetX = 0;
  this.ctx.shadowOffsetY = 0;
  this.ctx.shadowBlur = 0;
}




/**
 * @method Candy.strokeWeight()
 * @param {Number} width 
 */
Candy.prototype.strokeWeight = function (width) {
  this.ctx.lineWidth = width;
  return this;
}




/**
 * @method Candy.clear()
 * @param {String|Number} r 
 * @param {String|Number} g 
 * @param {String|Number} b 
 * @param {String|Number} a 
 */
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


Candy.prototype.rectMode = function (mode) {
  this.rectmode = mode;
}




/**
 * @method Candy.rect()
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} tl 
 * @param {Number} tr 
 * @param {Number} br 
 * @param {Number} bl 
 */
Candy.prototype.rect = function (x, y, w, h, tl, tr, br, bl) {
  if (h === undefined) { h = w };
  if (tr === undefined) { tr = tl };
  if (br === undefined) { br = tr };
  if (bl === undefined) { bl = br };
  let hw = w/2;
  let hh = h/2;
  if (tl) {
    this.ctx.beginPath();
    if (this.rectmode === 'center') {
      this.ctx.moveTo(x-hw + tl, y-hh);
      this.ctx.arcTo(x-hw + w, y-hh, x-hw + w, y-hh + h, tr);
      this.ctx.arcTo(x-hw + w, y-hh + h, x-hw, y-hh + h, br);
      this.ctx.arcTo(x-hw, y-hh + h, x-hw, y-hh, bl);
      this.ctx.arcTo(x-hw, y-hh, x-hw + w, y-hh, tl);
    } else {
      this.ctx.moveTo(x + tl, y);
      this.ctx.arcTo(x + w, y, x + w, y + h, tr);
      this.ctx.arcTo(x + w, y + h, x, y + h, br);
      this.ctx.arcTo(x, y + h, x, y, bl);
      this.ctx.arcTo(x, y, x + w, y, tl);
    }

    this.doFill && this.ctx.fill();
    this.doStroke && this.ctx.stroke();
    this.ctx.closePath();
    return this;
  } else {
    this.ctx.beginPath();
    if (this.rectmode === 'center') {
      this.ctx.rect(x - w / 2, y - h / 2, w, h);
    } else {
      this.ctx.rect(x, y, w, h);
    }

    this.doFill && this.ctx.fill();
    this.doStroke && this.ctx.stroke();

    this.ctx.closePath();
    return this;
  }
}




/**
 * @method Candy.triangle()
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w 
 * @param {Number} h
 */
Candy.prototype.triangle = function (x, y, w, h) {
  this.ctx.beginPath();
  this.ctx.moveTo(x, y);
  this.ctx.lineTo(x + (w / 2), y - h);
  this.ctx.lineTo(x + w, y);
  this.ctx.closePath();

  this.doFill && this.ctx.fill();
  this.doStroke && this.ctx.stroke();
}




/**
 * @method Candy.circle()
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 */
Candy.prototype.circle = function (x, y, radius) {
  this.ctx.beginPath();
  this.ctx.arc(x, y, radius, 0, Math.PI * 2);
  this.doFill && this.ctx.fill();
  this.doStroke && this.ctx.stroke();
  this.ctx.closePath();
  return this;
}




/**
 * @method Candy.line()
 * @param {Number} x1
 * @param {Number} y2
 * @param {Number} x2
 * @param {Number} y2
 */
Candy.prototype.line = function (x1, y1, x2, y2) {
  this.ctx.beginPath();
  this.ctx.moveTo(x1, y1);
  this.ctx.lineTo(x2, y2);
  this.doFill && this.ctx.fill();
  this.doStroke && this.ctx.stroke();
  this.ctx.closePath();
  return this;
}




/**
 * @method Candy.begin()
 */
Candy.prototype.begin = function () {
  this.ctx.beginPath();
}




/**
 * @method Candy.close()
 */
Candy.prototype.close = function () {
  this.ctx.closePath();
}




/**
 * @method Candy.from()
 * @param {Number} x
 * @param {Number} y
 */
Candy.prototype.from = function (x, y) {
  console.log(typeof x)
  if (typeof x === 'object') {
    this.ctx.moveTo(x.x, x.y)
  }
  this.ctx.moveTo(x, y);
  return this;



}
/**
 * @method Candy.to()
 * @param {Number} x
 * @param {Number} y
 */
Candy.prototype.to = function (x, y) {
  if (typeof x === 'object') {
    this.ctx.lineTo(x.x, x.y)
  }
  this.ctx.lineTo(x, y)
  return this;
}





/**
 * @method Candy.image()
 * @param {Image} img
 * @param {Number} sx
 * @param {Number} sy
 * @param {Number} sw
 * @param {Number} sh
 * @param {Number} dx
 * @param {Number} dy
 * @param {Number} dw
 * @param {Number} dh
 */
Candy.prototype.image = function (img, sx, sy, sw, sh, dx, dy, dw, dh) {
  if (!img.complete) {
    window.setTimeout(() => {
      if (arguments.length === 5) {
        this.image(img, sx, sy, sw, sh);
      } else {
        this.image(img, sx, sy, sw, sh, dx, dy, dw, dh);
      }
    }, 50);
    return;
  }
  if (arguments.length === 5) {
    this.ctx.drawImage(img, sx, sy, sw, sh);
  } else {
    this.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }
}





/**
 * @method Candy.textAlign()
 * @param {String} value
 */
Candy.prototype.textAlign = function (value) {
  this.ctx.textAlign = value;
}




/**
 * @method Candy.textBaseline()
 * @param {String} value
 */
Candy.prototype.textBaseline = function (value) {
  this.ctx.textBaseline = value;
}




/**
 * @method Candy.textFont()
 * @param {String} value
 */
Candy.prototype.textFont = function (font) {
  this.font[1] = font;
  return this;
}





/**
 * @method Candy.textSize()
 * @param {Number} value
 */
Candy.prototype.textSize = function (size) {
  this.font[0] = size + 'px';
  return this;
}




/**
 * @method Candy.text()
 * @param {String} str
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */
Candy.prototype.text = function (str, x, y, w, h) {
  // this.ctx.textAlign = 'end';
  // this.ctx.textBaseline = 'bottom';
  this.ctx.font = this.font.join(' ');
  this.doFill && this.ctx.fillText(str, x, y, w, h)
  this.doStroke && this.ctx.strokeText(str, x, y, w, h)
  return this;
}




/**
 * @method Candy.blendMode()
 * @param {Number} mode
 */
Candy.prototype.blendMode = function (mode) {
  this.ctx.globalCompositeOperation = mode;
}




/**
 * @method Candy.alpha()
 * @param {Float} value
 */
Candy.prototype.alpha = function (value) {
  this.ctx.globalAlpha = value;
}





/**
 * @method Candy.translate()
 * @param {Number} x
 * @param {Number} y
 */
Candy.prototype.translate = function (x, y) {
  if (y === undefined) { y = x }
  this.ctx.translate(x, y);
  return this;
}




/**
 * @method Candy.rotate()
 * @param {Number} deg
 */
Candy.prototype.rotate = function (deg) {
  this.ctx.rotate(deg);
  return this;
}




/**
 * @method Candy.transRot()
 * @param {Number} x
 * @param {Number} y
 * @param {Number} deg
 */
Candy.prototype.transRot = function (x, y, deg) {
  this.ctx.translate(x, y);
  this.ctx.rotate(deg);
  return this;
}




/**
 * @method Candy.push()
 */
Candy.prototype.push = function () {
  this.ctx.save();
}




/**
 * @method Candy.pop()
 */
Candy.prototype.pop = function () {
  this.ctx.restore();
}




/**
 * @method Candy.smooth()
 * @param {String} qulty
 */
Candy.prototype.smooth = function (qulty) {
  if ('imageSmoothingEnabled' in this.ctx) {
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = qulty;
  }
}




/**
 * @method Candy.noSmooth()
 */
Candy.prototype.noSmooth = function () {
  if ('imageSmoothingEnabled' in this.ctx) {
    this.ctx.imageSmoothingEnabled = false;
  }
}

window.Candy = Candy;
},{"./globals":2}],2:[function(require,module,exports){
/**
 * Global Utility
 */

rgba = function(r, g, b, a) {
  if (g === undefined) g = r;
  if (b === undefined) b = r;
  if (a === undefined) a = 1;
  if (a > 1) { a = a / 255 };
  return 'rgba(' + clamp(r, 0, 255) + ',' + clamp(g, 0, 255) + ',' + clamp(b, 0, 255) + ',' + clamp(a, 0, 1) + ')'
}

hsla = function(h, s, l, a) {
  return 'hsla(' + h + 'deg, ' + clamp(s, 0, 100) + '%, ' + clamp(l, 0, 100) + '%, ' + ((a === undefined) ? 1 : a) + ')';
};

randomRGB = function() {
  let r = randomInt(255);
  let g = randomInt(255);
  let b = randomInt(255);
  return rgba(r, g, b)
}

randomHSLA = function(a) {
  let h = randomInt(360);
  let s = randomInt(100);
  let l = randomInt(100);
  a = (a === undefined) ? 1 : a;
  return hsla(h, s, l, a);
}

norm = function(value, min, max) {
  return (value - min) / (max - min);
}

lerp = function(norm, min, max) {
  return (max - min) * norm + min;
}

map = function(value, sMin, sMax, dMin, dMax) {
  return this.lerp(this.norm(value, sMin, sMax), dMin, dMax)
}

dist = function(px, py, qx, qy) {
  let dx = px - qx;
  let dy = py - qy;
  return Math.sqrt(dx * dx + dy * dy);
}

random = function(min, max) {
  if (max === undefined) {
    return Math.random() * (min === undefined ? 1 : min);
  } else {
    return min + Math.random() * (max - min);
  }
}

randomInt = function(min, max) {
  return Math.floor(min + Math.random() * (((max === undefined) ? 0 : max) - min + 1))
}

clamp = function(value, min, max) {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

tween = function(pos, target, speed) {
  if (speed == undefined) speed = 20;
  pos += (target - pos) / speed;
  return pos;
}

checkType = function(value, type) {
  if (value === undefined) { return };
  if (typeof value === 'object') {
    let checkObjects = value.constructor.toString().toLowerCase().indexOf(type + '()');
    if (checkObjects === -1) {
      throw ('Type Cheking Error : (' + (typeof value) + ' ' + value + ')' + ' is not typeof ' + type)
    } else {
      return value;
    }
  } else {
    if (typeof value !== type) {
      throw ('Type Cheking Error : (' + (typeof value) + ' ' + value + ')' + ' is not typeof ' + type)
    } else {
      return value;
    }
  }
}

optional = function(value, optValue) {
  if (value === undefined) {
    value = optValue
  };
  return value;
}



/**
 *
 * @method intersects()
 * @param {Object} r1
 * @param {Object} r2
 * @returns {Boolean} !collides
 */
intersects = function(r1, r2) {
  let r1x = r1.x;
  let r1xw = r1.x + r1.width;
  let r1y = r1.y;
  let r1yh = r1.y + r1.height;

  let r2x = r2.x;
  let r2xw = r2.x + r2.width;
  let r2y = r2.y;
  let r2yh = r2.y + r2.height;

  if (!r1.width || !r1.height) {
    r1xw = r1.x;
    r1yh = r1.y;
    // console.log('rect1 is a point');
  }
  if (!r2.width || !r2.height) {
    r2xw = r2.x;
    r2yh = r2.y;
    // console.log('rect2 is a point');
  }
  if ((!r1.width || !r1.height) && (!r2.width || !r2.height)) {
    // console.log('Cant Resolve Both Objects As Point');
  }
  return !(
    r2x >= r1xw ||
    r1x >= r2xw ||
    r2y >= r1yh ||
    r1y >= r2yh
  )
}



/**
 * GLOBAL VARIABLES
 */

// Mouse Listeners //
mouseX = 0;
mouseY = 0;
mouseDown = false;
window.addEventListener('mousemove', function (e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});
window.addEventListener('mousedown', function () {
  mouseDown = true;
});
window.addEventListener('mouseup', function () {
  mouseDown = false;
});

// Keyboard Listeners //
CURRENT_KEYS = {};
KEY_W = 87;
KEY_A = 65;
KEY_S = 83;
KEY_D = 68;
KEY_SPACE = 32;

ARROW_UP = 38;
ARROW_DOWN = 40;
ARROW_LEFT = 37;
ARROW_RIGHT = 39;
window.addEventListener('keydown', function (e) {
  code = e.keyCode || e.which;
  CURRENT_KEYS[code] = true;
  if (window.onKeyPressed) {
    onKeyPressed(code, e);
  }
})
window.addEventListener('keyup', function (e) {
  code = e.keyCode || e.which;
  CURRENT_KEYS[code] = false;
})



CANVAS_WIDTH = 0;
CANVAS_HEIGHT = 0;
WINDOW_WIDTH = 0;
WINDOW_HEIGHT = 0;
function getWindowSize() {
  WINDOW_WIDTH = window.innerWidth - 6;
  WINDOW_HEIGHT = window.innerHeight - 6;
}
getWindowSize();
window.addEventListener('resize', getWindowSize);



// BlendModes
ADD = 'lighter';
DIFFERENCE = 'difference';
EXCLUSION = 'exclusion';
SCREEN = 'screen';
XOR = 'xor';
COPY = 'copy';

SRC_OVER = 'source-over';
SRC_OUT = 'source-out';
SRC_IN = 'source-in';
SRC_TOP = 'source-atop';

DEST_OVER = 'destination-over';
DEST_OUT = 'destination-out';
DEST_IN = 'destination-in';
DEST_TOP = 'destination-atop';

// TEXT
CENTER = 'center';
MIDDLE = 'middle';
CORNER = 'corner';
},{}]},{},[1]);
