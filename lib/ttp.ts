import fs from 'fs-extra';
const text2png = require('text2png');
const {spawn} = require('child_process');

export const attp = (text: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    try {
      Promise.all([
        canvasx('white', 0, text),
        canvasx('lime', 1, text),
        canvasx('red', 2, text),
        canvasx('blue', 3, text),
        canvasx('yellow', 4, text),
        canvasx('aqua', 5, text),
        canvasx('purple', 6, text),
      ]).then(() => {
        const anjay = spawn('convert', [
          '-delay',
          '20',
          '-loop',
          '0',
          './gif/frames/*.png',
          '-scale',
          '150:150',
          './gif/ttp.gif',
        ]);
        anjay.on('close', () => {
          spawn('ffmpeg', [
            '-i',
            './gif/ttp.gif',
            '-vcodec',
            'libwebp',
            '-lossless',
            '1',
            '-loop',
            '0',
            './gif/ttp.webp',
          ]).on('exit', () => {
            const mediaData = fs.readFileSync('./gif/ttp.webp');
            fs.unlink('./gif/ttp.gif', () => {
              fs.unlink('./gif/ttp.webp', () => {});
            });
            return resolve(mediaData);
          });
        });
      });
      // exec( 'convert -delay 20 -loop 0 ./gif/frames/*.png -scale 150:150 ./gif/ttp.gif', (error, stdout, stderr) => {
      //     if(error) reject(error)
      //     let mediaData = (fs.readFileSync('./gif/ttp.gif')).toString('base64')
      //     mediaData =  `data:image/gif;base64,${mediaData}`
      //     return resolve(mediaData)
      // })
    } catch (error) {
      return reject(error);
    }
  });

export const harta = async (text: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    try {
      Promise.all([
        createHarta(text, 1),
        createHarta(text, 2),
        createHarta(text, 3),
        createHarta(text, 4),
        createHarta(text, 5),
        createHarta(text, 6),
        createHarta(text, 7),
      ]).then(() => {
        const anjay = spawn('convert', [
          '-delay',
          '70',
          './gif/frame/*.jpg',
          '-scale',
          '150:150',
          './gif/harta.gif',
        ]);
        anjay.on('close', () => {
          spawn('ffmpeg', [
            '-i',
            './gif/harta.gif',
            '-vcodec',
            'libwebp',
            '-lossless',
            '1',
            '-loop',
            '0',
            './gif/harta.webp',
          ]).on('exit', () => {
            const mediaData = fs.readFileSync('./gif/harta.webp');
            fs.unlink('./gif/harta.gif', () => {
              fs.unlink('./gif/harta.webp', () => {});
            });
            return resolve(mediaData);
          });
        });
      });
    } catch (error) {
      return reject(error);
    }
  });

const createHarta = (text: string, number: number): Promise<boolean> =>
  new Promise(resolve => {
    async function render(
      name: string,
      text: string,
      number: number
    ): Promise<boolean> {
      return spawn('convert', [
        '-size',
        '512x512',
        '-background',
        'black',
        'xc:black',
        '-pointsize',
        '90',
        '-font',
        './fonts/harta.ttf',
        '-gravity',
        'center',
        '-tile',
        './image/' + name + '.jpg',
        '-annotate',
        '+0+0',
        'HARTA\nTAHTA\n' + text,
        '-wave',
        '4.5x64',
        './gif/frame/' + number + '.jpg',
      ]).on('exit', () => {
        return true;
      });
    }
    switch (number) {
      case 1:
        return resolve(render('rainbow', text, number));
      case 2:
        return resolve(render('rainbow2', text, number));
      case 3:
        return resolve(render('rainbow3', text, number));
      case 4:
        return resolve(render('rainbow4', text, number));
      case 5:
        return resolve(render('rainbow5', text, number));
      case 6:
        return resolve(render('rainbow6', text, number));
      case 7:
        return resolve(render('rainbow7', text, number));
    }
  });
async function canvasx(
  color: string,
  i: number,
  text: string
): Promise<Buffer | void> {
  return fs.writeFile(
    './gif/frames/frame' + i + '.png',
    text2png(wordWrap(text, 8), {
      font: '145px Boogaloo',
      localFontPath: './fonts/Boogaloo.ttf',
      localFontName: 'Boogaloo',
      color: color,
      strokeWidth: 2,
      strokeColor: 'black',
      textAlign: 'center',
      lineSpacing: 5,
      padding: 110,
      backgroundColor: 'transparent',
    })
  );
}
function wordWrap(str: string, maxWidth: number): string {
  const newLineStr = '\n';
  let res = '';
  while (str.length > maxWidth) {
    let found = false;
    for (let i = maxWidth - 1; i >= 0; i--) {
      if (testWhite(str.charAt(i))) {
        res = res + [str.slice(0, i), newLineStr].join('');
        str = str.slice(i + 1);
        found = true;
        break;
      }
    }
    if (!found) {
      res += [str.slice(0, maxWidth), newLineStr].join('');
      str = str.slice(maxWidth);
    }
  }
  return res + str;
}
function testWhite(x: string) {
  const white = new RegExp(/^\s$/);
  return white.test(x.charAt(0));
}
