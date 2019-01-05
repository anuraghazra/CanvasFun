let c = new Candy();
c.createCanvas(400, 400);
let width = CANVAS_WIDTH;
let height = CANVAS_HEIGHT;

let sandpile = [...Array(width)].map(e => Array(width).fill(0));
window.onload = function () {

  c.canvas.addEventListener('mousemove', function (e) {
    if (mouseDown) {
      sandpile[Math.floor(e.offsetX)][Math.floor(e.offsetY)] = random(500, 1500);
      // sandpile[Math.floor(e.offsetX+random(5))][Math.floor(e.offsetY+random(5))] = random(200, 500);
    }
  });

  function topple() {
    let nextpile = [...Array(width)].map(e => Array(width).fill(0));
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let num = sandpile[x][y];
        if(num < 3) {
          nextpile[x][y] = num;
        }
      }
    }
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let num = sandpile[x][y];
        if(num >= 3) {
          nextpile[x][y] += num - 3;
          if (x+1 < width) nextpile[x+1][y]++;
          if (x-1 >= 0) nextpile[x-1][y]++;
          if (y+1 < height) nextpile[x][y+1]++;
          // if (y-1 >= 0) nextpile[x][y-1]++;
        }
      }
    }
    sandpile = nextpile;
  }

  function animate() {
    c.clear(0);

    c.loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let num = sandpile[x][y];

        let color = [255, 255, 255];
        if (num == 0) {
          color = [25, 25, 25];
        } else if (num == 1) {
          color = [255, 100, 0];
        } else if (num == 2) {
          color = [255, 255, 100];
        } else if (num == 3) {
          color = [255, 50, 155];
        }
        c.setPixelXYColor(x, y, color);
      }
    }
    c.updatePixels();
    
    for (let i = 0; i < 10; i++) {
      topple();      
    }

    c.loop(animate);
  }
  animate();

}