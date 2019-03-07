
/**
 * get corresponding pixel colors and coords
 */
function getPixelCoords() {
  let gridX = gridY = pointSize;
  var idata = osc.ctx.getImageData(0, 0, width, height);
  var buffer32 = new Int32Array(idata.data.buffer);
  let colors = [];

  for (var i = 0; i < idata.data.length; i += 4) {
    color = 'rgb(' + idata.data[i + 0] + ',' + idata.data[i + 1] + ',' + idata.data[i + 2] + ')';
    colors.push(color);
  }

  for (var y = 0; y < height; y += gridY) {
    for (var x = 0; x < width; x += gridX) {
      if (buffer32[(y * width + x)]) {
        points.push(new Point(x, y, colors[y * height + x]));
      }
    }
  }
}