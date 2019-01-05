const c = new Candy();
c.createCanvas(500, 500)
// c.fullScreen();


let blobs = [];
for (let i = 0; i < 10; i++) {
  blobs.push(new Blob(random(CANVAS_WIDTH), random(CANVAS_HEIGHT)))
}

window.onload = function() {


  function animate() {
    c.clear(0);

    c.loadPixels();
    for (let x = 0; x < CANVAS_WIDTH; x++) {
      for (let y = 0; y < CANVAS_HEIGHT; y++) {
        let index = (x + y * CANVAS_WIDTH) * 4;
        let sum = 0;

        for (let k = 0; k < blobs.length; k++) {
          let d = dist(x, y, blobs[k].pos.x, blobs[k].pos.y);
          sum += 30 * blobs[k].r / d;
        }

        let color = [
          Math.cos(sum*0.4)*(x*0.5),
          Math.sin(sum*0.2)*(y*0.9),
          sum*0.8+Math.sin(sum)*sum/100
        ]
        // let color = [
        //   Math.cos(-sum*0.5*0.2) * (sum-x),
        //   Math.sin(-sum*0.9*0.2) * (sum+y),
        //   Math.sin(-sum*0.9*0.2) * (sum+y),
        // ]
        c.setPixelArrayColor(index, color);
      }
    }
    c.updatePixels();

    for (const b of blobs) {
      b.update();
      // b.render();
    }
    
    c.loop(animate);
  }
  animate();

}