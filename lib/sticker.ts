import moment from 'moment';
import pretty_bytes from 'pretty-bytes';
import {sticker, setting} from '../types';
const fs: any = require('fs-extra');
const sharp: any = require('sharp');
const {spawn}: any = require('child_process');
const debugWM = '*「 STICKER 」*\n\n';

const save = () => fs.writeJSONSync('./sticker/sticker.json', sticker);
const isExist = (name: string) => {
  if (sticker.hasOwnProperty(name)) {
    return true;
  }
  return false;
};
export const getSticker = (name: string) => {
  if (!isExist(name))
    return debugWM + 'sticker dengan nama *' + name + '* tidak ada!';
  return fs.readFileSync(sticker[name]!.path);
};
export const saveSticker = (name: string, buffer: Buffer, serial: string) =>
  new Promise((resolve, reject) => {
    if (isExist(name))
      return reject(debugWM + 'sticker dengan nama *' + name + '* masih ada!');
    fs.writeFileSync('./sticker/' + name + '.webp', buffer);
    spawn('webpmux', [
      '-set',
      'exif',
      './src/data.exif',
      './sticker/' + name + '.webp',
      '-o',
      './sticker/' + name + '.webp',
    ]).on('exit', () => {
      sticker[name] = {
        date_added: moment(),
        last_update: moment(),
        maker: serial,
        path: './sticker/' + name + '.webp',
      };
      save();
      return resolve(
        debugWM +
          `simpan sticker sukses!\ninformasi sticker: *${setting.prefix}sinfo ${name}*`
      );
    });
  });
export const updateSticker = (name: string, buffer: Buffer) =>
  new Promise((resolve, reject) => {
    if (!isExist(name))
      return reject(debugWM + 'sticker dengan nama *' + name + '* tidak ada!');
    fs.writeFileSync('./sticker/' + name + '.webp', buffer);
    spawn('webpmux', [
      '-set',
      'exif',
      './src/data.exif',
      './sticker/' + name + '.webp',
      '-o',
      './sticker/' + name + '.webp',
    ]).on('exit', () => {
      sticker[name]!.last_update = moment();
      save();
      return resolve(
        debugWM +
          `update sticker sukses!\n\dinformasi sticker: *${setting.prefix}sinfo ${name}*`
      );
    });
  });
export const deleteSticker = (name: string) => {
  if (!isExist(name))
    return debugWM + 'sticker dengan nama *' + name + '* tidak ada!';
  delete sticker[name];
  fs.unlinkSync('./sticker/' + name + '.webp');
  save();
  return debugWM + 'hapus sticker *' + name + '* sukses!';
};
export const infoSticker = (name: string) =>
  new Promise((resolve, reject) => {
    if (!isExist(name))
      return reject(debugWM + 'sticker dengan nama *' + name + '* tidak ada!');
    const buffer = fs.readFileSync(sticker[name]!.path);
    sharp(buffer)
      .png()
      .toBuffer()
      .then((res: any) => {
        const hasil = `*「 STICKER INFO 」*\n\n• _nama : ${name}_\n• _size : ${pretty_bytes(
          Buffer.byteLength(res)
        )}_\n• _pembuat : ${
          '@' + sticker[name]!.maker.replace('@s.whatsapp.net', '')
        }_\n• _dibuat : ${moment(sticker[name]!.date_added).format(
          'lll'
        )}_\n• update : _${moment(sticker[name]!.last_update).format('lll')}_`;
        return resolve({
          hasil: hasil,
          mentioned: sticker[name]!.maker,
          buffer: res,
        });
      });
  });
export const listSticker = () => {
  let hasil = '*「 STICKER 」*\n\n',
    stkr = Object.entries(sticker),
    count = 1;
  hasil += 'total: *' + stkr.length + '*\n';
  for (const [key, val] of stkr) {
    hasil += `${count}. *${key}*\n`;
    count++;
  }
  return hasil;
};
