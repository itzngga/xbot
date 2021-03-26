import fs from 'fs-extra'
import { DB } from 'src/login';
import { cloud, configType } from 'types';
const cryptojs = require('crypto-js');
export default class Cloud {
  private cloud: cloud
  private config: configType
  constructor(private DB: DB){
    this.cloud = this.DB.cloud
    this.config = this.DB.config
  }
  rawCloud (path: string, format: string, time: string){
    return {
      path: path,
      format: format,
      timestamp: time,
    };
  }
  saveJSON() {
      return this.DB.cloud = this.cloud
    }
  getHash(key: string): string {
    return cryptojs.HmacSHA256(key, this.config.secret).toString();
  }
  findCloud (id: string): Promise<string> {
    const key = this.getHash(id);
    if (Object.prototype.hasOwnProperty.call(this.cloud, key)) {
      return Promise.resolve(this.cloud[key]!.path);
    } else {
      return Promise.reject('Anda belum mengupload file apapun ke cloud!');
    }
  }
  async addCloud(asu: string,buffer: Buffer,format: string,time: string): Promise<string>{
      const id = this.getHash(asu);
      if (!Object.prototype.hasOwnProperty.call(this.cloud, id)) {
        this.cloud[id] = this.rawCloud('../cloud/' + id + '.' + format, format, time);
        return fs.writeFile('../cloud/' + id + '.' + format, buffer).then(() => {
          this.saveJSON();
          return Promise.resolve('Sukses menambah file ke cloud!');
        });
      } else {
        return Promise.reject('Maaf, setiap user hanya boleh menyimpan 1 file di cloud!');
      }
    }
  async removeCloud(asu: string): Promise<string>{
    const id = this.getHash(asu);
    if (Object.prototype.hasOwnProperty.call(this.cloud, id)) {
      return fs.unlink('../cloud/' + id + '.' + this.cloud[id]?.format).then(() => {
        delete this.cloud[id];
        this.saveJSON();
        return Promise.resolve('File cloud berhasil di hapus!');
      });
    } else {
      return Promise.reject('Anda belum mengupload file apapun ke cloud!');
    }
  }
}
