import readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(process.argv);
rl.prompt();

rl.on('line', async (userInput) => {
  console.log(userInput);
  rl.prompt();
});

rl.on('close', () => console.log('Goodbye'));
