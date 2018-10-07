function radians(deg) {
  return deg * Math.PI/180;
}
window.onload = function() {

  let c = new Candy('#c', 500,500);


  function createHand(t, w, d) {
    c.push();
    c.translate(250,250);
    // c.ctx.scale(-1,1);
    c.rotate(radians(t))
    c.rect(0,0,w,d);
    c.pop();
  }

  function animate() {
    c.clear();
    
    let time = new Date();
    let sec = time.getSeconds();
    let min = time.getMinutes();
    let hr = time.getHours();
    
    let angleSec = map(sec, 0, 59, 0, 360);
    let angleMin = map(min, 0, -59, 0, 360);
    let angleHr = map(hr % 11, 0, -11, 0, 360);
    
    
    createHand(angleSec, 100, 0);
    createHand(angleMin, 90, 1);
    createHand(angleHr, 50, 2);
    
    c.text(sec,100,100);
    c.text(min,20,100);
    c.text(hr,150,100);

    c.loop(animate);
  }
  animate();
}