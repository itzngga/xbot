import fs from 'fs-extra';
import ffmpeg from 'fluent-ffmpeg';
const {spawn} = require('child_process');
import {Readable} from 'stream';

function bufferToStream(buffer: Buffer) {
	const readable = new Readable();
	readable._read = () => {};
	readable.push(buffer);
	readable.push(null);
	return readable;
}

function modifExif(id: string, callback: (Buff: Buffer) => void) {
	spawn('webpmux', [
		'-set',
		'exif',
		'../src/data.exif',
		'../temp/' + id + '.webp',
		'-o',
		'../temp/' + id + '.webp',
	]).on('exit', () => {
		callback(fs.readFileSync('../temp/' + id + '.webp'));
		fs.unlink('../temp/' + id + '.webp').then(() => {});
	});
}

export default function (
	id: string,
	buffers: Buffer,
	qty: number
): Promise<Buffer> {
	return new Promise(resolve => {
		const stream = bufferToStream(buffers);
		const options = quality(qty);
		ffmpeg(stream)
			.inputFormat('mp4')
			.addOutputOptions(options)
			.save(`../temp/${id}.webp`)
			.on('end', () => {
				stream.destroy();
				modifExif(id, res => {
					return resolve(res);
				});
			});
	});
}

function quality(qts: number): string[] {
	switch (qts) {
		case 1: {
			//very high
			const arr = [
				'-vcodec',
				'libwebp',
				'-vf',
				'scale=512:512,setsar=1,fps=25',
				'-lossless',
				'1',
				'-preset',
				'default',
				'-an',
				'-vsync',
				'0',
			];
			return arr;
		}
		case 2: {
			//high
			const arr1 = [
				'-vcodec',
				'libwebp',
				'-vf',
				'scale=200:200,setsar=1,fps=15',
				'-lossless',
				'1',
				'-preset',
				'default',
				'-an',
				'-vsync',
				'0',
			];
			return arr1;
		}

		case 3: {
			//medium
			const arr2 = [
				'-vcodec',
				'libwebp',
				'-vf',
				'scale=150:150,setsar=1,fps=10',
				'-lossless',
				'1',
				'-preset',
				'default',
				'-an',
				'-vsync',
				'0',
			];
			return arr2;
		}
		case 4: {
			//low
			const arr3 = [
				'-vcodec',
				'libwebp',
				'-vf',
				'scale=150:150,setsar=1,fps=7',
				'-lossless',
				'1',
				'-preset',
				'default',
				'-an',
				'-vsync',
				'0',
			];
			return arr3;
		}
		case 5: {
			//very low
			const arr4 = [
				'-vcodec',
				'libwebp',
				'-vf',
				'scale=100:100,setsar=1,fps=5',
				'-lossless',
				'1',
				'-preset',
				'default',
				'-an',
				'-vsync',
				'0',
			];
			return arr4;
		}

		default: {
			const arr5 = [
				'-vcodec',
				'libwebp',
				'-vf',
				'scale=150:150,setsar=1,fps=10',
				'-lossless',
				'1',
				'-preset',
				'default',
				'-an',
				'-vsync',
				'0',
			];
			return arr5;
		}
	}
}
