/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import {Moment} from 'moment';
import {
	WAGroupMetadata,
	WAGroupParticipant,
	WAMessage,
} from '@adiwajshing/baileys';

export const updateObj = (name: string) => {
	eval(name);
};
export interface getFileResponse {
	buffer: Buffer;
	mimetype: MimeType;
}

export type groupAcceptCode = {
	code: number;
	gid: string;
};

export type settingType = {
	sAdmin: string;
	costumerId: string;
	restartState: boolean;
	restartId: string;
	prefix: string;
	unSend: string[];
	autoRead: boolean;
	autoReply: boolean;
	pm2Id: string;
	fakeReply: boolean;
	fakeText: string;
	fakeJid: string;
	antiVirtex: boolean;
	universalPublic: boolean;
	absen: string;
	voiceCmd: boolean;
};

export type waitMessageObj = {
	sender: string;
	query: string;
	type: string;
	callback?: boolean;
};

export type cloud = {
	[key: string]: {
		path: string;
		format: string;
		timestamp: string;
	};
};
export type countType = {
	[key: string]: {
		count: number;
		type: string;
	};
};
export interface configType {
	apikeys: {
		vthear: string;
		cekresi?: string[];
		keepsaveit?: string[];
		bitly: string;
		genius: string;
		tech: string;
		xyz: string;
	};
	'rest-ip': {
		xyz: string;
		vhtear: string;
		tech: string;
	}
	vcard: {
		cs: {
			displayName: string;
			vcard: string;
		};
		owner: {
			displayName: string;
			vcard: string;
		};
	};
	secret: string;
	ytCookie: string;
	scdl: string;
	ytIdentity: string;
	igCookie: string;
}

export type autoReply = {
	[key: string]: {
		answer: string;
	};
}

export type group = {
	gid: string;
	command: string[];
	settings: Object;
};

export type stickerType = {
	[key: string]: {
		date_added: Moment;
		last_update: Moment;
		maker: string;
		path: string;
	};
};

export type textproType = {
	[key: string]: {
		type: number;
		link: string;
	};
};

export interface igstalk {
	username: string;
	fullname: string;
	biography: string;
	private: boolean;
	imageurl: string;
	followers: number;
	followed: number;
	post: number;
	highlight: number;
}
interface Group extends WAGroupMetadata {
	descTime: number;
}

export interface handlerType {
	message: WAMessage;
	fromMe: boolean;
	chatId: string;
	msgId: string;
	from: string;
	botNumber: string;
	isGroupMsg: boolean;
	serial: string;
	isSadmin: boolean;
	type: string;
	isQuoted: boolean;
	body: string;
	t: number;
	time: string;
	cmd: string;
	args: any[];
	replyMode: WAMessage;
	groupMetadata: Group;
	groupName: string;
	groupId: string;
	groupDesc: string | undefined;
	groupMembers: WAGroupParticipant[];
	groupAdmins: string[];
	isBotGroupAdmins: boolean;
	isGroupAdmins: boolean;
	isGroupAdminOnly: string | undefined;
	isMedia: boolean;
	isImage: boolean;
	isVideo: boolean;
	isAudio: boolean;
	isSticker: boolean;
	isDocument: boolean;
	isQuotedText: boolean;
	isQuotedImage: boolean;
	isQuotedVideo: boolean;
	isQuotedAudio: boolean;
	isQuotedSticker: boolean;
	isQuotedDocument: boolean;
	content: () => string | boolean;
	quotedMsgObj: () => any;
	getQuotedText: () => any;
	getQuotedImage: () => any;
	getQuotedVideo: () => any;
	getQuotedAudio: () => any;
	getQoutedSticker: () => any;
	getQuotedDocument: () => any;
	fileSize: (quoted: boolean) => number;
	pushname: (target?: string) => string;
	mentionedJidList: () => string[];
}

export type travellerType = {
	[user: string]: {
		primogems: number;
		interwined: number;
		acquaint: number;
		standard5pity: number;
		standard4pity: number;
		char5pity: number;
		char4pity: number;
		weap5pity: number;
		weap4pity: number;
		chars: string[];
		weapons: string[];
	};
};

export type standart = {
	fiveStarChar: string[];
	fiveStarWeap: string[];
	fourStarChar: string[];
	fourStarWeap: string[];
	threeStarWeap: string[];
};

export type character = {
	rate5up: string[];
	rate4up: string[];
	fiveStarChar: string[];
	fourStarChar: string[];
	fourStarWeap: string[];
	threeStarWeap: string[];
};

export type weapon = {
	rate5up: string[];
	rate4up: string[];
	fiveStarWeap: string[];
	fourStarChar: string[];
	fourStarWeap: string[];
	threeStarWeap: string[];
};

export interface xjadiBot {
	code: number;
	target: string;
	type: 'message' | 'broadcast' | 'update' | 'delete' | 'qr' | 'get-scan';
	method?: 'send' | 'received' | 'get';
	tjid?: string;
	text?: string;
	qr?: any;
}

export type loginData = {
	clientID: string;
	serverToken: string;
	clientToken: string;
	encKey: string;
	macKey: string;
}
declare global {
	interface String {
		splice(index: number, howmanys: number): string[];
		insert(index: number, string: string): string;
		repeat(times: number, separator?: string): string;
		rupiah(): string;
	}
}
