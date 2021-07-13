import fs from 'fs-extra';
import ffmpeg from 'fluent-ffmpeg';
const gm = require('gm');
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
				gm('../gif/frames/*.png')
					.command('convert')
					.delay(20)
					.write('../gif/attp.gif', () => {
						ffmpeg('../gif/attp.gif')
							.videoCodec('libwebp')
							.addOutputOptions('-lossless', '1', '-loop', '0')
							.save('../gif/attp.webp')
							.on('end', () => {
								const mediaData = fs.readFileSync('../gif/attp.webp');
								fs.unlink('../gif/attp.gif', () => {
									fs.unlink('../gif/attp.webp', () => {});
									fs.emptyDir('../gif/frames', () => {});
								});
								return resolve(mediaData);
							});
					});
			});
		} catch (error) {
			return reject(error);
		}
	});

export const harta = async (text: string): Promise<Buffer> =>
	// eslint-disable-next-line no-async-promise-executor
	new Promise(async (resolve, reject) => {
		try {
			await Promise.all([
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
					'20',
					'../gif/frame/*.jpg',
					'-scale',
					'150:150',
					'../gif/harta.gif',
				]);
				anjay.on('error', console.log);
				anjay.on('close', () => {
					spawn('ffmpeg', [
						'-i',
						'../gif/harta.gif',
						'-vcodec',
						'libwebp',
						'-lossless',
						'1',
						'-loop',
						'0',
						'../gif/harta.webp',
					])
						.on('error', console.log)
						.on('exit', () => {
							const mediaData = fs.readFileSync('../gif/harta.webp');
							fs.unlink('../gif/harta.gif', () => {
								fs.unlink('../gif/harta.webp', () => {});
								fs.emptyDir('../gif/frame', () => {});
							});
							return resolve(mediaData);
						});
				});
			});
		} catch (error) {
			return reject(error);
		}
	});

const createHarta = (text: string, number: number): Promise<void> =>
	new Promise(resolve => {
		function render(name: string, text: string, number: number): void {
			return gm()
				.rawSize(512, 512)
				.out('xc:black')
				.pointSize(90)
				.font('../fonts/harta.ttf')
				.tile('../image/' + name + '.jpg')
				.drawText(0, 0, 'HARTA\nTAHTA\n' + text, 'center')
				.wave(4.5, 64)
				.write('../gif/frame/' + number + '.jpg', () => Promise.resolve());
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
		'../gif/frames/frame' + i + '.png',
		text2png(wordWrap(text, 8), {
			font: '145px Boogaloo',
			localFontPath: '../fonts/Boogaloo.ttf',
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
