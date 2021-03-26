// import { setting, xjadiBot } from './../types';
// import fs from 'fs-extra';
// import client from '../index';
// const qrcode = require('qrcode');
// const socket = require('socket.io-client')('http://34.101.85.111:3000');

// function sendMessage (jid: string, text: string){
//   return client.reply(jid, text, client.generateFakeReply(setting.fakeText), {})
// }

// client.on('qr', qr => qrcode.toDataURL(qr, {scale: 8}).then((dataUrl: any) => {
//     socket.emit('messagge', {
//       code: 200,
//       target: 'server',
//       type: 'qr',
//       method: 'send',
//       qr: dataUrl.split(',')[1].toString('base64')
//     })
//   }))

// socket.on('message', async (obj: xjadiBot) => {
//   if(obj.target !== client.user.jid || obj.code !== 200) return
//   switch (obj.type) {
//     case 'message':
//       sendMessage(obj.tjid, obj.text)
//       break;
//     case 'broadcast':
//       sendMessage(client.user.jid, obj.text)
//       break;
//     case 'delete':
//       break;
//     case 'qr': {
//       socket.emit('message', {
//         code: 200,
//         target: 'server',
//         type: 'qr',
//         method: 'get',
//         qr: Buffer.from(JSON.stringify(client.base64EncodedAuthInfo())).toString('base64')
//       })
//       break
//     }
//     default:
//     break;
//   }
// })
