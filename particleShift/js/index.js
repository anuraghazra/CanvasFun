const canvas = document.querySelector('#c');
let text = document.getElementById('text');
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT - 70;
const c = new Candy(canvas, canvas.width, canvas.height);

// offscreen canvas
let osc = c.createScreenBuffer('osc');
let particles = [];

// FONTS AND GUI CONFIGS
let fonts = {
  'Fugaz One' : "'Fugaz One', cursive",
  'Charm' : "'Charm', cursive",
  'Staatliches' : "'Staatliches', cursive",
  'Lobster' : "'Lobster', cursive",
  'Shadows Into Light' : "'Shadows Into Light', cursive"
}
let config = {
  "repelRadius": 50,
  "attractRadius": 100,
  "maxSpeed" : 8,
  "maxForce" : 5,
  "fontFamily" : fonts['Fugaz One']
}

window.onload = function () {

  // DAT.GUI
  let gui = new dat.GUI({autoPlace : false});
  gui.close();
  gui.add(config, 'repelRadius', 0, 200, 1);
  gui.add(config, 'attractRadius', 0, 200, 1);
  gui.add(config, 'maxSpeed', 0, 20, 0.1);
  gui.add(config, 'maxForce', 0, 20, 0.1);
  let fontController = gui.add(config, 'fontFamily', fonts);
  let datguicontainer = document.getElementById('datgui');
  datguicontainer.appendChild(gui.domElement);
  fontController.onChange(function() {
    initAndRenderText();
  });


  let target = new Vector(mouseX, mouseY);
  for (let i = 0; i < 2000; i++) {
    particles.push(new Point(random(CANVAS_WIDTH), random(CANVAS_HEIGHT), 'rgba(255,255,255,0.3)', false));
  }


  // Updates the particles
  initAndRenderText();
  function initAndRenderText() {
    osc.clear();
    renderOnCanvas(text.value);
    getPixelCoords();
  }
  text.addEventListener('keyup', initAndRenderText);

  c.noStroke();
  function animate() {
    c.clear(155, 155, 255);

    target = new Vector(mouseX, mouseY);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].shake();
      particles[i].behaviour(target);
      particles[i].render();
    }

    // c.putScreenBuffer(osc);
    c.loop(animate);
  }
  animate()

}