{/* <div class="value">left : <input type="text" id="left"/></div> */}
function Prop(id, parent) {
  this.id = id;
  this.parent = parent;

  this.div = document.createElement('div');
  this.div.setAttribute('class', 'value');
  this.div.innerText = this.id + ' : '

  this.input = document.createElement('input');
  this.input.setAttribute('type', 'text');
  this.input.setAttribute('id', this.id);

  this.div.appendChild(this.input);

  this.parent.appendChild(this.div);
}

function Props(data, parent) {
  this.data = data;
  this.parent = parent;
  this.draggerValue = 0;
}

Props.prototype.render = function () {
  for (let i = 0; i < this.data.length; i++) {
    new Prop(this.data[i].name, this.parent);
  }
}

Props.prototype.update = function (obj, draggerValue) {
  this.draggerValue = draggerValue;
  for (let i = 0; i < this.data.length; i++) {
    // let value = parseFloat((getComputedStyle(obj)[this.data[i].name]).replace(/px/,'')).toFixed(2)
    document.getElementById(this.data[i].name).value = getComputedStyle(obj)[this.data[i].name]
  }

}

Props.prototype.updateValues = function (keyframes, callback) {
  let draggerV = this.draggerValue;
  let newData = [];
  this.parent.onmousedown = function(e) {
    if (e.target.tagName === 'INPUT') {
      let target = e.target;
      target.onblur = function() {
        for (let i = 0; i < keyframes.length; i++) {
          if (keyframes[i].name == target.getAttribute('id')) {
            keyframes[i].keyframes.push({value : target.value, offset : draggerV})
          }
        }
        newData.push(keyframes)
        callback(keyframes)
      } 
    }
  }
  return newData;
}
