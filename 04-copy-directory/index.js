const path = require('path');
const pathToFiles = path.join(__dirname, 'files');
const pathToCopyFiles = path.join(__dirname, 'files-copy');

const fs = require('fs');

fs.mkdir(pathToCopyFiles, {recursive: true}, (err) => {
  if (err) {
    console.log('Ошибка создания каталога: ', err.message);
  }
});

fs.readdir(pathToFiles, (err, files) => {
  if (err) {
    console.log('Ошибка чтения каталога: ', err.message);
    return;
  }
  for (const file of files) {
    let pathToFile = path.join(pathToFiles, file);
    fs.stat(pathToFile, (err, stats) => {
      if (err) {
        console.log('Ошибка чтения каталога: ', err.message);
        return;
      }
      if (stats.isFile()) {
        let pathToFile = path.join(pathToFiles, file);
        let pathToCopyFile = path.join(pathToCopyFiles, file);
        fs.copyFile(pathToFile, pathToCopyFile, callback);
      }
    });
  }
});

function callback(err) {
  if (err) {
    console.log('Ошибка копирования файла: ', err.message);
  }
}