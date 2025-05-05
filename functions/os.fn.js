import os from 'node:os';
import { Answer } from '../answer.js';

export const getHomeDir = () => {
  const answer = new Answer();
  answer.isOk = true;
  answer.text = os.homedir();
  return answer;
};

export const getUserName = () => {
  const answer = new Answer();
  answer.isOk = true;
  answer.text = os.userInfo().username;
  return answer;
};

export const getArchitecture = () => {
  const answer = new Answer();
  answer.isOk = true;
  answer.text = os.arch();
  return answer;
};

export const getEOL = () => {
  const answer = new Answer();
  answer.isOk = true;
  answer.text = JSON.stringify(os.EOL);
  return answer;
};

export const getCpus = () => {
  const MHZ_IN_GHZ = 1000;
  const answer = new Answer();

  answer.isOk = true;
  const cpus = os.cpus();
  answer.text = `Total number of logical CPU cores: ${cpus.length}`;
  answer.table = cpus.map((cpu) => {
    return { Model: cpu.model, 'Clock Rate, GHz': cpu.speed / MHZ_IN_GHZ };
  });

  return answer;
};
