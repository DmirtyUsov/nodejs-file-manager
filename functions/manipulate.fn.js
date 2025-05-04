import path from 'node:path';
import fs from 'node:fs/promises';
import { Answer } from '../answer.js';
import { checkIsFile } from './helpers.js';

export const createFile = async (args) => {
  const answer = new Answer();
  const fileName = args[0];

  const { dir, base } = path.parse(fileName);
  if (dir) {
    answer.isOk = false;
    answer.text = `Enter only file name: '${base}'`;
    return answer;
  }

  try {
    await fs.writeFile(base, '', { flag: 'wx' });
    answer.isOk = true;
    answer.text = `'${base}' added to current directory.`;
  } catch (error) {
    answer.text = error.message;
  }

  return answer;
};

export const deleteFile = async (args) => {
  const pathToFile = args[0];
  const answer = await checkIsFile(pathToFile);

  if (!answer.isOk) {
    answer.text = `Only able to delete a file.\n ${answer.text}`;
    return answer;
  }

  try {
    await fs.rm(pathToFile);
    answer.isOk = true;
    answer.text = `'${pathToFile}' deleted.`;
  } catch (error) {
    answer.text = error.message;
  }

  return answer;
};

export const createDir = async (args) => {
  const answer = new Answer();
  const dirName = args[0];

  const { dir, base } = path.parse(dirName);
  if (dir) {
    answer.text = `No nested paths, only: '${base}'`;
    return answer;
  }

  try {
    await fs.mkdir(base);
    answer.isOk = true;
    answer.text = `'${base}' created in current directory.`;
  } catch (error) {
    answer.text = error.message;
  }

  return answer;
};

export const renameFile = async (args) => {
  const pathToFile = args[0];
  let answer = await checkIsFile(pathToFile);

  if (!answer.isOk) {
    answer.text = `Only able to rename a file.\n${answer.text}`;
    return answer;
  }

  const { dir: emptyDir, base: newName } = path.parse(args[1]);
  if (emptyDir) {
    answer.isOk = false;
    answer.text = `The second argument must contain only the new filename: '${newName}'`;
    return answer;
  }
  const { dir } = path.parse(pathToFile);
  const pathToRenamedFile = path.join(dir, newName);

  answer = await checkIsFile(pathToRenamedFile);
  if (answer.isOk) {
    answer.isOk = false;
    answer.text = `'${pathToRenamedFile}' already exists.`;
    return answer;
  }

  try {
    await fs.rename(pathToFile, pathToRenamedFile);
    answer.isOk = true;
    answer.text = `'${pathToFile}' renamed to '${newName}'`;
  } catch (error) {
    answer.text = error.message;
  }

  return answer;
};
