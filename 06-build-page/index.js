import path from 'path'; 
import fs from 'fs'; 
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const styleDir = path.join(__dirname, '/styles/');
const assetsDir = path.join(__dirname, 'assets');
const projDir = path.join(__dirname, 'project-dist');
const projCSS = path.join(projDir, '/style.css');


const clearFolder = () =>{
  fs.rm(projDir, { recursive: true }, (err) => {
        fs.mkdir(projDir,(err) => {
          if(err) {
            if(err.code === 'EEXIST') console.log('Dir ' + projDir + ' already exist!');
            else throw err;
          }
          bundleCSS(styleDir,projCSS);
          copyFolder(assetsDir,path.join(projDir, 'assets'));  
          
        }); 
  });  
}


const copyFolder = (_dirPath,_copyPath) => {
  // fs.readdir(_copyPath, (err, files) => {
  //   if (err) {return 0};
  //   files.forEach((f) => {
  //     fs.unlink(_copyPath + '/' + f, err => {
  //       if (err) throw err;
  //     });
  //   });
  // });
  fs.cp(_dirPath, 
        _copyPath,
        {recursive: true}, 
        function (err) {
          if (err) throw err;
          else console.log("Folder copied successfully!");
          
        });      
}

const bundleCSS = (_styleDir,_projCSS) => {
  const writeStream =  fs.createWriteStream(_projCSS,{flags: 'a'});
   fs.unlink(_projCSS, err => {
    if (err) return 0;
  });
   fs.readdir(_styleDir,{withFileTypes: true},(err,files)=>{
    if(err) throw err;
    else console.log("Styles bundled successfully!");
    files.forEach((file,ind) => {
      if(file.isFile() && (file.name.split('.').pop() === 'css')) {
        const readStream = fs.createReadStream(_styleDir + file.name, 'utf8');
        readStream.on('data', (e) => {
          writeStream.write(e);
          if(ind === (files.length - 1)) buildHtml();
        });
      }
    });
  });
}

const buildHtml = () => {
  const template = fs.createReadStream(path.join(__dirname, 'template.html'));
  const componentsHtml = path.join(__dirname, 'components');
  const htmlFile = fs.createWriteStream(path.join(projDir, 'index.html'));
  let dataString = '';
  template.on('data', (data) => {
    dataString = data.toString();
    fs.readdir(componentsHtml, 
              { withFileTypes: true }, 
              (err, files) => {
                if (err) throw err;
                else console.log("HTML buided successfully!");
                files.forEach((block,ind) => {
                  if (block.isFile() && path.parse(block.name).ext === '.html') {
                    const loadComp = fs.createReadStream(path.join(__dirname, 'components', block.name));
                    const reg = `{{${path.parse(block.name).name}}}`;
                    loadComp.on('data', (data) => {
                      dataString = dataString.replace(reg, data.toString());
                      if (ind === (files.length - 1)) htmlFile.write(dataString);
                    });
                  }
                });
                
              });
  });
}
clearFolder();

//bundleCSS(styleDir,projCSS);
//copyFolder(assetsDir,path.join(projDir, '/assets'));
//console.log(assetsDir,path.join(projDir, '/assets'));
//buildHtml();