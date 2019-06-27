
let gravity = new Vector(0, 1);
let keys = {};
window.onload = function () {


  let wins = [];

  let btn = document.getElementById('play');
  let close = document.getElementById('close');



  btn.onclick = function () {
    // for (let i = 0; i < 5; i++) {
      wins.push(new Window(Math.random() * 500, Math.random() * 500));
    // }
  }
  close.onclick = function () {
    for (w of wins) {
      console.log(w);
      w.win.close();
    }
  }

  function animate() {
    
    for (let i = 0; i < wins.length; i++) {
      wins[i].update();
    }
    if (keys["w"]) {
      wins[0].acc.add(new Vector(0, -3))
    } else if (keys["d"]) {
      wins[0].acc.add(new Vector(1, 0))
    }else if (keys["a"]) {
      wins[0].acc.add(new Vector(-1, 0))
    }
    console.log(keys)

    // for (let i = 0; i < wins.length; i++) {
      // if (wins[i].hits(wins[(i + 1) % wins.length])) {
        // wins[i].vel.x *= -1;
        // wins[j].vel.x *= -1;
        // wins[i].close();
        // break;
      // }
    // }

    requestAnimationFrame(animate);
  }
  animate();
}