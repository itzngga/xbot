const {spawn} = require('child_process');
const wrap = require('word-wrapper');

const write = (word, id) => {
  const text = wrap(word, {width: 60});
  spawn('convert', [
    './image/template.jpg',
    '-font',
    './fonts/Indie-Flower.ttf',
    '-size',
    '700x960',
    '-pointsize',
    '25',
    '-interline-spacing',
    '1',
    '-annotate',
    '+170+220',
    text,
    './image/' + id + '.jpg',
  ]).on('error', err => {
    console.log(err);
  });
};
module.exports = (word, id) =>
  new Promise((resolve, reject) => {
    try {
      if (word.length > 1055) {
        if (word.length <= 1055) {
          write(udud, id + '-1');
          return resolve('1');
        } else if (word.length <= 2110) {
          const udud12 = word.substr(0, 1055);
          write(udud12, id + '-1');
          const udud23 = word.substr(1056, 2110);
          write(udud23, id + '-2');
          return resolve('2');
        } else {
          return reject('Maaf, kata dari lembar melebihi batas');
        }
      } else {
        write(word, id + '-1');
        return resolve('1');
      }
    } catch (error) {
      console.log(error);
    }
  });
