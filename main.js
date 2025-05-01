import { parseArgv } from './parse-argv.js';
import { dispatch } from './dispatch.js';

const argv = parseArgv(process.argv);

dispatch(argv.username);
