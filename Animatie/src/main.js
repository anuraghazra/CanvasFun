// main.js
let animated;
window.onload = function () {
  let object = document.getElementById('test-box');
  let dragger = document.getElementById('dragger')
  let timeline = document.getElementById('keyframe-data');
  let lerpValue = document.getElementById('lerpValue');
  let propsDOM = document.getElementsByClassName('props')[0];
  let nodesDom = document.getElementsByClassName('nodes')[0];
 
  let keyframeData = [
    {
      name: 'left',
      keyframes: [
        {
          value: '200px', offset : 0.0,
        },
        {
          value: '700px', offset: 1.0
        }
      ]
    },
    {
      name: 'top',
      keyframes: [
        // {
        //   value: '0px', offset : 0,
        // },
      ]
    },
    {
      name: 'borderRadius',
      keyframes: [
        {
          value: '0px', offset : 0.0,
        },
        {
          value: '10px', offset : 1.0,
        },
      ]
    },
    {
      name: 'transform',
      keyframes: [
        {
          value: 'rotate(0deg)', offset : 0.0,
        },
        {
          value: 'rotate(360deg)', offset : 1.0,
        },
      ]
    },
  ];


  var keyframes = ParseKeyframeData(keyframeData)

  let props = new Props(keyframeData, propsDOM)
  props.render();

  let nodes = new Nodes(keyframes, nodesDom, timeline)
  nodes.render(props);


  let duration = 1000;
  animated = object.animate(keyframes, {
    duration: duration,
    fill: 'none',
    easing: 'linear'
  });

  let down = false;
  let pos = { x: 0, y: 0 }
  timeline.addEventListener('mousedown', () => { down = true });
  timeline.addEventListener('mouseup', () => { down = false });
  timeline.addEventListener('mousemove', function (e) {
    pos.x = e.offsetX;
    pos.y = e.offsetY;
    if(down) animate();
  });


  let draggerInterpolate = 0;

  animate();
  function animate() {
    if (down) { dragger.style.left = pos.x + 'px' }

    // Dragger Values
    let draggerPos = (dragger.getBoundingClientRect().left - timeline.getBoundingClientRect().left);
   
    draggerInterpolate = clamp(norm(draggerPos, 0, timeline.getBoundingClientRect().width), 0, 1)
    lerpValue.innerText = draggerInterpolate.toFixed(2);

    animated.pause()
    animated.currentTime = draggerInterpolate*duration;

    props.update(object, draggerInterpolate);
    let newKeyframe = props.updateValues(keyframeData, function(arr) {
      console.log('new data' , arr)
      arr = ParseKeyframeData(arr);
      nodesDom.innerHTML = ''
      let nodes = new Nodes(arr, nodesDom, timeline)
      nodes.render(props);

      animated = object.animate(arr, {
        duration: duration,
        fill: 'forwards',
        easing: 'linear'
      });
    })
    
    
  }

}