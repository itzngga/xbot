import {cloud, config} from '../types';
const fs: any = require('fs-extra');
const cryptojs: any = require('crypto-js');
const {secret} = config;

function getHash(key: string): string {
  return cryptojs.HmacSHA256(key, secret).toString();
}
function saveJSON(): void {
  return fs.writeJSONSync('./cloud/cloud.json', cloud, {spaces: 2});
}

export const findCloud = (id: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const key = getHash(id);
    if (cloud.hasOwnProperty(key)) {
      return resolve(cloud[key]!.path);
    } else {
      return reject('Anda belum mengupload file apapun ke cloud!');
    }
  });

export const addCloud = (
  asu: string,
  buffer: Buffer,
  format: string,
  time: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    const id = getHash(asu);
    if (!cloud.hasOwnProperty(id)) {
      cloud[id] = rawCloud('./cloud/' + id + '.' + format, format, time);
      fs.writeFile('./cloud/' + id + '.' + format, buffer).then(() => {
        saveJSON();
        return resolve('Sukses menambah file ke cloud!');
      });
    } else {
      return reject('Maaf, setiap user hanya boleh menyimpan 1 file di cloud!');
    }
  });

export const removeCloud = (asu: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const id = getHash(asu);
    if (cloud.hasOwnProperty(id)) {
      fs.unlink('./cloud/' + id + '.' + cloud[id]?.format).then(() => {
        delete cloud[id];
        saveJSON();
        return resolve('File cloud berhasil di hapus!');
      });
    } else {
      return reject('Anda belum mengupload file apapun ke cloud!');
    }
  });
const rawCloud = (path: string, format: string, time: string) => {
  return {
    path: path,
    format: format,
    timestamp: time,
  };
};
