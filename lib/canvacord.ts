const fs: any = require('fs-extra');
const canvacord: any = require('canvacord');
const canvas = canvacord.Canvas;
import {createCanvas, loadImage, registerFont} from 'canvas';
const {spawn}: any = require('child_process');
import {
  desaturate,
  contrast,
  wrapText,
  greyscale,
  drawImageWithTint,
  fishEye,
} from '../lib/Canvas';
registerFont('../fonts/Impact.ttf', {family: 'Impact'});
registerFont('../fonts/Noto-Regular.ttf', {family: 'Noto'});
registerFont('../fonts/Noto-CJK.otf', {family: 'Noto'});
registerFont('../fonts/Noto-Emoji.ttf', {family: 'Noto'});
const fires = () => {
  return {
    frame_1: fs.readFileSync('../gif/api/1.jpg'),
    frame_2: fs.readFileSync('../gif/api/2.jpg'),
    frame_3: fs.readFileSync('../gif/api/3.jpg'),
  };
};

export const triggered = (buffer: Buffer, id: string): Promise<Buffer> =>
  new Promise(resolve => {
    canvas.trigger(buffer).then((res: Buffer) => {
      fs.writeFile(`./temp/${id}.gif`, res).then(() => {
        spawn('ffmpeg', [
          '-i',
          `./temp/${id}.gif`,
          '-vcodec',
          'libwebp',
          '-lossless',
          '1',
          '-loop',
          '0',
          '-s',
          '150:150',
          `./temp/${id}.webp`,
        ])
          .on('exit', () => {
            const mediaData = fs.readFileSync(`./temp/${id}.webp`);
            fs.unlink(`./temp/${id}.gif`, () => {
              fs.unlink(`./temp/${id}.webp`, () => {});
            });
            return resolve(mediaData);
          })
          .on('error', (err: any) => console.log(err));
      });
    });
  });

export const wasted = (buffer: Buffer): Promise<Buffer> =>
  new Promise(resolve => {
    canvas.wasted(buffer).then((res: Buffer) => {
      return resolve(res);
    });
  });

export const wanted = (buffer: Buffer): Promise<Buffer> =>
  new Promise(resolve => {
    canvas.wanted(buffer).then((res: Buffer) => {
      return resolve(res);
    });
  });

export const rainbow = (buffer: Buffer): Promise<Buffer> =>
  new Promise(resolve => {
    canvas.rainbow(buffer).then((res: Buffer) => {
      return resolve(res);
    });
  });

export const facepalm = (buffer: Buffer): Promise<Buffer> =>
  new Promise(resolve => {
    canvas.facepalm(buffer).then((res: Buffer) => {
      return resolve(res);
    });
  });

export const fuse = (buffer1: Buffer, buffer2: Buffer): Promise<Buffer> =>
  new Promise(resolve => {
    canvas.fuse(buffer1, buffer2).then((res: Buffer) => {
      return resolve(res);
    });
  });

const fuse2 = (buffer1: Buffer, buffer2: Buffer): Promise<Buffer> =>
  new Promise(async resolve => {
    const Canvas = require('canvas');
    const img1 = await Canvas.loadImage(buffer1);
    const img2 = await Canvas.loadImage(buffer2);

    const canvas = Canvas.createCanvas(img1.width, img1.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img1, 0, 0);
    ctx.globalAlpha = 0.35;
    ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);
    return resolve(canvas.toBuffer());
  });
export const fire = (buffer: Buffer): Promise<Buffer> =>
  new Promise(resolve => {
    fuse2(buffer, fires().frame_1).then(res1 => {
      fs.writeFileSync('./gif/api_result/frame_1.jpg', res1);
      fuse2(buffer, fires().frame_2).then(res2 => {
        fs.writeFileSync('./gif/api_result/frame_2.jpg', res2);
        fuse2(buffer, fires().frame_3).then(res3 => {
          fs.writeFileSync('./gif/api_result/frame_2.jpg', res3);
          const anjay = spawn('convert', [
            '-delay',
            '70',
            './gif/api_result/*.jpg',
            '-scale',
            '150:150',
            './gif/api.gif',
          ]);
          anjay.on('close', () => {
            const mediaData = fs.readFileSync('./gif/api.gif');
            fs.unlink('./gif/api.gif').then(() => {});
            return resolve(mediaData);
          });
        });
      });
    });
  });
export const deepfry = (buffer: Buffer): Promise<Buffer | string> =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await loadImage(buffer);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(data, 0, 0);
      desaturate(ctx, -20, 0, 0, data.width, data.height);
      contrast(ctx, 0, 0, data.width, data.height);
      const attachment = canvas.toBuffer('image/jpeg', {quality: 0.2});
      return resolve(attachment);
    } catch (err) {
      return reject(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  });

export const memegen = (
  top: string,
  bottom: string,
  image: Buffer
): Promise<Buffer | string> =>
  new Promise(async (resolve, reject) => {
    try {
      const base = await loadImage(image);
      const canvas = createCanvas(base.width, base.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(base, 0, 0);
      const fontSize = Math.round(base.height / 10);
      ctx.font = `${fontSize}px Impact`;
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      const topLines: any = await wrapText(ctx, top, base.width - 10);
      if (!topLines)
        return reject(
          "There's not enough width to make a meme with this image."
        );
      for (let i = 0; i < topLines.length; i++) {
        const textHeight = i * fontSize + i * 10;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.strokeText(topLines[i], base.width / 2, textHeight);
        ctx.fillStyle = 'white';
        ctx.fillText(topLines[i], base.width / 2, textHeight);
      }
      const bottomLines: any = await wrapText(ctx, bottom, base.width - 10);
      if (!bottomLines)
        return reject(
          "There's not enough width to make a meme with this image."
        );
      ctx.textBaseline = 'bottom';
      const initial =
        base.height -
        (bottomLines.length - 1) * fontSize -
        (bottomLines.length - 1) * 10;
      for (let i = 0; i < bottomLines.length; i++) {
        const textHeight = initial + i * fontSize + i * 10;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.strokeText(bottomLines[i], base.width / 2, textHeight);
        ctx.fillStyle = 'white';
        ctx.fillText(bottomLines[i], base.width / 2, textHeight);
      }
      const attachment = canvas.toBuffer();
      return resolve(attachment);
    } catch (err) {
      return reject(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  });

export const thuglife = (buffer: Buffer): Promise<Buffer | string> =>
  new Promise(async (resolve, reject) => {
    try {
      const base = await loadImage('./image/thug-life.png');
      const data = await loadImage(buffer);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(data, 0, 0);
      greyscale(ctx, 0, 0, data.width, data.height);
      const ratio = base.width / base.height;
      const width = data.width / 2;
      const height = Math.round(width / ratio);
      ctx.drawImage(
        base,
        data.width / 2 - width / 2,
        data.height - height,
        width,
        height
      );
      const attachment = canvas.toBuffer();
      return resolve(attachment);
    } catch (err) {
      return reject(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  });

export const burn = (burn: string): Promise<Buffer> =>
  new Promise(async resolve => {
    const base = await loadImage('./image/spongebob-burn.png');
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.font = '35px Noto';
    let fontSize = 35;
    while (ctx.measureText(burn).width > 400) {
      fontSize--;
      ctx.font = `${fontSize}px Noto`;
    }
    const lines: any = await wrapText(ctx, burn, 180);
    ctx.fillText(lines.join('\n'), 55, 103);
    return resolve(canvas.toBuffer());
  });

export const tobecontinue = (buffer: Buffer): Promise<Buffer | string> =>
  new Promise(async (resolve, reject) => {
    try {
      const base = await loadImage('./image/to-be-continued.png');
      const data = await loadImage(buffer);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext('2d');
      drawImageWithTint(ctx, data, '#704214', 0, 0, data.width, data.height);
      const ratio = base.width / base.height;
      const width = canvas.width / 2;
      const height = Math.round(width / ratio);
      ctx.drawImage(base, 0, canvas.height - height, width, height);
      return resolve(canvas.toBuffer());
    } catch (err) {
      return reject(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  });

export const fisheye = (
  buffer: Buffer,
  level: number
): Promise<Buffer | string> =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await loadImage(buffer);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(data, 0, 0);
      fishEye(ctx, level, 0, 0, data.width, data.height);
      return resolve(canvas.toBuffer());
    } catch (err) {
      return reject(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  });
export const memegen2 = (
  buffer: Buffer,
  text: string
): Promise<Buffer | string> =>
  new Promise(async (resolve, reject) => {
    try {
      const base = await loadImage(buffer);
      const canvas = createCanvas(base.width, base.height);
      const ctx = canvas.getContext('2d');
      ctx.font = '40px Noto';
      const lines: any = await wrapText(ctx, text, base.width - 10);
      const lineBreakLen = text.split('\n').length;
      const linesLen =
        40 * lines.length +
        40 * (lineBreakLen - 1) +
        14 * lines.length +
        14 * (lineBreakLen - 1) +
        14;
      canvas.height += linesLen;
      ctx.font = '40px Noto';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, base.width, linesLen);
      ctx.fillStyle = 'black';
      ctx.fillText(lines.join('\n'), 5, 5);
      ctx.drawImage(base, 0, linesLen);
      return resolve(canvas.toBuffer());
    } catch (err) {
      return reject(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  });
