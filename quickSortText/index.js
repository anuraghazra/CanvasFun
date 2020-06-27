let values = [];
let barWidth;
let textbox = document.getElementById('text-box')

for (let i = 0; i < 30; i++) {
  values.push(Math.floor(1 + Math.random() * 30))
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function updateTextbox() {
  textbox.value = ''
  // for (let i = 0; i < values.length; i++) {
  //   textbox.value += '\n '
  //   for (let j = 0; j < values.length; j++) {
  //     if (values[i] > values[j]) {
  //       textbox.value += '|  '
  //     } else {
  //       textbox.value += '.  '
  //     }
  //   }
  // }
  for (let i = 0; i < values.length; i++) {
    textbox.value += '\n_'
    for (let j = 0; j < values[i]; j++) {
      textbox.value += '_|'
    }
  }
}

function setup() {
  barWidth = (windowWidth) / values.length;

  updateTextbox();
}

function draw() {
  background(5, 15, 15);
  updateTextbox();
}


// QUICK SORT ALGORITHM
async function swap(array, a, b) {
  await sleep(25);
  let tmp = array[a];
  array[a] = array[b];
  array[b] = tmp;
}

async function quickSort(array, start, end) {
  if (start >= end) return;

  let pivotIndex = start;
  let pivotValue = array[end];
  for (let i = start; i < end; i++) {
    if (array[i] < pivotValue) {
      await swap(array, i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(array, pivotIndex, end);

  await Promise.all([
    quickSort(array, start, pivotIndex - 1),
    quickSort(array, pivotIndex + 1, end)
  ]);
}

quickSort(values, 0, values.length - 1);