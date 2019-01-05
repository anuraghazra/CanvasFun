let pixels;
let imagedata;
function loadPixels(ctx, width, height) {
  imagedata = ctx.getImageData(0, 0, width, height);

  pixels = imagedata.data;
}

function updatePixels(ctx) {
  ctx.putImageData(imagedata, 0, 0)
}
