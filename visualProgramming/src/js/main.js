let connections = [];
const canvas = uiu.query('#c');
const ctx = canvas.getContext('2d');
width = canvas.width = 650;
height = canvas.height = 500;

window.onload = function () {



  let myVar = new Variable(250, 150).append();
  myVar.processLogic();

  let if1 = new IFBlock(50, 150).append();

  window.onclick = function () {
    if1.handleLogic(myVar.output)
    if1.processLogic();
  }




  // function drawConnections() {
  //   ctx.beginPath();
  //   ctx.moveTo(if1.x, if1.y);
  //   ctx.lineTo(if2.x,if2.y)
  //   ctx.stroke();
  // }


  Connection()
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // drawConnections();
    // Connection();
    if(connections.length > 0) {
      drawAllConnections();
    }

    requestAnimationFrame(animate);
  }
  animate();
}