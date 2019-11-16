const fs = require('fs');

const CANVAS_TABLE = '<!-- INSERT_CANVAS_TABLE -->';
const README_TEMPLATE = './README.template.md';
const PROJECTS_DATA = './data.json';

(async = () => {
  const input = fs.readFileSync(README_TEMPLATE, 'utf-8').split('\n');

  const output = [
    '<!-- auto generated -->',
    '\r',
  ]

  for (let i = 0; i < input.length; i++) {
    if (input[i].includes(CANVAS_TABLE)) {
      output.push(generateTable(PROJECTS_DATA))
      console.log(PROJECTS_DATA)
    } else {
      output.push(input[i]);
    }
  }

  fs.writeFileSync('README.md', output.join('\n'));
})()

function generateTable(data) {
  let jsonData = JSON.parse(fs.readFileSync(data, 'utf-8'));
  let output = [];

  // Add header

  output.push(...[
    '<table>',
  ]);
  let str = '';

  let count = 1;
  for (let i = 0; i < jsonData.length; i++) {
    let markup = `
    <td align="center">
      <a href="${jsonData[i].demo}">
        <img src="${jsonData[i].img}" width="100px" alt="${jsonData[i].demo}"/><br />
        <sub><b>${jsonData[i].title}</b></sub>
      </a>
      <br />
      <a href="${jsonData[i].src}">
        <img width="15px;" src="./thumbnails/github_icon.png" />
      </a>
      </td>
    `

    // constrcture the string
    if (count > 6) {
      str += '<tr>'
      count = 1;
    }
    str += markup;
    if (count > 6) {
      str += '</tr>'
      count = 1;
    }
    count++;
  }


  str = str.replace(/^\s+/igm, '');
  output.push(str)

  output.push(...[
    '</table>',
  ]);
  return output.join('\n')
}