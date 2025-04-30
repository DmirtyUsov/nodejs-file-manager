import readline from 'node:readline/promises';
import { parseArgv } from './parse-argv.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const argv = parseArgv(process.argv);
console.log(`🖐 Welcome to the File Manager, ${argv.username || 'Nemo'}.`);
rl.prompt();

rl.on('line', async (userInput) => {
  console.log(userInput);
  rl.prompt();
});

rl.on('close', () => console.log('Goodbye'));
