import { Answer } from '../answer.js';
import fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import crypto from 'node:crypto';
import { checkIsFile } from './helpers.js';

const compareDirEntries = (entryA, entryB) => {
  const isBothDirectories = entryA.isDirectory() && entryB.isDirectory();
  const isBothFiles = entryA.isFile() && entryB.isFile();

  if (isBothFiles || isBothDirectories) {
    return entryA.name.localeCompare(entryB.name);
  }

  return entryA.isDirectory() ? -1 : 1;
};

const getDirEntryType = (dirEntry) => {
  if (dirEntry.isFile()) {
    return 'file';
  }
  if (dirEntry.isDirectory()) {
    return 'directory';
  }
  return 'other';
};

export const listDirContent = async () => {
  const path = process.cwd();
  const answer = new Answer();

  try {
    const entries = await fs.readdir(path, { withFileTypes: true });
    answer.table = entries
      .filter((entry) => entry.isDirectory() || entry.isFile())
      .sort(compareDirEntries)
      .map((entry) => ({
        Name: entry.name,
        Type: getDirEntryType(entry),
      }));
  } catch {
    return answer;
  }

  answer.isOk = true;
  return answer;
};

export const listFileContent = async (args) => {
  const pathToFile = args[0];
  const answer = new Answer();

  try {
    const fileStream = createReadStream(pathToFile);

    fileStream.pipe(process.stdout);

    await new Promise((resolve, reject) => {
      fileStream.on('end', () => {
        answer.isOk = true;
        resolve();
      });
      fileStream.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    answer.text = error.message;
  }
  return answer;
};

export const calcFileHash = async (args) => {
  const pathToFile = args[0];
  const answer = await checkIsFile(pathToFile);

  if (!answer.isOk) {
    answer.plainResult = `Only able to hash a file.\n ${answer.text}`;
    return answer;
  }

  try {
    const hash = crypto.createHash('sha256');
    const fileStream = createReadStream(pathToFile);

    await new Promise((resolve, reject) => {
      fileStream.on('readable', () => {
        const content = fileStream.read();
        if (content) {
          hash.update(content);
        }
      });

      fileStream.on('end', () => {
        answer.isOk = true;
        answer.text = `Hash is: 0x${hash.digest('hex')}`;
        resolve();
      });

      fileStream.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    answer.text = error.message;
  }
  return answer;
};
