import {
  Navigate,
  exit,
  getContent,
  OsInfo,
  Manipulate,
} from './functions/index.js';

const NO_ARGS = 0;
const ONE_ARG = 1;
const TWO_ARGS = 2;

export const getInvocationFn = (cmd, args) => {
  let fnToInvoke = undefined;

  switch (args.length) {
    case NO_ARGS: {
      fnToInvoke = NoArgsCmd2Fn[cmd];
      break;
    }
    case ONE_ARG: {
      fnToInvoke = OneArgCmd2Fn[cmd];
      break;
    }
    default:
      fnToInvoke = undefined;
      break;
  }
  return fnToInvoke;
};

const NoArgsCmd2Fn = {
  '.exit': exit,
  ls: getContent,
  up: Navigate.goToParent,
};

const mapOsArg2Fn = (args) => {
  return OsArg2Fn[args[0]]();
};

const OneArgCmd2Fn = {
  os: mapOsArg2Fn,
  cd: Navigate.goTo,
  add: Manipulate.create,
};

const OsArg2Fn = {
  '--EOL': OsInfo.getEOL,
  '--cpus': OsInfo.getCpus,
  '--homedir': OsInfo.getHomeDir,
  '--username': OsInfo.getUserName,
  '--architecture': OsInfo.getArchitecture,
};
