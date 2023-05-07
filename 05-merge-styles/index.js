import path from 'path'; 
import fs from 'fs'; 
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const styleDir = path.join(__dirname, '/styles/');
const projCSS = path.join(__dirname, '/project-dist/bundle.css');
const writeStream = fs.createWriteStream(projCSS,{flags: 'a'});
fs.unlink(projCSS, err => {
  if (err) return 0;
});
fs.readdir(styleDir,{withFileTypes: true},(err,files)=>{
  if(err) throw err;
  files.forEach(file => {
    if(file.isFile() && (file.name.split('.').pop() === 'css')) {
      const readStream = fs.createReadStream(styleDir + file.name, 'utf8');
      readStream.on('data', (e) => writeStream.write(e));
    }
  });
});
