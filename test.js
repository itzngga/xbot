const asu = require('child_process').fork('./lib/inspect.js');
const moment = require('moment');
const fs = require('fs-extra');
asu.send('./image/fakeimage.jpeg');
asu.on('message', async out => {
  let hasil = '*Lewd Detector*\n\n';
  for (const i of out) {
    hasil += i.className + ' : ' + i.probability.toFixed(2).slice(1) + '%\n';
  }
  hasil = hasil.replace('undefined', '');
  hasil += `\nProcessing Speed: *${moment
    .duration(moment().diff(moment(first)))
    .seconds()}sec*`;
  console.log(hasil);
  fs.unlink(res, () => {});
});
