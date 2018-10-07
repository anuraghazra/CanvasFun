function DNA(genes) {
  if(genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (let i = 0; i < lifespan; i++) {
      this.genes[i] = Vector.random2D();
      this.genes[i].setMag(maxforce)
    }
  }

  this.crossover = function(partner) {
    let newgenes = [];

    let mid = Math.floor(Math.random()*this.genes.length);
    for (let i = 0; i < this.genes.length; i++) {
      if(i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  this.mutation = function() {
    for (let i = 0; i < this.genes.length; i++) {
      if(random(1) < mutationRate) {
        let angle = random(0,Math.PI);
        this.genes[i] = Vector.fromAngle(angle)
        // this.genes[i].setMag(maxforce);
        this.genes[i].mult(random(0,maxforce));
      }
    }
  }
}