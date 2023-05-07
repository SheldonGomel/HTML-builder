import path from 'path'; 
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stream = createReadStream(join(__dirname, 'text.txt'), 'utf8');
import { stdout } from 'process';
stream.on('data', (e) => stdout.write(e));