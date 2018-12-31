let c = new Candy();

window.onload = function () {

  c.createCanvas(500, 500);
  c.fullScreen();
  
  let osc = c.createScreenBuffer('trails');

  let pattern = new CirclePattern();

  pattern.add(100, 0.03, rgba(255, 0, 0, 0.2));
  pattern.add(150, 0.08, rgba(0,255,255,0.1));
  pattern.add(10, 0.2, rgba(255,0,0,0.5));
  pattern.add(250, -0.005, rgba(0,255,115,0.2));

  osc.strokeWeight(0.5);
  animate();
    
  function animate() {

    c.clear('black');

    pattern.update();
    pattern.render(osc);      


    c.loop(animate);
  }
}
