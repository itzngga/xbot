/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */
/* eslint-disable no-inner-declarations */
import os from 'os';
import util from 'util';
import sharp from 'sharp';
import axios from 'axios';
import client from '../index';
import Scrap from '../lib/scrap';
import Game from '../lib/games';
import moment from 'moment';
import Jimp from 'jimp';
import matchGroup from 'match-index';
import pm2 from 'pm2';
import ytdl from 'ytdl-core';
import didYouMean from 'didyoumean2';
import Genius from 'genius-lyrics';
import gplay from 'google-play-scraper';
import file_type from 'file-type';
import query_string from 'query-string';
import normalize_url from 'normalize-url';
import ffmpeg from 'fluent-ffmpeg';
const scrap = new Scrap();
const games = new Game();
const wiki: any = require('wikijs');
const fs: any = require('fs-extra');
const text2png: any = require('text2png');
const gTTs: any = require('gtts');
const gImages: any = require('g-i-s');
const ping: any = require('ping');
const wrap: any = require('word-wrapper');
const crypto: any = require('crypto-js');
const cron: any = require('node-cron');
const translatte: any = require('translatte');
const parseString: any = require('xml2js').parseString;
const google: any = require('google-it');
const math: any = require('mathjs');
const concat: any = require('concat-stream');
const imdb: any = require('imdb-scraper');
const child: any = require('child_process');
const figlet: any = require('figlet');
const im = require('gm').subClass({
  imageMagick: true,
});
const gm: any = require('gm');
const stripIndents: any = require('common-tags').stripIndents;
const libphonenumber: any = require('awesome-phonenumber');

import {
  quotes,
  anime,
  corona,
  brainly,
  wait,
  surat,
  yts,
  quoted,
  meme,
  cuaca,
  imp3,
  ocr,
  food,
  getGroupAdmins,
  modifExif,
  getBuffer,
  ytv,
  urlShortener,
  color,
} from '../lib/functions';

import {addCloud, findCloud, removeCloud} from '../lib/cloud';

import {
  addCount,
  countAll,
  countCmd,
  countAdd,
  countRemove,
  setCountAsAdmin,
  setCountAsMember,
} from '../src/count';
import gify from '../lib/gify';
import igstalk from '../lib/igstalk';
import extract from '../lib/extract';
import * as replies from '../src/reply';
import * as template from '../src/template';
import * as groups from '../lib/group';
import * as stickerSave from '../lib/sticker';
import * as canvacord from '../lib/canvacord';
import * as ttpAnim from '../lib/ttp';
import * as oploverz from '../lib/oploverz';
import * as constant from '../types';
import obfuscate from '../lib/obfuscate';
import news from '../lib/news';
const setting = constant.setting;
const errCmd = constant.errCmd;
const config = constant.config;
const arryOfWords = constant.arryOfWords;
const publicJid = new Set(constant.publicJid);
const textpro = constant.textpro;
const itech = require('itech-wrapper').key(config.apikeys.tech);
import {
  WAMessage,
  MessageType,
  Mimetype,
  GroupSettingChange,
  ChatModification,
  WA_MESSAGE_STUB_TYPES,
  WAContactMessage,
} from '@adiwajshing/baileys';
import {Readable} from 'stream';
import * as jsondb from '../types/db';
const db = jsondb.db;
const {
  text,
  extendedText,
  contact,
  image,
  video,
  sticker,
  document,
  audio,
} = MessageType;

//-----------------------process-----------------------//

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
});
process.on('rejectionHandled', promise => {
  unhandledRejections.delete(promise);
});
// process.on('Something went wrong', function(err) {
//     console.log(color('Caught exception: ', 'red'), err)
// })
// process.on('unhandledRejection', (reason, promise) => {
//     console.log(color('Unhandled Rejection at:', 'red'), promise, color('reason:', 'red'), reason)
// })

//-----------------------config-----------------------//

// eslint-disable-next-line prefer-const
let {pm2Id, prefix, sAdmin, autoRead, autoReply, antiVirtex} = setting;
moment.locale('id');
const isUrl = new RegExp(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gi
);
function suggestionList() {
  const objects = [];
  for (const [key, vals] of Object.entries(constant.count)) {
    const val: any = vals;
    if (val.type === 'member') objects.push(key);
  }
  return objects;
}
const {apikeys, vcard} = config;
const mimics: string[] = [];
let debug = false;
let logMode = true;
const suggestions = suggestionList();
let autoSuggest = false;
const getLirik = new Genius.Client(apikeys.genius);
const bitly: any = new (require('bitly').BitlyClient)(apikeys.bitly);
const filteredWord = () => arryOfWords.map((x: any) => x + '\\b').join('|');
const scdl = require('soundcloud-downloader').create({
  clientID: config.scdl,
  axiosInstance: axios.create(),
});
const debugWM = '*「 DEBUG 」*\n\n';

// if (setting.restartState) {
//     client.sendMessage(setting.restartId, 'Restart Succesfull!', text)
//     setting.restartState = false
//     setting.restartId = 'undefined'
//     db.push('/setting', setting, true)
// }
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
// function sleep(ms: number): Promise<NodeJS.Timeout> {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
function isEnable(query: string): boolean {
  if (query === 'enable') return true;
  else if (query === 'enabled') return true;
  else if (query === 'aktif') return true;
  else if (query === 'on') return true;
  else if (query === 'true') return true;
  else if (query === 'start') return true;
  else if (query === '1') return true;
  return false;
}
function isDisable(query: string): boolean {
  if (query === 'disable') return true;
  else if (query === 'disabled') return true;
  else if (query === 'nonaktif') return true;
  else if (query === 'off') return true;
  else if (query === 'false') return true;
  else if (query === 'stop') return true;
  else if (query === '0') return true;
  return false;
}
function upTime() {
  let ut_sec = os.uptime();
  let ut_min = ut_sec / 60;
  let ut_hour = ut_min / 60;
  ut_sec = Math.floor(ut_sec);
  ut_min = Math.floor(ut_min);
  ut_hour = Math.floor(ut_hour);
  ut_hour = ut_hour % 60;
  ut_min = ut_min % 60;
  ut_sec = ut_sec % 60;
  return ut_hour + ' JAM ' + ut_min + ' MENIT ' + ut_sec + ' DETIK';
}
function formatTrue(target: boolean): string {
  if (target) return 'Ya';
  else if (target === false) return 'Tidak';
  return target;
}
function formatOnOff(target: boolean): string {
  if (target) return 'ON';
  else if (target === false) return 'OFF';
  return target;
}
function is_undefined(input: any): boolean {
  const u = void 0;
  return input === u;
}
const filterWord = (text: string): string | boolean => {
  if (text.toLowerCase().match(new RegExp(filteredWord(), 'g'))) {
    return 'Mohon untuk tidak menggunakan kata2 KASAR/TABU!';
  } else {
    return false;
  }
};
function formatK(num: number) {
  return (Math.abs(num) > 999
    ? Math.sign(num) * <any>(Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num)) as string;
}
/**
 * Convert Buffer to Readable Stream
 * @param {Buffer} buffer
 * @returns {ReadableStream}
 */
function buffer2Stream(buffer: Buffer): Readable {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
}
const getPic = (serial: string): Promise<Buffer> =>
  new Promise(resolve => {
    client
      .getProfilePicture(serial)
      .then(res => {
        getBuffer(res).then(res2 => {
          return resolve(res2);
        });
      })
      .catch(() => {
        return resolve(fs.readFileSync('../imagedefault-dp.jpeg'));
      });
  });
console.log('------------------------------------------------');
console.log(
  color(
    figlet.textSync('XYZ BOT', {
      horizontalLayout: 'full',
      verticalLayout: 'full',
    })
  )
);
console.log('------------------------------------------------');
console.log('•', color('[INFO]', 'yellow'), color('BOT Started!'));

cron.schedule('0 0 0 * * *', () => {
  const {spawn} = require('child_process');
  const hari = moment().format('dddd');
  const date = moment().format('Do MMMM YYYY');
  const anjay1 = spawn('convert', [
    '../imagetemplate-backup.jpg',
    '-font',
    '../fonts/Indie-Flower.ttf',
    '-size',
    '700x960',
    '-pointsize',
    '22',
    '-annotate',
    '+680+127',
    hari,
    '../imagetemplate.jpg',
  ]);
  anjay1.on('close', () => {
    const anjay2 = spawn('convert', [
      '../imagetemplate.jpg',
      '-font',
      '../fonts/Indie-Flower.ttf',
      '-size',
      '700x960',
      '-pointsize',
      '22',
      '-annotate',
      '+689+158',
      date,
      '../imagetemplate.jpg',
    ]);
    anjay2.on('close', () => {
      console.log('[INFO] nulis date updated!');
    });
  });
});
//-----------------------message-----------------------//
export async function unSendHandler(message: WAMessage): Promise<any> {
  try {
    const {remoteJid: from, id: id_deleted, fromMe} = message.key;
    const messageStubType =
      WA_MESSAGE_STUB_TYPES[message.messageStubType] || 'MESSAGE';
    const replyMode = setting.fakeReply
      ? client.generateFakeReply(setting.fakeText)
      : message;
    console.log(message);
    if (messageStubType === 'REVOKE') {
      if (!setting.unSend.includes(from!)) return;
      const isGroupMsg = from!.endsWith('@g.us') ? true : false;
      const sender: any = fromMe
        ? client.user.jid
        : isGroupMsg
        ? message.participant
        : from;
      const conts = fromMe
        ? client.contacts[sender]
        : client.contacts[sender] || {
            name: sender.replace(/@.+/, ''),
            vname: sender.replace(/@.+/, ''),
            notify: sender.replace(/@.+/, ''),
          };
      //       const quotedMsgObj = () =>
      //         isQuoted
      //           ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message
      //               .extendedTextMessage.contextInfo
      //           : false;
      //       const pushname = fromMe
      //         ? client.user.name
      //         : conts!.notify || conts!.vname || conts!.name || '-';
      //       const contextInfo = {mentionedJid: [sender]};

      //       const buff = fs.readFileSync(res);
      //       const njay: any = await file_type.fromBuffer(buff);
      //       function send(type: MessageType) {
      //         client.sendMessage(from, buff, type, {
      //           caption: '*XyZ BOT Cloud*',
      //           quoted: replyMode,
      //           mimetype: type === audio ? Mimetype.mp4Audio : njay.mime,
      //         });
      //       }
      //       function sendSticker() {
      //         client.sendMessage(from, buff, sticker, {quoted: replyMode});
      //       }
      //       switch (njay.ext) {
      //         case 'mp4':
      //           send(video);
      //           break;
      //         case 'mp3':
      //           send(audio);
      //           break;
      //         case 'jpg':
      //           send(image);
      //           break;
      //         case 'png':
      //           send(image);
      //           break;
      //         case 'm4a':
      //           send(audio);
      //           break;
      //         case 'webp':
      //           sendSticker();
      //           break;
      //         default:
      //           client.sendMessage(from, buff, document, {
      //             filename: 'cloud.' + njay.ext,
      //             caption: '*XyZ BOT Cloud*',
      //             quoted: replyMode,
      //             mimetype: njay.mime,
      //           });
      //           break;
      //       }
      //       for (let i = 0; i < infoMSG.length; i++) {
      //         if (infoMSG[i].key.id === id_deleted) {
      //           const dataInfo = infoMSG[i];
      //           const type = Object.keys(infoMSG[i].message)[0];
      //           const timestamp = infoMSG[i].messageTimestamp;
      //           int = {
      //             no: i,
      //             type: type,
      //             timestamp: timestamp,
      //             data: dataInfo,
      //           };
      //         }
      //       }
      //       const index = Number(int.no);
      //       const body =
      //         int.type === 'conversation'
      //           ? infoMSG[index].message.conversation
      //           : int.type === 'extendedTextMessage'
      //           ? infoMSG[index].message.extendedTextMessage.text
      //           : int.type === 'imageMessage'
      //           ? infoMSG[index].message.imageMessage.caption
      //           : int.type === 'stickerMessage'
      //           ? 'Sticker'
      //           : int.type === 'audioMessage'
      //           ? 'Audio'
      //           : int.type === 'videoMessage'
      //           ? infoMSG[index].videoMessage.caption
      //           : infoMSG[index];
      //       if (int.type === 'conversation' || int.type === 'extendedTextMessage') {
      //         const strConversation = `「 *ANTI-DELETE* 」
      // *Nama :* ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
      // *Tipe :* Text
      // *Waktu :* ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
      // *Pesan :* ${body ? body : '-'}
      // `;
      //         client.sendMessage(from!, strConversation, text, {
      //           quoted: replyMode,
      //           contextInfo: contextInfo,
      //         });
      //       } else if (int.type === 'stickerMessage') {
      //         const filename = `${sender.replace(
      //           '@s.whatsapp.net',
      //           ''
      //         )}-${moment().unix()}`;
      //         const savedFilename = await client.downloadAndSaveMediaMessage(
      //           int.data,
      //           `../temp/${filename}`
      //         );
      //         const strConversation = `「 *ANTI-DELETE* 」
      // Nama :* ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
      // Tipe :* Sticker
      // Waktu :* ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
      // `;

      //         const buff = fs.readFileSync(savedFilename);
      //         client.sendMessage(from!, strConversation, text, {
      //           quoted: replyMode,
      //           contextInfo: contextInfo,
      //         });
      //         client.sendMessage(from!, buff, sticker, {quoted: replyMode});
      //         // console.log(stdout)
      //         fs.unlinkSync(savedFilename);
      //       } else if (int.type === 'imageMessage') {
      //         const filename = `${sender.replace(
      //           '@s.whatsapp.net',
      //           ''
      //         )}-${moment().unix()}`;
      //         const savedFilename = await client.downloadAndSaveMediaMessage(
      //           int.data,
      //           `../temp/${filename}`
      //         );
      //         const buff = fs.readFileSync(savedFilename);
      //         const strConversation = `「 *ANTI-DELETE* 」
      // *Nama :* ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
      // *Tipe :* Image
      // *Waktu :* ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
      // *Pesan :* ${body ? body : '-'}\`\`\`
      // `;
      //         client.sendMessage(from!, buff, image, {
      //           quoted: replyMode,
      //           contextInfo: contextInfo,
      //           caption: strConversation,
      //         });
      //         fs.unlinkSync(savedFilename);
      //       }
    }
  } catch (e) {
    console.log('Message : %s', color(e, 'green'));
    // console.log(e)
  }
}
export async function handler(message: WAMessage): Promise<any> {
  try {
    if (message.messageStubType === 1) console.log(message);
    const fromMe: boolean = message.key.fromMe!;
    const chatId: string = message.key.remoteJid!;
    const msgId: string = message.key.id!;
    const from: string = message.key.remoteJid!;
    if (debug && fromMe) console.log(JSON.stringify(message, null, '\n'));
    if (autoRead) client.chatRead(from);
    const botNumber = client.user.jid;
    const isGroupMsg = from.includes('@g.us');
    const serial = fromMe ? botNumber : isGroupMsg ? message.participant : from;
    if (!fromMe && (setting.universalPublic || !publicJid.has(serial))) return;
    const isSadmin = sAdmin === serial;
    const type: string = Object.keys(message.message!)[0];
    const isQuoted = type === 'extendedTextMessage';
    const content = () => {
      try {
        return Object.keys(
          message.message!.extendedTextMessage!.contextInfo!.quotedMessage!
        )[0];
      } catch (error) {
        return false;
      }
    };
    const body: string =
      type === 'conversation'
        ? message.message!.conversation!
        : type === 'imageMessage'
        ? message.message!.imageMessage!.caption!
        : type === 'videoMessage'
        ? message.message!.videoMessage!.caption!
        : type === 'extendedTextMessage'
        ? message.message!.extendedTextMessage!.text!
        : '';
    const t = <number>message.messageTimestamp * 1000;
    const time = moment(t).format('HH:mm:ss');
    const cmd: string = body.substr(0, 1) === prefix ? body : '';
    const args: any = cmd.split(' ');
    const groupMetadata: any = isGroupMsg
      ? await client.groupMetadata(from)
      : '';
    const groupName: string = isGroupMsg ? groupMetadata.subject : '';
    const groupId: string = isGroupMsg ? groupMetadata.jid : '';
    const groupDesc: string = isGroupMsg ? groupMetadata.desc : '';
    const groupMembers = isGroupMsg ? groupMetadata.participants : '';
    const groupAdmins = isGroupMsg ? getGroupAdmins(groupMembers) : '';
    const isBotGroupAdmins: boolean = groupAdmins.includes(botNumber) || false;
    const isGroupAdmins: boolean = groupAdmins.includes(serial) || false;
    const isGroupAdminOnly: boolean = isGroupMsg
      ? groupMetadata.announce
      : false;
    const isMedia =
      type === 'imageMessage' ||
      type === 'videoMessage' ||
      type === 'audioMessage' ||
      type === 'stickerMessage' ||
      type === 'documentMessage';
    const isImage = isQuoted
      ? content() === 'imageMessage'
      : type === 'imageMessage';
    const isVideo = isQuoted
      ? content() === 'videoMessage'
      : type === 'videoMessage';
    // const isAudio = isQuoted ? content() === 'audioMessage' : type === 'audioMessage';
    // const isSticker = isQuoted ? content() === 'stickerMessage' : type === 'stickerMessage';
    // const isDocument = isQuoted ? content() === 'documentMessage' : type === 'documentMessage';
    const isQuotedText = content() === 'conversation';
    const isQuotedImage = content() === 'imageMessage';
    const isQuotedVideo = content() === 'videoMessage';
    const isQuotedAudio = content() === 'audioMessage';
    const isQuotedSticker = content() === 'stickerMessage';
    const isQuotedDocument = content() === 'documentMessage';
    const quotedMsgObj = () =>
      isQuoted
        ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message
            .extendedTextMessage.contextInfo
        : false;
    const getQuotedText = () =>
      isQuotedText
        ? message.message!.extendedTextMessage!.contextInfo!.quotedMessage!
            .conversation
        : cmd;
    const getQuotedImage = () =>
      isQuotedImage
        ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message
            .extendedTextMessage.contextInfo
        : message;
    const getQuotedVideo = () =>
      isQuotedVideo
        ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message
            .extendedTextMessage.contextInfo
        : message;
    const getQuotedAudio = () =>
      isQuotedAudio
        ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message
            .extendedTextMessage.contextInfo
        : message;
    const getQoutedSticker = () =>
      isQuotedSticker
        ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message
            .extendedTextMessage.contextInfo
        : message;
    const getQuotedDocument = () =>
      isQuotedDocument
        ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message
            .extendedTextMessage.contextInfo
        : message;
    if (!isBotGroupAdmins && isGroupAdminOnly) return;
    const replyMode = setting.fakeReply
      ? client.generateFakeReply(setting.fakeText)
      : message;
    const fileSize = (quoted: boolean) => {
      if (quoted) {
        const msg: any = quotedMsgObj().message ?? [type];
        return msg.fileLength.low;
      } else {
        const msg: any = message.message ?? [type];
        return msg.fileLength.low;
      }
    };
    const pushname = (target?: string) => {
      const targets: string = target || serial;
      const v =
        targets === '0@s.whatsapp.net'
          ? {jid: targets, vname: 'WhatsApp'}
          : targets === client.user.jid
          ? client.user
          : client.addContact(targets);
      return (
        v.name ||
        v.vname ||
        v.notify ||
        libphonenumber('+' + v.jid.replace('@s.whatsapp.net', '')).getNumber(
          'international'
        )
      );
    };
    const mentionedJidList = () => {
      if (!is_undefined(quotedMsgObj().mentionedJid)) {
        return quotedMsgObj().mentionedJid;
      }
      return [];
    };
    async function reply(
      teks: string,
      options?: any,
      fakeText: string = setting.fakeText
    ) {
      client.chatRead(from);
      return client.reply(from, teks, message, options, fakeText);
    }
    async function sendText(teks: string) {
      client.chatRead(from);
      return client.sendMessage(from, teks, text);
    }
    // function sendMedia (buffer: Buffer, type: MessageType, obj?: any){
    //     if(!buffer || !type || !obj) return console.error('Invalid parameters')
    //     client.sendMessage(from, buffer, type, obj)
    // }
    function mentions(id: any, teks: string, member: string[]) {
      client.chatRead(from);
      id === null || id === undefined || id === false
        ? client.sendMessage(from, teks.trim(), extendedText, {
            contextInfo: {mentionedJid: member},
          })
        : client.sendMessage(from, teks.trim(), extendedText, {
            quoted: message,
            contextInfo: {mentionedJid: member},
          });
    }
    const pre = (cmd: string) => {
      if (args[0] === prefix + cmd) {
        client.chatRead(from);
        if (!isGroupMsg && logMode)
          console.log(
            '•',
            color('[EXEC]', 'yellow'),
            time,
            color(args[0]),
            'from',
            color(pushname())
          );
        if (isGroupMsg && logMode)
          console.log(
            '•',
            color('[EXEC]', 'yellow'),
            time,
            color(args[0]),
            'from',
            color(pushname()),
            'in',
            color(groupName)
          );
        if (addCount(cmd)) return true;
      }
      return false;
    };
    const secondParam = (param: string): boolean => {
      if (args[1] === param) {
        return true;
      }
      return false;
    };
    function permission(permArry: string[]): boolean {
      for (const i of permArry) {
        if (i === 'self' && !fromMe) {
          reply('Maaf, perintah ini hanya dapat dipakai oleh host!');
          return true;
        } else if (i === 'admin' && !isSadmin) {
          reply('Maaf, perintah ini hanya dapat dipakai oleh admin bot!');
          return true;
        } else if (i === 'group' && !isGroupMsg) {
          reply('Maaf, perintah ini hanya dapat dipakai didalam grup!');
          return true;
        } else if (i === 'botadmin' && !isBotGroupAdmins) {
          reply(
            'Maaf, perintah ini hanya dapat di gunakan ketika bot menjadi admin!'
          );
          return true;
        } else if (i === 'admingroup' && !isGroupAdmins) {
          reply('Maaf, perintah ini hanya dapat di gunakan oleh admin group!');
          return true;
        } else if (i === 'private' && isGroupMsg) {
          reply('Maaf, perintah ini hanya dapat diprivate message!');
          return true;
        }
      }
      return false;
    }
    function getQuery(find: string, msg?: string): any {
      if (msg) return msg.slice(prefix.length + find.length + 1);
      return cmd.slice(prefix.length + find.length + 1);
    }
    if (!cmd) {
      if (autoReply && replies.isReply(body)) {
        const repls = replies.getReply(body);
        if (repls !== false) {
          reply(repls);
        }
      } else if (body.length >= 4500 && antiVirtex) {
        client.deleteMessage(from, {id: msgId, remoteJid: from, fromMe: false});
      } else if (isGroupMsg) {
        groups.isCmd(chatId, body).then(async (res: any) => {
          if (res.result) {
            reply(res.result);
            if (logMode)
              console.log(
                '•',
                color('[C-CMD]', 'yellow'),
                time,
                color(res.cmd),
                'from',
                color(pushname()),
                'in',
                color(groupName)
              );
          } else {
            const buff = fs.readFileSync(res.isMedia);
            const njay: any = await file_type.fromBuffer(buff);
            function send(type: MessageType) {
              client.sendMessage(from, buff, type, {
                caption: '*XyZ BOT Cloud*',
                quoted: replyMode,
                mimetype: type === audio ? Mimetype.mp4Audio : njay.mime,
              });
            }
            function sendSticker() {
              client.sendMessage(from, buff, sticker, {quoted: replyMode});
            }
            switch (njay.ext) {
              case 'mp4':
                send(video);
                break;
              case 'mp3':
                send(audio);
                break;
              case 'jpg':
                send(image);
                break;
              case 'png':
                send(image);
                break;
              case 'm4a':
                send(audio);
                break;
              case 'webp':
                sendSticker();
                break;
              default:
                client.sendMessage(from, buff, document, {
                  filename: 'cloud.' + njay.ext,
                  caption: '*XyZ BOT Cloud*',
                  quoted: replyMode,
                  mimetype: njay.mime,
                });

                break;
            }
          }
          addCount('custom cmd');
        });
      } else if ((body || '').startsWith('xreturn ')) {
        if (permission(['self', 'admin'])) return;
        let ctype = Function;
        const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
        if (/await/.test(body)) ctype = AsyncFunction;
        const func = new ctype(
          'print',
          Object.keys(client)[0],
          'from',
          'message',
          'body',
          'require',
          !/^return /.test(body.slice(8)) &&
          body.slice(8).split('\n').length === 1
            ? 'return ' + body.slice(8)
            : body.slice(8)
        );
        let output;
        try {
          output = func(
            (...args: any) => {
              reply(util.format(...args));
            },
            client,
            from,
            message,
            body,
            require,
            (teks: string) =>
              teks
                .replace(
                  /^(async function|function|async).+\(.+?\).+{/,
                  "case 'command':"
                )
                .replace(/this\.(teks|url|args)/g, (_, teks) => {
                  switch (body) {
                    case 'teks':
                      return "args.join(' ')";
                    case 'args':
                      return 'args';
                    case 'url':
                      return 'args[0]';
                    default:
                      return _;
                  }
                })
                .replace(/}$/, '    break')
          );
          reply(util.format(output));
        } catch (e) {
          reply(util.format(e));
        }
      } else if ((body || '').startsWith('>> ')) {
        if (permission(['self', 'admin'])) return;
        const exec = body.slice(3).replace(';', '').replace('&&', '');
        child.exec(exec, (error: any, stdout: any, stderr: any) => {
          if (error) return reply('*[ERROR]*\n' + error.toString());
          if (stdout) return reply('*[STDOUT]*\n' + stdout.toString());
          if (stderr) return reply('*[STDERR]*\n' + stderr.toString());
          return;
        });
      }
    } else {
      if (errCmd.includes(args[0].replace(prefix, '')))
        return reply(`Maaf, perintah *${args[0]}* sedang mengalami error`);
      if (pre('arch')) {
        if (permission(['self'])) return;
        pm2.describe(pm2Id, (err, res: any) => {
          if (err) console.error(err);
          const used = res[0].monit.memory / 1024 / 1024;
          const hasil = stripIndents`*「 System Architecture 」*
                • Usage: ${Math.round(used * 100) / 100} MB
                • CPU: ${res[0].monit.cpu} %
                • Total: 4GB/2CPU
                • Versi: ${res[0].pm2_env.version}
                • Node: ${res[0].pm2_env.node_version}
                • Uptime: ${moment(res[0].pm2_env.pm_uptime).fromNow()}`;
          reply(hasil);
        });
        // } else if (pre('info') || pre('changelog') || pre('changes')) {
        //     if(permission(['self'])) return
        //     let hasilx = info.replace('%state', state.status)
        //     reply(hasilx)
      } else if (pre('bug')) {
        if (permission(['self'])) return;
        const bug = getQuery('bug');
        if (!bug) return reply('Maaf perintah tidak valid');
        if (isGroupMsg) {
          client.sendMessage(
            sAdmin,
            `*「 BUG REPORT 」*\nNO PENGIRIM : wa.me/${serial.match(
              /\d+/g
            )}\nGroup : ${groupName}\n\n${bug}`,
            text
          );
          reply(
            'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.'
          );
        } else {
          client.sendMessage(
            sAdmin,
            `*「 BUG REPORT 」*\nNO PENGIRIM : wa.me/${serial.match(
              /\d+/g
            )}\n\n${bug}`,
            text
          );
          reply(
            'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.'
          );
        }
      } else if (pre('feature')) {
        if (permission(['self'])) return;
        if (!args[1]) return reply('Maaf perintah tidak valid');
        const feature = getQuery('feature');
        if (!feature) return;
        if (isGroupMsg) {
          client.sendMessage(
            sAdmin,
            `*「 FEATURE 」*\nNO PENGIRIM : wa.me/${serial.match(
              /\d+/g
            )}\nGroup : ${groupName}\n\n${feature}`,
            text
          );
          reply(
            'Rekomendasi fitur telah dilaporkan ke owner BOT, jika bisa akan dibuatkan secepatnya'
          );
        } else {
          client.sendMessage(
            sAdmin,
            `*「 FEATURE 」*\nNO PENGIRIM : wa.me/${serial.match(
              /\d+/g
            )}\n\n${feature}`,
            text
          );
          reply(
            'Rekomendasi fitur telah dilaporkan ke owner BOT, jika bisa akan dibuatkan secepatnya'
          );
        }
      } else if (pre('feedback')) {
        if (permission(['self'])) return;
        if (!args[1]) return reply('Maaf perintah tidak valid');
        const feedback = getQuery('feedback');
        if (!feedback) return;
        if (isGroupMsg) {
          client.sendMessage(
            sAdmin,
            `*「 FEEDBACK 」*\nNO PENGIRIM : wa.me/${serial.match(
              /\d+/g
            )}\nGroup : ${groupName}\n\n${feedback}`,
            text
          );
          reply(
            'Feedback anda telah diterima, kami senang anda berpendapat :)'
          );
        } else {
          client.sendMessage(
            sAdmin,
            `*「 FEEDBACK 」*\nNO PENGIRIM : wa.me/${serial.match(
              /\d+/g
            )}\n\n${feedback}`,
            text
          );
          reply(
            'Feedback anda telah diterima, kami senang anda berpendapat :)'
          );
        }
      } else if (pre('sticker') || pre('stiker')) {
        if (isImage) {
          client.downloadMediaMessage(getQuotedImage()).then(data => {
            sharp(data)
              .resize({
                width: 512,
                height: 512,
                fit: sharp.fit.contain,
                background: {r: 0, g: 0, b: 0, alpha: 0},
              })
              .webp()
              .toBuffer()
              .then((buffer: Buffer) => {
                modifExif(buffer, msgId, res => {
                  client.sendMessage(from, res, sticker, {quoted: replyMode});
                });
              });
          });
        } else if (isVideo) {
          let kualitas = args[1];
          if (!kualitas) kualitas = 3;
          if (isNaN(kualitas) || kualitas >= 6)
            return reply(
              'Maaf, kualitas sticker tidak valid\n\ndaftar kualitas sticker: ' +
                prefix +
                'quality'
            );
          client.downloadMediaMessage(getQuotedVideo()).then(data => {
            gify(msgId, data, kualitas).then(res => {
              client.sendMessage(from, res, sticker, {quoted: replyMode});
            });
          });
        } else {
          reply(
            `Tidak ada gambar/video! Untuk membuat sticker kirim gambar/video dengan caption \n${prefix}stiker`
          );
        }
      } else if (pre('round')) {
        if (isQuotedAudio || isQuotedDocument || isQuotedText || isQuotedVideo)
          return reply('Only image and stickers allowed!');
        const roundedCorners = Buffer.from(
          '<svg><rect x="0" y="0" width="600" height="600" rx="300" ry="300"/></svg>'
        );
        client.downloadMediaMessage(quotedMsgObj()).then(mediaData => {
          sharp(mediaData)
            .resize({
              width: 600,
              height: 600,
            })
            .composite([
              {
                input: roundedCorners,
                blend: 'dest-in',
              },
            ])
            .webp()
            .toBuffer()
            .then(buffer => {
              modifExif(buffer, msgId, res => {
                client.sendMessage(from, res, sticker, {quoted: replyMode});
              });
            });
        });
      } else if (pre('quality')) {
        reply(template.quality());
      } else if (pre('ssave')) {
        const query = getQuery('ssave');
        if (!query) return reply('Maaf, perintah tidak valid');
        if (!isQuotedSticker) return reply('Harus mereply sticker!');
        client.downloadMediaMessage(getQoutedSticker()).then(async resp => {
          stickerSave
            .saveSticker(query, resp, serial)
            .then((res: any) => reply(res))
            .catch(err => reply(err));
        });
      } else if (pre('supdate')) {
        const query = getQuery('supdate');
        if (!query) return reply('Maaf, perintah tidak valid');
        if (!isQuotedSticker) return reply('Harus mereply sticker!');
        client.downloadMediaMessage(getQoutedSticker()).then(async resp => {
          stickerSave
            .updateSticker(query, resp)
            .then((res: any) => reply(res))
            .catch(err => reply(err));
        });
      } else if (pre('sdelete')) {
        const query = getQuery('sdelete');
        if (!query) return reply('Maaf, perintah tidak valid');
        const res = stickerSave.deleteSticker(query);
        reply(res);
      } else if (pre('sinfo')) {
        const query = getQuery('sinfo');
        if (!query) return reply('Maaf, perintah tidak valid');
        stickerSave
          .infoSticker(query)
          .then((res: any) => {
            client.sendMessage(from, res.buffer, image, {
              caption: res.hasil,
              quoted: replyMode,
              contextInfo: {mentionedJid: [res.mentioned]},
            });
          })
          .catch(err => reply(err));
      } else if (pre('slist')) {
        const res = stickerSave.listSticker();
        reply(res);
      } else if (pre('s')) {
        const query = getQuery('s');
        if (!query) return reply('Maaf, perintah tidak valid');
        const res = stickerSave.getSticker(query);
        if (!Buffer.isBuffer(res)) return reply(res);
        client.sendMessage(from, res, sticker, {quoted: replyMode});
      } else if (pre('menu') || pre('help')) {
        pm2.describe(pm2Id, (err, res) => {
          if (err) console.error(err);
          let helps: string = template
            .help()
            .replace('<%>', moment().format('llll'));
          helps = helps.replace('$hit', countAll());
          helps = helps.replace('$name', client.user.name!);
          helps = helps.replace('$prefix', prefix);
          helps = helps.replace(
            '$runtime',
            moment(res[0]!.pm2_env!.pm_uptime).fromNow()
          );
          reply(helps);
        });
      } else if (pre('delete')) {
        if (permission(['self'])) return;
        client.deleteMessage(from, {
          id: quotedMsgObj().stanzaId,
          remoteJid: from,
          fromMe: true,
        });
      } else if (pre('mimic')) {
        if (permission(['admin'])) return;
        if (isDisable(args[1]) || mentionedJidList()[0]) {
          const target = mentionedJidList()[0] ? mentionedJidList()[0] : serial;
          const i = mimics.indexOf(target);
          mimics.splice(i, 1);
          reply('Mimic stopped!');
        } else if (isEnable(args[1]) || mentionedJidList()[0]) {
          const target = mentionedJidList()[0] ? mentionedJidList()[0] : serial;
          mimics.push(target);
          reply('Mimic telah di tambahkan');
        } else {
          reply('Maaf, perintah tidak valid');
        }
      } else if (pre('inspect') || pre('detect')) {
        if (isMedia || isQuotedImage) {
          const first = moment();
          client
            .downloadAndSaveMediaMessage(getQuotedImage(), '../temp/' + msgId)
            .then(async res => {
              const asu = child.fork('../lib/inspect.js', ['--no-warnings']);
              asu.send(res);
              asu.on('message', async (out: any) => {
                let hasil = '*Lewd Detector*\n\n';
                for (const i of out) {
                  hasil +=
                    i.className +
                    ' : ' +
                    i.probability.toFixed(2).slice(1) +
                    '%\n';
                }
                hasil = hasil.replace('undefined', '');
                hasil += `\nProcessing Speed: *${moment
                  .duration(moment().diff(moment(first)))
                  .seconds()}sec*`;
                reply(hasil);
                fs.unlink(res, () => {});
              });
            });
        }
      } else if (pre('donasi')) {
        sendText(template.donasi()).then(() => {
          client.sendMessage(from, <WAContactMessage>vcard.cs, contact);
        });
      } else if (pre('bahasa')) {
        sendText(template.bahasa());
      } else if (pre('list')) {
        if (!secondParam('surah')) return;
        sendText(db.getData('/surah'));
      } else if (pre('meme')) {
        meme()
          .then(async res => {
            const buff = (await client.getFile(res.Link)).buffer;
            const type: any = await file_type.fromBuffer(buff);
            client.sendMessage(from, buff, image, {
              filename: 'meme' + type.ext,
              caption: res.title,
              quoted: replyMode,
              mimetype: type.mime,
            });
          })
          .catch(err => reply(err));
      } else if (pre('me') || pre('profile')) {
        const target = mentionedJidList()[0]
          ? mentionedJidList()[0]
          : fromMe
          ? client.user.jid
          : serial;
        const statusStr = (await client.getStatus(target)).status;
        const hasil = stripIndents`*「 USER INFO 」*\n
            • _name : *${
              target === client.user.jid ? client.user.name : pushname(target)
            }*_
            • _public : *${formatTrue(publicJid.has(target))}*_ ${
          isGroupMsg ? `\n• _admin : *${formatTrue(isGroupAdmins)}*_` : ''
        }
            • _tag : *@${target.split('@')[0]}*_
            • _number : *${libphonenumber(
              '+' + target.replace('@s.whatsapp.net', '')
            ).getNumber('international')}*_
            • _wapi : *wa.me/${target.split('@')[0]}*_
            • _status : \n\n${statusStr}_`;
        getPic(target).then(data => {
          client.sendMessage(from, data, image, {
            contextInfo: {mentionedJid: [target]},
            filename: 'anda.jpg',
            caption: hasil,
            quoted: replyMode,
          });
        });
      } else if (pre('prefix')) {
        if (permission(['self'])) return;
        if (!args[1]) return;
        const prf = args[1];
        prefix = prf;
        setting.prefix = prf;
        db.push('/setting', setting, true);
        reply('Prefix sukses diganti ke:\n\n*' + prf + '*');
      } else if (pre('getpic')) {
        if (!mentionedJidList()[0]) return reply('Maaf, perintah tidak valid');
        const statusStr = (await client.getStatus(mentionedJidList()[0]))
          .status;
        getPic(mentionedJidList()[0]).then(data => {
          client.sendMessage(from, data, image, {
            filename: 'anda.jpg',
            caption: '*Status* :\n' + statusStr,
            quoted: replyMode,
          });
        });
      } else if (pre('triggered')) {
        if (isImage) {
          client.downloadMediaMessage(getQuotedImage()).then(data => {
            canvacord.triggered(data, msgId).then(res => {
              client.sendMessage(from, res, sticker, {quoted: replyMode});
            });
          });
        } else {
          getPic(mentionedJidList()[0] ? mentionedJidList()[0] : serial).then(
            res => {
              canvacord.triggered(res, msgId).then(res => {
                client.sendMessage(from, res, sticker, {quoted: replyMode});
              });
            }
          );
        }
      } else if (pre('thuglife')) {
        if (isImage) {
          client.downloadMediaMessage(getQuotedImage()).then(data => {
            canvacord.thuglife(data).then(res => {
              client.sendMessage(from, res, image, {
                filename: 'hasil.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            });
          });
        } else {
          getPic(mentionedJidList()[0] ? mentionedJidList()[0] : serial).then(
            res => {
              canvacord.thuglife(res).then(res => {
                client.sendMessage(from, res, image, {
                  filename: 'hasil.jpg',
                  caption: '_*「 XyZ BOT Automation 」*_',
                  quoted: replyMode,
                });
              });
            }
          );
        }
      } else if (pre('burn')) {
        const query = getQuery('burn');
        if (!query) return reply('Maaf, perintah tidak valid');
        canvacord.burn(query).then(res => {
          client.sendMessage(from, res, image, {
            filename: 'hasil.jpg',
            caption: '_*「 XyZ BOT Automation 」*_',
            quoted: replyMode,
          });
        });
      } else if (pre('wasted')) {
        if (isImage) {
          client.downloadMediaMessage(getQuotedImage()).then(data => {
            canvacord.wasted(data).then(res => {
              client.sendMessage(from, res, image, {
                filename: 'hasil.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            });
          });
        } else {
          getPic(mentionedJidList()[0] ? mentionedJidList()[0] : serial).then(
            res => {
              canvacord.wasted(res).then(res => {
                client.sendMessage(from, res, image, {
                  filename: 'hasil.jpg',
                  caption: '_*「 XyZ BOT Automation 」*_',
                  quoted: replyMode,
                });
              });
            }
          );
        }
      } else if (pre('wanted')) {
        if (isImage) {
          client.downloadMediaMessage(getQuotedImage()).then(data => {
            canvacord.wanted(data).then(res => {
              client.sendMessage(from, res, image, {
                filename: 'hasil.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            });
          });
        } else {
          getPic(mentionedJidList()[0] ? mentionedJidList()[0] : serial).then(
            res => {
              canvacord.wanted(res).then(res => {
                client.sendMessage(from, res, image, {
                  filename: 'hasil.jpg',
                  caption: '_*「 XyZ BOT Automation 」*_',
                  quoted: replyMode,
                });
              });
            }
          );
        }
      } else if (pre('fisheye')) {
        let query = getQuery('fisheye');
        if (!query) query = 75;
        if (isNaN(query)) return reply('Maaf, perintah tidak valid');
        if (query < 1) return reply('Maaf, minimal 1-100');
        if (query > 100) return reply('Maaf, maksimal 100');
        if (isImage) {
          client.downloadMediaMessage(getQuotedImage()).then(data => {
            canvacord.fisheye(data, query).then(res => {
              client.sendMessage(from, res, image, {
                filename: 'hasil.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            });
          });
        } else {
          getPic(mentionedJidList()[0] ? mentionedJidList()[0] : serial).then(
            res => {
              canvacord.fisheye(res, query).then(res => {
                client.sendMessage(from, res, image, {
                  filename: 'hasil.jpg',
                  caption: '_*「 XyZ BOT Automation 」*_',
                  quoted: replyMode,
                });
              });
            }
          );
        }
      } else if (pre('rainbow')) {
        if (isImage) {
          client.downloadMediaMessage(getQuotedImage()).then(data => {
            canvacord.rainbow(data).then(res => {
              client.sendMessage(from, res, image, {
                filename: 'hasil.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            });
          });
        } else {
          getPic(mentionedJidList()[0] ? mentionedJidList()[0] : serial).then(
            res => {
              canvacord.rainbow(res).then(res => {
                client.sendMessage(from, res, image, {
                  filename: 'hasil.jpg',
                  caption: '_*「 XyZ BOT Automation 」*_',
                  quoted: replyMode,
                });
              });
            }
          );
        }
      } else if (pre('facepalm') || pre('fp')) {
        if (isImage) {
          client.downloadMediaMessage(getQuotedImage()).then(data => {
            canvacord.facepalm(data).then(res => {
              client.sendMessage(from, res, image, {
                filename: 'hasil.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            });
          });
        } else {
          getPic(mentionedJidList()[0] ? mentionedJidList()[0] : serial).then(
            res => {
              canvacord.facepalm(res).then(res => {
                client.sendMessage(from, res, image, {
                  filename: 'hasil.jpg',
                  caption: '_*「 XyZ BOT Automation 」*_',
                  quoted: replyMode,
                });
              });
            }
          );
        }
      } else if (pre('fuse')) {
        if (!mentionedJidList()[0] || !mentionedJidList()[1])
          return reply('Maaf, perintah tidak valid');
        const datax1 = await getPic(mentionedJidList()[0]);
        const datax2 = await getPic(mentionedJidList()[1]);
        canvacord.fuse(datax1, datax2).then(res => {
          client.sendMessage(from, res, image, {
            filename: 'hasil.jpg',
            caption: '_*「 XyZ BOT Automation 」*_',
            quoted: replyMode,
          });
        });
      } else if (pre('gplay')) {
        const query = getQuery('gplay');
        gplay
          .search({
            term: query,
            num: 3,
            country: 'id',
          })
          .then((res: any) => {
            if (res.length < 1)
              return reply(
                'Maaf, keyword *' + query + '* tidak ditemukan di playstore'
              );
            let hasil =
                '*Hasil Pencarian PlayStore*\n-----------------------------------------\n\n',
              counter = 1;
            for (const i of res) {
              if (i.free) {
                hasil += stripIndents`*Aplikasi ke-${counter}*
                        • Nama : ${i.title}
                        • Score : ${i.scoreText}
                        • Developer : ${i.developer}
                        • Deskripsi : \n${i.summary}
                        • Url : \n${i.url}\n\n`;
              } else {
                hasil += stripIndents`*Aplikasi ke-${counter}*
                    • Nama : ${i.title}
                    • Score : ${i.scoreText}
                    • Harga : ${i.priceText}
                    • Developer : ${i.developer}
                    • Deskripsi : \n${i.summary}
                    • Url : \n${i.url}\n\n`;
              }
              counter++;
            }
            return reply(hasil);
          })
          .catch(() =>
            reply('Maaf, keyword *' + query + '* tidak ditemukan di playstore')
          );
      } else if (pre('textpro')) {
        if (secondParam('help')) {
          const txtpro = Object.entries(textpro);
          let hasil =
              '*TextPro Scrapper*\n\ntotal tipe:*' + txtpro.length + '*\n',
            counter = 1;
          for (const [key, vals] of txtpro) {
            const val: any = vals;
            hasil += `${counter}. *${key}*\njumlah teks: ${val.type}\n`;
            counter++;
          }
          reply(hasil);
        } else {
          const parsed: any = query_string.parse(getQuery('textpro'));
          if (is_undefined(parsed.type))
            return reply('Maaf, tolong masukan tipe');
          let type = parsed.type.trim();
          if (!Object.prototype.hasOwnProperty.call(textpro, type))
            return reply('Maaf, tipe ini tidak terdaftar');
          type = textpro[type];
          if (type.type === 2) {
            if (is_undefined(parsed.top))
              return reply('Maaf, tolong masukan top');
            if (is_undefined(parsed.bot))
              return reply('Maaf, tolong masukan bot');
            const top = parsed.top.trim(),
              bot = parsed.bot.trim();
            if (top.length > 50 || bot.length > 50)
              return reply('Maaf, teks terlalu panjang');
            scrap.textpro2input(type.link, top, bot).then(res => {
              client.sendFileFromUrl(from, res!, image, {
                quoted: replyMode,
                caption: '_*Proccesing Sulkses #XyZ BOT*_',
              });
            });
          } else {
            if (is_undefined(parsed.text))
              return reply('Maaf, tolong masukan text');
            const text = parsed.text.trim();
            if (text.length > 50) return reply('Maaf, teks terlalu panjang');
            scrap.textpro1input(type.link, text).then(res => {
              client.sendFileFromUrl(from, res!, image, {
                quoted: replyMode,
                caption: '_*Proccesing Sulkses #XyZ BOT*_',
              });
            });
          }
        }
      } else if (pre('photofunia')) {
        client
          .downloadAndSaveMediaMessage(getQuotedImage(), '../temp/' + msgId)
          .then(() => {
            scrap
              .photofunia(
                'https://photofunia.com/categories/all_effects/calendar',
                '../temp/' + msgId + '.jpeg'
              )
              .then((res: any) => {
                client.sendFileFromUrl(from, res, image, {quoted: replyMode});
              })
              .catch(err => reply(err));
          });
      } else if (pre('music')) {
        const query = getQuery('music');
        if (!query) return reply('Maaf, perintah tidak valid');
        scdl
          .search('tracks', query)
          .then((res: any) => {
            let found = false;
            for (const i of res.collection) {
              if (i.downloadable && !found) {
                found = i.uri;
              }
            }
            if (found !== false) {
              scdl
                .download(found)
                .then((stream: any) => {
                  ffmpeg(stream)
                    .inputFormat('mp3')
                    .audioCodec('aac')
                    .save(`../temp/${msgId}.m4a`)
                    .on('end', () => {
                      client.sendMessage(
                        from,
                        fs.readFileSync(`../temp/${msgId}.m4a`),
                        audio,
                        {
                          filename: 'hasil.m4a',
                          caption: 'Sukses',
                          quoted: replyMode,
                          mimetype: Mimetype.mp4Audio,
                        }
                      );
                      fs.unlink(`../temp/${msgId}.m4a`, () => {});
                    });
                })
                .catch((err: any) => console.log(err));
            } else {
              reply('Maaf, keyword music *' + query + '* tidak ditemukan!');
            }
          })
          .catch((err: any) => console.log(err));
      } else if (pre('sholat')) {
        const query = getQuery('sholat');
        axios
          .get(
            `https://api.pray.zone/v2/times/day.json?date=${moment().format(
              'YYYY-MM-DD'
            )}&city=${query}&school=10`
          )
          .then(({data}) => {
            const result = data.results;
            let hasil =
              '*「 Jadwal Sholat Kota ' + result.location.city + ' 」*\n\n';
            hasil += stripIndents`• _Imsak : *${result.datetime[0].times.Imsak}*_
                • _Subuh : *${result.datetime[0].times.Fajr}*_
                • _Terbit : *${result.datetime[0].times.Sunrise}*_
                • _Dzuhur : *${result.datetime[0].times.Dhuhr}*_
                • _Ashar : *${result.datetime[0].times.Asr}*_
                • _Magrib : *${result.datetime[0].times.Maghrib}*_
                • _Isya : *${result.datetime[0].times.Isha}*_

                Nabi _shallallahu ‘alaihi wa sallam_ bersabda,

                _“Lima shalat yang telah Allah Ta’ala wajibkan kepada para hamba-Nya. Siapa saja yang mendirikannya dan tidak menyia-nyiakan sedikit pun darinya karena meremehkan haknya, maka dia memiliki perjanjian dengan Allah Ta’ala untuk memasukkannya ke dalam surga. Sedangkan siapa saja yang tidak mendirikannya, dia tidak memiliki perjanjian dengan Allah Ta’ala. Jika Allah menghendaki, Dia akan Menyiksanya. Dan jika Allah Menghendaki, Allah akan memasukkan ke dalam surga.”_

                *(HR. Abu Dawud no. 1420, An-Nasa’i*\n*no. 426 dan Ibnu Majah no. 1401, shahih)*`;
            reply(hasil);
          })
          .catch(() =>
            reply('Maaf, kota *' + query + '* tidak dapat ditemukan!')
          );
      } else if (pre('food')) {
        food()
          .then((res: string) => {
            getBuffer(res).then(async res2 => {
              const type: any = await file_type.fromBuffer(res2);
              client.sendMessage(from, res2, image, {
                filename: 'meme' + type.ext,
                caption: '_*Processing Sukses! #XyZ BOT*_',
                quoted: replyMode,
                mimetype: type.mime,
              });
            });
          })
          .catch((err: any) => reply(err));
      } else if (pre('imdbs')) {
        const query = getQuery('imdbs');
        if (!query) return reply('Maaf, perintah tidak valid');
        const res = await imdb.simpleSearch(query);
        if (typeof res.d !== 'undefined') {
          let hasil =
              '*Hasil Pencarian IMDB*\n-----------------------------------------\n',
            counter = 1;
          if (res.d.length >= 5) {
            for (let i = 0; i < 5; i++) {
              hasil += stripIndents`*Hasil Film ke-${counter}*
                        • Judul : ${res.d[i].l}
                        • Tahun : ${res.d[i].y}
                        • Caster : \n${res.d[i].s}\n\n`;
              counter++;
            }
            reply(
              hasil +
                '-----------------------------------------\n*' +
                prefix +
                'imdb {Judul}* untuk informasi film selengkapnya'
            );
          } else {
            for (const i of res.d) {
              hasil += stripIndents`*Hasil Film ke-${counter}*
                        • Judul : ${i.l}
                        • Tahun : ${i.y}
                        • Caster : \n${i.s}\n\n`;
              counter++;
            }
            reply(
              hasil +
                '-----------------------------------------\n*' +
                prefix +
                'imdb {Judul}* untuk informasi film selengkapnya'
            );
          }
        } else {
          reply('Maaf, keyword *' + query + '* tidak ditemukan!');
        }
      } else if (pre('imdb')) {
        const query = getQuery('imdb');
        if (!query) return reply('Maaf, perintah tidak valid');
        const res1 = await imdb.simpleSearch(query);
        if (typeof res1.d !== 'undefined') {
          function parseAll(array: string[], config?: any) {
            if (typeof array === undefined) return 'Tidak Ada';
            let hasil = array[0];
            if (config) hasil = array[0]![config];
            for (let i = 1; i < array.length; i++) {
              if (config) {
                hasil += ', ' + array[i]![config];
              } else {
                hasil += ', ' + array[i];
              }
            }
            return hasil;
          }
          const res2 = await imdb.getFull(res1.d[0].id);
          if (!res2)
            return reply('Maaf, keyword *' + query + '* tidak ditemukan!');
          const hasil = stripIndents`*${res2.title}*\n
                • Tahun : ${res2.year}
                • Durasi : ${res2.runtime}
                • Rating : ${res2.rating}
                • Genre : \n${parseAll(res2.genre)}
                • Penulis : \n${parseAll(res2.writers)}
                • Director : \n${parseAll(res2.directors)}
                • Bintang : \n${parseAll(res2.stars)}
                • Story : \n${res2.story}
                • Related : \n${parseAll(res2.related, 'name')}`;
          getBuffer(res2.poster).then(async res => {
            const type: any = await file_type.fromBuffer(res);
            client.sendMessage(from, res, image, {
              filename: 'hasil' + type.ext,
              caption: hasil,
              quoted: replyMode,
              mimetype: type.mime,
            });
          });
        } else {
          reply('Maaf, keyword *' + query + '* tidak ditemukan!');
        }
      } else if (pre('md5')) {
        const query = getQuery('md5');
        sendText('*MD5*\n' + crypto.MD5(query).toString());
      } else if (pre('sha1')) {
        const query = getQuery('sha1');
        sendText('*SHA1*\n' + crypto.SHA1(query).toString());
      } else if (pre('sha3')) {
        const query = getQuery('sha3');
        sendText('*SHA3*\n' + crypto.SHA3(query).toString());
      } else if (pre('sha256')) {
        const query = getQuery('sha256');
        sendText('*SHA256*\n' + crypto.SHA256(query).toString());
      } else if (pre('sha512')) {
        const query = getQuery('sha512');
        sendText('*SHA512*\n' + crypto.SHA512(query).toString());
      } else if (pre('nulis') || pre('tulis')) {
        const text = quotedMsgObj() ? getQuotedText() : getQuery('nulis');
        if (!text)
          return reply(
            `Maaf, perintah tidak valid!\n\ncontoh: *${prefix}nulis [teks]*`
          );
        const lineBreaks: any = matchGroup.matchAll(text, /\n/gi);
        try {
          const nulis = async (word: string) => {
            const text = wrap(word, {width: 60});
            im('../imagetemplate.jpg')
              .command('convert')
              .font('../fonts/Indie-Flower.ttf')
              .out(
                '-pointsize',
                '25',
                '-size',
                '700x960',
                '-interline-spacing',
                '1'
              )
              .drawText(170, 220, text)
              .stream('jpeg')
              .pipe(
                concat((buffer: Buffer) => {
                  client.sendMessage(from, buffer, image, {
                    filename: 'nulis.jpeg',
                    caption: '_*Proccesing Sulkses #XyZ BOT*_',
                    quoted: replyMode,
                    mimetype: Mimetype.jpeg,
                  });
                })
              );
          };
          if (lineBreaks.length >= 19) {
            if (lineBreaks.length <= 19) {
              await nulis(text);
            } else if (lineBreaks.length <= 38) {
              const udud12 = text.substring(0, lineBreaks[19].index);
              await nulis(udud12);
              const udud23 = text.substring(
                lineBreaks[19].index,
                lineBreaks[lineBreaks.length - 1].index
              );
              await nulis(udud23);
            } else {
              return reply('Maaf, jumlah garis baru melebihi 2 lembar');
            }
          } else if (text.length > 1055) {
            if (text.length <= 1055) {
              await nulis(text);
            } else if (text.length <= 2110) {
              const udud12 = text.substring(0, 1055);
              await nulis(udud12);
              const udud23 = text.substring(1056, 2110);
              await nulis(udud23);
            } else {
              return reply('Maaf, jumlah kata melebihi 2 lembar');
            }
          } else {
            await nulis(text);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (pre('captha')) {
        games.capca(from, serial, message);
      } else if (pre('quiz')) {
        const difficulties = [
          'ez',
          'easy',
          'medium',
          'hard',
          'extreme',
          'impossible',
        ];
        if (!args[1]) return reply('Maaf, perintah tidak valid!');
        if (!difficulties.includes(args[1]))
          return reply(
            'Maaf, hanya game mode dibawah yang didukung :\n\n' +
              difficulties.join(', ')
          );
        games.mathquiz(args[1], from, serial, message);
      } else if (pre('caklontong')) {
        games.cakLontong(from, serial, message);
      } else if (pre('tictactoe')) {
        const opponent = mentionedJidList()[0]
          ? {id: mentionedJidList()[0]}
          : {bot: botNumber};
        games.tictactoe(from, {id: serial}, opponent, message);
      } else if (pre('slots')) {
        games.slots(from, message);
      } else if (pre('ocr')) {
        if ((isMedia && !isQuotedVideo) || isQuotedImage) {
          client
            .downloadAndSaveMediaMessage(getQuotedImage(), `../temp/${msgId}`)
            .then(() => {
              ocr(msgId)
                .then(res => {
                  reply('*OCR RESULT*\n\n' + res);
                })
                .catch(err => reply(err));
            });
        } else if (isQuotedSticker) {
          client.downloadMediaMessage(getQoutedSticker()).then(res => {
            sharp(res)
              .jpeg()
              .toFile(`../temp/${msgId}.jpeg`, () => {
                ocr(msgId)
                  .then(res => {
                    reply('*OCR RESULT*\n\n' + res);
                    fs.unlink(`../temp/${msgId}.webp`, () => {});
                  })
                  .catch(err => reply(err));
              });
          });
        } else {
          return reply('OCR hanya support sticker dan gambar!');
        }
      } else if (pre('math')) {
        const query = getQuery('math').toLowerCase();
        let formated = query.replace(/x/g, '*');
        formated = formated.replace(/×/g, '*');
        formated = formated.replace(/÷/g, '/');
        try {
          const evaluated = math.evaluate(formated).toString();
          reply(evaluated);
        } catch {
          return reply('Maaf, perhitungan tidak valid');
        }
      } else if (pre('translate')) {
        if (!args[1]) return;
        const codelang = args[1];
        const text = quotedMsgObj()
          ? getQuotedText()
          : cmd.slice(11 + codelang.length);
        if (!text) return;
        translatte(text, {
          to: codelang,
        })
          .then((res: any) => {
            reply('*[TRANSLATE]*\n\n' + res.text);
          })
          .catch(() => {
            reply(
              `[ERROR] Teks tidak ada, atau kode bahasa ${codelang} tidak support\n• *${prefix}bahasa* untuk melihat list kode bahasa`
            );
          });
      } else if (pre('qnime')) {
        if (args[1]) {
          if (args[1] === 'anime') {
            const anime = getQuery('qnime anime');
            if (!anime) return reply('Harap masukan nama anime!');
            axios
              .get('https://animechanapi.xyz/api/quotes?anime=' + anime)
              .then(({data}) => {
                const quote = data.data[0].quote;
                const char = data.data[0].character;
                const anime = data.data[0].anime;
                reply(`"${quote}"\n\n${char} from ${anime}`);
              })
              .catch(() => {
                reply('Quote Char/Anime tidak ditemukan!');
              });
          } else {
            const char = getQuery('qnime char');
            if (!char) return reply('Harap masukan nama character');
            axios
              .get('https://animechanapi.xyz/api/quotes?char=' + char)
              .then(({data}) => {
                const quote = data.data[0].quote;
                const char = data.data[0].character;
                const anime = data.data[0].anime;
                reply(`"${quote}"\n\n${char} from ${anime}`);
              })
              .catch(() => {
                reply('Quote Char/Anime tidak ditemukan!');
              });
          }
        } else {
          axios
            .get('https://animechanapi.xyz/api/quotes/random')
            .then(({data}) => {
              const quote = data.data[0].quote;
              const char = data.data[0].character;
              const anime = data.data[0].anime;
              reply(`"${quote}"\n\n${char} from ${anime}`);
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else if (pre('speed')) {
        const latensi = moment.duration(moment().diff(moment(t)));
        reply(`Server Speed: ${latensi.milliseconds()}ms`);
      } else if (pre('ping')) {
        ping.promise
          .probe('whatsapp.net', {min_reply: 1, timeout: 10})
          .then((res: any) => {
            reply(`WhatsApp Server Ping: ${res.time}ms`);
          })
          .catch((err: any) => console.log(err));
      } else if (pre('mock')) {
        const query = getQuery('mock');
        const filtered: any = filterWord(query);
        if (filtered !== false) return reply(filtered);
        const letters = query.split('');
        for (
          let i = 0;
          i < letters.length;
          i += Math.floor(Math.random() * 4)
        ) {
          letters[i] = letters[i].toUpperCase();
        }
        sendText(letters.join(''));
      } else if (pre('reverse')) {
        const query = getQuery('reverse');
        const filtered: any = filterWord(query);
        if (filtered !== false) return reply(filtered);
        sendText(query.split('').reverse().join(''));
      } else if (pre('cloud')) {
        if (secondParam('add')) {
          const now = moment().format('LLLL');
          if (isMedia || quotedMsgObj()) {
            const type2: any = Object.keys(quotedMsgObj().message)[0];
            if (fileSize(true) >= 10485760)
              return reply('Maaf, file tidak boleh melebihi 10mb!');
            client.downloadMediaMessage(quotedMsgObj()).then(mediaData => {
              addCloud(
                serial,
                mediaData,
                quotedMsgObj().message[type2].mimetype.split('/')[1],
                now
              )
                .then(res => reply(res))
                .catch(err => reply(err));
            });
          } else {
            reply('Maaf, cloud hanya bisa menyimpan file media dan dokumen!');
          }
        } else if (secondParam('remove')) {
          removeCloud(serial)
            .then(res => reply(res))
            .catch(err => reply(err));
        } else if (secondParam('help')) {
          reply(template.cloudHelp());
        } else {
          findCloud(serial)
            .then(async res => {
              const buff = fs.readFileSync(res);
              const njay: any = await file_type.fromBuffer(buff);
              function send(type: MessageType) {
                client.sendMessage(from, buff, type, {
                  caption: '*XyZ BOT Cloud*',
                  quoted: replyMode,
                  mimetype: type === audio ? Mimetype.mp4Audio : njay.mime,
                });
              }
              function sendSticker() {
                client.sendMessage(from, buff, sticker, {quoted: replyMode});
              }
              switch (njay.ext) {
                case 'mp4':
                  send(video);
                  break;
                case 'mp3':
                  send(audio);
                  break;
                case 'jpg':
                  send(image);
                  break;
                case 'png':
                  send(image);
                  break;
                case 'm4a':
                  send(audio);
                  break;
                case 'webp':
                  sendSticker();
                  break;
                default:
                  client.sendMessage(from, buff, document, {
                    filename: 'cloud.' + njay.ext,
                    caption: '*XyZ BOT Cloud*',
                    quoted: replyMode,
                    mimetype: njay.mime,
                  });
                  break;
              }
            })
            .catch(err => reply(err));
        }
      } else if (pre('image')) {
        if (!args[1]) return reply('Harap masukan text pencarian google image');
        const query = getQuery('image');
        if (!query) return reply('Harap masukan text pencarian google image');
        const filtered: any = filterWord(query);
        if (filtered !== false) return reply(filtered);
        gImages(query, (err: any, res: any) => {
          if (err) return reply('Maaf, hasil tidak ada atau sedang error');
          if (!res || !Object.prototype.hasOwnProperty.call(res[0], 'url'))
            return reply('Gambar tidak ditemukan!');
          return client
            .sendFileFromUrl(from, res[0].url, image, {
              caption: '_*「 XyZ BOT Automation 」*_',
              quoted: replyMode,
            })
            .catch(() => reply('Maaf, gambar tsb error'));
        });
      } else if (pre('qrcode')) {
        const qrcodes = getQuery('qrcode');
        if (!qrcodes) return;
        getBuffer(
          `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`
        ).then(res => {
          client.sendMessage(from, res, image, {
            filename: 'qrcode.png',
            caption: '_*「 XyZ BOT Automation 」*_',
            quoted: replyMode,
            mimetype: Mimetype.png,
          });
        });
      } else if (pre('igstalk')) {
        let usrname = args[1];
        if (!usrname) return;
        if (usrname.substr(0, 1) === '@') {
          usrname = usrname.replace('@', '');
        }
        igstalk(usrname)
          .then(res => {
            const hasil = stripIndents`_*「 Instagram Stalker 」*_
                • _username : *${res.username}*_
                • _nama : *${res.fullname}*_
                • _post : *${formatK(res.post)} post*_
                • _private : *${formatTrue(res.private)}*_
                • _followed : *${formatK(res.followed)} followed*_
                • _followers : *${formatK(res.followers)} followers*_
                • _highlight : *${formatK(res.highlight)} highlights*_
                • _bio_ :
                ----------------------------------------
                ${res.biography}
                ----------------------------------------
                _*「 XyZ BOT Automation 」*_`;
            getBuffer(res.imageurl).then(resp => {
              client.sendMessage(from, resp, image, {
                filename: 'igstalk.jpg',
                caption: hasil,
                quoted: replyMode,
              });
            });
          })
          .catch(err => reply(err));
      } else if (pre('temp')) {
        if (secondParam('clear')) {
          fs.readdir('../temp', (err: any, files: any) => {
            if (err) console.log(err);
            files.forEach((file: string) => {
              const fileDir = '../temp/' + file;
              if (file !== '.gitignore') {
                fs.unlinkSync(fileDir);
              }
            });
            reply('Sukses clear temp');
          });
        } else {
          fs.readdir('../temp', (err: any, files: string[]) => {
            if (err) console.log(err);
            reply('Total file dalam temp adalah *' + files.length-- + '*');
          });
        }
      } else if (pre('upname')) {
        if (permission(['self'])) return;
        const name = getQuery('upname');
        if (!name) return reply('Maaf, perintah tidak valid!');
        if (name.length > 25) return reply('Maaf, maksimal 25 karakter!');
        client.updateProfileName(name);
        reply('Sukses mengganti nama host ke:\n\n' + name);
      } else if (pre('upstatus')) {
        if (permission(['self'])) return;
        const status = getQuery('upstatus');
        if (!status) return reply('Maaf, perintah tidak valid!');
        if (status.length > 138) return reply('Maaf, maksimal 138 karakter!');
        client.setStatus(status);
        reply('Sukses mengganti status host ke:\n\n' + status);
      } else if (pre('uprofile')) {
        if (permission(['self'])) return;
        if (isImage) {
          client.downloadMediaMessage(getQuotedImage()).then(data => {
            client.updateProfilePicture(botNumber, data);
            reply('Sukses mengganti profile host');
          });
        } else {
          return reply('Maaf, message tidak mengandung gambar');
        }
      } else if (pre('upstory')) {
        if (permission(['self'])) return;
        if (isImage) {
          const asu = client.generateStory(getQuotedImage().message);
          client.relayWAMessage(asu);
          reply('Sukses upstory image!');
        } else if (isVideo) {
          const asu = client.generateStory(getQuotedVideo().message);
          client.relayWAMessage(asu);
          reply('Sukses upstory video!');
        } else {
          const story = getQuery('upstory');
          if (!story) return reply('Maaf, perintah tidak valid!');
          if (story.length > 700) return reply('Maaf, maksimal 700 karakter!');
          const asu = client.generateStory({
            extendedTextMessage: {
              text: story,
              textArgb: 4294967295,
              backgroundArgb: 4280563264,
              font: 'SANS_SERIF',
              prefiewType: 'NONE',
            },
          });
          client.relayWAMessage(asu);
          reply('Sukses upstory text!');
        }
      } else if (pre('ss') || pre('screenshot')) {
        let web = quotedMsgObj() ? getQuotedText() : args[1];
        if (!web)
          return reply(
            'Maaf, perintah tidak valid!\n\ncontoh: *' + prefix + 'ss [url]*'
          );
        web = normalize_url(web);
        scrap
          .ss(web)
          .then(res => {
            client.sendMessage(from, res!, image, {
              filename: 'ss.jpeg',
              caption: '_*「 XyZ BOT Automation 」*_',
              quoted: replyMode,
            });
          })
          .catch(() => reply('[GAGAL] url tidak valid!'));
      } else if (pre('ss2') || pre('screenshot2')) {
        let web = quotedMsgObj() ? getQuotedText() : args[1];
        if (!web)
          return reply(
            'Maaf, perintah tidak valid!\n\ncontoh: *' + prefix + 'ss [url]*'
          );
        web = normalize_url(web);
        axios
          .get(`https://image.thum.io/get/width/1920/noanimate/${web}`, {
            responseType: 'arraybuffer',
          })
          .then(({data}) => {
            client.sendMessage(from, data, image, {
              filename: 'ss.jpeg',
              caption: '_*「 XyZ BOT Automation 」*_',
              quoted: replyMode,
            });
          })
          .catch(() => reply('[GAGAL] url tidak valid!'));
      } else if (pre('group')) {
        if (permission(['group'])) return;
        const hasil = stripIndents`_*「 Group Information 」*_
            • _name : *${groupName}*_
            • _creator : @${groupMetadata.owner.replace('@c.us', '')}_
            • _dibuat : ${moment(groupMetadata.creation * 1000).fromNow()}_
            • _admins : *${groupAdmins.length}*_
            • _members : *${groupMembers.length}*_
            • _desc editor : @${groupMetadata.descOwner.replace('@c.us', '')}_
            • _diedit pada : ${moment(groupMetadata.descTime * 1000).fromNow()}_
            • _description_ :
            ----------------------------------------
            ${groupDesc}
            ----------------------------------------
            _*「 XyZ BOT Automation 」*_`;
        getPic(from).then(res => {
          client.sendMessage(from, res, image, {
            caption: hasil,
            quoted: replyMode,
            contextInfo: {
              mentionedJid: [
                groupMetadata.owner.replace('c.us', 's.whatsapp.net'),
                groupMetadata.descOwner.replace('c.us', 's.whatsapp.net'),
              ],
            },
          });
        });
      } else if (pre('add')) {
        if (permission(['self', 'admin', 'group'])) return;
        if (!args[1])
          return reply(
            `Maaf, perintah tidak valid\nContoh :\n*${prefix}add [nomor]*`
          );
        if (!args[1].includes('628'))
          return reply(
            `Maaf, perintah tidak valid\nContoh :\n*${prefix}add [nomor]*`
          );
        if (!isGroupAdmins)
          return reply(
            'Maaf, perintah ini hanya dapat digunakan oleh admin group!'
          );
        if (!isBotGroupAdmins)
          return reply(
            'Maaf, perintah ini hanya dapat di gunakan ketika bot menjadi admin!'
          );
        try {
          await client.groupAdd(groupId, [`${args[1]}@s.whatsapp.net`]);
        } catch {
          reply(
            '[GAGAL] Kemungkinan target melarang untuk menginvite dirinya ke group!'
          );
        }
      } else if (pre('kick')) {
        if (permission(['self', 'admin', 'group', 'botadmin', 'admingroup']))
          return;
        if (mentionedJidList().length < 1)
          return reply(
            `Maaf, perintah tidak valid!\nContoh :\n*${prefix}kick [tag]*`
          );
        for (const i of mentionedJidList()) {
          if (groupAdmins.includes(i))
            return reply(from, 'Maaf, anda tidak bisa mengeluarkan admin grup');
          await client.groupRemove(groupId, [i]);
        }
        reply(`Sukses mengeksekusi ${mentionedJidList().length} member!`);
      } else if (pre('admin')) {
        if (permission(['self', 'group', 'botadmin', 'admingroup'])) return;
        if (mentionedJidList().length < 1)
          return reply(
            `Maaf, perintah tidak valid!\nContoh :\n*${prefix}promote [tag]*`
          );
        if (mentionedJidList().length > 1)
          return reply(
            'Maaf, perintah ini hanya dapat digunakan kepada 1 user!'
          );
        if (groupAdmins.includes(mentionedJidList()[0]))
          return reply('Maaf, user tersebut sudah menjadi admin!');
        await client.groupMakeAdmin(groupId, [mentionedJidList()[0]]);
        mentions(
          from,
          `Sukses menambahkan @${mentionedJidList()[0].replace(
            '@s.whatsapp.net',
            ''
          )} sebagai admin!`,
          [mentionedJidList()[0]]
        );
      } else if (pre('unadmin')) {
        if (permission(['self', 'group', 'botadmin', 'admingroup'])) return;
        if (mentionedJidList().length < 1)
          return reply(
            `Maaf, perintah tidak valid!\nContoh :\n*${prefix}promote [tag]*`
          );
        if (mentionedJidList().length > 1)
          return reply(
            'Maaf, perintah ini hanya dapat digunakan kepada 1 user!'
          );
        if (!groupAdmins.includes(mentionedJidList()[0]))
          return reply('Maaf, user tersebut tidak menjadi admin!');
        await client.groupDemoteAdmin(groupId, [mentionedJidList()[0]]);
        mentions(
          from,
          `Sukses menghapus @${mentionedJidList()[0].replace(
            '@c.us',
            ''
          )} sebagai admin!`,
          [mentionedJidList()[0]]
        );
      } else if (pre('onlyadmin')) {
        if (permission(['self', 'group', 'botadmin', 'admingroup'])) return;
        if (isGroupAdminOnly) {
          await client.groupSettingChange(
            from,
            GroupSettingChange.messageSend,
            false
          );
          reply('Sukses mematikan hanya admin chat');
        } else {
          await client.groupSettingChange(
            from,
            GroupSettingChange.messageSend,
            true
          );
          reply('Sukses mengaktifkan hanya admin chat');
        }
      } else if (pre('invite')) {
        if (permission(['self', 'group', 'botadmin', 'admingroup'])) return;
        reply(
          `*Invite Code*\n\nhttps://chat.whatsapp.com/${await client.groupInviteCode(
            from
          )}`
        );
      } else if (pre('desc')) {
        if (permission(['self', 'group', 'botadmin', 'admingroup'])) return;
        const query = getQuery('desc');
        if (query.length > 500)
          return reply('Maaf, maksimal karakter adalah 500');
        await client.groupUpdateDescription(from, query);
        reply('Sukses update deskripsi group ke: \n\n' + query);
      } else if (pre('subject')) {
        if (permission(['self', 'group', 'botadmin', 'admingroup'])) return;
        const query = getQuery('desc');
        if (query.length > 25)
          return reply('Maaf, maksimal karakter adalah 25');
        await client.groupUpdateSubject(from, query);
        reply('Sukses update nama group ke: \n\n' + query);
      } else if (pre('filter')) {
        if (permission(['self'])) return;
        if (secondParam('add')) {
          if (!args[2]) return;
          arryOfWords.push(args[2]);
          db.push('/arryOfWords', arryOfWords, true);
          reply('Sukses menambahkan ke filter!');
        } else if (secondParam('remove')) {
          if (!args[2]) return;
          const i = arryOfWords.indexOf(args[2]);
          arryOfWords.splice(i, 1);
          db.push('/arryOfWords', arryOfWords, true);
          reply('Sukses remove kata dari filter!');
        } else {
          let hasil = '*XyZ BOT Filters*\n\n',
            counter = 1;
          for (const i of arryOfWords) {
            hasil += `${counter}. ${i}\n`;
            counter++;
          }
          reply(hasil);
        }
      } else if (pre('join')) {
        if (permission(['self'])) return;
        if (!args[1]) return reply('Maaf, perintah tidak valid');
        if (!args[1].match(new RegExp(/https:\/\/chat.whatsapp.com\//)))
          return reply('Maaf, perintah tidak valid');
        client
          .groupAcceptCode(args[1])
          .then(async (res: any) => {
            if (!res) return reply('Maaf, link group tidak valid');
            if (res.code !== '200')
              return reply('Maaf, link group tidak valid!');
            return reply('Sukses masukan ke group target');
          })
          .catch(() => {
            reply('Maaf, link group tidak valid');
          });
      } else if (pre('glist')) {
        if (permission(['self'])) return;
        let gclist: any = client.chats.all();
        gclist = gclist.filter((x: any) => x.jid.includes('@g.us'));
        let hasil = stripIndents`*XyZ GROUP LIST*
            • %%%total : ${gclist.length}%%%\n\n`;
        let counter = 1;
        for (let i = 0; i < gclist.length; i++) {
          try {
            hasil += stripIndents`${counter}. %%%Group Ke-${counter}%%%
                    • %%%nama : ${gclist[i].metadata.subject}%%%
                    • %%%member : ${gclist[i].metadata.participants.length}%%%
                    • %%%gid : ${gclist[i].metadata.id}%%%\n\n`;
            counter++;
          } catch (error) {
            continue;
          }
        }
        hasil = hasil.replace(/%%%/g, '```');
        reply(hasil);
      } else if (pre('yts') || pre('ytsearch')) {
        const dict = pre('yts') ? getQuery('yts') : getQuery('ytsearch');
        if (!dict)
          return reply(
            'Maaf, perintah tidak valid\n\nharap masukan query yotube!'
          );
        yts(dict)
          .then(res => {
            reply(res);
          })
          .catch(err => reply(err));
      } else if (pre('lirik') || pre('lyric')) {
        const song = getQuery('lirik');
        if (!song)
          return reply(
            `Maaf, perintah tidak valid, contoh :\n\n*${prefix}lirik [judul lagu]*`
          );
        getLirik.songs
          .search(song)
          .then(async (res: any[]) => {
            const lyrics = await res[0].lyrics();
            reply(
              lyrics +
                '\n-----------------------------------------\n_*「 XyZ BOT Automation 」*_'
            );
          })
          .catch(() => reply('Lirik lagu tidak ada!'));
      } else if (pre('lang')) {
        try {
          const lang = args[1];
          const langText = isQuotedText
            ? getQuotedText()
            : cmd.slice(6 + lang.length);
          if (!lang || !langText) return;
          if (langText.length >= 250) return sendText('Teks Kepanjangan :(');
          const gtts = new gTTs(langText, lang);
          gtts.save(`../temp/${msgId}.m4a`, () => {
            client.sendMessage(
              from,
              fs.readFileSync(`../temp/${msgId}.m4a`),
              audio,
              {ptt: true, quoted: replyMode, mimetype: Mimetype.mp4Audio}
            );
            fs.unlink(`../temp/${msgId}.m4a`, () => {});
          });
        } catch (error) {
          sendText(
            `[ERROR] Teks tidak ada, atau kode bahasa ${args[1]} tidak support\n• *${prefix}bahasa* untuk melihat list kode bahasa`
          );
        }
      } else if (pre('cmdlist')) {
        if (permission(['group'])) return;
        groups
          .cmdList(chatId)
          .then((res: any) => reply(res))
          .catch(err => reply(err));
      } else if (pre('cmd')) {
        if (permission(['group', 'admingroup'])) return;
        const formatted = getQuery('cmd').trim();
        const spliter = formatted.split('|');
        const cmd = args[1];
        if (!cmd) return reply('Maaf, perintah tidak valid');
        const result = spliter[1];
        if ((await groups.getComs(chatId)) > 25)
          return reply('Maaf, custom command hanya boleh 25 perintah');
        if (isMedia || type === 'document') {
          if (fileSize(false) >= 10485760)
            return reply('Maaf, file tidak boleh melebihi 10mb!');
          const mime: any = message.message ?? [type];
          client.downloadMediaMessage(message).then(mediaData => {
            groups
              .addMedia(chatId, cmd, mediaData, mime.mimetype)
              .then((res: any) => reply(res))
              .catch(err => reply(err));
          });
        } else if (!result && quotedMsgObj()) {
          const type2 = Object.keys(quotedMsgObj().message!)[0];
          const quoted2: any = quotedMsgObj().message ?? [type2];
          if (quoted2.fileLength.low >= 10485760)
            return reply('Maaf, file tidak boleh melebihi 10mb!');
          client.downloadMediaMessage(quotedMsgObj()).then(mediaData => {
            groups
              .addMedia(chatId, cmd, mediaData, quoted2.mimetype)
              .then((res: any) => reply(res))
              .catch(err => reply(err));
          });
        } else if (!result) {
          return reply('Maaf, perintah tidak valid');
        } else if (result && !isMedia) {
          groups
            .addCmd(chatId, cmd.trim(), result)
            .then((res: any) => reply(res))
            .catch(err => reply(err));
        }
      } else if (pre('retry')) {
        if (!quotedMsgObj()) reply('Maaf, perintah harus mereply target!');
        if (isQuotedText)
          return reply('Maaf, hanya dapat mengirim ulang media!');
        client.downloadMediaMessage(quotedMsgObj()).then(async mediaData => {
          if (isQuotedText)
            return reply('Maaf, hanya dapat mengirim ulang media!');
          else if (isQuotedAudio) return send(audio);
          else if (isQuotedDocument) return send(document);
          else if (isQuotedImage) return send(image);
          else if (isQuotedVideo) return send(video);
          else if (isQuotedSticker) return sendSticker(sticker);
          async function sendSticker(type: MessageType) {
            client.sendMessage(from, mediaData, type, {
              quoted: replyMode,
              mimetype: Mimetype.webp,
            });
          }
          async function send(type: MessageType) {
            const njay: any = await file_type.fromBuffer(mediaData);
            client.sendMessage(from, mediaData, type, {
              filename: 'hasil.' + njay.ext,
              caption: '_*「 XyZ BOT Automation 」*_',
              quoted: replyMode,
              mimetype: njay.mime,
            });
          }
        });
      } else if (pre('bass')) {
        if (isQuotedAudio) {
          const dB = args[1] ? args[1] : 10;
          client.downloadMediaMessage(getQuotedAudio()).then(mediaData => {
            ffmpeg(buffer2Stream(mediaData))
              .audioFilter('equalizer=f=40:width_type=h:width=50:g=' + dB)
              .save('../temp/' + msgId + '.mp3')
              .on('error', () => reply('Maaf, audio tidak di dukung'))
              .on('end', () => {
                client.sendMessage(
                  from,
                  fs.readFileSync('../temp/' + msgId + '.mp3'),
                  audio,
                  {
                    filename: 'hasil.mp3',
                    caption: 'sukses',
                    quoted: replyMode,
                    mimetype: Mimetype.mp4Audio,
                  }
                );
                fs.unlinkSync('../temp/' + msgId + '.mp3', () => {});
              });
          });
        }
      } else if (pre('8d')) {
        if (isQuotedAudio) {
          client.downloadMediaMessage(getQuotedAudio()).then(mediaData => {
            ffmpeg(buffer2Stream(mediaData))
              .audioFilter('apulsator=hz=0.325')
              .save('../temp/' + msgId + '.mp3')
              .on('error', () => reply('Maaf, audio tidak di dukung'))
              .on('end', () => {
                client.sendMessage(
                  from,
                  fs.readFileSync('../temp/' + msgId + '.mp3'),
                  audio,
                  {
                    filename: 'hasil.mp3',
                    caption: 'sukses',
                    quoted: replyMode,
                    mimetype: Mimetype.mp4Audio,
                  }
                );
                fs.unlinkSync('../temp/' + msgId + '.mp3', () => {});
              });
          });
        }
      } else if (pre('delcmd')) {
        if (!isGroupMsg) return reply('Maaf, hanya bisa di lakukan di group!');
        if (!isGroupAdmins)
          return reply('Maaf, hanya bisa di lakukan oleh admin group!');
        const cmd = args[1];
        if (!cmd) return reply('Maaf, perintah tidak valid');
        groups
          .rmvCmd(chatId, cmd)
          .then((res: any) => reply(res))
          .catch(err => reply(err));
      } else if (pre('wikipedia')) {
        const query = isQuotedText ? getQuotedText() : getQuery('wikipedia');
        if (!query) return reply('Maaf, query pencarian tidak boleh kosong!');
        wiki({apiUrl: 'https://id.wikipedia.org/w/api.php'})
          .page(query)
          .then((page: any) => page.rawContent())
          .then((res: string) => {
            sendText(`*Hasil Search Wikipedia*\nkeyword : ${query}\n\n` + res);
          })
          .catch(() => reply(`*${query}*\n\ntidak ditemukan di wikipedia!`));
      } else if (pre('cekresi')) {
        if (args.length <= 3) return;
        const kurir = args[2];
        const resi = args[1];
        const courir = [
          'jne',
          'pos',
          'jnt',
          'sicepat',
          'tiki',
          'anteraja',
          'wahana',
          'ninja',
          'lion',
          'lek',
        ];
        const chkKurir = courir.includes(kurir.toLowerCase());
        if (chkKurir === true) {
          const ran = Math.floor(Math.random() * 3);
          const api: any = axios
            .get(
              `https://api.binderbyte.com/cekresi?awb=${resi}&api_key=${
                apikeys.cekresi ?? [ran]
              }&courier=${kurir}`
            )
            .then(res => {
              if (res.data.result === true) {
                sendText('Tunggu sebentar ya kaka :D');
                const bn = res.data.data;
                let hasil = `╭──────[ Informasi Tracking ]──────\n├> Kurir   : ${bn.courier}\n├> Resi    : ${bn.waybill}\n├> Dikirim : ${bn.shipped}`;
                if (
                  bn.received !== '' ||
                  bn.received !== null ||
                  bn.received !== undefined ||
                  bn.received !== ''
                ) {
                  hasil += `\n├> Diterima Oleh : ${bn.received.name}\n├> Tanggal : ${bn.received.date}\n├> Status : ${bn.received.status}`;
                }
                hasil += '\n├────────────────\n├> Tracking : ';
                const track = bn.tracking;
                Object.keys(track)
                  .reverse()
                  .forEach(i => {
                    hasil += `\n├────────────────\n├> Tanggal   : ${track[i].date}\n├> Deskripsi : ${track[i].desc}\n├> Status    : ${track[i].status}\n├────────────────`;
                  });
                hasil += '\n╰──[ xYz WhatsApp Bot ]───';
                sendText(hasil);
              } else {
                sendText('Kode resi invalid / kadaluarsa');
              }
            })
            .catch(err => {
              console.log(err);
              sendText('Server sedang dalam masalah, coba lagi nanti');
            });
        } else {
          sendText(`Kurir ${kurir} tidak ada atau penulisan salah!`);
          sendText(
            'Contoh kurir : jne, pos, jnt, sicepat, tiki, anteraja, wahana, ninja, lion, lek'
          );
        }
      } else if (pre('quran')) {
        axios
          .get('https://api.banghasan.com/quran/format/json/acak')
          .then(res => {
            const sr = /{(.*?)}/gi;
            const hs = res.data.acak.id.ayat;
            const ket = `${hs}`.replace(sr, '');
            const hasil = `*[ ${ket} ]*   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})\n\n_*「 XyZ BOT Automation 」*_`;
            sendText(hasil);
          });
      } else if (pre('surah')) {
        if (args.length <= 3) return;
        const dictzk = body.split(' ')[1];
        const ayat = body.split(' ')[3];
        if (!dictzk || !ayat) return reply('Maaf, perintah tidak valid');
        surat(parseInt(dictzk), parseInt(ayat))
          .then(hasil => {
            reply(hasil);
          })
          .catch(err => {
            reply(err);
          });
      } else if (pre('obfuscate')) {
        if (isQuotedDocument) {
          const mime = getQuotedDocument().message.documentMessage.mimetype;
          if (mime !== 'application/javascript')
            return reply('Maaf, hanya mendukung file javascript!');
          client
            .downloadAndSaveMediaMessage(
              getQuotedDocument(),
              `../temp/${msgId}.js`,
              false
            )
            .then(res => {
              obfuscate(true, res).then((res: any) => {
                if (res.type === 'file') {
                  client.sendMessage(
                    from,
                    fs.readFileSync(res.path),
                    document,
                    {
                      filename: 'result.js',
                      caption: 'obfucate result',
                      mimetype: 'application/javascript',
                      quoted: replyMode,
                    }
                  );
                  return fs.unlink(res.path, () => {});
                } else {
                  reply(res.code);
                }
              });
            });
        } else {
          const code = getQuery('obfuscate');
          obfuscate(false, undefined, code).then((res: any) => {
            if (res.type === 'file') {
              client.sendMessage(from, fs.readFileSync(res.path), document, {
                filename: 'result.js',
                caption: 'obfucate result',
                mimetype: 'application/javascript',
                quoted: replyMode,
              });
              return fs.unlink(res.path, () => {});
            } else {
              reply(res.code);
            }
          });
        }
      } else if (pre('bmkg')) {
        axios.get('https://data.bmkg.go.id/autogempa.xml').then(res => {
          parseString(res.data, (err: any, result: any) => {
            result = result.Infogempa.gempa[0];
            const hasils = stripIndents`_*Informasi Gempa BMKG*_
                    ----------------------------------------
                    • Tanggal : ${result.Tanggal}
                    • Jam : ${result.Jam}
                    • Magnitudo : ${result.Magnitude}
                    • Kedalaman : ${result.Kedalaman}
                    • Lintang : ${result.Lintang}
                    • Bujur : ${result.Bujur}
                    • Lokasi 1 : ${result.Wilayah1}
                    • Lokasi 2 : ${result.Wilayah2}
                    • Lokasi 3 : ${result.Wilayah3}
                    • Lokasi 4 : ${result.Wilayah4}
                    • Lokasi 5 : ${result.Wilayah5}
                    • Potensi : ${result.Potensi}
                    ----------------------------------------
                    _*「 XyZ BOT Automation 」*_`;
            sendText(hasils);
          });
        });
      } else if (pre('online')) {
        if (permission(['group'])) return;
        let onlen: any = client.chats.get(from).presences;
        if (!onlen) return reply('Tidak ada yang sedang online');
        onlen = Object.keys(onlen);
        for (const [a, b] of onlen) {
          console.log(a, b);
        }
      } else if (pre('count')) {
        if (permission(['self'])) return;
        if (secondParam('add')) {
          if (!args[2]) return;
          const anjay = countAdd(args[2]);
          reply(anjay);
        } else if (secondParam('remove')) {
          if (!args[2]) return;
          const anjay = countRemove(args[2]);
          reply(anjay);
        } else if (secondParam('admin')) {
          if (!args[2]) return;
          const anjay = setCountAsAdmin(args[2]);
          reply(anjay);
        } else if (secondParam('member')) {
          if (!args[2]) return;
          const anjay = setCountAsMember(args[2]);
          reply(anjay);
        } else {
          const hasil = countCmd();
          sendText(hasil);
        }
      } else if (pre('reply')) {
        if (permission(['self'])) return;
        if (isEnable(args[1])) {
          autoReply = true;
          reply(debugWM + 'autoReply enabled!');
        } else if (isDisable(args[1])) {
          autoReply = false;
          reply(debugWM + 'autoReply disabled!');
        } else if (secondParam('add')) {
          const query = getQuery('reply add');
          if (!args[2] || !query) return;
          const anjay = replies.addReply(args[2], query.trim());
          reply(anjay);
        } else if (secondParam('remove')) {
          if (!args[2]) return;
          const anjay = replies.removeReply(args[2]);
          reply(anjay);
        } else {
          const hasil = replies.allReply();
          sendText(hasil);
        }
      } else if (pre('google')) {
        const googleQuery = getQuery('google');
        const filtered: any = filterWord(googleQuery);
        if (filtered !== false) return reply(filtered);
        if (googleQuery === undefined || googleQuery === ' ') return;
        google({
          query: googleQuery,
          disableConsole: true,
          limit: 2,
        })
          .then((results: any) => {
            const vars = results[0];
            sendText(
              `_*Hasil Pencarian Google*_\n\n• Judul : \n${vars.title}\n\n• Deskripsi : \n${vars.snippet}\n\n• Link : \n${vars.link}\n\n_*「 XyZ BOT Automation 」*_`
            );
          })
          .catch((e: any) => {
            console.log(e);
          });
      } else if (pre('refrence') || pre('github') || pre('stackoverflow')) {
        const googleQuery = getQuery('refrence');
        if (googleQuery === undefined || googleQuery === ' ') return;
        google({
          query: googleQuery,
          disableConsole: true,
          'stackoverflow-github-only': true,
          limit: 2,
        })
          .then((results: any) => {
            const vars = results[0];
            sendText(
              `_*Refrence Result*_\n\n• Judul : \n${vars.title}\n\n• Deskripsi : \n${vars.snippet}\n\n• Link : \n${vars.link}\n\n_*「 XyZ BOT Automation 」*_`
            );
          })
          .catch((e: any) => {
            console.log(e);
          });
      } else if (pre('cuaca')) {
        const query = getQuery('cuaca');
        if (!query) return reply('Mohon masukan nama kota');
        cuaca(query)
          .then(res => {
            reply(res);
          })
          .catch(err => reply(err));
      } else if (pre('ttp')) {
        const query = quotedMsgObj() ? getQuotedText() : getQuery('ttp');
        if (query.length > 50) return reply('Teks kepanjangan :(');
        if (!query) return reply('Mohon masukan teks yang ingin di konversi');
        const text = wrap(query, {width: 10}).toUpperCase();
        if (text.split('\n').length > 6)
          return reply('Garis baru text terlalu banyak!');
        let mediaData = text2png(text, {
          font: '145px Boogaloo',
          localFontPath: '../fonts/Boogaloo.ttf',
          localFontName: 'Boogaloo',
          color: 'white', //'white',
          strokeWidth: 2,
          strokeColor: 'black',
          textAlign: 'center',
          lineSpacing: 5,
          padding: 110,
          backgroundColor: 'transparent',
        });
        sharp(mediaData)
          .webp()
          .toBuffer()
          .then((buffer: Buffer) => {
            mediaData = '';
            client.sendMessage(from, buffer, sticker, {quoted: replyMode});
          });
      } else if (pre('ttd')) {
        const query = getQuery('ttd');
        if (!query) return reply('Mohon masukan teks yang ingin di konversi');
        const text = wrap(query, {width: 8});
        if (text.split('\n').length > 1)
          return reply('Tidak manusiawi tanda tangan 2 baris');
        let mediaData = text2png(text, {
          font: '350px Robertson',
          localFontPath: '../fonts/Robertson.ttf',
          localFontName: 'Robertson',
          color: 'black', //'white',
          textAlign: 'center',
          lineSpacing: 30,
          padding: 150,
          backgroundColor: 'transparent',
          output: 'buffer',
        });
        sharp(mediaData)
          .webp()
          .toBuffer()
          .then((buffer: Buffer) => {
            mediaData = '';
            client.sendMessage(from, buffer, sticker, {quoted: replyMode});
          });
      } else if (pre('attp')) {
        const query = quotedMsgObj() ? getQuotedText() : getQuery('attp');
        if (query.length > 50) return reply('Teks kepanjangan :(');
        if (!query) return reply('Mohon masukan teks yang ingin di konversi');
        reply('Mohon tunggu, memproses animated text to picture...');
        ttpAnim
          .attp(query.toUpperCase())
          .then(res => {
            client.sendMessage(from, res, sticker, {quoted: replyMode});
          })
          .catch(err => reply(err));
      } else if (pre('push')) {
        if (permission(['self', 'admin'])) return;
        const query = getQuery('push');
        if (!query) return;
        const separator = query.split('|');
        const path = separator[0].trim();
        const path2 = separator[1].trim();
        db.push(path, eval(path2), true);
      } else if (pre('bot')) {
        if (permission(['self'])) return;
        if (secondParam('restart')) {
          sendText('*[WARN]* Restarting ...');
          setting.restartState = true;
          setting.restartId = from;
          db.push('/setting', setting, true);
          pm2.restart(pm2Id, err => {
            if (err) console.log(err);
          });
        } else if (secondParam('block')) {
          if (args.length >= 3) {
            const block = `${args[2]}@s.whatsapp.net`;
            client.blockUser(block, 'add').then(() => {
              reply(`Sukses blok ${args[2]}!`);
            });
            return;
          }
        } else if (secondParam('unblock')) {
          if (args.length >= 3) {
            const unblock = `${args[2]}@s.whatsapp.net`;
            await client.blockUser(unblock, 'remove').then(() => {
              reply(`Sukses unblok ${args[2]}!`);
            });
          }
        } else if (secondParam('leaveall')) {
          reply('Genosida di mulai!');
          const arrOfGroups = await client.getAllGroups();
          for (const gid of arrOfGroups) {
            const gids = gid.jid;
            if (!gid.metadata!.announce) {
              await client.modifyChat(gids, ChatModification.delete);
              await client.groupLeave(gids);
            } else {
              await client.modifyChat(gids, ChatModification.delete);
              await client.groupLeave(gids);
            }
          }
          sendText('sukses!');
        } else if (secondParam('clearall')) {
          reply('Genosida di mulai!');
          const chatsny = await client.getAllPrivate();
          const arrOfGroups = await client.getAllGroups();
          for (const groupIds of arrOfGroups) {
            const gids: any = groupIds.jid;
            if (!gids.metadata.announce) {
              await client.modifyChat(gids, ChatModification.delete);
              await client.groupLeave(gids);
            } else {
              await client.modifyChat(gids, ChatModification.delete);
              await client.groupLeave(gids);
            }
          }
          for (const chats of chatsny) {
            await client.modifyChat(chats.jid, ChatModification.delete);
          }
          sendText('sukses!');
        } else if (secondParam('chatclear')) {
          reply('Genosida di mulai!');
          const chatsny = await client.getAllChats();
          for (const chats of chatsny) {
            client.modifyChat(chats.jid, ChatModification.clear);
          }
          sendText('sukses!');
        }
      } else if (pre('kbbi')) {
        if (!args[1]) return reply('Harap masukan kata target');
        if (args.length > 2) return reply('Maaf, perintah tidak valid');
        axios
          .get(
            `https://rest.farzain.com/api/kbbi.php?id=${getQuery(
              'kbbi'
            )}&apikey=3Ot5wNlKgSNK0MFVR0MEILiEq`
          )
          .then(({data}) => {
            reply(data);
          });
      } else if (pre('everyone') || pre('tagall')) {
        if (permission(['group'])) return;
        let tags = `_*${prefix}everyone by @${serial.replace(
          '@s.whatsapp.net',
          ''
        )}*_\n-----------------------------------------\n`;
        const member = groupMetadata['participants'];
        const theid: string[] = [];
        member.map(async (x: any) => {
          tags += `• @${x.id.replace('@c.us', '')}\n`;
          theid.push(x.id.replace('c.us', 's.whatsapp.net'));
        });
        client.sendMessage(
          from,
          tags +
            '-----------------------------------------\n_*「 XyZ BOT Automation 」*_',
          text,
          {contextInfo: {mentionedJid: theid}, quoted: replyMode}
        );
      } else if (pre('status')) {
        if (permission(['self'])) return;
        const latensi = moment
          .duration(moment().diff(moment(t)))
          .milliseconds();
        const chats = await client.getAllChats();
        const group = chats.filter(x => x.jid.includes('@g.us'));
        const personalChat = chats.filter(x => !x.jid.includes('@g.us'));
        const hasil = stripIndents`*「 BOT STATUS 」*
            • _chat : *${chats.length}*_
            • _group : *${group.length}*_
            • _private : *${personalChat.length}*_
            • _contact : *${Object.keys(client.contacts).length}*_
            • _cmd count : *${countAll()}*_
            • _speed latency : *${latensi} MS*_

            *「 SELF STATUS 」*
            • _prefix : *「 ${prefix} 」*_
            • _unsend : *${formatOnOff(setting.unSend.includes(serial))}*_
            • _upublic : *${formatOnOff(setting.universalPublic)}*_
            • _autoread : *${formatOnOff(autoRead)}*_
            • _autoreply : *${formatOnOff(autoReply)}*_
            • _fakereply : *${formatOnOff(setting.fakeReply)}*_
            • _antivirtex : *${formatOnOff(antiVirtex)}*_
            • _freplyjid : *${setting.fakeJid}*_
            • _freplytext :_ \n\n${setting.fakeText} 
            
            _*「 XyZ BOT Automation 」*_`;
        reply(hasil);
      } else if (pre('bc')) {
        if (permission(['self'])) return;
        const dict = getQuery('bc');
        const chats = client.chats.all();
        if ((isMedia && !isQuotedVideo) || isQuotedImage) {
          const buff = await client.downloadMediaMessage(getQuotedImage());
          for (const _ of chats) {
            client.sendMessage(_.jid, buff, image, {caption: dict});
          }
          reply('Broadcast sukses!');
        } else {
          for (const _ of chats) {
            client.sendMessage(_.jid, dict, text);
          }
          reply('Broadcast sukses!');
        }
      } else if (pre('leave')) {
        if (permission(['self'])) return;
        await client.modifyChat(chatId, ChatModification.delete);
        await client.groupLeave(chatId);
      } else if (pre('bitly')) {
        const url = getQuery('bitly');
        if (!url) return reply('Maaf, mohon masukan url untuk dishort');
        bitly
          .shorten(url)
          .then((bits: any) => {
            reply((bits.link += '\n\n_*「 XyZ BOT Automation 」*_'));
          })
          .catch(() => reply('Link tidak valid!'));
      } else if (pre('creator') || pre('owner')) {
        client.sendMessage(from, <WAContactMessage>vcard.owner, contact);
      } else if (pre('ytmp3')) {
        if (args.length >= 2) {
          let url = args[1];
          if (!url.match(new RegExp('https://', 'gi'))) url = 'https://' + url;
          const videoid = url.match(
            /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
          );
          if (!videoid) {
            return sendText('Maaf, url yang anda berikan tidak valid');
          }
          sendText('Tunggu sebentar ya kaka :D');
          fs.access(
            '../temp/' + videoid[1] + '.m4a',
            fs.constants.F_OK,
            (err: any) => {
              if (!err) {
                sendText('Tunggu sebentar ya kaka :D');
                client.sendMessage(
                  from,
                  fs.readFileSync('../temp/' + videoid[1] + '.m4a'),
                  audio,
                  {
                    filename: `${videoid[1]}.m4a`,
                    quoted: replyMode,
                    caption: 'sukses',
                    mimetype: Mimetype.mp4Audio,
                  }
                );
              } else {
                ytdl
                  .getInfo(videoid[1])
                  .then(info => {
                    if (parseInt(info.videoDetails.lengthSeconds) > 1000) {
                      sendText(
                        'Videonya terlalu panjang gan, coba yang lain :v'
                      );
                    } else {
                      const stream = ytdl(videoid[1], {
                        quality: 'highestaudio',
                        requestOptions: {
                          headers: {
                            cookie: config.ytCookie,
                            'x-youtube-identity-token': config.ytIdentity,
                          },
                        },
                      });
                      stream.on('error', () => {
                        reply('Video tidak valid/sedang error');
                      });
                      ffmpeg(stream)
                        .audioCodec('aac')
                        .addOutputOptions('-map 0:a')
                        .save(`../temp/${videoid[1]}.m4a`)
                        .on('end', () => {
                          sendText(
                            `*YTDownloader*\n\n• Judul : ${
                              info.videoDetails.title
                            }\n• Durasi : ${moment.duration(
                              info.videoDetails.lengthSeconds,
                              'second'
                            )}`
                          );
                          client.sendMessage(
                            from,
                            fs.readFileSync('../temp/' + videoid[1] + '.m4a'),
                            audio,
                            {
                              filename: `${videoid[1]}.m4a`,
                              caption: 'sukses',
                              quoted: replyMode,
                              mimetype: Mimetype.mp4Audio,
                            }
                          );
                        });
                    }
                  })
                  .catch(() => {
                    reply('Video tidak valid/sedang error');
                  });
              }
            }
          );
        }
      } else if (pre('imp3')) {
        const query = getQuery('imp3');
        if (!query)
          return sendText('Mohon masukan text untuk instant search ytmp3');
        sendText('Tunggu sebentar ya kaka :D');
        imp3(query)
          .then(res => {
            if (Object.prototype.hasOwnProperty.call(res, 'title'))
              sendText(
                `*YTDownloader*\n\n• Judul : ${res.title}\n• Durasi : ${res.time}`
              );
            client.sendMessage(
              from,
              fs.readFileSync('../temp/' + res.id + '.m4a'),
              audio,
              {
                filename: `${res}.m4a`,
                caption: 'sukses',
                quoted: replyMode,
                mimetype: Mimetype.mp4Audio,
              }
            );
          })
          .catch(err => reply(err));
      } else if (pre('ig') || pre('instagram')) {
        if (!args[1]) return reply('Maaf, link yang kamu kirim tidak valid');
        if (args.length <= 2) {
          const url = args[1];
          reply('Mohon tunggu sebentar, mendownload data');
          if (!url.match(isUrl) && !url.includes('instagram.com'))
            return reply('Maaf, link yang kamu kirim tidak valid');
          scrap
            .instagram(url)
            .then(hasil => {
              axios({
                method: 'get',
                url: hasil,
                responseType: 'arraybuffer',
              }).then(res => {
                if (res.headers['content-type'] === Mimetype.mp4) {
                  client.sendMessage(from, res.data, video, {
                    caption: '_*「 XyZ BOT Automation 」*_',
                    quoted: replyMode,
                    mimetype: Mimetype.mp4,
                  });
                } else {
                  client.sendMessage(from, res.data, image, {
                    caption: '_*「 XyZ BOT Automation 」*_',
                    quoted: replyMode,
                    mimetype: Mimetype.jpeg,
                  });
                }
              });
            })
            .catch(err => reply(err));
        }
      } else if (
        pre('yt') ||
        pre('youtube') ||
        pre('ytmp4') ||
        pre('ytvideo')
      ) {
        if (args.length === 2) {
          const url = args[1];
          if (!url) return reply('Maaf, perintah tidak valid');
          if (!url.match(isUrl))
            return reply('Maaf, url yang kamu kirim tidak valid');
          ytv(url)
            .then(async (res: any) => {
              if (res.filesize > 10 * 1000)
                return client.sendFileFromUrl(from, res.thumb, image, {
                  filename: 'thumbs.jpg',
                  caption:
                    `• Title:\n${res.title}\n• Size: ${res.filesizeF}` +
                    '\n\nLink: ' +
                    (await urlShortener(res.dl_link)) +
                    '\n\n_*「 XyZ BOT Automation 」*_',
                  quoted: replyMode,
                });
              return client.sendFileFromUrl(from, res.dl_link, video, {
                filename: 'media.' + res.ext,
                caption: `• Title:\n${res.title}\n• Size: ${res.filesizeF}\n\n_*「 XyZ BOT Automation 」*_`,
                quoted: replyMode,
              });
            })
            .catch(() => reply('Maaf, video/url tidak valid'));
        }
      } else if (pre('extract')) {
        if (isVideo) {
          if (getQuotedVideo().message.videoMessage.fileLength.low >= 10485760)
            return reply('Maaf, video tidak boleh melebihi 10mb!');
          client.downloadMediaMessage(getQuotedVideo()).then(mediaData => {
            reply('Memulai proses ekstrak audio ...');
            extract(mediaData, msgId).then(() => {
              client.sendMessage(
                from,
                fs.readFileSync('../temp/' + msgId + '.m4a'),
                audio,
                {
                  filename: 'hasil.m4a',
                  caption: 'Sukses',
                  quoted: replyMode,
                  mimetype: Mimetype.mp4Audio,
                }
              );
              fs.unlink('../temp/' + msgId + '.m4a', () => {});
            });
          });
        } else {
          reply('Maaf, hanya bisa meng-ekstrak suara dari video!');
        }
      } else if (pre('op') || pre('oplovers')) {
        const query = getQuery('op');
        oploverz
          .findOne(query)
          .then((res: any) => {
            let hasil = `*Oploverz Scrapper*\n\n• Judul : ${res.judul}\n• Rilis : ${res.rilis}\n\n`;
            oploverz
              .downloadLink(res.link)
              .then((resp: any) => {
                for (const i of resp) {
                  hasil += `*${i.title}*\n`;
                  for (const i2 of i.links) {
                    hasil += `• ${i2.server}\n${i2.link}\n`;
                  }
                  hasil += '\n';
                }
                client.sendFileFromUrl(from, res.image, image, {
                  caption: hasil,
                  quoted: replyMode,
                });
              })
              .catch(() => reply('Maaf, url tidak valid'));
          })
          .catch(() => reply('Maaf, url tidak valid'));
      } else if (pre('news')) {
        const newsStr = getQuery('news');
        if (!newsStr)
          return reply(
            'Maaf, perintah tidak valid\n\nMohon masukan berita yang akan dicari'
          );
        reply('Mohon tunggu sebentar, mencari berita....');
        news(newsStr)
          .then((res: any) => {
            const formated = stripIndents`*Hasil Pencarian Berita*
                • Judul : ${res.title}
                • Link : ${res.url}

                _*XyZ BOT*_`;
            client.sendFileFromUrl(from, res.img, image, {
              filename: 'image.jpg',
              caption: formated,
              quoted: replyMode,
            });
          })
          .catch(err => reply(err));
      } else if (pre('kucing')) {
        const q2 = Math.floor(Math.random() * 900) + 300;
        const q3 = Math.floor(Math.random() * 900) + 300;
        client.sendFileFromUrl(
          from,
          'http://placekitten.com/' + q3 + '/' + q2,
          image,
          {
            filename: 'kucing.jpg',
            caption: '_*「 XyZ BOT Automation 」*_',
            quoted: replyMode,
          }
        );
      } else if (pre('wallpaper')) {
        getBuffer('https://source.unsplash.com/1280x720/?nature').then(resp => {
          client.sendMessage(from, resp, image, {
            filename: 'wallpaper.jpeg',
            caption: '_*「 XyZ BOT Automation 」*_',
            quoted: replyMode,
          });
        });
      } else if (pre('corona')) {
        function intl(str: number) {
          const nf = Intl.NumberFormat();
          return nf.format(str);
        }
        if (args[1]) {
          if (args[1] === 'prov') {
            const province = body.slice(13).toLowerCase();
            if (!province)
              return reply(
                `Maaf, perintah tidak valid, contoh :\n\n*${prefix}corona prov [provinsi]*`
              );
            return axios
              .get('https://indonesia-covid-19.mathdro.id/api/provinsi/')
              .then(({data}) => {
                let founded = false;
                data.data.find((i: any) => {
                  if (i.provinsi.toLowerCase() === province) {
                    founded = true;
                    return reply(stripIndents`_*「 Kasus COVID19 di ${
                      i.provinsi
                    } 」*_
                                • Positif : ${intl(i.kasusPosi)} kasus   
                                • Sembuh : ${intl(i.kasusSemb)} kasus
                                • Meninggal : ${intl(i.kasusMeni)} kasus

                                _*「 Tips Kesehatan 」*_
                                - Mencuci tangan dengan benar
                                - Menggunakan masker
                                - Menjaga daya tahan tubuh
                                - Menerapkan physical distancing

                                _*「 XyZ BOT Information 」*_`);
                  }
                  return;
                });
                return;
              });
          }
        } else {
          corona()
            .then(hasilCorona => sendText(hasilCorona))
            .catch((err: any) => {
              console.log(err);
            });
        }
      } else if (pre('distord') || pre('distorsi') || pre('destroy')) {
        if (isQuotedAudio) {
          client
            .downloadMediaMessage(getQuotedAudio())
            .then(async mediaData => {
              ffmpeg(buffer2Stream(mediaData))
                .audioFilter(
                  'acrusher=.1:1:55:0:log,equalizer=f=40:width_type=h:width=50:g=10'
                )
                .save('../temp/' + msgId + '.mp3')
                .on('error', () => reply('Maaf, audio tidak di dukung'))
                .on('end', () => {
                  client.sendMessage(
                    from,
                    fs.readFileSync('../temp/' + msgId + '.mp3'),
                    audio,
                    {
                      filename: 'hasil.mp3',
                      caption: 'sukses',
                      mimetype: Mimetype.mp4Audio,
                      quoted: replyMode,
                    }
                  );
                  fs.unlink('../temp/' + msgId + '.mp3', () => {});
                })
                .on('error', (err: any) => console.log(err));
            });
        } else if (isQuotedVideo) {
          client
            .downloadMediaMessage(getQuotedVideo())
            .then(async mediaData => {
              ffmpeg(buffer2Stream(mediaData))
                .complexFilter(
                  'scale=iw/2:ih/2,eq=saturation=100:contrast=10:brightness=0.3:gamma=10,noise=alls=100:allf=t,unsharp=5:5:1.25:5:5:1,eq=gamma_r=100:gamma=50,scale=iw/5:ih/5,scale=iw*4:ih*4,eq=brightness=-.1,unsharp=5:5:1.25:5:5:1'
                )
                .audioFilter(
                  'acrusher=.1:1:62:0:log,equalizer=f=40:width_type=h:width=50:g=10'
                )
                .outputOptions(
                  '-codec:v',
                  'libx264',
                  '-crf',
                  '32',
                  '-preset',
                  'veryfast'
                )
                .on('error', () => reply('Maaf, video tidak di dukung'))
                .format('mp4')
                .save('../temp/' + msgId + '.mp4')
                .on('end', () => {
                  client.sendMessage(
                    from,
                    fs.readFileSync('../temp/' + msgId + '.mp4'),
                    video,
                    {
                      filename: 'hasil.mp4',
                      caption: '_*「 XyZ BOT Automation 」*_',
                      mimetype: Mimetype.mp4,
                      quoted: replyMode,
                    }
                  );
                  fs.unlink('../temp/' + msgId + '.mp4', () => {});
                });
            });
        } else if (isQuotedImage) {
          client.downloadMediaMessage(getQuotedImage()).then(gambar => {
            canvacord
              .deepfry(gambar)
              .then(res => {
                client.sendMessage(from, res, image, {
                  filename: 'hasil.jpg',
                  caption: '_*「 XyZ BOT Automation 」*_',
                  quoted: replyMode,
                });
              })
              .catch(err => reply(err));
          });
        } else {
          sendText('Maaf, hanya mendukung gambar, audio, dan video!');
        }
      } else if (pre('anime')) {
        const animename = getQuery('anime');
        if (!animename)
          return reply('Maaf tolong masukan nama anime yang anda cari');
        anime(animename)
          .then((hasil: any) => {
            getBuffer(hasil.image).then(resp => {
              client.sendMessage(from, resp, image, {
                filename: 'anime.jpg',
                caption: hasil.formated,
                quoted: replyMode,
              });
            });
          })
          .catch((err: any) => reply(err));
      } else if (pre('quoteit')) {
        if (!body.includes('|')) return reply('Maaf, perintah tidak valid');
        const form = getQuery('quoteit');
        const formated = form.split('|');
        const maker = formated[0].trim();
        const quote = formated[1].trim();
        if (quote.length > 100) return reply('Text kepanjangan :)');
        if (!form || !maker || !quote)
          return reply('Maaf, perintah tidak valid');
        quoted(maker, quote)
          .then(res => {
            getBuffer(res).then(resp => {
              client.sendMessage(from, resp, image, {
                filename: 'quote.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            });
          })
          .catch(err => reply(err));
      } else if (pre('quote') || pre('quotes')) {
        const getBijak = await quotes();
        reply(getBijak);
      } else if (pre('compress')) {
        if (isMedia || isQuotedImage) {
          client.downloadMediaMessage(getQuotedImage()).then(gambar => {
            processImg(gambar);
          });
        } else {
          sendText(
            `Tidak ada gambar! untuk ${prefix}compress kirim gambar dengan caption ${prefix}compress`
          );
        }
        async function processImg(gambar: Buffer) {
          const images = await Jimp.read(gambar);
          images.quality(55).write(`../temp/${msgId}.jpg`, err => {
            if (err) console.log(err);
            client.sendMessage(
              from,
              fs.readFileSync(`../temp/${msgId}.jpg`),
              image,
              {
                filename: 'compressed.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              }
            );
            fs.unlink(`../temp/${msgId}.jpg`, () => {});
          });
        }
      } else if (pre('deepfry')) {
        if (isMedia || isQuotedImage) {
          client.downloadMediaMessage(getQuotedImage()).then(gambar => {
            processImg(gambar);
          });
        } else {
          sendText(
            `Tidak ada gambar! untuk ${prefix}deepfry kirim gambar dengan caption ${prefix}deepfry`
          );
        }
        async function processImg(gambar: Buffer) {
          canvacord
            .deepfry(gambar)
            .then(res => {
              client.sendMessage(from, res, image, {
                filename: 'hasil.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            })
            .catch(err => reply(err));
        }
      } else if (pre('memegen')) {
        async function processImg(buffer: Buffer, body: string) {
          if (!body.includes('|')) return reply('Maaf, perintah tidak valid');
          const form = getQuery('memegen');
          const formated = form.split('|');
          const maker = formated[0].trim();
          const quote = formated[1].trim();
          if (!form || !maker || !quote)
            return reply('Maaf, perintah tidak valid');
          return canvacord
            .memegen(maker, quote, buffer)
            .then(res => {
              client.sendMessage(from, res, image, {
                filename: 'hasil.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            })
            .catch(err => reply(err));
        }
        if (isMedia || isQuotedImage) {
          client.downloadMediaMessage(getQuotedImage()).then(gambar => {
            processImg(gambar, cmd);
          });
        } else {
          sendText(
            `Tidak ada gambar! untuk ${prefix}memegen kirim gambar dengan caption ${prefix}memegen`
          );
        }
      } else if (pre('tobe')) {
        async function processImg(buffer: Buffer) {
          canvacord
            .tobecontinue(buffer)
            .then(res => {
              client.sendMessage(from, res, image, {
                filename: 'hasil.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            })
            .catch(err => reply(err));
        }
        if (isMedia || isQuotedImage) {
          client.downloadMediaMessage(getQuotedImage()).then(gambar => {
            processImg(gambar);
          });
        } else {
          sendText(
            `Tidak ada gambar! untuk ${prefix}tobe kirim gambar dengan caption ${prefix}tobe`
          );
        }
      } else if (pre('memegen2')) {
        async function processImg(buffer: Buffer) {
          const query = getQuery('memegen2');
          if (!query) return reply('Maaf, perintah tidak valid');
          return canvacord
            .memegen2(buffer, query)
            .then(res => {
              client.sendMessage(from, res, image, {
                filename: 'hasil.jpg',
                caption: '_*「 XyZ BOT Automation 」*_',
                quoted: replyMode,
              });
            })
            .catch(err => reply(err));
        }
        if (isMedia || isQuotedImage) {
          client.downloadMediaMessage(getQuotedImage()).then(gambar => {
            processImg(gambar);
          });
        } else {
          sendText(
            `Tidak ada gambar! untuk ${prefix}memegen2 kirim gambar dengan caption ${prefix}memegen2`
          );
        }
      } else if (pre('wait')) {
        if (isMedia || isQuotedImage) {
          client.downloadMediaMessage(getQuotedImage()).then(media => {
            wait(media)
              .then(hasil => {
                reply(hasil);
              })
              .catch(err => {
                reply(err);
              });
          });
        } else {
          reply(
            `Tidak ada gambar! untuk ${prefix}wait, kirim gambar dengan caption ${prefix}wait`
          );
        }
      } else if (pre('autoread')) {
        if (isEnable(args[1])) {
          if (autoRead) return reply('Sudah aktif!');
          autoRead = true;
          setting.autoRead = true;
          db.push('/setting', setting, true);
          reply(debugWM + 'autoRead mode enabled!');
        } else if (isDisable(args[1])) {
          if (!autoRead) return reply('Belum aktif!');
          autoRead = false;
          setting.autoRead = false;
          db.push('/setting', setting, true);
          reply(debugWM + 'autoRead mode disabled!');
        } else {
          reply('Maaf, perintah tidak valid');
        }
      } else if (pre('suggest')) {
        if (permission(['self'])) return;
        if (isEnable(args[1])) {
          autoSuggest = true;
          reply(debugWM + 'suggestion mode enabled!');
        } else if (isDisable(args[1])) {
          autoSuggest = false;
          reply(debugWM + 'suggestion mode disabled!');
        }
      } else if (pre('antivirtex')) {
        if (permission(['self'])) return;
        if (isEnable(args[1])) {
          antiVirtex = true;
          reply(debugWM + 'antiVirtex enabled!');
        } else if (isDisable(args[1])) {
          antiVirtex = false;
          reply(debugWM + 'antiVirtex disabled!');
        }
      } else if (pre('unsend')) {
        if (permission(['self'])) return;
        if (isEnable(args[1])) {
          if (setting.unSend.includes(from))
            return reply('antiDelete sudah aktif!');
          setting.unSend.push(from);
          db.push('/setting', setting, true);
          reply(debugWM + 'antiDelete mode enabled!');
        } else if (isDisable(args[1])) {
          if (!setting.unSend.includes(from))
            return reply('antiDelete belum aktif!');
          const index = setting.unSend.indexOf(from);
          setting.unSend.splice(index, 1);
          db.push('/setting', setting, true);
          reply(debugWM + 'antiDelete mode disabled!');
        } else {
          reply('Maaf, perintah tidak valid');
        }
      } else if (pre('public')) {
        if (permission(['self'])) return;
        if (isEnable(args[0])) {
          setting.universalPublic = true;
          db.push('/setting', setting, true);
          reply(debugWM + 'universal public mode enabled!');
        } else if (isDisable(args[0])) {
          setting.universalPublic = false;
          db.push('/setting', setting, true);
          reply(debugWM + 'universal public mode disabled!');
        } else {
          if (isGroupMsg) {
            function helper(bool: boolean, target: string) {
              if (bool) {
                publicJid.add(target);
                db.push('/publicJid', Array.from(publicJid), true);
                client.sendMessage(
                  from,
                  `${debugWM}add @${target.split('@')[0]} ke public sukses!`,
                  extendedText,
                  {contextInfo: {mentionedJid: [target]}, quoted: replyMode}
                );
              } else {
                publicJid.delete(target);
                db.push('/publicJid', Array.from(publicJid), true);
                client.sendMessage(
                  from,
                  `${debugWM}remove @${target.split('@')[0]} ke public sukses!`,
                  extendedText,
                  {contextInfo: {mentionedJid: [target]}, quoted: replyMode}
                );
              }
            }
            const target = mentionedJidList()[0] ? mentionedJidList()[0] : from;
            if (publicJid.has(target)) return helper(false, target);
            else return helper(true, target);
          } else {
            if (publicJid.has(from)) {
              publicJid.delete(from);
              db.push('/publicJid', Array.from(publicJid), true);
              reply(debugWM + 'sukses remove public!');
            } else {
              publicJid.add(from);
              db.push('/publicJid', Array.from(publicJid), true);
              reply(debugWM + 'sukses add public!');
            }
          }
        }
      } else if (pre('log')) {
        if (permission(['admin'])) return;
        if (isEnable(args[1])) {
          logMode = true;
          reply(debugWM + 'Log mode enabled!');
        } else if (isDisable(args[1])) {
          logMode = false;
          reply(debugWM + 'Log mode disabled!');
        }
      } else if (pre('debug')) {
        if (permission(['admin'])) return;
        if (isEnable(args[1])) {
          if (debug) return reply('Sudah aktif!');
          debug = true;
          reply(debugWM + 'debug mode enabled!');
        } else if (isDisable(args[1])) {
          if (!debug) return reply('Belum aktif!');
          debug = false;
          reply(debugWM + 'debug mode disabled!');
        } else {
          reply('Maaf, perintah tidak valid');
        }
      } else if (pre('fakereply')) {
        if (permission(['self'])) return;
        if (isEnable(args[1])) {
          if (setting.fakeReply) return reply('Sudah aktif!');
          setting.fakeReply = true;
          db.push('/setting', setting, true);
          reply(debugWM + 'fakeReply mode enabled!');
        } else if (isDisable(args[1])) {
          if (!setting.fakeReply) return reply('Belum aktif!');
          setting.fakeReply = false;
          db.push('/setting', setting, true);
          reply(debugWM + 'fakeReply mode disabled!');
        } else if (secondParam('jid')) {
          const asu = getQuery('fakereply jid');
          if (!asu) reply('Maaf, perintah tidak valid');
          setting.fakeJid = asu;
          db.push('/setting', setting, true);
          reply(debugWM + 'fakeJid changed to:\n' + asu);
        } else if (isImage) {
          client.downloadMediaMessage(getQuotedImage()).then(data => {
            fs.writeFileSync('../imagefakeimage.jpeg', data);
            db.push('/fakeReplybase64', data.toString('base64'), true);
            reply(debugWM + 'fakeReply image changed!');
          });
        } else {
          const asu = getQuery('fakereply');
          if (!asu) reply('Maaf, perintah tidak valid');
          setting.fakeText = asu;
          db.push('/setting', setting, true);
          reply(debugWM + 'fakeText changed to:\n' + asu);
        }
      } else if (pre('eval')) {
        try {
          if (permission(['admin'])) return;
          const exec = getQuery('eval').trim();
          eval(
            '(async () => {' + exec + '})().catch(err => reply(err.toString()))'
          );
        } catch (error) {
          reply('[ERROR]\n\n' + error.toString());
        }
      } else if (pre('exec')) {
        if (permission(['admin'])) return;
        const exec = getQuery('exec').trim();
        child.exec(exec, (error: any, stdout: any, stderr: any) => {
          if (error) return reply('*[ERROR]*\n' + error.toString());
          if (stdout) return reply('*[STDOUT]*\n' + stdout.toString());
          if (stderr) return reply('*[STDERR]*\n' + stderr.toString());
          return;
        });
      } else if (pre('getobj')) {
        if (permission(['admin'])) return;
        try {
          const exec = getQuery('getobj').trim();
          reply(require('util').inspect(eval(exec), false, null));
        } catch (error) {
          reply('[ERROR]\n\n' + error.toString());
        }
      } else if (pre('toimg') || pre('decrypt')) {
        if (!isQuotedSticker) return reply('Maaf, perintah tidak valid');
        client.downloadMediaMessage(getQoutedSticker()).then(data => {
          const img = sharp(data);
          img.metadata().then((res: any) => {
            if (!is_undefined(res.loop)) {
              reply('Mohon bersabar, prosess mungkin saja lama...');
              fs.writeFileSync('../temp/' + msgId + '.webp', data);
              scrap
                .webp2mp4('../temp/' + msgId + '.webp')
                .then(res => {
                  client.sendFileFromUrl(from, res!, video, {
                    filename: 'hasil.mp4',
                    caption: '_*Processing Sukses! #XyZ BOT*_',
                    quoted: replyMode,
                  });
                  fs.unlink('../temp/' + msgId + '.webp', () => {});
                })
                .catch(() => reply('Maaf, internal error coba lagi...'));
            } else {
              img
                .png()
                .toBuffer()
                .then((res: Buffer) => {
                  client.sendMessage(from, res, image, {
                    filename: 'hasil.png',
                    caption: '_*Processing Sukses! #XyZ BOT*_',
                    quoted: replyMode,
                    mimetype: Mimetype.png,
                  });
                });
            }
          });
        });
      } else if (pre('steal') || pre('maling') || pre('copet')) {
        if (!isQuotedSticker) return reply('Maaf, perintah tidak valid');
        const media = JSON.parse(
          JSON.stringify(message).replace('quotedM', 'm')
        ).message.extendedTextMessage.contextInfo;
        client.downloadMediaMessage(media).then(data => {
          modifExif(data, msgId, res => {
            client.sendMessage(from, res, sticker, {quoted: replyMode});
          });
        });
      } else if (pre('gtts')) {
        const gttsText = isQuotedText ? getQuotedText() : getQuery('gtts');
        if (!gttsText) return;
        if (gttsText.length >= 250) return sendText('Teks Kepanjangan :(');
        const gtts = new gTTs(gttsText, 'id');
        gtts.save(`../temp/${msgId}.m4a`, () => {
          client.sendMessage(
            from,
            fs.readFileSync(`../temp/${msgId}.m4a`),
            audio,
            {ptt: true, quoted: replyMode, mimetype: Mimetype.mp4Audio}
          );
          fs.unlink(`../temp/${msgId}.m4a`, () => {});
        });
      } else if (pre('hidetag')) {
        if (permission(['self', 'group'])) return;
        const query = getQuery('hidetag');
        const member = groupMetadata['participants'];
        const theid: string[] = [];
        member.map(async (x: any) => {
          theid.push(x.id.replace('c.us', 's.whatsapp.net'));
        });
        client.sendMessage(from, query, text, {
          contextInfo: {mentionedJid: theid},
          quoted: replyMode,
        });
      } else if (pre('brainly')) {
        const pertanyaan = getQuery('brainly');
        if (!pertanyaan) return;
        brainly(pertanyaan)
          .then(hasil => {
            reply(hasil);
          })
          .catch(err => {
            reply(err);
          });
      } else if (pre('tahta')) {
        const text = args[1];
        if (!text || args.length > 2)
          return reply('Maaf, perintah tidak valid');
        if (text.length > 8)
          return reply('Maaf, text tidak boleh melebihi 7 karakter');
        gm()
          .rawSize(512, 512)
          .out('xc:black')
          .pointSize(90)
          .font('./fonts/harta.ttf')
          .tile('../imagerainbow.jpg')
          .drawText(0, 0, 'HARTA\nTAHTA\n' + text.toUpperCase(), 'center')
          .wave(4.5, 64)
          .stream('jpeg')
          .pipe(
            concat((buffer: Buffer) => {
              client.sendMessage(from, buffer, image, {
                filename: 'harta.jpeg',
                caption: '_*「 XyZ BOT Automation 」*_',
                mimetype: Mimetype.jpeg,
                quoted: replyMode,
              });
            })
          );
      } else if (pre('a-harta')) {
        const text = args[1].toUpperCase();
        if (!text || args.length > 2)
          return reply('Maaf, perintah tidak valid');
        if (text.length > 8)
          return reply('Maaf, text tidak boleh melebihi 7 karakter');
        ttpAnim
          .harta(text)
          .then(res => {
            client.sendMessage(from, res, sticker, {quoted: replyMode});
          })
          .catch(err => console.log(err));
      } else if (pre('harta')) {
        const text = args[1];
        if (!text || args.length > 2)
          return reply('Maaf, perintah tidak valid');
        if (text.length > 8)
          return reply('Maaf, text tidak boleh melebihi 7 karakter');
        gm()
          .rawSize(512, 512)
          .out('xc:black')
          .pointSize(90)
          .font('../fonts/harta.ttf')
          .tile('../imagerainbow.jpg')
          .drawText(0, 0, 'HARTA\nTAHTA\n' + text.toUpperCase(), 'center')
          .wave(4.5, 64)
          .stream('webp')
          .pipe(
            concat((buffer: Buffer) => {
              client.sendMessage(from, buffer, sticker, {quoted: replyMode});
            })
          );
      } else if (pre('timestamp')) {
        if (permission(['self'])) return;
        const text = getQuery('timestamp');
        if (!text.includes('|')) return reply('Maaf, perintah tidak valid');
        const time = text.split('|')[0].trim();
        const stmp = text.split('|')[1].trim();
        const thetxt = text.split('|')[2].trim();
        if (!time || !stmp || !thetxt)
          return reply('Maaf, peritah tidak valid');
        client.sendMessage(from, thetxt, MessageType.text, {
          timestamp: moment().subtract(time, stmp).toDate(),
          quoted: replyMode,
        });
      } else if (pre('fitnah')) {
        if (permission(['self'])) return;
        if (!cmd.includes('|')) return reply('Maaf, perintah tidak valid');
        const mentioned = message.message!.extendedTextMessage!.contextInfo!
          .mentionedJid;
        const teks = cmd.split('|')[1].trim();
        const teks2 = cmd.split('|')[2].trim();
        if (!mentioned || !teks || !teks2)
          return reply('Maaf, perintah tidak valid');
        client.deleteMessage(from, {id: msgId, remoteJid: from, fromMe: true});
        client.fakeReply1(from, teks2, <any>mentioned[0], teks, from);
      } else {
        if (autoSuggest) {
          const hasil = didYouMean(args[0].replace(prefix, ''), suggestions, {
            caseSensitive: true,
          });
          if (hasil)
            reply('Mungkinkah maksud anda adalah *' + prefix + hasil + '* ?');
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}
