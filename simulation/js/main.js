window.onload = function() {
  const canvas = document.getElementById('c'),
        ctx = canvas.getContext('2d');

  let width = canvas.width = 650;
  let height = canvas.height = 500;


  let genoms = [];
  let species = new Species();

  let howMuch = 100;


  function animate() {
    ctx.clearRect(0,0,width,height);

    if (genoms.length < howMuch) {
      if(Math.random() < 0.3) {
        genoms.push(species.create('good'));
      } else if (Math.random() > 0.3) {
        genoms.push(species.create('bad'));
      } else {
        genoms.push(species.create('dominator'));
      } 
    }
    
    for (let i = 0; i < genoms.length; i++) {
      let g = genoms[i];
      species.draw(ctx,g);
      species.update(g);
    }
    for (let i = 0; i < genoms.length; i++) {
      for (let j = genoms.length-1; j >= 0; j--) {
        var g1 = genoms[i];
        var g2 = genoms[j];
        species.die(g1,g2,genoms,species);
      }
    }
    species.grow(g1,g2,genoms,species);
    species.watchForDie(g2,genoms);

    species.renderColonyStats(ctx,genoms)

    requestAnimationFrame(animate);
  }
  animate();

}