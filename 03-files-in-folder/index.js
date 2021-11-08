const path = require('path');
const pathToFiles = path.join(__dirname, 'secret-folder');

const fs = require('fs');
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
        let fileObj = path.parse(pathToFile);
        let fileExt = fileObj.ext;
        if (fileExt[0] === '.') {
          console.log(fileObj.name,' - ', fileExt.slice(1),' - ', `${stats.size/1000}kb`);
        } else {
          console.log(fileObj.name,' - ', fileExt,' - ', `${stats.size/1000}kb`);
        }
      }
    });
  }
});
