import {Readable} from 'stream';
const ffmpeg: any = require('fluent-ffmpeg');

function bufferToStream(buffer: Buffer) {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export default (buffer: Buffer, id: string): Promise<boolean> =>
  new Promise(resolve => {
    const stream = bufferToStream(buffer);
    ffmpeg(stream)
      .inputFormat('mp4')
      .audioCodec('aac')
      .addOutputOptions('-map', '0:a')
      .save(`./temp/${id}.m4a`)
      .on('end', () => {
        stream.destroy();
        return resolve(true);
      });
  });
