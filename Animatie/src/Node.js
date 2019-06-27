class Node {
  constructor(parent, offset, inherit, timelineWidth) {
    this.offset = offset;
    this.inherit = inherit;
    this.parent = parent;
    this.timelineWidth = timelineWidth;
    this.html = document.createElement('div');
    this.html.setAttribute('class', 'node');
    this.html.setAttribute('data-inherit', this.inherit);
    let top = '';
    if (this.inherit === 'left')
      top = '10px';
    if (this.inherit === 'top')
      top = '50px';
    if (this.inherit === 'borderRadius')
      top = '100px';
    if (this.inherit === 'transform')
      top = '135px';
    this.html.style.top = top;
    this.html.style.left = this.offset * this.timelineWidth + 'px';
    this.parent.appendChild(this.html);
  }
}

class Nodes {
  constructor(data, parent, timeline) {
    this.data = data;
    this.parent = parent;
    this.timeline = timeline;
  }
  render(props) {
    console.log(this.data);
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < props.data.length; j++) {
        if (this.data[i][props.data[j].name]) {
          new Node(this.parent, this.data[i].offset, props.data[j].name, this.timeline.offsetWidth);
        }
      }
    }
  }
}
