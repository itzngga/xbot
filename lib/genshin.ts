/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs-extra';
import { JsonDB } from 'node-json-db';
import { DB } from 'src/login';
import {character, standart, travellerType, weapon} from '../types/index';
const stripIndents: any = require('common-tags').stripIndents;
const random = (end: number) => Math.floor(Math.random() * end);
const uniform = (min: number, max: number) => Math.random() * (max - min) + min;
const _l = require('lodash/collection');

const order = (arry: string[]) =>
	_l.orderBy(
		arry,
		(i: any) => {
			return i.toString().match(/★/gi).length;
		},
		'desc'
	);
export default class Genshin {
	private traveller: travellerType
	private genshin!: JsonDB
	constructor(private DB: DB) {
		this.genshin = this.DB.genshin
		this.traveller = this.genshin.getObject<travellerType>('/traveller')
	}
	standart = (): standart => this.genshin.getObject('/standart');
	weapon = (): weapon => this.genshin.getObject('/weapon');
	character = (): character => this.genshin.getObject('/character');
	save = () => this.genshin.push('/traveller', this.traveller);
	getUser = (jid: string) => this.traveller[jid];
	isExist = (jid: string): boolean => Object.prototype.hasOwnProperty.call(this.traveller, jid);
	primoDaily() {
		const trv: any = Object.entries(this.traveller);
		for (const i in trv) {
			trv[i].primogems += 1600;
		}
		console.log('[GENSHIN] Daily primogems stored!');
	}
	addTraveler(jid: string) {
		if (!this.isExist(jid)) {
			this.traveller[jid] = {
				primogems: 1600,
				interwined: 10,
				acquaint: 10,
				standard5pity: 0,
				standard4pity: 0,
				char5pity: 0,
				char4pity: 0,
				weap5pity: 0,
				weap4pity: 0,
				chars: [],
				weapons: [],
			};
			this.save();
			return this.balance(jid);
		} else {
			return 'User sudah pernah terdaftar!';
		}
	}
	balance(jid: string) {
		if (this.isExist(jid)) {
			const trv = this.getUser(jid);
			return stripIndents`*「 Genshin Game 」*
			🌟 _primogems : *${trv.primogems}*_
			🟣 _acquaint : *${trv.acquaint}*_
			🔵 _interwined : *${trv.interwined}*_`;
		} else {
			return 'Maaf, anda belum terdaftar dalam genshin game!';
		}
	}
	profile(jid: string) {
		if (this.isExist(jid)) {
			const trv = this.getUser(jid);
			const procces = (arry: string[]) => {
				if (!arry.length) return '_Kosong_';
				arry = order(arry);
				let final = '',
					count = 0;
				for (const i of arry) {
					if (count < 35) final += '• ' + i + '\n';
					if (count === 35) final += `_*and ${arry.length - 35} more ...*_`;
					count++;
				}
				return final;
			};
			return stripIndents`*「 Genshin Game 」*
			🌟 _primogems : *${trv.primogems}*_
			🟣 _acquaint : *${trv.acquaint}*_
			🔵 _interwined : *${trv.interwined}*_
			
			*Karakter [${trv.chars.length}]*
			${procces(trv.chars)}
			*Senjata [${trv.weapons.length}]*
			${procces(trv.weapons)}
			
			_*「 XyZ BOT Automation 」*_`;
		} else {
			return 'Maaf, anda belum terdaftar dalam genshin game!';
		}
	}
	buy(jid: string, type: boolean): string | undefined {
		if (this.isExist(jid)) {
			const trv = this.getUser(jid);
			if (trv.primogems < 160) return 'Maaf, primogems anda tidak cukup';
			if (type) {
				this.traveller[jid].primogems = trv.primogems - 160;
				this.traveller[jid].acquaint = trv.acquaint + 1;
				this.save();this
				this.traveller[jid].primogems = trv.primogems - 160;
				this.traveller[jid].interwined = trv.interwined + 1;
				this.save();
				return 'Sukses tukar 1 interwined fate dengan 160 primogems!';
			}
		} else {
			return 'Maaf, anda belum terdaftar dalam genshin game!';
		}
	}
	buy10(jid: string, type: boolean) {
		if (this.isExist(jid)) {
			const trv = this.getUser(jid);
			if (trv.primogems < 1600) return 'Maaf, primogems anda tidak cukup';
			if (type) {
				this.traveller[jid].primogems = trv.primogems - 1600;
				this.traveller[jid].acquaint = trv.acquaint + 10;
				this.save();
				return 'Sukses tukar 10 acquaint fate dengan 1600 primogems!';
			} else {
				this.traveller[jid].primogems = trv.primogems - 1600;
				this.traveller[jid].interwined = trv.interwined + 10;
				this.save();
				return 'Sukses tukar 10 interwined fate dengan 1600 primogems!';
			}
		} else {
			return 'Maaf, anda belum terdaftar dalam genshin game!';
		}
	}
	wishStandart(jid: string, times: number): any {
		if (this.isExist(jid)) {
			const trv = this.getUser(jid);
			if (trv.interwined > times || trv.primogems > 160 * times) {
				const charArry = [],
					weapArry = [];
				for (let i = 0; i < times; i++) {
					let draw = uniform(0, 100),
						rarity,
						itemType,
						drop,
						char,
						weapOrChar,
						weap;
					if (trv.standard5pity === 69) draw = 0.1;
					else if (trv.standard4pity === 9) draw = 1.0;
					if (0 <= draw && draw <= 0.6) {
						rarity = '★★★★★';
						weapOrChar = random(1);
						if (weapOrChar) {
							itemType = 'Character';
							char = random(this.standart().fiveStarChar.length);
							drop = this.standart().fiveStarChar[char];
						} else {
							itemType = 'Weapon';
							weap = random(this.standart().fiveStarWeap.length);
							drop = this.standart().fiveStarWeap[weap];
						}
						this.traveller[jid].standard5pity = 0;
					} else if (0.7 <= draw && draw <= 5.8) {
						rarity = '★★★★';
						weapOrChar = random(1);
						this.traveller[jid].standard5pity += 1;
						if (weapOrChar === 0) {
							itemType = 'Weapon';
							weap = random(this.standart().fourStarWeap.length);
							drop = this.standart().fourStarWeap[weap];
						} else {
							itemType = 'Character';
							char = random(this.standart().fourStarChar.length);
							drop = this.standart().fourStarChar[char];
						}
						this.traveller[jid].standard4pity = 0;
					} else {
						this.traveller[jid].standard5pity += 1;
						this.traveller[jid].standard4pity += 1;
						rarity = '★★★';
						itemType = 'Weapon';
						weap = random(this.standart().threeStarWeap.length);
						drop = this.standart().threeStarWeap[weap];
					}
					if (itemType === 'Character') {
						charArry.push(drop + ' (' + rarity + ')');
					} else {
						weapArry.push(drop + ' (' + rarity + ')');
					}
				}
				if (this.traveller[jid].interwined && this.traveller[jid].interwined <= times) {
					this.traveller[jid].interwined -= times;
				} else if (this.traveller[jid].primogems > 160 * times) {
					this.traveller[jid].primogems -= 160 * times;
				}
				if (charArry.length === 1) {
					if (charArry.length) this.traveller[jid].chars.push(...charArry);
					this.save();
					return {
						img: true,
						buffer: fs.readFileSync(
							'../image/Characters/' +
								charArry[0].split(' (')[0].toLocaleLowerCase() +
								'.png'
						),
						text: '*「 WISH 」*\n' + order(charArry).join('\n'),
					};
				} else if (weapArry.length === 1) {
					if (weapArry.length) this.traveller[jid].chars.push(...weapArry);
					this.save();
					return {
						img: true,
						buffer: fs.readFileSync(
							'../image/Weapons/' +
								weapArry[0].split(' (')[0].toLocaleLowerCase() +
								'.png'
						),
						text: '*「 WISH 」*\n' + order(weapArry).join('\n'),
					};
				} else {
					let hasil = '*「 WISH 」*\n';
					for (const i of order(charArry)) {
						hasil += '• ' + i + '\n';
					}
					for (const i of order(weapArry)) {
						hasil += '• ' + i + '\n';
					}
					if (charArry.length) this.traveller[jid].chars.push(...charArry);
					if (weapArry.length) this.traveller[jid].weapons.push(...weapArry);
					this.save();
					return {
						img: false,
						text: hasil,
					};
				}
			} else {
				return {
					img: false,
					text: 'Maaf, primogem atau interwined fate anda tidak cukup',
				};
			}
		} else {
			return {
				img: false,
				text: 'Maaf, anda belum terdaftar dalam genshin game!',
			};
		}
	}
	wishLimited(jid: string, times: number): any {
		if (this.isExist(jid)) {
			const trv = this.getUser(jid);
			if (trv.acquaint > times || trv.primogems > 160 * times) {
				const charArry = [],
					weapArry = [];
				for (let i = 0; i < times; i++) {
					let draw = uniform(0, 100),
						featured,
						rarity,
						itemType,
						drop,
						char,
						weapOrChar,
						weap;
					if (trv.char5pity === 69) draw = 0.1;
					else if (trv.char4pity === 9) draw = 1.0;
					if (0 <= draw && draw <= 0.6) {
						rarity = '★★★★★';
						featured = random(1);
						itemType = 'Character';
						if (featured === 1) {
							drop = this.character().rate5up;
						} else {
							char = random(this.character().fiveStarChar.length);
							drop = this.character().fiveStarChar[char];
						}
						this.traveller[jid].char5pity = 0;
						this.traveller[jid].char4pity += 1;
					} else if (0.7 <= draw && draw <= 5.8) {
						rarity = '★★★★';
						weapOrChar = random(1);
						if (weapOrChar === 0) {
							itemType = 'Weapon';
							weap = random(this.character().fourStarWeap.length);
							drop = this.character().fourStarWeap[weap];
						} else {
							itemType = 'Character';
							featured = random(1);
							if (featured === 1) {
								char = random(this.character().fourStarChar.length);
								drop = this.character().fourStarChar[char];
							} else {
								char = random(this.character().rate4up.length);
								drop = this.character().rate4up[char];
							}
						}
						this.traveller[jid].char4pity = 0;
						this.traveller[jid].char5pity += 1;
					} else {
						this.traveller[jid].char4pity += 1;
						this.traveller[jid].char5pity += 1;
						rarity = '★★★';
						itemType = 'Weapon';
						weap = random(this.character().threeStarWeap.length);
						drop = this.character().threeStarWeap[weap];
					}
					if (itemType === 'Character') {
						charArry.push(drop + ' (' + rarity + ')');
					} else {
						weapArry.push(drop + ' (' + rarity + ')');
					}
				}
				if (this.traveller[jid].acquaint && this.traveller[jid].acquaint <= times) {
					this.traveller[jid].acquaint -= times;
				} else if (this.traveller[jid].primogems > 160 * times) {
					this.traveller[jid].primogems -= 160 * times;
				}
				if (charArry.length === 1) {
					if (charArry.length) this.traveller[jid].chars.push(...charArry);
					this.save();
					return {
						img: true,
						buffer: fs.readFileSync(
							'../image/Characters/' +
								charArry[0].split(' (')[0].toLocaleLowerCase() +
								'.png'
						),
						text: '*「 WISH 」*\n' + order(charArry).join('\n'),
					};
				} else if (weapArry.length === 1) {
					if (weapArry.length) this.traveller[jid].chars.push(...weapArry);
					this.save();
					return {
						img: true,
						buffer: fs.readFileSync(
							'../image/Weapons/' +
								weapArry[0].split(' (')[0].toLocaleLowerCase() +
								'.png'
						),
						text: '*「 WISH 」*\n' + order(weapArry).join('\n'),
					};
				} else {
					let hasil = '*「 WISH 」*\n';
					for (const i of order(charArry)) {
						hasil += '• ' + i + '\n';
					}
					for (const i of order(weapArry)) {
						hasil += '• ' + i + '\n';
					}
					if (charArry.length) this.traveller[jid].chars.push(...charArry);
					if (weapArry.length) this.traveller[jid].weapons.push(...weapArry);
					this.save();
					return {
						img: false,
						text: hasil,
					};
				}
			} else {
				return {
					img: false,
					text: 'Maaf, primogem atau acquaint fate anda tidak cukup',
				};
			}
		} else {
			return {
				img: false,
				text: 'Maaf, anda belum terdaftar dalam genshin game!',
			};
		}
	}
	wishWeapon(jid: string, times: number): any {
		if (this.isExist(jid)) {
			const trv = this.getUser(jid);
			if (trv.acquaint > times || trv.primogems > 160 * times) {
				const charArry = [],
					weapArry = [];
				for (let i = 0; i < times; i++) {
					let draw = uniform(0, 100),
						featured,
						rarity,
						itemType,
						drop,
						char,
						weapOrChar,
						weap;
					if (trv.weap5pity === 69) draw = 0.1;
					else if (trv.weap4pity === 9) draw = 1.0;
					if (0 <= draw && draw <= 0.6) {
						rarity = '★★★★★';
						featured = random(1);
						itemType = 'Weapon';
						if (featured === 1) {
							drop = this.weapon().rate5up;
						} else {
							char = random(this.weapon().fiveStarWeap.length);
							drop = this.weapon().fiveStarWeap[char];
						}
						this.traveller[jid].weap5pity = 0;
						this.traveller[jid].weap4pity += 1;
					} else if (0.7 <= draw && draw <= 5.8) {
						rarity = '★★★★';
						weapOrChar = random(1);
						this.traveller[jid].standard5pity += 1;
						if (weapOrChar === 0) {
							itemType = 'Weapon';
							featured = random(1);
							if (featured === 1) {
								weap = random(this.weapon().fourStarWeap.length);
								drop = this.weapon().fourStarWeap[weap];
							} else {
								weap = random(this.weapon().rate4up.length);
								drop = this.weapon().rate4up[weap];
							}
						} else {
							itemType = 'Character';
							char = random(this.weapon().fourStarChar.length);
							drop = this.weapon().fourStarChar[char];
						}
						this.traveller[jid].weap4pity = 0;
						this.traveller[jid].weap5pity += 1;
					} else {
						this.traveller[jid].weap4pity += 1;
						this.traveller[jid].weap5pity += 1;
						rarity = '★★★';
						itemType = 'Weapon';
						weap = random(this.weapon().threeStarWeap.length);
						drop = this.weapon().threeStarWeap[weap];
					}
					if (itemType === 'Character') {
						charArry.push(drop + ' (' + rarity + ')');
					} else {
						weapArry.push(drop + ' (' + rarity + ')');
					}
				}
				if (this.traveller[jid].acquaint && this.traveller[jid].acquaint <= times) {
					this.traveller[jid].acquaint -= times;
				} else if (this.traveller[jid].primogems > 160 * times) {
					this.traveller[jid].primogems -= 160 * times;
				}
				if (charArry.length === 1) {
					if (charArry.length) this.traveller[jid].chars.push(...charArry);
					this.save();
					return {
						img: true,
						buffer: fs.readFileSync(
							'../image/Characters/' +
								charArry[0].split(' (')[0].toLocaleLowerCase() +
								'.png'
						),
						text: '*「 WISH 」*\n' + order(charArry).join('\n'),
					};
				} else if (weapArry.length === 1) {
					if (weapArry.length) this.traveller[jid].chars.push(...weapArry);
					this.save();
					return {
						img: true,
						buffer: fs.readFileSync(
							'../image/Weapons/' +
								weapArry[0].split(' (')[0].toLocaleLowerCase() +
								'.png'
						),
						text: '*「 WISH 」*\n' + order(weapArry).join('\n'),
					};
				} else {
					let hasil = '*「 WISH 」*\n';
					for (const i of order(charArry)) {
						hasil += '• ' + i + '\n';
					}
					for (const i of order(weapArry)) {
						hasil += '• ' + i + '\n';
					}
					if (charArry.length) this.traveller[jid].chars.push(...charArry);
					if (weapArry.length) this.traveller[jid].weapons.push(...weapArry);
					this.save();
					return {
						img: false,
						text: hasil,
					};
				}
			} else {
				return {
					img: false,
					text: 'Maaf, primogem atau acquaint fate anda tidak cukup',
				};
			}
		} else {
			return {
				img: false,
				text: 'Maaf, anda belum terdaftar dalam genshin game!',
			};
		}
	}
}
