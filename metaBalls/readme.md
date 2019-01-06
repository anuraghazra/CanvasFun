# Meta Balls

[Live Demo](https://anuraghazra.github.io/CanvasFun/metaBalls/)

Glowing fun meta balls.

These meta balls are created using Canvas2D pixel Manipulation algorithm.


For Example this is how a radial gradient is generated.

Just tweaking these pixel values a little bit can make some interesting patterns. 
```javascript
// Candy.js Example
c.loadPixels();
for (let x = 0; x < CANVAS_WIDTH; x++) {
  for (let y = 0; y < CANVAS_HEIGHT; y++) {
    // calculating 1d pixel values (x + y * width)
    // corresponding to x,y location
    // multi by 4 to get all of the RGBA values
    let index = (x + y * CANVAS_WIDTH) * 4;

    // distance between center of the canvas and x, y pixel
    let d = dist(x, y, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    c.setPixelArrayColor(index, [d,d,d]);
    // if you dont want to calculate the x,y yourself
    // c.setPixelXYColor(x, y, [d,d,d]);
  }
}
c.updatePixles();
```