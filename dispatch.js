import readline from 'node:readline/promises';
import { annotator } from './annotator.js';
import { parseInput } from './parse-input.js';
import { getInvocationFn } from './get-invocation-fn.js';

export const dispatch = (userName) => {
  annotator.userName = userName;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const waitInput = () => {
    annotator.sayCurrentDir();
    annotator.askCommand();
    rl.prompt();
  };

  console.clear();
  annotator.sayHi();
  waitInput();

  rl.on('line', async (userInput) => {
    const { cmd, args } = parseInput(userInput);
    const fnToInvoke = getInvocationFn(cmd, args);

    if (fnToInvoke) {
      const answer = await fnToInvoke(args);
      if (answer.text) {
        annotator.sayResult(answer.text, answer.isOk);
      }
      if (answer.table) {
        annotator.sayTable(answer.table);
      }
    } else {
      annotator.sayInvalidInput();
    }

    waitInput();
  });

  rl.on('close', () => console.log(''));

  process.on('exit', () => annotator.sayBye());
};
