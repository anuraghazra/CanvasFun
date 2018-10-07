function dist(p1, p2) {
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

let mouse = { x: 0, y: 0, down: false };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
})
window.addEventListener('mousedown', () => { 
  mouse.down = true
  Connection();  
});
window.addEventListener('mouseup', () => {
  // Connection();  
  mouse.down = false
});

function drawConnections(a, b) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y)
  ctx.stroke();
}
function Connection() {
  let inputs = uiu.query('#input-1');
  let bound = inputs.getBoundingClientRect();

  console.log(mouse)
  if ((dist(mouse, bound) < 50) && mouse.down) {
    connections.push([mouse, bound]);
    console.log('connection ')
    
  }

}
function drawAllConnections() {
  for (let i = 0; i < connections.length; i++) {
    drawConnections.apply(null, connections[i]);
  }
}