import app from './app.js';
import { Git } from './Controllers/Git.js';

console.log(Git.doesBranchExist());

app.listen('8080');