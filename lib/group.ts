/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
import {group} from '../types';

const fs: any = require('fs-extra');

if (typeof Array.prototype.splice === 'undefined') {
  Array.prototype.splice = function (index: number, howmanys: number) {
    const howmany = howmanys || this.length;
    const elems = Array.prototype.slice.call(arguments, 2);
    let newArr = this.slice(0, index);
    const last = this.slice(index + howmany);
    newArr = newArr.concat.apply(newArr, elems);
    newArr = newArr.concat.apply(newArr, last);
    return newArr;
  };
}

function isGroupAdded(gid: string) {
  return new Promise(resolve => {
    fs.access(
      './groups/' + gid + '/' + gid + '.json',
      fs.constants.F_OK,
      (err: any) => {
        if (err) {
          const obj = defaultFormat(gid);
          fs.ensureDirSync('./groups/' + gid);
          fs.writeJSONSync('./groups/' + gid + '/' + gid + '.json', obj);
          return resolve(obj);
        } else {
          return resolve(
            fs.readJSONSync('./groups/' + gid + '/' + gid + '.json')
          );
        }
      }
    );
  });
}

export function isCmd(gid: string, cmd: string) {
  return new Promise(resolve => {
    isGroupAdded(gid).then((res: any) => {
      const i = res.command.find((x: any) => x.cmd === cmd);
      if (i) {
        return resolve(i);
      }
    });
  });
}
export function addCmd(gid: string, cmd: string, result: string) {
  return new Promise((resolve, reject) => {
    isGroupAdded(gid).then((res: any) => {
      const i = res.command.find((x: any) => x.cmd === cmd);
      if (i) {
        return reject('[ERROR] custom command are exist');
      } else {
        res.command.push({
          cmd: cmd,
          result: result,
        });
        fs.ensureDirSync('./groups/' + gid);
        fs.writeJSONSync('./groups/' + gid + '/' + gid + '.json', res);
        return resolve('Menambah custom command ke group berhasil!');
      }
    });
  });
}
export function addMedia(
  gid: string,
  cmd: string,
  media: Buffer,
  mimetype: string
) {
  return new Promise((resolve, reject) => {
    try {
      isGroupAdded(gid).then((res: any) => {
        const i = res.command.find((x: any) => x.cmd === cmd);
        if (i) {
          return reject('[ERROR] custom command are exist');
        } else {
          const formated =
            './groups/' + gid + '/' + cmd + '.' + mimetype.split('/')[1];
          res.command.push({
            cmd: cmd,
            result: '',
            isMedia: formated,
            format: mimetype.split('/')[1],
          });
          fs.ensureDirSync('./groups/' + gid);
          fs.writeJSONSync('./groups/' + gid + '/' + gid + '.json', res);
          fs.writeFileSync(formated, media);
          return resolve('Menambah custom command ke group berhasil!');
        }
      });
    } catch (error) {
      return reject(error);
    }
  });
}
export function rmvCmd(gid: string, cmd: string) {
  return new Promise((resolve, reject) => {
    isGroupAdded(gid).then((res: any) => {
      const i = res.command.findIndex((x: any) => x.cmd === cmd);
      if (i === -1) {
        return reject(`[ERROR] custom command ${cmd} tidak ada!`);
      } else {
        if (!res.command[i].result) {
          fs.unlinkSync(res.command[i].isMedia);
          res.command.splice(i, 1);
          fs.writeJSONSync('./groups/' + gid + '/' + gid + '.json', res);
          return resolve(`Command ${cmd} telah di hapus dari custom command!`);
        } else {
          res.command.splice(i, 1);
          fs.writeJSONSync('./groups/' + gid + '/' + gid + '.json', res);
          return resolve(`Command ${cmd} telah di hapus dari custom command!`);
        }
      }
    });
  });
}

export function cmdList(gid: string) {
  return new Promise((resolve, reject) => {
    isGroupAdded(gid).then((res: any) => {
      if (!res.command.length) {
        return reject('Custom command belum di tambahkan ke group ini!');
      } else {
        let hasil =
            '*XyZ BOT Group Custom Command*\n-------------------------------------------------------------------\n',
          counter = 1;
        for (const i of res.command) {
          hasil += `${counter++}. ${i.cmd}\n`;
        }
        return resolve(hasil);
      }
    });
  });
}
export const getComs = (gid: string): Promise<number> =>
  isGroupAdded(gid).then((res: any) => {
    if (!res.command.length) {
      return 0;
    } else {
      let counter = 1;
      for (const i of res.command) {
        counter++;
      }
      return counter;
    }
  });
const defaultFormat = (gid: string): group => {
  return {
    gid: gid,
    command: [],
    settings: {},
  };
};
