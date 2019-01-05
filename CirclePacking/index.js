let c = new Candy();
window.onload = function () {
  c.createCanvas(600, 600);

  // c.fullScreen();
  // c.resize(true);

  let width = CANVAS_WIDTH;
  let height = CANVAS_HEIGHT;
  let circles = [];
  let spacing = 2;
  // let spots = [];

  let img = c.loadImage('./img/girl.jpeg');
  
  let file = document.getElementById('imgfile');
  file.addEventListener('change', handleFileUpload);

  function handleFileUpload(e) {
    let reader = new FileReader();
    let selected = e.target.files[0];

    // Read in the image file as a data URL.
    reader.readAsDataURL(selected);
    reader.onload = function (evt) {
      if (evt.target.readyState == FileReader.DONE) {
        img = new Image();
        img.src = evt.target.result;
        img.onload = function () {
          reset();
          getSpots(img);
          animate();
        }
      }
    }
  }



  function getSpots(img) {
    let osc = c.createScreenBuffer('osc');
    c.canvas.width = width = CANVAS_WIDTH = img.naturalWidth;
    c.canvas.height = height = CANVAS_HEIGHT = img.naturalHeight;
    osc.image(img, 0, 0, img.naturalWidth, img.naturalHeight);
    loadPixels(osc.ctx, c.canvas.width, c.canvas.height);

    // osc.fill(255);
    // osc.textSize(155)
    // osc.textAlign(CENTER);
    // osc.text('Hellos', width/2, height/2);
    // for (let i = 0; i < pixels.length; i += 4) {
    //   var x = (i / 4) % width;
    //   var y = Math.floor((i / 4) / height);
    //   let pix = pixels[i + 3];
    //   if (pix > 155) {
    //     spots.push(new Vector(x, y));
    //   }
    // }
  }

  function reset() {
    c.clear(0);
    circles = [];
    spacing = 2;
    // spots = [];
  }

  c.trypreload();
  c.preload = function() {
    reset();
    getSpots(img);
    animate();
  }

  function animate() {
    c.clear(0);

    let total = 10;
    let count = 0;
    let attempts = 5000;

    while (count < total) {
      let newCircle = createCircles();
      if (newCircle !== null) {
        circles.push(newCircle);
        count++;
      }
      attempts--;
      if (attempts <= 0) {
        console.log('done');
        c.noLoop();
        break;
      }
    }


    for (const c of circles) {
      if (c.growing) {
        if (c.edges()) {
          c.growing = false;
        } else {
          for (other of circles) {
            if (c !== other) {
              let d = dist(c.x, c.y, other.x, other.y)
              if (d - spacing < c.r + other.r) {
                c.growing = false;
                break;
              }
            }
          }
        }
      }

      c.grow();
      c.render();
    }

    c.loop(animate);
  }
  // animate();


  function createCircles() {
    // console.log(spots)
    // let index = Math.floor(random(0, spots.length));
    // let x = spots[index].x;
    // let y = spots[index].y;
    let x = random(width);
    let y = random(height);

    let valid = true;
    for (const c of circles) {
      let d = dist(x, y, c.x, c.y);
      if (d - spacing < c.r) {
        valid = false;
        break;
      }
    }

    if (valid) {
      let index = (Math.floor(x) + Math.floor(y) * width) * 4;
      var r = pixels[index];
      var g = pixels[index + 1];
      var b = pixels[index + 2];
      var c = rgb(r, g, b);
      return new Circle(x, y, c);
    }
    return null;
  }
}

