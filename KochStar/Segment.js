class Segment {

  constructor(a, b) {
    this.a = a.copy();
    this.b = b.copy();
  }
  generate()  {
    let children = [];

    let v = Vector.sub(this.b, this.a);
    v.div(3);

    // seg 0
    let b1 = Vector.add(this.a, v);
    children[0] = new Segment(this.a, b1);

    // seg 3
    let a1 = Vector.sub(this.b, v);
    children[3] = new Segment(a1, this.b);

    v.rotate(-Math.PI/3)
    let c = Vector.add(b1, v);
    // seg2
    children[1] = new Segment(b1, c);
    // seg3
    children[2] = new Segment(c, a1);

    return children;
  }


  render() {
    c.stroke(255);
    c.line(this.a.x,this.a.y, this.b.x, this.b.y);
  }
}