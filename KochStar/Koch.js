class Koch {

  constructor(config) {
    this.segments = [];
    this.vectors = [];

    this.config = config || {
      n: 5,
      radius: 150,
      x: 200, y: 200,
      loop1: 1, loop2: 2,
    }

    this.createKoch();
  }

  reset() {
    this.segments = [];
    this.vectors = [];
  }
  createKoch() {
    let cons = [];
    let angle = 0;
    for (let i = 0; i < this.config.n; i++) {
      angle += Math.PI * 2 / this.config.n;
      let v = new Vector.fromAngle(angle);
      v.mult(this.config.radius);
      v.add(this.config.x, this.config.y);

      this.vectors.push(v);
      cons.push([
        i, ((i + this.config.loop1) % this.config.n),
      ]);
      cons.push([
        i, ((i + this.config.loop2) % this.config.n),
      ])
    }

    for (let k = 0; k < this.vectors.length; k++) {
      for (let i = 0; i < cons.length; i++) {
        this.segments.push(new Segment(this.vectors[cons[i][0]], this.vectors[cons[i][1]]));
      }
    }

  }

  generate() {
    let newGen = [];

    for (let i = 0; i < this.segments.length; i++) {
      let childrenSeg = this.segments[i].generate();
      newGen = [...newGen, ...childrenSeg];
    }
    this.segments = newGen;
  }

  render() {
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].render();
    }
  }
}