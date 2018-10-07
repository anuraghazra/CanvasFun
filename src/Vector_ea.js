function Vector(x,y) {
	this.x = x;
	this.y = y;

	this.iadd = function(vec) {
		this.x += vec.x;
		this.y += vec.y;
	}
	this.add = function(vec) {
		return new Vector(this.x + vec.x,this.y + vec.y);
	}
	this.isub = function(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
	}
	this.sub = function(vec) {
		return new Vector(this.x - vec.x,this.y - vec.y);
	}
	this.idiv = function(scalar) {
		this.x /= scalar;
		this.y /= scalar;
	}
	this.div = function(scalar) {
		return new Vector(this.x / scalar,this.y / scalar);
	}
	this.imul = function(scalar) {
		this.x *= scalar;
		this.y *= scalar;
	}
	this.mul = function(scalar) {
		return new Vector(this.x * scalar,this.y * scalar);
	}
    this.getmag = function() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    this.setdir = function(angle) {
        let length = this.getmag();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
    this.setmag = function(val) {
        let angle = this.getdir();
        this.x = Math.cos(angle) * val;
        this.y = Math.sin(angle) * val;
    }
    this.getdir = function() {
        return Math.atan2(this.y,this.x);
	}
	this.getdistance = function(p) {
		return Math.sqrt(p.x*this.x + p.y*this.y);
	}
	this.unit = function(n) {
		let mag = n || this.getmag();
		this.x = (this.x / mag);
		this.y = (this.y / mag);
		return this;
	}
	this.neg = function() {
		this.x = -this.x;
		this.y = -this.y;
		return this
	}
	// Misce
	this.empty = function() {
		this.x = 0;
		this.y = 0;
	}
	this.swap = function(p) {
		this.x = p.x;
		this.y = p.y;
	}
	this.copy = function () {
		return new Vector(this.x, this.y)
	}
	this.magSq = function () {
		var x = this.x,
				y = this.y;
		return x * x + y * y;
	}
	this.mag = function () {
		return Math.sqrt(this.magSq());
	}
	this.normalize = function () {
		// if (this.mag() === 0) {
		// 	return this;
		// } else {
		// 	return this.div(this.mag())
		// }
		return 0 === this.mag() ? this : this.div(this.mag())
	}

	this.limit = function (a) {
		var mag = this.magSq();
		// if(mag > a*a && (this.div(Math.sqrt(mag)), this.mul(a))) {
			// this.setMag()
		// }
		return mag > a * a && (this.div(Math.sqrt(mag)), this.mul(a)),
		this;
	}
	this.setMag = function (a) {
		return this.normalize().mul(a);
	}

}

