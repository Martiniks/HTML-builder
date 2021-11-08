const readline = require('readline');
const {stdin: input, stdout: output} = require('process');
const rl = readline.createInterface({input, output});

const path = require('path');
const pathToText = path.join(__dirname, 'text.txt');

const fs = require('fs');
const file = fs.createWriteStream(pathToText);

console.log('Здравствуйте, вводите пожалуйста Ваш текст ( exit или CTRL+C окончание ввода):');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    rl.close();
    file.destroy();
    console.log(' Спасибо, до встречи!');
  } else {
    file.write(`${input} \n`);
  }
});

rl.on('SIGINT', () => {
  rl.close();
});
