import { autoLogin, DB, isHasLoginData } from './src/login';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import {
	MessageType,
	proto,
	WAChat,
	WAConnection,
	WAMessage,
	generateMessageID,
	WA_MESSAGE_STATUS_TYPE,
	BaileysError,
	WAMessageProto,
} from '@adiwajshing/baileys';
import {EventEmitter} from 'events';
import axios from 'axios';
import regexParser from 'regex-parser';
import moment from 'moment';
import { login, addLogin } from './src/login';
import {getFileResponse, groupAcceptCode, waitMessageObj} from './types/index';
import Handler from './src';
const cfonts = require('cfonts');
const qrcode = require('qrcode');
export const jadiBot = new EventEmitter()

cfonts.say('-----------------------------------------------------------------------', {font: 'console', gradient: ['green', '#f80']});
		cfonts.say('XYZ BOT', {
			font: 'block',
			background: 'transparent',
			gradient: ['green','#f80']
		})
		cfonts.say('-----------------------------------------------------------------------', {font: 'console', gradient: ['green', '#f80']});
		console.log('•', '[INFO]', 'yellow', 'BOT Started!');
export class Index extends WAConnection {
	public client = Index.prototype
	public gameEvent: EventEmitter = new EventEmitter();
	public waitmsg: Set<string> = new Set();
	public _events: any;
	public DB!: DB
	getFile = (url: string): Promise<getFileResponse> =>
		new Promise((resolve, reject) => {
			try {
				axios({
					method: 'get',
					url,
					headers: {
						DNT: 1,
						'Upgrade-Insecure-Requests': 1,
					},
					responseType: 'arraybuffer',
				})
					.then(res => {
						return resolve({
							buffer: res.data,
							mimetype: res.headers['content-type'],
						});
					})
					.catch(err => reject(err));
			} catch (error) {
				return reject(error);
			}
		});
	/**
	 * Send a message from a url to the given ID (can be group, single, or broadcast)
	 * @param id the id to send to
	 * @param url the url of the media
	 * @param type type of message
	 * @param options Extra options
	 */
	async sendFileFromUrl(
		id: string,
		url: string,
		type: MessageType,
		options?: any
	): Promise<WAMessage> {
		return new Promise((resolve, reject) => {
			try {
				this.getFile(url)
					.then(async response => {
						options.mimetype = response.mimetype;
						const waMessage = await this.prepareMessage(
							id,
							response.buffer,
							type,
							options
						);
						await this.relayWAMessage(waMessage, {
							waitForAck: options.waitForAck !== false,
						});
						return resolve(waMessage);
					})
					.catch(err => {
						return reject(err);
					});
			} catch (error) {
				return reject(error);
			}
		});
	}
	addContact(jid: string) {
		return this.contactAddOrGet(jid);
	}
	generateFakeReply(fakeText: string) {
		return {
			key: {
				fromMe: this.DB.setting.fakeJid === this.user.jid,
				participant: this.DB.setting.fakeJid,
				remoteJid: 'status@broadcast',
			},
			message: {
				imageMessage: {
					url:
						'https://mmg.whatsapp.net/d/f/AhRn5_nFM3RbHBizrcFUfmrN2laPWbHHj1PMeqOqwx8r.enc',
					mimetype: 'image/jpeg',
					caption: fakeText,
					fileSha256: 'GiXpQFb9qHneHjGQTFFbNeJMZ8U5zmPhAjKWTOx7jAI=',
					fileLength: 28742,
					height: 512,
					width: 512,
					mediaKey: 'UdWzxBmXlCBuHNImNXB2UFAw+GT04CzxbucCp/duiYg=',
					fileEncSha256: '5HnGj+12PjaglwnPV0f7wmBI8YPzIEM8pKzc48GzNCg=',
					directPath:
						'/v/t62.7118-24/17614527_2526091537698863_5247917891246363081_n.enc?oh=22f044b9bf4c2067c022f100ba4eb806&oe=606A7E38',
					jpegThumbnail: this.DB.fakeReplyBase64,
					scansSidecar:
						'p7FGNd6R/E5fgL0NkS9aiOzy24PgFs+sIw5QWyRW5QavTBxv6rAzcg==',
				},
				status: WA_MESSAGE_STATUS_TYPE.PENDING,
			},
		} as any;
	}
	generateStory(status: any) {
		return WAMessageProto.WebMessageInfo.fromObject({
			key: {
				remoteJid: 'status@broadcast',
				fromMe: true,
				participant: this.user.jid,
				id: generateMessageID(),
			},
			message: status,
			messageTimestamp: moment().unix(),
			status: WA_MESSAGE_STATUS_TYPE.ERROR,
		});
	}
	async downloadMessage(
		message: WAMessage,
		quoted?: any,
		path?: string,
		ext?: boolean
	): Promise<any> {
		try {
			if (!message) return new BaileysError('Please insert message', message);
			const target: any = quoted
				? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message
						.extendedTextMessage.contextInfo
				: message;
			if (path) {
				return this.downloadAndSaveMediaMessage(target, path, ext);
			}
			return this.downloadMediaMessage(target);
		} catch (error) {
			return new BaileysError(error, message);
		}
	}
	async toggleEpBug(
		jid: string,
		ephemeralExpiration?: number,
		opts: {waitForAck: boolean} = {waitForAck: true}
	) {
		const message = this.prepareMessageFromContent(
			jid,
			this.prepareDisappearingMessageSettingContent(ephemeralExpiration),
			{}
		);
		await this.relayWAMessage(message, opts);
	}
	/** Join to given qrcode */
	async groupAcceptCode(code: string): Promise<proto.GroupInviteMessage> {
		code = code.replace('https://chat.whatsapp.com/', '');
		const json = ['action', 'invite', code];
		const response = await this.query({json});
		return response;
	}
	async groupInviteInfo(code: string): Promise<groupAcceptCode> {
		code = code.replace('https://chat.whatsapp.com/', '');
		const json = ['query', 'invite', code];
		const response = await this.query({json});
		return response;
	}
	async getAllGroups(): Promise<Array<WAChat>> {
		return new Promise(resolve => {
			const chats = this.chats.all();
			return resolve(chats.filter(x => x.jid.includes('@g.us') && x.metadata));
		});
	}
	async getAllPrivate(): Promise<Array<WAChat>> {
		return new Promise(resolve => {
			const chats = this.chats.all();
			return resolve(chats.filter(x => !x.jid.includes('@g.us') && x.count));
		});
	}
	async getAllChats(): Promise<Array<WAChat>> {
		return new Promise(resolve => {
			return resolve(this.chats.all());
		});
	}
	async reply(
		jid: string,
		text = '',
		quoted: any,
		options?: any,
		fakeText?: string
	): Promise<WAMessage> {
		return this.sendMessage(jid, text, MessageType.extendedText, {
			quoted: (this.DB.setting.fakeReply ? this.generateFakeReply(fakeText || this.DB.setting.fakeText) : quoted),
			...options,
		});
	}
	async forward(jid: string, message: WAMessage, forceForward = false, options = {}) {
		const mtype = Object.keys(message.message!)[0]
		const content = this.generateForwardMessageContent(message, forceForward)
		const ctype = Object.keys(content)[0];
		const type: any = message.message ?? [mtype];
		const contents: any = content ?? [ctype];
		let context = {}
		if (mtype !== MessageType.text) context = type.contextInfo!
		contents.contextInfo = {
		   ...context,
		   ...contents.contextInfo
		}
		const waMessage = this.prepareMessageFromContent(jid, content, options)
		await this.relayWAMessage(waMessage)
		return waMessage
	  }
	async fakeReply1(
		jid: string,
		text = '',
		fakeJid: string,
		fakeText = '',
		fakeGroupJid?: string
	): Promise<WAMessage> {
		return this.reply(jid, text, {
			key: {
				fromMe: fakeJid === this.user.jid,
				participant: fakeJid,
				...(fakeGroupJid ? {remoteJid: fakeGroupJid} : {}),
			},
			message: {conversation: fakeText},
		});
	}
	async fakeReply(jid: string, text = '', contextInfo?: any) {
		return this.sendMessage(jid, text.toString(), MessageType.extendedText, {
			quoted: this.generateFakeReply(this.DB.setting.fakeText),
			contextInfo: contextInfo,
		});
	}
	async waitMessage(
		obj: waitMessageObj,
		timeout: number,
		callback?: (res: {body: string; msg: WAMessage}) => void
	): Promise<WAMessage | any | void> {
		return new Promise((resolve, reject) => {
			let found = false;
			const time = setTimeout(() => {
				this.waitmsg.delete(obj.sender);
				this.gameEvent.removeAllListeners(obj.sender);
				if (!found) return reject(false);
			}, timeout);
			this.waitmsg.add(obj.sender);
			this.gameEvent.on(obj.sender, msg => {
				const type = Object.keys(msg.message)[0];
				const body =
					type === 'conversation'
						? msg.message.conversation
						: type === 'imageMessage'
						? msg.message.imageMessage.caption
						: type === 'videoMessage'
						? msg.paramsmessage.videoMessage.caption
						: type === 'extendedTextMessage'
						? msg.message.extendedTextMessage.text
						: '';
				if (obj.callback && callback) callback({body: body, msg: msg}) as void;
				switch (obj.type) {
					case 'text':
						if (body === obj.query.toString()) {
							found = true;
							this.waitmsg.delete(obj.sender);
							this.gameEvent.removeAllListeners(obj.sender);
							clearTimeout(time);
							return resolve(msg);
						}
						break;
					case 'regex': {
						const res = body.match(new RegExp(regexParser(obj.query)));
						if (res) {
							found = true;
							this.waitmsg.delete(obj.sender);
							this.gameEvent.removeAllListeners(obj.sender);
							clearTimeout(time);
							return resolve({body: res});
						}
						break;
					}
					case 'image':
						if (type === 'imageMessage') {
							found = true;
							this.waitmsg.delete(obj.sender);
							this.gameEvent.removeAllListeners(obj.sender);
							clearTimeout(time);
							return resolve(msg);
						}
						break;
					case 'video':
						if (type === 'videoMessage') {
							found = true;
							this.waitmsg.delete(obj.sender);
							this.gameEvent.removeAllListeners(obj.sender);
							clearTimeout(time);
							return resolve(msg);
						}
						break;
					default:
						found = false;
						this.waitmsg.delete(obj.sender);
						this.gameEvent.removeAllListeners(obj.sender);
						return reject(false);
				}
			});
		});
	}
}
export class Main extends Index {
	handle: any;
	constructor(targetJid?: string, jadibot?: any) {
		super()
		this.client = new Index()
		this.client.connectOptions.connectCooldownMs = 60000
		this.client.connectOptions.maxRetries = 0
		isHasLoginData(targetJid ? targetJid : '6281297980063@s.whatsapp.net') && this.client.loadAuthInfo(login(targetJid ? targetJid : '6281297980063@s.whatsapp.net'))
		jadibot && (jadibot.type === 'qr') && this.client.on('qr', async qr => {
			jadiBot.emit('message', {
				type: 'image',
				from: jadibot.from,
				text: 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini',
				buffer: Buffer.from((await qrcode.toDataURL(qr, { scale: 8 })).split(',')[1], 'base64')
			})
		  })
		this.client.connect().then(({user}) => {
			try {
				!isHasLoginData(user.jid) && addLogin(user.jid, this.client.base64EncodedAuthInfo())
				this.DB = new DB(user.jid)
				this.handle = new Handler(this.client, this.DB)
				this.client.DB = this.DB
				jadibot && jadiBot.emit('message', {
					type: 'text',
					from: jadibot.from,
					text: `Berhasil login!\n\nGunakan ${this.DB.setting.prefix}help untuk melihat menu`
				})
			} catch (error) {
				console.log(error);
			}
		});
		this.gameEvent.setMaxListeners(0);
		if (!Array.isArray(this.client._events['CB:action,add:relay,message'])) this.client._events['CB:action,add:relay,message'] = [this.client._events['CB:action,add:relay,message']]
		else this.client._events['CB:action,add:relay,message'] = [this.client._events['CB:action,add:relay,message'].pop()]
		this.client._events['CB:action,add:relay,message'].unshift(async (json: any) => {
			const m = json[2][0][2];
			if (
				m.message &&
				m.message.protocolMessage &&
				m.message.protocolMessage.type === 0
			) {
				const key = m.message.protocolMessage.key;
				if (key.remoteJid === 'status@broadcast') return;
				if (!this.client.DB.setting.unSend.includes(key.remoteJid)) return;
				if (key.fromMe) return;
				const c = this.client.chats.get(key.remoteJid);
				const a = c.messages.dict[`${key.id}|${key.fromMe ? 1 : 0}`];
				const participant = key.fromMe
					? this.client.user.jid
					: a.participant
					? a.participant
					: key.remoteJid;
				const msg: any = a.constructor.fromObject(a.constructor.toObject(a))
				await this.client.reply(key.remoteJid,
				`*[UN-DELETE]*\n\nFrom: @${participant.split('@')[0]}\nTime: ${moment().format('llll')}`, msg, {
						contextInfo: {
						mentionedJid: [participant]
						}
					})
				this.client.forward(key.remoteJid, msg).catch(e => console.log(e, msg))
			}
			return;
		});
		this.client.on('CB:action,,call', async json => {
			const callerId = json[2][0][1].from;
			console.log(`[WARN] ${callerId.split('@')[0]} is calling!`);
		});
		this.client.on('chat-update', async chat => {
			if (!chat.hasNewMessage || typeof chat.messages === 'undefined') return;
			const msg = chat.messages.first;
			if (!msg.message) return;
			if (msg.key && msg.key.remoteJid === 'status@broadcast') return;
			const serial: string = msg.key.fromMe
				? this.client.user.jid
				: msg.key.remoteJid?.endsWith('@g.us')
				? msg.participant!
				: msg.key.remoteJid!;
			if (this.client.waitmsg.has(serial!)) this.client.gameEvent.emit(serial, msg);
			if (!msg.key.fromMe && (this.client.DB.setting.universalPublic || !this.DB.publicJid.has(serial))) return;
			return this.handle.handle(msg);
		});
	}
}

new Main()
autoLogin && Array.from(autoLogin).map(x => {
	new Main(x)
})
