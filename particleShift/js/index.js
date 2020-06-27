const canvas = document.querySelector("#c");
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT - 70;
const c = new Candy(canvas, canvas.width, canvas.height);

const text = document.getElementById("text");
const params = new URLSearchParams(window.location.search);
text.value = params.get("text_value");

const updateQueryParam = () => {
  params.set("text_value", text.value);
  const url = `${location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", url);
};

// offscreen canvas
let particles = [];
const osc = c.createScreenBuffer("osc");
const INITIAL_PARTICLES_COUNT = 2500;
const FONT_SIZE = 100;

// FONTS AND GUI CONFIGS
const fonts = {
  Charm: "'Charm', cursive",
  Lobster: "'Lobster', cursive",
  Staatliches: "'Staatliches', cursive",
  "Fugaz One": "'Fugaz One', cursive",
  "Shadows Into Light": "'Shadows Into Light', cursive",
};
const config = {
  repelRadius: 50,
  attractRadius: 100,
  maxSpeed: 8,
  maxForce: 5,
  fontFamily: fonts["Fugaz One"],
};

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

window.onload = function () {
  // DAT.GUI
  let gui = new dat.GUI({ autoPlace: false });
  gui.close();
  gui.add(config, "repelRadius", 0, 200, 1);
  gui.add(config, "attractRadius", 0, 200, 1);
  gui.add(config, "maxSpeed", 0, 20, 0.1);
  gui.add(config, "maxForce", 0, 20, 0.1);
  let fontController = gui.add(config, "fontFamily", fonts);
  let datguicontainer = document.getElementById("datgui");
  datguicontainer.appendChild(gui.domElement);
  fontController.onChange(() => {
    initAndRenderText();
  });

  // ON RESIZE UPDATE CANVAS AND RESET SIM
  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas.width = windowWidth;
    canvas.height = windowHeight;

    reset();
    initAndRenderText();
  });

  let target = new Vector(mouseX, mouseY);
  function reset() {
    particles = [];
    for (let i = 0; i < INITIAL_PARTICLES_COUNT; i++) {
      particles.push(
        new Point(
          random(windowWidth),
          random(windowHeight),
          "rgba(255,255,255,0.3)",
          false
        )
      );
    }
  }
  reset();

  // Updates the particles
  function initAndRenderText() {
    updateQueryParam();
    const text_value = params.get("text_value");

    // update offscreen canvas width, height
    osc.width = windowWidth;
    osc.height = windowHeight;
    osc.clear();
    renderOnCanvas(text_value);
    getPixelCoords();
  }
  initAndRenderText();

  text.addEventListener("keyup", initAndRenderText);

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

    c.loop(animate);
  }
  animate();
};
