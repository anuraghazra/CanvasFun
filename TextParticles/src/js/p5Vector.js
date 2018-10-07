let Vector = function () {
  var a,
    b,
    c;
  arguments[0] instanceof Vector ? (this.p5 = arguments[0], a = arguments[1][0] || 0, b = arguments[1][1] || 0, c = arguments[1][2] || 0) : (a = arguments[0] || 0, b = arguments[1] || 0, c = arguments[2] || 0),
    this.x = a,
    this.y = b,
    this.z = c
}
Vector.prototype.toString = function () {
  return 'p5.Vector Object : [' + this.x + ', ' + this.y + ', ' + this.z + ']'
}
Vector.prototype.set = function (a, b, c) {
  return a instanceof Vector ? (this.x = a.x || 0, this.y = a.y || 0, this.z = a.z || 0, this) : a instanceof Array ? (this.x = a[0] || 0, this.y = a[1] || 0, this.z = a[2] || 0, this) : (this.x = a || 0, this.y = b || 0, this.z = c || 0, this)
}
Vector.prototype.copy = function () {
  return this.p5 ? new Vector(this.p5, [
    this.x,
    this.y,
    this.z
  ]) : new Vector(this.x, this.y, this.z)
}
Vector.prototype.add = function (a, b, c) {
  return a instanceof Vector ? (this.x += a.x || 0, this.y += a.y || 0, this.z += a.z || 0, this) : a instanceof Array ? (this.x += a[0] || 0, this.y += a[1] || 0, this.z += a[2] || 0, this) : (this.x += a || 0, this.y += b || 0, this.z += c || 0, this)
}
Vector.prototype.sub = function (a, b, c) {
  return a instanceof Vector ? (this.x -= a.x || 0, this.y -= a.y || 0, this.z -= a.z || 0, this) : a instanceof Array ? (this.x -= a[0] || 0, this.y -= a[1] || 0, this.z -= a[2] || 0, this) : (this.x -= a || 0, this.y -= b || 0, this.z -= c || 0, this)
}
Vector.prototype.mult = function (a) {
  return this.x *= a || 0,
    this.y *= a || 0,
    this.z *= a || 0,
    this
}
Vector.prototype.div = function (a) {
  return this.x /= a,
    this.y /= a,
    this.z /= a,
    this
}
Vector.prototype.mag = function () {
  return Math.sqrt(this.magSq())
}
Vector.prototype.magSq = function () {
  var a = this.x,
    b = this.y,
    c = this.z;
  return a * a + b * b + c * c
}
Vector.prototype.dot = function (a, b, c) {
  return a instanceof Vector ? this.dot(a.x, a.y, a.z) : this.x * (a || 0) + this.y * (b || 0) + this.z * (c || 0)
}
Vector.prototype.cross = function (a) {
  var b = this.y * a.z - this.z * a.y,
    c = this.z * a.x - this.x * a.z,
    e = this.x * a.y - this.y * a.x;
  return this.p5 ? new Vector(this.p5, [
    b,
    c,
    e
  ]) : new Vector(b, c, e)
}
Vector.prototype.dist = function (a) {
  var b = a.copy().sub(this);
  return b.mag()
}
Vector.prototype.normalize = function () {
  return 0 === this.mag() ? this : this.div(this.mag())
}
Vector.prototype.limit = function (a) {
  var b = this.magSq();
  return b > a * a && (this.div(Math.sqrt(b)), this.mult(a)),
    this
}
Vector.prototype.setMag = function (a) {
  return this.normalize().mult(a)
}
Vector.prototype.heading = function () {
  var a = Math.atan2(this.y, this.x);
  return this.p5 ? this.p5._angleMode === f.RADIANS ? a : e.radiansToDegrees(a) : a
}
Vector.prototype.rotate = function (a) {
  var b = this.heading() + a;
  this.p5 && this.p5._angleMode === f.DEGREES && (b = e.degreesToRadians(b));
  var c = this.mag();
  return this.x = Math.cos(b) * c,
    this.y = Math.sin(b) * c,
    this
}
Vector.prototype.lerp = function (a, b, c, e) {
  return a instanceof Vector ? this.lerp(a.x, a.y, a.z, b) : (this.x += (a - this.x) * e || 0, this.y += (b - this.y) * e || 0, this.z += (c - this.z) * e || 0, this)
}
Vector.prototype.array = function () {
  return [this.x || 0,
  this.y || 0,
  this.z || 0]
}
Vector.prototype.equals = function (a, b, c) {
  var e,
    f,
    g;
  return a instanceof Vector ? (e = a.x || 0, f = a.y || 0, g = a.z || 0) : a instanceof Array ? (e = a[0] || 0, f = a[1] || 0, g = a[2] || 0) : (e = a || 0, f = b || 0, g = c || 0),
    this.x === e && this.y === f && this.z === g
}
Vector.fromAngle = function (a) {
  return this.p5 && this.p5._angleMode === f.DEGREES && (a = e.degreesToRadians(a)),
    this.p5 ? new Vector(this.p5, [
      Math.cos(a),
      Math.sin(a),
      0
    ]) : new Vector(Math.cos(a), Math.sin(a), 0)
}
Vector.random2D = function () {
  var a;
  return a = this.p5 ? this.p5._angleMode === f.DEGREES ? this.p5.random(360) : this.p5.random(f.TWO_PI) : Math.random() * Math.PI * 2,
    this.fromAngle(a)
}
Vector.random3D = function () {
  var a,
    b;
  this.p5 ? (a = this.p5.random(0, f.TWO_PI), b = this.p5.random(- 1, 1)) : (a = Math.random() * Math.PI * 2, b = 2 * Math.random() - 1);
  var c = Math.sqrt(1 - b * b) * Math.cos(a),
    e = Math.sqrt(1 - b * b) * Math.sin(a);
  return this.p5 ? new Vector(this.p5, [
    c,
    e,
    b
  ]) : new Vector(c, e, b)
}
Vector.add = function (a, b, c) {
  return c ? c.set(a) : c = a.copy(),
    c.add(b),
    c
}
Vector.sub = function (a, b, c) {
  return c ? c.set(a) : c = a.copy(),
    c.sub(b),
    c
}
Vector.mult = function (a, b, c) {
  return c ? c.set(a) : c = a.copy(),
    c.mult(b),
    c
}
Vector.div = function (a, b, c) {
  return c ? c.set(a) : c = a.copy(),
    c.div(b),
    c
}
Vector.dot = function (a, b) {
  return a.dot(b)
}
Vector.cross = function (a, b) {
  return a.cross(b)
}
Vector.dist = function (a, b) {
  return a.dist(b)
}
Vector.lerp = function (a, b, c, d) {
  return d ? set(a) : d = a.copy(),
    lerp(b, c),
    d
}
Vector.angleBetween = function (a, b) {
  var c = Math.acos(a.dot(b) / (a.mag() * b.mag()));
  return this.p5 && this.p5._angleMode === f.DEGREES && (c = e.radiansToDegrees(c)),
    c
}
Vector.mag = function (a) {
  var b = a.x,
    c = a.y,
    d = a.z,
    e = b * b + c * c + d * d;
  return Math.sqrt(e)
}

Vector.prototype.subBy = function(vec) {
  return new Vector(this.x - vec.x, this.y - vec.y);
}