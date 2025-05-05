import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { checkIsFile } from './helpers.js';

const archiveFile = async (srcPath, dstPath, isCompress = false) => {
  let answer = await checkIsFile(srcPath);
  if (!answer.isOk) {
    answer.text = `Only able to process a file.\n${answer.text}`;
    return answer;
  }

  answer = await checkIsFile(dstPath);
  if (answer.isOk) {
    answer.isOk = false;
    answer.text = `'${dstPath}' already exists.`;
    return answer;
  }

  try {
    const srcStream = createReadStream(srcPath);
    const dstStream = createWriteStream(dstPath, { flags: 'wx' });
    const transform = isCompress
      ? createBrotliCompress()
      : createBrotliDecompress();

    await pipeline(srcStream, transform, dstStream);

    answer.isOk = true;
    answer.text = `'${srcPath}' ${
      isCompress ? '' : 'de'
    }compressed to '${dstPath}'`;
  } catch (error) {
    answer.text = error.message;
  }

  return answer;
};

export const compress = (args) => {
  const srcPath = args[0];
  const dstPath = args[1];

  return archiveFile(srcPath, dstPath, true);
};

export const decompress = (args) => {
  const srcPath = args[0];
  const dstPath = args[1];

  return archiveFile(srcPath, dstPath, false);
};
