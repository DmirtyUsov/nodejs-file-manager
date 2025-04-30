import readline from 'node:readline/promises';
import { annotator } from './annotator.js';

export const waitCommand = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.prompt();

  rl.on('line', (userInput) => {
    console.log(userInput);
    annotator.sayCurrentDir();
    annotator.askCommand();
    rl.prompt();
  });

  rl.on('close', () => console.log(''));
};
