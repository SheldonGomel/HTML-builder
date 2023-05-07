import path from 'path'; 
import fs from 'fs'; 
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {
  stdin,
  stdout,
  exit
} from 'process';
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'),{flags: 'a'});

stdout.write('What do you want to save in file text.txt?\n');
stdin.on('data', (inputText) => {
  if (inputText.toString().trim() === 'exit') {
    stdout.write('File is saved!');
    exit();
  } else {
    writeStream.write(inputText);
  }
});

process.on('SIGINT', () => {
  stdout.write('File is saved!');
  exit();
});