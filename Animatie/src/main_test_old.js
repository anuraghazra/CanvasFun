// main.js
window.onload = function () {
  let object = document.getElementById('test-box');
  let dragger = document.getElementById('dragger')
  let timeline = document.getElementById('keyframe-data');
  let lerpValue = document.getElementById('lerpValue');
 
  
  var boxframes = [
    {
      left: '0px',
    },
    {
      left: '50px',
      offset: 0.6
    },
    {
      left: '150px',
    }
  ]
  let animated = object.animate(boxframes, {
    duration: 1000,
    fill: 'forwards',
    easing: 'ease-in-out'
  });


  let down = false;
  let pos = { x: 0, y: 0 }
  timeline.addEventListener('mousedown', function () {
    down = true;
  });
  timeline.addEventListener('mouseup', function () {
    down = false;
  });
  timeline.addEventListener('mousemove', function (e) {
    pos.x = e.offsetX;
    pos.y = e.offsetY;
  });

  let keyframes = [];

  let ani_data = [
    {
      name: 'left',
      keyframes: [
        { time: 0.0, value: 0 },
        { time: 0.2, value: 50 },
        { time: 0.9, value: 200 }
      ]
    }
  ]


  let draggerInterpolate = 0;
  // let x = ani_data[0].keyframes[0].value;
  // let target_x = ani_data[0].keyframes[1].value;
  let value = 0;


  var startTime, time;
  function animate() {
    time = new Date().getTime() - startTime;
    if (down) { dragger.style.left = pos.x + 'px' }

    // Dragger Values
    let draggerPos = dragger.getBoundingClientRect().left -
      timeline.getBoundingClientRect().left;
    draggerInterpolate = norm(draggerPos, 0, timeline.getBoundingClientRect().width)
    lerpValue.innerText = draggerInterpolate.toFixed(2);

    animate.currentTime = draggerInterpolate*1000;
    // Animation Interpolation
    // if (ani_data[0].keyframes[0].time < draggerInterpolate) {
    //   value = clamp(lerp(draggerInterpolate, x, target_x/ani_data[0].keyframes[1].time), x, target_x);
    // }
    // for (let i = 0; i < ani_data[0].keyframes.length; i++) {
    //   let x = ani_data[0].keyframes[i].value;
    //   let target_x = (ani_data[0].keyframes[(i + 1)]);
    //   if (target_x == undefined) target_x = 0;

    //   // if (i == 0) break;
    //   value = clamp(lerp(draggerInterpolate, x, target_x / ani_data[0].keyframes[i].time), x, target_x);
    // }

    // console.log(draggerInterpolate, value);
    // object.style[ani_data[0].name] = value + 'px';

    requestAnimationFrame(animate);
    startTime = new Date().getTime();
  }
  animate();

}