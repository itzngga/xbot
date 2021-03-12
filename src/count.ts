import {setting, count} from '../types';
import { db } from '../types/db';

export const addCount = (cmd: string): boolean => {
  if (count.hasOwnProperty(cmd)) {
    count[cmd]!.count++;
    db.push('/count', count)
    return true;
  } else {
    count[cmd] = {
      count: 1,
      type: 'member',
    };
    db.push('/count', count)
    return true;
  }
};

export const countAll = (): any => {
  let counts = 0;
  for (const [key, val] of Object.entries(count)) {
    counts += val.count;
  }
  return counts;
};
export const countCmd = (): string => {
  const anjay = countAll();
  let hasil = '*「 XyZ SELF COUNT 」*\n',
    counter = 1;
  hasil += `total hit : *${anjay}*\n`;
  for (const [key, val] of Object.entries(count)) {
    hasil += `${counter}. ${setting.prefix}${key} : *${val.count}*\n`;
    counter++;
  }
  return hasil;
};

export const countAdd = (cmd: string): string => {
  if (count.hasOwnProperty(cmd)) {
    count[cmd] = {
      count: 1,
      type: 'member',
    };
    db.push('/count', count)
    return 'Sukses add *' + cmd + '*';
  } else {
    return 'No count named *' + cmd + '*';
  }
};

export const countRemove = (cmd: string): string => {
  if (count.hasOwnProperty(cmd)) {
    delete count[cmd];
    db.push('/count', count)
    return 'Sukses remove *' + cmd + '*';
  } else {
    return 'No count named *' + cmd + '*';
  }
};

export const setCountAsAdmin = (cmd: string): string => {
  if (count.hasOwnProperty(cmd)) {
    count[cmd]!.type = 'admin';
    db.push('/count', count)
    return 'Sukses set *' + cmd + '* sbg admin cmd';
  } else {
    return 'No count named *' + cmd + '*';
  }
};

export const setCountAsMember = (cmd: string): string => {
  if (count.hasOwnProperty(cmd)) {
    count[cmd]!.type = 'member';
    db.push('/count', count)
    return 'Sukses remove *' + cmd + '* sbg admin cmd';
  } else {
    return 'No count named *' + cmd + '*';
  }
};
