let c = new Candy();
c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
c.fullScreen();

window.onload = function () {

  c.trypreload();
  let img = c.loadImage('https://anuraghazra.github.io/CanvasFun/particleSystem/texture/emitter1.png');
  let img1 = c.loadImage('https://anuraghazra.github.io/CanvasFun/particleSystem/texture/emitter.png');
  let img2 = c.loadImage('https://anuraghazra.github.io/CanvasFun/particleSystem/texture/particle.png');

  let textures = { img, img1, img2 };

  function particleController() {
    this.max_generation = 5;
    this.rotate = false;
    this.rotationRadius = 100;
    this.speed = 0.1;
    this.useFireTxture = false;
    this.useRedEmitter = true;
    this.useGreenEmitter = true;
    this.radius = 32;
    this.randomRadius = false;
    this.useContrastBlending = false;
    this.renderBlur = 2;
    this.renderContrast = 5;
  }
  let config = new particleController();

  let json = {
    "preset": "Default",
    "closed": false,
    "remembered": {
      "Default": {
        "0": {
          "max_generation": 3,
          "rotate": false,
          "useFireTxture": false,
          "useRedEmitter": true,
          "useGreenEmitter": true
        }
      },
      "Fire": {
        "0": {
          "max_generation": 5,
          "rotate": true,
          "useFireTxture": true,
          "useRedEmitter": false,
          "useGreenEmitter": false
        }
      },
    },
    "folders": {}
  }
  let gui = new dat.GUI({ load: json });
  gui.remember(config);

  gui.add(config, 'max_generation', 1, 20, 1);
  gui.add(config, 'speed', 0.0, 1.0, 0.01);
  gui.add(config, 'radius', 1, 64).listen();
  gui.add(config, 'rotationRadius', 10, 500);
  gui.add(config, 'randomRadius');
  let ContrastController = gui.add(config, 'useContrastBlending').name('Contrast Blending');
  let R_blur = gui.add(config, 'renderBlur', 0, 50);
  let R_contrast = gui.add(config, 'renderContrast', 0, 50);

  gui.add(config, 'rotate');
  let Tcontroller1 = gui.add(config, 'useFireTxture');
  let Tcontroller2 = gui.add(config, 'useRedEmitter');
  let Tcontroller3 = gui.add(config, 'useGreenEmitter');

  let ps;

  ContrastController.onChange(function (value) {
    if (value === true) {
      c.canvas.style.filter = `blur(${config.renderBlur}px) contrast(${config.renderContrast})`;
    } else {
      c.canvas.style.filter = '';
    }
  });
  R_blur.onChange(function (value) {
    if (!config.useContrastBlending) return;
    c.canvas.style.filter = `blur(${config.renderBlur}px) contrast(${config.renderContrast})`;
  });
  R_contrast.onChange(function (value) {
    if (!config.useContrastBlending) return;
    c.canvas.style.filter = `blur(${config.renderBlur}px) contrast(${config.renderContrast})`;
  });

  c.preload = function () {
    ps = newParticleSystem();
    animate();
  }

  function newParticleSystem() {
    let arr = [];
    if (config.useFireTxture) {
      arr.push(textures['img']);
    }
    if (config.useRedEmitter) {
      arr.push(textures['img1']);
    }
    if (config.useGreenEmitter) {
      arr.push(textures['img2']);
    }
    if (arr.length < 1) return;
    ps = new ParticleSystem(CANVAS_WIDTH / 2, 400, arr);
    return ps;
  }

  Tcontroller1.onChange(newParticleSystem);
  Tcontroller2.onChange(newParticleSystem);
  Tcontroller3.onChange(newParticleSystem);

  c.noStroke();

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  let angle = 0;
  function animate() {
    c.clear('#151515');

    config.randomRadius && (config.radius = random(0, 50));
    angle += config.speed;
    ps.setRadius(config.radius)

    if (config.rotate) {
      ps.origin.x = mouseX + Math.cos(angle) * config.rotationRadius;
      ps.origin.y = mouseY + Math.sin(angle) * config.rotationRadius;
    } else {
      ps.origin.x = mouseX;
      ps.origin.y = mouseY;
    }

    for (let i = 0; i < config.max_generation; i++) {
      ps.addParticle();
    }
    ps.update();

    requestAnimationFrame(animate);
  }

}