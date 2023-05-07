import path from 'path'; 
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, '/files/');
const copyPath = path.join(__dirname, '/files-copy/');

fs.readdir(copyPath, (err, files) => {
  if (err) {return 0};
  files.forEach((f) => {
    fs.unlink(copyPath + '/' + f, err => {
      if (err) throw err;
    });
  });
});

fs.cp(dirPath, 
      copyPath,
      {recursive: true}, 
      function (err) {
        if (err) throw err;
        else console.log("success!");
      });