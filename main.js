import { parseArgv } from './parse-argv.js';
import { annotator } from './annotator.js';
import { waitCommand } from './wait-command.js';

const argv = parseArgv(process.argv);
annotator.userName = argv.username;

console.clear();
annotator.sayHi();
annotator.sayCurrentDir();
annotator.askCommand();

waitCommand();

process.on('exit', () => annotator.sayBye());
