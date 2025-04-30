import readline from 'node:readline/promises';
import { parseArgv } from './parse-argv.js';

const DEFAULT_NAME = 'Incognito😎';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const argv = parseArgv(process.argv);
const userName = argv.username || DEFAULT_NAME
console.log(
  `🖐 Welcome to the File Manager, ${userName}.`
);
rl.prompt();

rl.on('line', async (userInput) => {
  console.log(userInput);
  rl.prompt();
});

rl.on('close', () => console.log(''));
process.on('exit', () =>
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
);
