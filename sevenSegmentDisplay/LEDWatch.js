class LEDWatch {
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hex = [
      // 0123456789
      0x7E, 0x30,
      0x6D, 0x79,
      0x33, 0x5B,
      0x5F, 0x70,
      0x7F, 0x7B,
      // abcdef
      0x77, 0x1F,
      0x4E, 0x3D,
      0x4F, 0x47
    ];

    this.update();

    this.spacing = 150;
    this.midspacing = 30;
    this.displays = {
      hours : [
        new Display(0, 0),
        new Display(this.spacing, 0)
      ],
      min : [
        new Display(this.spacing*2, 0),
        new Display(this.spacing*3, 0)
      ],
      sec : [
        new Display(this.spacing*4, 0),
        new Display(this.spacing*5, 0)
      ],
    }
  }

  update() {
    this.date = new Date();
    this.hours = this.date.getHours().toString().split('');
    this.min = this.date.getMinutes().toString().split('');
    this.sec = this.date.getSeconds().toString().split('');

    if (this.hours.length < 2) this.hours.unshift(0);
    if (this.min.length < 2) this.min.unshift(0);
    if (this.sec.length < 2) this.sec.unshift(0);
  }

  render() {
    c.push();
    c.translate(this.x, this.y);
    let rgb;
    for (const i in this.displays) {
      if (i === 'min') {
        rgb = [255, 0, 100];
        c.translate(this.midspacing, 0);
      };
      if (i === 'sec') {
        rgb = [0, 255, 100];     
        c.translate(this.midspacing, 0);
      };
      if (i === 'hours') {
        rgb = [0, 100, 255];
      };

      // the i is sec,min,hours and also the this variable has the same
      // name thats why we use -> [(this[i][0]) % this.hex.length]
      this.displays[i][0].render(this.hex[(this[i][0]) % this.hex.length], rgb);
      this.displays[i][1].render(this.hex[(this[i][1]) % this.hex.length], rgb);
      
      if (i == 'hours') {
        c.fill(100, 255, 100);
        let x = 150;
        c.rect(x, 55, 10, 10, 5);
        c.rect(x*2.2, 55, 10, 10, 5);
      }
    }
    c.pop();
  }
}