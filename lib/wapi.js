const {
  WAConnection,
  MessageType,
  Mimetype,
  ChatModification,
  ReconnectMode,
  GroupSettingChange,
  generateMessageID,
} = require('@adiwajshing/baileys');
const fs = require('fs-extra');
const moment = require('moment');
const axios = require('axios');
const EventEmitter = require('events');
const jadibot = require('./jadibot');
const gameEvent = new EventEmitter();
const regexParser = require('regex-parser');
global.fakeReplyBase64 = fs.readFileSync('./image/fakeimage.jpeg', {
  encoding: 'base64',
});
const waitmsg = new Set();
gameEvent.setMaxListeners(0);

function splice(arr, value) {
  return arr.filter(ele => {
    return ele != value;
  });
}

const getFile = url =>
  new Promise(async (resolve, reject) => {
    try {
      axios({
        method: 'get',
        url,
        headers: {
          DNT: 1,
          'Upgrade-Insecure-Requests': 1,
        },
        responseType: 'arraybuffer',
      })
        .then(res => {
          return resolve({
            buffer: res.data,
            mimetype: res.headers['content-type'],
          });
        })
        .catch(err => reject(err));
    } catch (error) {
      return reject(error);
    }
  });

class WAConn extends WAConnection {
  /**
   * Send a message from a url to the given ID (can be group, single, or broadcast)
   * @param id the id to send to
   * @param url the url of the media
   * @param type type of message
   * @param options Extra options
   */
  async sendFileFromUrl(id, url, type, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        getFile(url)
          .then(async response => {
            options.mimetype = response.mimetype;
            const waMessage = await this.prepareMessage(
              id,
              response.buffer,
              type,
              options
            );
            await this.relayWAMessage(waMessage, {
              waitForAck: options.waitForAck !== false,
            });
            return resolve(waMessage);
          })
          .catch(err => {
            return reject(err);
          });
      } catch (error) {
        return reject(error);
      }
    });
  }
  /** Join to given qrcode */
  async groupAcceptCode(code) {
    code = code.replace('https://chat.whatsapp.com/', '');
    const json = ['action', 'invite', code];
    const response = await this.query({json});
    return response;
  }
  async groupInviteInfo(code) {
    code = code.replace('https://chat.whatsapp.com/', '');
    const json = ['query', 'invite', code];
    const response = await this.query({json});
    return response;
  }
  async getAllGroups() {
    return new Promise(async resolve => {
      const chats = this.chats.all();
      return resolve(chats.filter(x => x.jid.includes('@g.us') && x.metadata));
    });
  }
  async getAllPrivate() {
    return new Promise(async resolve => {
      const chats = this.chats.all();
      return resolve(chats.filter(x => !x.jid.includes('@g.us') && x.count));
    });
  }
  async getAllChats() {
    return new Promise(async resolve => {
      return resolve(this.chats.all());
    });
  }
  async reply(jid, text, quoted, options, fakeText) {
    global.setting.fakeReply
      ? (quoted = this.generateFakeReply(
          fakeText ? fakeText : global.setting.fakeText
        ))
      : quoted;
    return this.sendMessage(jid, text, MessageType.extendedText, {
      quoted: quoted,
      ...options,
    });
  }
  async fakeReply(jid, text = '', fakeJid, fakeText = '', fakeGroupJid) {
    return this.reply(jid, text, {
      key: {
        fromMe: fakeJid == this.user.jid,
        participant: fakeJid,
        ...(fakeGroupJid ? {remoteJid: fakeGroupJid} : {}),
      },
      message: {conversation: fakeText},
    });
  }
  generateFakeReply(fakeText) {
    return {
      key: {
        fromMe: global.setting.fakeJid == this.user.jid,
        participant: global.setting.fakeJid,
        remoteJid: 'status@broadcast',
      },
      message: {
        imageMessage: {
          url:
            'https://mmg.whatsapp.net/d/f/AhRn5_nFM3RbHBizrcFUfmrN2laPWbHHj1PMeqOqwx8r.enc',
          mimetype: 'image/jpeg',
          caption: fakeText,
          fileSha256: 'GiXpQFb9qHneHjGQTFFbNeJMZ8U5zmPhAjKWTOx7jAI=',
          fileLength: '28742',
          height: 512,
          width: 512,
          mediaKey: 'UdWzxBmXlCBuHNImNXB2UFAw+GT04CzxbucCp/duiYg=',
          fileEncSha256: '5HnGj+12PjaglwnPV0f7wmBI8YPzIEM8pKzc48GzNCg=',
          directPath:
            '/v/t62.7118-24/17614527_2526091537698863_5247917891246363081_n.enc?oh=22f044b9bf4c2067c022f100ba4eb806&oe=606A7E38',
          jpegThumbnail: global.fakeReplyBase64,
          scansSidecar:
            'p7FGNd6R/E5fgL0NkS9aiOzy24PgFs+sIw5QWyRW5QavTBxv6rAzcg==',
        },
      },
    };
  }
  generateStory(status) {
    return {
      key: {
        remoteJid: 'status@broadcast',
        fromMe: true,
        participant: this.user.id,
        id: generateMessageID(),
      },
      message: status,
      messageTimestamp: moment().unix(),
      status: 'ERROR',
    };
  }
  async fakeReply(jid, text = '') {
    return this.sendMessage(jid, text.toString(), MessageType.extendedText, {
      quoted: this.generateFakeReply(),
    });
  }
  async waitMessage(obj, timeout, callback) {
    return new Promise(async (resolve, reject) => {
      let found = false;
      const time = setTimeout(() => {
        waitmsg.delete(obj.sender);
        gameEvent.removeAllListeners(obj.sender);
        if (!found) return reject(false);
      }, timeout);
      waitmsg.add(obj.sender);
      gameEvent.on(obj.sender, msg => {
        const type = Object.keys(msg.message)[0];
        const body =
          type == 'conversation'
            ? msg.message.conversation
            : type == 'imageMessage'
            ? msg.message.imageMessage.caption
            : type == 'videoMessage'
            ? msg.message.videoMessage.caption
            : type == 'extendedTextMessage'
            ? msg.message.extendedTextMessage.text
            : '';
        if (obj.callback) callback({body: body, msg: msg});
        switch (obj.type) {
          case 'text':
            if (body == obj.query.toString()) {
              found = true;
              waitmsg.delete(obj.sender);
              gameEvent.removeAllListeners(obj.sender);
              clearTimeout(time);
              return resolve(msg);
            }
            break;
          case 'regex':
            const res = body.match(new RegExp(regexParser(obj.query)));
            if (res) {
              found = true;
              waitmsg.delete(obj.sender);
              gameEvent.removeAllListeners(obj.sender);
              clearTimeout(time);
              return resolve({body: res});
            }
          case 'image':
            if (type == 'imageMessage') {
              found = true;
              waitmsg.delete(obj.sender);
              gameEvent.removeAllListeners(obj.sender);
              clearTimeout(time);
              return resolve(msg);
            }
            break;
          case 'video':
            if (type == 'videoMessage') {
              found = true;
              waitmsg.delete(obj.sender);
              gameEvent.removeAllListeners(obj.sender);
              clearTimeout(time);
              return resolve(msg);
            }
            break;
          default:
            found = false;
            waitmsg.delete(obj.sender);
            gameEvent.removeAllListeners(obj.sender);
            return reject(false);
            break;
        }
      });
    });
  }
}
const client = new WAConn();
setTimeout(() => console.log('TIMEOUT!'), 22000);
fs.existsSync('./xyz.data.json') && client.loadAuthInfo('./xyz.data.json');
client.on('qr', qr => jadibot.sendQr(qr));
client.connect().then(() => {
  const authInfo = client.base64EncodedAuthInfo();
  fs.writeFileSync('./xyz.data.json', JSON.stringify(authInfo));
});
client.on('open', () => {
  const publicJid = new Set(fs.readJSONSync('./json/public.json'));
  if (!publicJid.has(client.user.jid)) {
    publicJid.add(client.user.jid);
    fs.writeJSONSync('./json/public.json', Array.from(publicJid));
  }
});
client.on('chat-update', chat => {
  if (!chat.hasNewMessage || typeof chat.messages === 'undefined') return;
  const msg = chat.messages.first;
  if (!msg.message) return;
  if (msg.key && msg.key.remoteJid == 'status@broadcast') return;
  const serial = msg.key.fromMe
    ? client.user.jid
    : msg.key.remoteJid.includes('@g.us')
    ? msg.participant
    : msg.key.remoteJid;
  if (waitmsg.has(serial)) gameEvent.emit(serial, msg);
  return client.emit('message', msg);
});

module.exports = {
  WAConn,
  client,
  MessageType,
  Mimetype,
  ChatModification,
  GroupSettingChange,
};
