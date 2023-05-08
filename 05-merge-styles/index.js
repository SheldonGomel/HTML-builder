import path from 'path'; 
import fs from 'fs'; 
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const styleDir = path.join(__dirname, '/styles/');
const projCSS = path.join(__dirname, '/project-dist/bundle.css');

const bundleCSS = (_styleDir,_projCSS) => {
  const writeStream = fs.createWriteStream(_projCSS,{flags: 'a'});
  fs.unlink(_projCSS, err => {
    if (err) return 0;
  });
  fs.readdir(_styleDir,{withFileTypes: true},(err,files)=>{
    if(err) throw err;
    files.forEach(file => {
      if(file.isFile() && (file.name.split('.').pop() === 'css')) {
        const readStream = fs.createReadStream(_styleDir + file.name, 'utf8');
        readStream.on('data', (e) => writeStream.write(e));
      }
    });
  });
}
bundleCSS(styleDir,projCSS);