import fs from 'fs-extra';
import {JsonDB} from 'node-json-db';
import {AnyAuthenticationCredentials} from '@adiwajshing/baileys';
import {
	settingType,
	stickerType,
	countType,
	autoReply,
	cloud,
	configType,
	travellerType,
	textproType,
} from '../types/index';
const loginData = new JsonDB('../json/loginData.json', true, false);

export const isHasLoginData = (jid: string): boolean =>
	loginData.exists('/' + jid);
export const login = (jid: string): AnyAuthenticationCredentials =>
	loginData.getObject<AnyAuthenticationCredentials>('/' + jid);
export const addLogin = (jid: string, auth: AnyAuthenticationCredentials) =>
	loginData.push('/' + jid, auth);
export const removeLogin = (jid: string): void => loginData.delete(jid);
export const autoLogin = new Set(loginData.getObject<string[]>('/autoLogin'));
export const hasAutoLogin = (jid: string) => autoLogin.has(jid);
export const addAutoLogin = (jid: string) => {
	autoLogin.add(jid);
	loginData.push('/autoLogin', Array.from(autoLogin));
};
export const removeAutoLogin = (jid: string) => {
	autoLogin.delete(jid);
	loginData.push('/autoLogin', Array.from(autoLogin));
};
const isExist = (
	db: JsonDB,
	path: string,
	fpath: string,
	file?: boolean,
	foption?: any
) => {
	if (file) {
		if (db.exists(path)) return true;
		const file = fs.readFileSync(fpath, foption);
		return db.push(path, file, true);
	} else {
		if (db.exists(path)) return true;
		const json = fs.readJSONSync(fpath, foption);
		return db.push(path, json, true);
	}
};
const isExist2 = (db: JsonDB, path: string, json: any) => {
	if (db.exists(path)) return true;
	return db.push(path, json, true);
};
isExist2(loginData, '/autoLogin', {autoLogin: []});
export class DB {
	protected _db: JsonDB;
	protected _genshin: JsonDB;
	protected _setting: settingType;
	protected _errCmd: string[];
	protected _sticker: stickerType;
	protected _config: configType;
	protected _autoReply: autoReply;
	protected _cloud: cloud;
	protected _count: countType;
	protected _publicJid: Set<string>;
	protected _fakeReplyBase64: string;
	protected _traveller: travellerType;
	protected _textpro: textproType;
	protected _surah: string;
	protected _arryOfWords: string[];

	constructor(jid: string) {
		this._db = new JsonDB('../users/' + jid + '/db.json', true, true);
		this._genshin = new JsonDB('../users/' + jid + '/genshin.json', true, true);
		const genshin = fs.readJSONSync('../json/raw/genshin.json');
		isExist(this._db, '/setting', '../json/raw/setting.json');
		isExist(this._db, '/sticker', '../json/raw/sticker.json');
		isExist(this._db, '/config', '../json/raw/config.json');
		isExist(this._db, '/count', '../json/raw/count.json');
		isExist(this._db, '/reply', '../json/raw/reply.json');
		isExist(this._db, '/publicJid', '../json/raw/public.json');
		isExist(this._db, '/cloud', '../json/raw/cloud.json');
		isExist(this._db, '/fakeReplyBase64', '../image/fakeimage.jpeg', true, {
			encoding: 'base64',
		});
		isExist2(this._genshin, '/traveller', {});
		isExist2(this._genshin, '/standart', genshin.standart);
		isExist2(this._genshin, '/character', genshin.character);
		isExist2(this._genshin, '/weapon', genshin.weapon);
		this._setting = this._db.getObject<settingType>('/setting');
		this._sticker = this._db.getObject<stickerType>('/sticker');
		this._config = this._db.getObject<configType>('/config');
		this._autoReply = this._db.getObject<autoReply>('/reply');
		this._cloud = this._db.getObject<cloud>('/cloud');
		this._count = this._db.getObject<countType>('/count');
		this._publicJid = new Set(this._db.getObject<string[]>('/publicJid'));
		this._fakeReplyBase64 = this._db.getObject<string>('/fakeReplyBase64');
		this._traveller = this._genshin.getObject<travellerType>('/traveller');
		this._errCmd = fs.readJSONSync('../json/error.json');
		this._textpro = fs.readJSONSync('../json/textpro.json');
		this._arryOfWords = fs.readJSONSync('../json/filters.json');
		this._surah = fs.readFileSync('../json/surah.txt', {encoding: 'utf-8'});
		!fs.existsSync('../dist/nsfw_model') &&
			fs.copySync('../nsfw_model', '../dist/nsfw_model');
	}
	public get db() {
		return this._db;
	}
	public set db(db: JsonDB) {
		this._db = db;
	}
	public get genshin() {
		return this._genshin;
	}
	public set genshin(genshin: JsonDB) {
		this._genshin = genshin;
	}
	public get setting() {
		return this._setting;
	}
	public set setting(setting: settingType) {
		this._setting = setting;
		this._db.push('/setting', setting);
	}
	public get errCmd() {
		return this._errCmd;
	}
	public get surah() {
		return this._surah;
	}
	public get arryOfWords() {
		return this._arryOfWords;
	}
	public set arryOfWords(arryOfWords: string[]) {
		this._arryOfWords = arryOfWords;
		fs.writeJSONSync('../json/filters.json', arryOfWords);
	}
	public get textpro() {
		return this._textpro;
	}
	public get sticker() {
		return this._sticker;
	}
	public set sticker(sticker: stickerType) {
		this._sticker = sticker;
		this._db.push('/sticker', sticker);
	}
	public get config() {
		return this._config;
	}
	public set config(config: configType) {
		this._config = config;
		this._db.push('/config', config);
	}
	public get autoReply() {
		return this._autoReply;
	}
	public set autoReply(autoReply: autoReply) {
		this._autoReply = autoReply;
		this._db.push('/autoReply', autoReply);
	}
	public get cloud() {
		return this._cloud;
	}
	public set cloud(cloud: cloud) {
		this._cloud = cloud;
		this._db.push('/cloud', cloud);
	}
	public get count() {
		return this._count;
	}
	public set count(count: countType) {
		this._count = count;
		this._db.push('/count', count);
	}
	public get traveller() {
		return this._traveller;
	}
	public set traveller(traveller: travellerType) {
		this._traveller = traveller;
		this._genshin.push('/traveller', traveller);
	}
	public get fakeReplyBase64() {
		return this._fakeReplyBase64;
	}
	public set fakeReplyBase64(fakeReplyBase64: string) {
		this._fakeReplyBase64 = fakeReplyBase64;
		this._db.push('/fakeReplyBase64', fakeReplyBase64);
	}
	public get publicJid() {
		return this._publicJid;
	}
	public set publicJid(publicJid: Set<string>) {
		this._publicJid = publicJid;
		this._db.push('/publicJid', Array.from(publicJid));
	}
}
