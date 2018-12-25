norm = function(value, min, max) {
  return (value - min) / (max - min);
}
lerp = function(norm, min, max) {
  return (max - min) * norm + min;
}
clamp = function(value, min, max) {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}
tween = function(pos, target, speed) {
  if (speed == undefined) speed = 20;
  pos += (target - pos) / speed;
  return pos;
}

function ParseKeyframeData(data) {
    let tmp = [];
    for (let i = 0; i < data.length; i++) {
      let name = data[i].name;
      for (let j = 0; j < data[i].keyframes.length; j++) {
        tmp.push({[name] : data[i].keyframes[j].value, offset : data[i].keyframes[j].offset})
      }
    }
    // tmp.
    tmp = tmp.sort(function(a, b) {
      return a.offset - b.offset
    })
    return tmp;
  }

function lerpValues(value1, value2, t, out) {
  if (typeof value1 === 'number'
          && typeof value2 === 'number')
      return lerp(value1, value2, t)
  else { //assume array
      var len = Math.min(value1.length, value2.length)
      out = out||new Array(len)
      for (var i=0; i<len; i++) 
          out[i] = lerp(value1[i], value2[i], t)
      return out
  }
}

function moveConstantVelocity(curPos, targetPos, speed, t)
{
    /*
     * curPos - Current position of object (curPos.x, curPos.y)
     * targetPos - Destination position (targetPos.x, targetPos.y)
     * speed - Pixels-per-second to move
     * t - Seconds elapsed since previous move command
     */
    delta.x = targetPos.x - curPos.x;
    delta.y = targetPos.y - curPos.y;
    distance = sqrt(delta.x*delta.x + delta.y*delta.y);

    if (speed*t > distance)
    {
        // don't overshoot target
        newPos.x = targetPos.x;
        newPos.y = targetPos.y;
    }
    else
    {
        // Compute movement vector by normalizing delta vector
        // and then scaling it by distance traveled
        movement.x = (delta.x/distance)*speed*t;
        movement.y = (delta.y/distance)*speed*t;

        // apply movement
        newPos.x = origPos.x + movement.x;
        newPos.y = origPos.y + movement.y;
    }

    return newPos;
}