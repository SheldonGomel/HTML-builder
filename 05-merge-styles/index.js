import path from 'path'; 
import fs from 'fs'; 
import { fileURLToPath } from 'url';
import { join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {
  stdin,
  stdout,
  exit
} from 'process';
const styleDir = path.join(__dirname, '/styles/');
const projCSS = path.join(__dirname, '/project-dist/bundle.css');
//const readStream = fs.createReadStream(styleDir, 'utf8');
const writeStream = fs.createWriteStream(projCSS,{flags: 'a'});

fs.readdir(styleDir,{withFileTypes: true},(err,files)=>{
  if(err) throw err;
  files.forEach(file => {
    if(file.isFile() && (file.name.split('.').pop()==='css')){
      const readStream = fs.createReadStream(styleDir + file.name, 'utf8');
      readStream.on('data', (e) => writeStream.write(e));
      console.log('add ' + file.name)
    }
  });
});
