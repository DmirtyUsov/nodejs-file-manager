import { exit, getContent } from './functions/index.js';

const NO_ARGS = 0;
const ONE_ARG = 1;
const TWO_ARGS = 2;

export const getInvocationFn = (cmd, args) => {
  let fnToInvoke = undefined;

  switch (args.length) {
    case NO_ARGS: {
      fnToInvoke = mapCmdNoArgs2Fn[cmd];
      break;
    }
    default:
      fnToInvoke = undefined;
      break;
  }
  return fnToInvoke;
};

const mapCmdNoArgs2Fn = {
  '.exit': exit,
  ls: getContent,
};
