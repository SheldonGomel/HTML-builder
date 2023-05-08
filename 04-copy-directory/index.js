import path from 'path'; 
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, '/files/');
const copyPath = path.join(__dirname, '/files-copy/');

const copyFolder = (_dirPath,_copyPath) =>{
  fs.readdir(_copyPath, (err, files) => {
    if (err) {return 0};
    files.forEach((f) => {
      fs.unlink(_copyPath + '/' + f, err => {
        if (err) throw err;
      });
    });
  });
  
  fs.cp(_dirPath, 
        _copyPath,
        {recursive: true}, 
        function (err) {
          if (err) throw err;
          else console.log("Folder copied successfully!");
        });
}
copyFolder(dirPath,copyPath);
