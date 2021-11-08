const path = require('path');
const pathToStyles = path.join(__dirname, 'styles');
const pathToDist = path.join(__dirname, 'project-dist/bundle.css');

const fs = require('fs');
const fileToWrite = fs.createWriteStream(pathToDist);


fs.readdir(pathToStyles, (err, files) => {
  if (err) {
    console.log('Ошибка чтения каталога: ', err.message);
    return;
  }
  for (const file of files) {
    let pathToStyle = path.join(pathToStyles, file);
    fs.stat(pathToStyle, (err, stats) => {
      if (err) {
        console.log('Ошибка чтения каталога: ', err.message);
        return;
      }
      if (stats.isFile()) {
        let fileObj = path.parse(pathToStyle);
        if (fileObj.ext === '.css') {
          let  streamFile = fs.createReadStream(pathToStyle,'utf8');
          streamFile.on('data', function (chunk) {
            fileToWrite.write(chunk);
          });
        }
      }
    });
  }
});
