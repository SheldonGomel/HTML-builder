import path from 'path'; 
import fs from 'fs'; 
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, '/secret-folder/');
fs.readdir(dirPath,{withFileTypes: true},(err,files)=>{
  if(err) throw err;
  files.forEach(file => {
    if(file.isFile()){
      let arr = file.name.split('.');
      let fileExt = arr.pop();
      let fileName = arr.join('.');
      let str = fileName + ' - ' + fileExt + ' - ';
      fs.stat(dirPath + file.name,(err,st)=>{
        if(err) throw err;
        console.log(str + (st.size / 1024).toFixed(3) + 'kb');
      });
    }
  });
});