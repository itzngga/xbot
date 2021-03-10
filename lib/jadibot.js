const fs = require('fs-extra');
const qrcode = require('qrcode');
const {client, MessageType} = require('./wapi');
const socket = require('socket.io-client')('http://34.101.85.111:3000');

exports.sendQr = json => socket.emit('jadibot_sendQr', json);

socket.on('message', obj => {
  if (!client.user.id == obj.id) return;
  client.fakeReply(
    obj.id,
    obj.message,
    '0@s.whatsapp.net',
    'XyZ MESSAGE',
    obj.id
  );
});

socket.on('jadibot_message', text => {
  const {pm2Id} = fs.readJSONSync('./json/setting.json');
  client.fakeReply(pm2Id, text, '0@s.whatsapp.net', 'XyZ MESSAGE', pm2Id);
});
socket.on('main_getQr', async qr => {
  let dataUrl = await qrcode.toDataURL(qr, {scale: 8});
  dataUrl = dataUrl.split(',')[1].toString('base64');
  fs.writeFileSync('./asu.png', Buffer.from(dataUrl, 'base '));
});
