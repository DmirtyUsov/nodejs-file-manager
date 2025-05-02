import path from 'node:path';
import { Answer } from '../answer.js';

const changeDir = (directory) => {
  const answer = new Answer();
  try {
    process.chdir(directory);
    answer.isOk = true;
  } catch (err) {
    answer.text = err.message;
    answer.isOk = false;
  }
  return answer;
};

export const goToParent = () => {
  const currDir = process.cwd();
  const parentDir = path.resolve(currDir, '../');

  const answer = changeDir(parentDir);

  return answer;
};
