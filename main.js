import { parseArgv } from './parse-argv.js';
import { dispatch } from './dispatch.js';

const DEFAULT_NAME = 'Incognito😎';

const argv = parseArgv(process.argv);

dispatch(argv.username || DEFAULT_NAME);
