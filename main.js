import readline from 'node:readline/promises';
import { parseArgv } from './parse-argv.js';
import { annotator } from './annotator.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const argv = parseArgv(process.argv);
annotator.userName = argv.username;

console.clear();
annotator.sayHi();
annotator.sayCurrentDir();
annotator.askCommand();
rl.prompt();

rl.on('line', async (userInput) => {
  console.log(userInput);
  annotator.sayCurrentDir();
  annotator.askCommand();
  rl.prompt();
});

rl.on('close', () => console.log(''));
process.on('exit', () => annotator.sayBye());
