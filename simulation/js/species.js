function Species(name) {

  this.name = 'good';
  this.id = 1;
  this.life = 50;
  this.color = 50;
  this.size = 50;
  this.x = Math.random()*650;
  this.y = Math.random()*500;
  this.vx = 0;
  this.vy = 0;
  let self = this;

  this.create = function create(name) {
    switch (name) {
      case 'good' : 
        this.name = 'good';
        this.id = 0;
        this.life = 25;
        this.color = 'limegreen';
        this.size = 4;         
        this.willAttack = 1;
        this.attackBy = 2;
        break;
      case 'bad' : 
        this.name = 'bad';
        this.id = 1;
        this.life = 50;
        this.color = 'red'; 
        this.size = 6;      
        this.willAttack = 0;
        this.attackBy = 2;       
        break;
      case 'dominator' : 
        this.name = 'dominator';
        this.id = 2;
        this.life = 50;
        this.size = 8;              
        this.color = 'deepskyblue';        
        this.willAttack = 1;
        this.attackBy = 1;       
        break;
    }
    this.x = Math.random()*650;
    this.y = Math.random()*500;
    this.vx = 1+Math.random()* - 0.5 - 0.5;
    this.vy = 1+Math.random()* - 0.5 - 0.5;
    return {
      name : this.name,
      id : this.id,
      life : this.life,
      color : this.color,
      size : this.size,
      willAttack : this.willAttack,
      attackBy : this.attackBy,
      x : this.x,
      y : this.y,
      vx : this.vx,
      vy : this.vy
    }
  }

  this.draw = function draw(ctx,genom) {
    ctx.beginPath();
    ctx.fillStyle = genom.color;
    ctx.arc(genom.x,genom.y,genom.size,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
  }

  function hit (p1,p2) {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
  let once = 1;
  this.grow = function grow(genom1,genom2,arr,insc) {
    console.log(hit(genom1, genom2))
    once++;
    if(hit(genom1, genom2) < 10) {
      if(genom1.name === genom2.name) {
        // console.log(genom1);
        self.x = genom2.x;
        self.y = genom2.y;
        if(once === 2) {
          console.log('push')
          arr.push(insc.create(genom1.name));
          once = 0;
        }
      }
    }
  }
  this.die = function die(genom1,genom2,arr,insc) {
    if(hit(genom1, genom2) > 10) {
      if(genom1.name !== genom2.name) {
        console.log('hit die');
        if((genom1.willAttack === genom2.id) || (genom2.willAttack === genom1.id)) {

            genom1.life -= 5;
          
        }
      }
    }
  }

  this.watchForDie = function(genom,arr) {
    if (genom.life < 0) {
      arr.splice(arr.indexOf(genom),1);
    }
  }

  this.update = function update(genom) {
    genom.x += genom.vx;
    genom.y += genom.vy;
    if(Math.random() < 0.2) {
      genom.vx += Math.random()*1 - 0.51;
      genom.vy += Math.random()*1 - 0.51;
    }
    if(genom.y > 500) {
      genom.vx *= 0.8;
      genom.vy *= -0.3;
      genom.y = 500;
    } else if(genom.y < 10){
      genom.vx *= 0.1;
      genom.vy *= -.2;
      genom.y = 10;
    }
    if(genom.x > 650) {
      if(Math.random() < 0.5) {
        genom.vy *= Math.random()* .4;
        genom.vx *= -Math.random()* .3;
      }	
      genom.x = 650;
    }else if(genom.x < 0) {
      if(Math.random() < 0.5) {
        genom.vy *= -Math.random() * 0.5;
        genom.vx *= -Math.random() * 0.5;
      }	
      genom.x = 0;	
    }	
  }


  this.renderColonyStats = function(ctx, arr) {
    let good = 0;
    let bad = 0;
    let dom = 0;
    for (let i = 0; i < arr.length; i++) {
      const a = arr[i];
      if (a.name === 'good') {
        good++;
      } else if (a.name === 'bad') {
        bad++
      } else if (a.name === 'dominator') {
        dom++;
      }
    }
    ctx.font = '14px Arial';
    ctx.fillText('good : ' + good + ', bad :' + bad + ', dominators : ' + dom, 15,15);
  }
}