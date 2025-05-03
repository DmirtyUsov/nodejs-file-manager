
import fs from 'node:fs/promises';
import { Answer } from '../answer.js';

export const checkIsFile = async (pathToFile) => {
  const answer = new Answer();
  let stats;

  try {
    stats = await fs.stat(pathToFile);
  } catch (error) {
    answer.text = error.message;
    return answer;
  }

  if (stats.isFile()) {
    answer.isOk = true;
    return answer;
  }

  answer.text = `'${pathToFile}' is not a file.`;
  return answer;
};
