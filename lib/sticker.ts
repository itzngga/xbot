import fs from 'fs-extra';
import sharp from 'sharp';
import moment from 'moment';
import pretty_bytes from 'pretty-bytes';
import {settingType, stickerType} from '../types';
import { DB } from 'src/login';
const {spawn} = require('child_process');
const debugWM = '*「 STICKER 」*\n\n';

export default class Sticker {
	private setting: settingType;
	private sticker: stickerType;
	constructor(private DB: DB) {
		this.setting = this.DB.setting
		this.sticker = this.DB.sticker
	}
	save = () => this.DB.sticker = this.sticker
	isExist = (name: string) => {
		if (Object.prototype.hasOwnProperty.call(this.sticker, name)) {
			return true;
		}
		return false;
	};
	getSticker = (name: string) => {
		if (!this.isExist(name))
			return debugWM + 'sticker dengan nama *' + name + '* tidak ada!';
		return fs.readFileSync(this.sticker[name]!.path);
	};
	saveSticker = (name: string, buffer: Buffer, serial: string) =>
	new Promise((resolve, reject) => {
		if (this.isExist(name))
			return reject(debugWM + 'sticker dengan nama *' + name + '* masih ada!');
		fs.writeFileSync('../sticker/' + name + '.webp', buffer);
		spawn('webpmux', [
			'-set',
			'exif',
			'./src/data.exif',
			'../sticker/' + name + '.webp',
			'-o',
			'../sticker/' + name + '.webp',
		]).on('exit', () => {
			this.sticker[name] = {
				date_added: moment(),
				last_update: moment(),
				maker: serial,
				path: '../sticker/' + name + '.webp',
			};
			this.save();
			return resolve(
				debugWM +
					`simpan sticker sukses!\ninformasi sticker: *${this.setting.prefix}sinfo ${name}*`
			);
		});
	});
	updateSticker = (name: string, buffer: Buffer) =>
	new Promise((resolve, reject) => {
		if (!this.isExist(name))
			return reject(debugWM + 'sticker dengan nama *' + name + '* tidak ada!');
		fs.writeFileSync('../sticker/' + name + '.webp', buffer);
		spawn('webpmux', [
			'-set',
			'exif',
			'./src/data.exif',
			'../sticker/' + name + '.webp',
			'-o',
			'../sticker/' + name + '.webp',
		]).on('exit', () => {
			this.sticker[name]!.last_update = moment();
			this.save();
			return resolve(
				debugWM +
					`update sticker sukses!\ninformasi sticker: *${this.setting.prefix}sinfo ${name}*`
			);
		});
	});
	deleteSticker = (name: string) => {
		if (!this.isExist(name))
			return debugWM + 'sticker dengan nama *' + name + '* tidak ada!';
		delete this.sticker[name];
		fs.unlinkSync('../sticker/' + name + '.webp');
		this.save();
		return debugWM + 'hapus sticker *' + name + '* sukses!';
	};
	infoSticker = (name: string) =>
	new Promise((resolve, reject) => {
		if (!this.isExist(name))
			return reject(debugWM + 'sticker dengan nama *' + name + '* tidak ada!');
		const buffer = fs.readFileSync(this.sticker[name]!.path);
		sharp(buffer)
			.png()
			.toBuffer()
			.then((res) => {
				const hasil = `*「 STICKER INFO 」*\n\n• _nama : ${name}_\n• _size : ${pretty_bytes(
					Buffer.byteLength(res)
				)}_\n• _pembuat : ${
					'@' + this.sticker[name]!.maker.replace('@s.whatsapp.net', '')
				}_\n• _dibuat : ${moment(this.sticker[name]!.date_added).format(
					'lll'
				)}_\n• update : _${moment(this.sticker[name]!.last_update).format('lll')}_`;
				return resolve({
					hasil: hasil,
					mentioned: this.sticker[name]!.maker,
					buffer: res,
				});
			});
	});
	listSticker = () => {
		let hasil = '*「 STICKER 」*\n\n';
		const stkr = Object.entries(this.sticker);
		let count = 1;
		hasil += 'total: *' + stkr.length + '*\n';
		for (const [key, val] of stkr) {
			hasil += `${count}. *${key}*\n`;
			count++;
		}
		return hasil;
	};
}
