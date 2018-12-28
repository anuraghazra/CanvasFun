// Canvas 2
norm = function(value, min, max) {
  return (value - min) / (max - min);
}

let coords = [];

let canvas2 = document.getElementById('c2');
let ctx2 = canvas2.getContext('2d');
canvas2.width = 5;
canvas2.height = 5;

let isDown = false;
canvas2.addEventListener('mousedown', function () {
  isDown = true;
})
canvas2.addEventListener('mouseup', function () {
  isDown = false;
})
canvas2.addEventListener('mousemove', function (e) {
  if(isDown) {
    ctx2.beginPath();
    ctx2.fillStyle = 'black';
    ctx2.arc(e.offsetX, e.offsetY, 1, 0, Math.PI*2);
    ctx2.fill();
    ctx.closePath();

    var idata = ctx2.getImageData(0, 0, canvas2.width , canvas2.height);
    var buffer32 = new Array(idata.data);

    // for (let i = 0; i < idata.data.length; i+=4) {
    //   if (idata.data[i + 3] >= 0) {
    //     coords.push([norm(x, 0, 10), norm(y, 0, 10)]);
    //     // for (var y = 0; y < canvas2.height; y += 10) {
    //     //   for (var x = 0; x < canvas2.width; x += 10) {
    //     //     if (buffer32[(y * width + x)]) {
    //     //       coords.push([norm(x, 0, 10), norm(y, 0, 10)]);
    //     //     }
    //     //   }
    //     // }
    //   }
    // }
    coords = buffer32;
    console.log(coords)
    grid.applyHeightMap(coords);

  }

})