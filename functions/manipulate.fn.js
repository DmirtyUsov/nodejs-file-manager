import path from 'node:path';
import fs from 'node:fs/promises';
import { Answer } from '../answer.js';

export const create = async (args) => {
  const answer = new Answer();
  const file = args[0];

  const { dir, base } = path.parse(file);
  if (dir) {
    answer.isOk = false;
    answer.text = `Enter only file name: ${base}`;
    return answer;
  }

  try {
    await fs.writeFile(base, '', { flag: 'wx' });
    answer.isOk = true;
    answer.text = `${base} added to current directory.`;
  } catch (error) {
    answer.text = error.message;
  }

  return answer;
};
