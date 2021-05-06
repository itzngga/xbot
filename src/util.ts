import {Readable} from 'stream';

export function uInt8(str: string): Uint8Array {
	return new Uint8Array(Buffer.from(str));
}

/**
 * Convert Buffer to Readable Stream
 * @param {Buffer} buffer
 * @returns {ReadableStream}
 */
export function buffer2Stream(buffer: Buffer): Readable {
	return new Readable({
		read() {
			this.push(buffer);
			this.push(null);
		},
	});
}

export function gmToBuffer(data: any) {
	return new Promise((resolve, reject) => {
		data.stream((err: any, stdout: any, stderr: any) => {
			if (err) {
				return reject(err);
			}
			const chunks: any = [];
			stdout.on('data', (chunk: any) => {
				chunks.push(chunk);
			});
			stdout.once('end', () => {
				resolve(Buffer.concat(chunks));
			});
			stderr.once('data', (data: string) => {
				reject(String(data));
			});
		});
	});
}
