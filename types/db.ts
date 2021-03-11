const fs: any = require('fs-extra');
import {JsonDB} from 'node-json-db';
export const db = new JsonDB('../json/db.json', true, true);

const isExist = (
  path: string,
  fpath: string,
  file?: boolean,
  foption?: any
) => {
  if (file) {
    if (db.exists(path)) return true;
    const file = fs.readFileSync(fpath, foption);
    return db.push(path, file, true);
  } else {
    if (db.exists(path)) return true;
    const json = fs.readJSONSync(fpath);
    return db.push(path, json, true);
  }
};
export const resetDB = (
  path: string,
  fpath: string,
  file?: boolean,
  foption?: any
) => {
  if (file) {
    const file = fs.readFileSync(fpath, foption);
    return db.push(path, file, true);
  } else {
    const json = fs.readJSONSync(fpath);
    return db.push(path, json, true);
  }
};
isExist('/setting', '../json/raw/setting.json');
isExist('/errCmd', '../json/raw/error.json');
isExist('/sticker', '../json/raw/sticker.json');
isExist('/config', '../json/raw/config.json');
isExist('/reply', '../json/raw/reply.json');
isExist('/publicJid', '../json/raw/public.json');
isExist('/arryOfWords', '../json/raw/filters.json');
isExist('/cloud', '../json/raw/cloud.json');
isExist('/textpro', '../json/raw/textpro.json');
isExist('/surah', '../json/raw/surah.txt', true, {encoding: 'utf8'});
isExist('/fakeReplyBase64', '../image/fakeimage.jpeg', true, {
  encoding: 'base64',
});
