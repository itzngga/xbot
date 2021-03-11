import {db} from './db';
import {Moment} from 'moment';
const fs: any = require('fs-extra');

export const setting = db.getObject<settingType>('/setting');
export const errCmd = db.getObject<string[]>('/errCmd');
export const sticker = db.getObject<stickerType>('/sticker');
export const config = db.getObject<configType>('/config');
export const reply = db.getObject<reply>('/reply');
export const cloud = db.getObject<cloud>('/cloud');
export const textpro = db.getObject<string[]>('/textpro');
export const publicJid = new Set(db.getObject<string[]>('/publicJid'));
export const arryOfWords = db.getObject<string[]>('/arryOfWords');
export const fakeReplyBase64 = db.getObject('/fakeReplyBase64');

export const updateObj = (name: string) => {
  eval(name);
};
export interface getFileResponse {
  buffer: Buffer;
  mimetype: MimeType;
}

export type groupAcceptCode = {
  code: number;
  gid: string;
};

export type settingType = {
  sAdmin: string;
  costumerId: string;
  restartState: boolean;
  restartId: string;
  prefix: string;
  unSend: string[];
  autoRead: boolean;
  autoReply: boolean;
  pm2Id: string;
  fakeReply: boolean;
  fakeText: string;
  fakeJid: string;
  antiVirtex: boolean;
  universalPublic: boolean;
};

export type waitMessageObj = {
  sender: string;
  query: string;
  type: string;
  callback?: boolean;
};

export type cloud = {
  [key: string]: {
    path: string;
    format: string;
    timestamp: string;
  };
};
export type countType = {
  [key: string]: {
    count: number;
    type: string;
  };
};
export interface configType {
  apikeys: {
    vthear: string;
    cekresi?: string[];
    keepsaveit?: string[];
    bitly: string;
    genius: string;
    tech: string;
  };
  vcard: {
    cs: {
      displayName: string;
      vcard: string;
    };
    owner: {
      displayName: string;
      vcard: string;
    };
  };
  secret: string;
  ytCookie: string;
  scdl: string;
  ytIdentity: string;
  igCookie: string;
}

export type reply = {
  [key: string]: {
    answer: string;
  };
};

export type group = {
  gid: string;
  command: string[];
  settings: Object;
};

export type stickerType = {
  [key: string]: {
    date_added: Moment;
    last_update: Moment;
    maker: string;
    path: string;
  };
};

export type textproType = {
  [key: string]: {
    type: number;
    link: string;
  };
};

export interface igstalk {
  username: string;
  fullname: string;
  biography: string;
  private: boolean;
  imageurl: string;
  followers: number;
  followed: number;
  post: number;
  highlight: number;
}
