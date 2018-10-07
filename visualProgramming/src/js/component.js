function IFBlock(x, y) {
  this.x = x;
  this.y = y;
  this.width = 150;
  this.height = 100;
  this.title = 'If';
  this.type = 'IF';

  this.parent = uiu.query('.container');
  this.id = 'if_' + this.parent.children.length;

  this.data = false;

  this.input_nodes = [];


  this.html =
    `
  <div class="draghandle">${this.title}</div>
  <select>
    <option>==</option>
    <option><</option>
    <option>></option>
    <option>>=</option>
    <option>=<</option>
    <option>||</option>
    <option>&&</option>
  </select>
  
  <div id="input-1" class="joints input" data-value="null"></div>
  <div id="input-2" class="joints input" data-value="null"></div>
  <div id="output-1" class="joints output"></div>
  `;

  this.input1 = uiu.query('#input-1');
  this.input2 = uiu.query('#input-2');
}

IFBlock.prototype.renderDOM = function () {
  // dom
  this.dom = uiu.createDIV({
    append : this.parent,
    id: this.id,
    class: 'block',
    styles: {
      'top': this.y + 'px',
      'left': this.x + 'px'
    }
  })

  this.dom.innerHTML = this.html;
  return this;
}

IFBlock.prototype.append = function () {
  let self = this;
  this.renderDOM();
  this.parent.appendChild(this.dom);
  this.draghandle = uiu.query('#' + this.id + ' .draghandle');

  uiu.draggable({
    parent: this.parent,
    child: this.dom,
    dragger: this.draghandle
  }, function (pos) {
    self.x = pos.x;
    self.y = pos.y;
  })
  return this;
}

IFBlock.prototype.processLogic = function () {
  if (this.input_nodes[0].data['value'] == this.input_nodes[1].data['value']) {
    this.data = true;
  } else {
    this.data = false;
  }
  this.output = {
    from : this.id,
    data : this.data
  };
}

IFBlock.prototype.handleLogic = function(obj) {
  this.input_nodes[0] = obj;
  this.input_nodes[1] = obj;
  // console.log(this.input_nodes)
  // console.log(this.data)
}


// Variable
function Variable(...args) {
  IFBlock.apply(this, args);

  this.title = 'var';
  this.type = 'variable';
  this.id = 'var_'+this.parent.children.length;

  this.html =
    `
  <div class="draghandle">${this.title}</div>  
  <input id="${this.id}-var-name">
  <p>=</p>
  <input id="${this.id}-var-value">
  <div id="output-1" class="joints output"></div>
  `;

  return this;
}
Variable.prototype = Object.create(IFBlock.prototype);

Variable.prototype.processLogic = function() {
  this.varname = uiu.query('#' + this.id + '-var-name');
  this.varvalue = uiu.query('#' + this.id + '-var-value');

  this.data = {};
  let self = this;

  this.varname.onkeyup = function() {
    self.data['name'] = self.varname.value;
  }
  self.varvalue.onkeyup = function() {
    self.data['value'] = self.varvalue.value;
  }

  this.output = {
    from : this.id,
    data : this.data
  }
}
