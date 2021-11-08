const path = require('path');
const pathToDist = path.join(__dirname, 'project-dist');

const fs = require('fs');

const pathToAssets = path.join(__dirname, 'assets');
const pathToCopyAssets = path.join(pathToDist, 'assets');

fs.mkdir(pathToDist, {recursive: true}, (err) => {
  if (err) {
    console.log('Ошибка создания каталога: ', err.message);
  }
  copyDir(pathToAssets, pathToCopyAssets);
});

const pathToStyles = path.join(__dirname, 'styles');
const pathToDistStyles = path.join(__dirname, 'project-dist/style.css');

const fileToWrite = fs.createWriteStream(pathToDistStyles);

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
          let streamFile = fs.createReadStream(pathToStyle, 'utf8');
          streamFile.on('data', function (chunk) {
            fileToWrite.write(chunk);
          });
        }
      }
    });
  }
});

const pathToDistIndex = path.join(__dirname, 'project-dist/index.html');
const pathToTemplate = path.join(__dirname, 'template.html');
const pathToComponents = path.join(__dirname, 'components');

const indexToWrite = fs.createWriteStream(pathToDistIndex);

let streamFile = fs.createReadStream(pathToTemplate, 'utf8');

streamFile.on('data', function (chunk) {
  let textTag = chunk;
  let pos = 0;
  let ind = textTag.indexOf('{{', pos);
  let indEnd = textTag.indexOf('}}', ind);
  let nameTag = textTag.slice(ind + 2, indEnd);
  let textToWrite = textTag.slice(pos, ind - 1);
  indexToWrite.write(`${textToWrite} \n`);

  let streamFileTag = fs.createReadStream(path.join(pathToComponents, `${nameTag}.html`), 'utf8');
  streamFileTag.on('data', function (chunk) {
    indexToWrite.write(`${chunk} \n`);
    textToWrite = textTag.slice(indEnd + 2);
    indexToWrite.write(textToWrite);
  });

  // pos = indEnd + 2;
  // ind = textTag.indexOf('{{', pos);
  // while (ind>0) {
  //   indEnd = textTag.indexOf('}}', ind);
  //   nameTag = textTag.slice(ind + 2, indEnd);
  //   textToWrite = textTag.slice(pos, ind - 1);
  //   indexToWrite.write(`${textToWrite} \n`);
  //   let streamFileTag = fs.createReadStream(path.join(pathToComponents, `${nameTag}.html`), 'utf8');
  //   streamFileTag.on('data', function (chunk) {
  //     indexToWrite.write(`${chunk} \n`);
  //   });
  //   pos = indEnd + 2;
  //   ind = textTag.indexOf('{{', pos);
  // }


});


function copyDir(scrDir, dstDir) {
  fs.readdir(scrDir, (err, files) => {
    if (err) {
      console.log('Ошибка чтения каталога: ', err.message);
      return;
    }
    for (const file of files) {
      let pathToFile = path.join(scrDir, file);
      fs.stat(pathToFile, (err, stats) => {
        if (err) {
          console.log('Ошибка чтения каталога: ', err.message);
          return;
        }
        if (stats.isDirectory()) {
          let pathToCopyFile = path.join(dstDir, file);
          fs.mkdir(pathToCopyFile, {recursive: true}, (err) => {
            if (err) {
              console.log('Ошибка создания каталога: ', err.message);
            }
            copyDir(pathToFile, pathToCopyFile);
          });
        }
        if (stats.isFile()) {
          let pathToCopyFile = path.join(dstDir, file);
          fs.copyFile(pathToFile, pathToCopyFile, callback);
        }
      });
    }
  });
}

function callback(err) {
  if (err) {
    console.log('Ошибка копирования файла: ', err.message);
  }
}
