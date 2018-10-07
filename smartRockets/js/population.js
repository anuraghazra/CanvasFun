function Population() {
  this.rockets = [];
  this.popsize = agents;

  this.matingpool = [];

  for (let i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }
  
  this.reEvaluate = function() {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i] = new Rocket();
    }
  }

  this.run = function() {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].render();
    }
  }

  this.evaluate = function() {
    let maxfit = 0;
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if(this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }
    
    
    this.matingpool = [];
    for (let i = 0; i < this.popsize; i++) {
      let n = Math.floor(this.rockets[i].fitness * 5);
      for (let j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
    console.log(maxfit)
  }

  this.selection = function() {
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      let parentA = this.matingpool[randomInt(0, this.matingpool.length-1)].dna;
      let parentB = this.matingpool[randomInt(0, this.matingpool.length-1)].dna;
      let child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.renderDebug = function() {
    let maxfitness = this.rockets.reduce(function(nxt, prev) {
      let prevFtns = prev.calcFitness();
      let nxtFtns = nxt.calcFitness();
      
      let dn = dist(nxt.pos.x, nxt.pos.y, target.x, target.y);
      let dp = dist(prev.pos.x, prev.pos.y, target.x, target.y);
      
      if ( Math.floor(prev.fitness * 100) < Math.floor(nxt.fitness * 100) ) {
        return nxt;
      } else {
        return prev;
      }
    });
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,0,0,0.8)';
    ctx.strokeStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(maxfitness.pos.x-5, maxfitness.pos.y-5, 10, 10);
    ctx.moveTo(target.x, target.y, 10, 10);
    ctx.lineTo(maxfitness.pos.x, maxfitness.pos.y, 10, 10);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}