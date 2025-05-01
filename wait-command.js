import readline from 'node:readline/promises';
import { annotator } from './annotator.js';
import { parseInput } from './parse-input.js';
import { getInvocationFn } from './get-invocation-fn.js';

export const waitCommand = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.prompt();

  rl.on('line', (userInput) => {
    const { cmd, args } = parseInput(userInput);
    const fnToInvoke = getInvocationFn(cmd, args);

    if (fnToInvoke) {
      fnToInvoke();
    } else {
      annotator.sayInvalidInput();
    }

    annotator.sayCurrentDir();
    annotator.askCommand();
    rl.prompt();
  });

  rl.on('close', () => console.log(''));
};
