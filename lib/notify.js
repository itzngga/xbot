const fs = require('fs-extra');
const notifList = fs.readJSONSync('./json/notif.json');
const {corona} = require('./functions.js');
const {text} = require('@adiwajshing/baileys').MessageType;

if (typeof Array.prototype.splice === 'undefined') {
  Array.prototype.splice = function (index, howmany) {
    howmany = typeof howmany === 'undefined' || this.length;
    let elems = Array.prototype.slice.call(arguments, 2),
      newArr = this.slice(0, index),
      last = this.slice(index + howmany);
    newArr = newArr.concat.apply(newArr, elems);
    newArr = newArr.concat.apply(newArr, last);
    return newArr;
  };
}

module.exports.corona = client => {
  if (!notifList.length) return;
  corona().then(hasil => {
    for (const chat of notifList) {
      client
        .sendMessage(chat, '_*XyZ BOT Corona Notificator*_', text)
        .catch(err => {
          console.log(err);
        });
      client.sendMessage(chat, hasil, text).catch(err => {
        console.log(err);
      });
    }
  });
};

module.exports.create = (client, chatId) => {
  if (!chatId) return;
  notifList.push(chatId);
  fs.writeJSONSync('./json/notif.json', notifList);
  return client.sendMessage(
    chatId,
    'Notifikasi update corona telah aktif, dan bot akan memberitahu update corona pada jam 9:30 pagi jika anda chat bot sebelumnya\n*!notif stop* untuk menghentikan notifikasi',
    text
  );
};

module.exports.remove = (client, chatId) => {
  if (!chatId) return;
  const index = notifList.indexOf(chatId);
  notifList.splice(index, 1);
  fs.writeJSONSync('./json/notif.json', notifList);
  return client.sendMessage(
    chatId,
    'Notifikasi update telah nonaktif di chat ini!',
    text
  );
};
