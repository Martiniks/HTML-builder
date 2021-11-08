const fs = require('fs');
const path = require('path');

const pathToText = path.join(__dirname, 'text.txt');

let  streamFile = fs.createReadStream(pathToText,'utf8');

streamFile.on('data', function (chunk) {
  console.log(chunk);
});

streamFile.on('error', function (err) {
  if (err.code === 'ENOENT') {
    console.log('Файл не найден');
  } else {
    console.error(err);
  }
});