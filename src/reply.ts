import {reply} from '../types';
import {db} from '../types/db';
const fs: any = require('fs-extra');
const saveReply = () => db.push('/reply', reply, true);

export const isReply = (cmd: string) => {
  return reply.hasOwnProperty(cmd);
};

export const getReply = (cmd: string) => {
  if (reply.hasOwnProperty(cmd)) {
    return reply[cmd]!.answer;
  } else {
    return false;
  }
};

export const addReply = (cmd: string, answer: string) => {
  if (reply.hasOwnProperty(cmd)) {
    return 'Gagal, reply masih tersedia!';
  } else {
    reply[cmd] = {
      answer: answer.slice(cmd.length),
    };
    saveReply();
    return 'Sukses add reply!';
  }
};
export const removeReply = (cmd: string) => {
  if (reply.hasOwnProperty(cmd)) {
    delete reply[cmd];
    return 'Sukses remove reply!';
  } else {
    return 'Gagal, reply tidak ada!';
  }
};

export const allReply = () => {
  let hasil = '*XyZ BOT AutoReply*\n\n',
    counter = 1;
  for (const [key, val] of Object.entries(reply)) {
    hasil += `${counter}. _${key}_\n Answer: *${val.answer}*\n`;
    counter++;
  }
  return hasil;
};
