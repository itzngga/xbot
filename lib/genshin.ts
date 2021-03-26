import fs from 'fs-extra';
import {genshin} from '../types/db';
import {character, standart, traveller, weapon} from '../types/index';
const stripIndents: any = require('common-tags').stripIndents;

const standart: standart = genshin.getObject('/standart');
const weapon: weapon = genshin.getObject('/weapon');
const character: character = genshin.getObject('/character');
const save = () => genshin.push('/traveller', traveller);
const getUser = (jid: string) => traveller[jid];
const isExist = (jid: string): boolean =>
	Object.prototype.hasOwnProperty.call(traveller, jid);
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

export function primoDaily() {
	const trv: any = Object.entries(traveller);
	for (const i in trv) {
		trv[i].primogems += 1600;
	}
	console.log('[GENSHIN] Daily primogems stored!');
}
export function addTraveler(jid: string) {
	if (!isExist(jid)) {
		traveller[jid] = {
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
		save();
		return balance(jid);
	} else {
		return 'User sudah pernah terdaftar!';
	}
}
export function balance(jid: string) {
	if (isExist(jid)) {
		const trv = getUser(jid);
		return stripIndents`*「 Genshin Game 」*
        🌟 _primogems : *${trv.primogems}*_
        🟣 _acquaint : *${trv.acquaint}*_
        🔵 _interwined : *${trv.interwined}*_`;
	} else {
		return 'Maaf, anda belum terdaftar dalam genshin game!';
	}
}
export function profile(jid: string) {
	if (isExist(jid)) {
		const trv = getUser(jid);
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

export function buy(jid: string, type: boolean) {
	if (isExist(jid)) {
		const trv = getUser(jid);
		if (trv.primogems < 160) return 'Maaf, primogems anda tidak cukup';
		if (type) {
			traveller[jid].primogems = trv.primogems - 160;
			traveller[jid].acquaint = trv.acquaint + 1;
			save();
			return 'Sukses tukar 1 acquaint fate dengan 160 primogems!';
		} else {
			traveller[jid].primogems = trv.primogems - 160;
			traveller[jid].interwined = trv.interwined + 1;
			save();
			return 'Sukses tukar 1 interwined fate dengan 160 primogems!';
		}
	} else {
		return 'Maaf, anda belum terdaftar dalam genshin game!';
	}
}

export function buy10(jid: string, type: boolean) {
	if (isExist(jid)) {
		const trv = getUser(jid);
		if (trv.primogems < 1600) return 'Maaf, primogems anda tidak cukup';
		if (type) {
			traveller[jid].primogems = trv.primogems - 1600;
			traveller[jid].acquaint = trv.acquaint + 10;
			save();
			return 'Sukses tukar 10 acquaint fate dengan 1600 primogems!';
		} else {
			traveller[jid].primogems = trv.primogems - 1600;
			traveller[jid].interwined = trv.interwined + 10;
			save();
			return 'Sukses tukar 10 interwined fate dengan 1600 primogems!';
		}
	} else {
		return 'Maaf, anda belum terdaftar dalam genshin game!';
	}
}

export function wishStandart(jid: string, times: number): any {
	if (isExist(jid)) {
		const trv = getUser(jid);
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
						char = random(standart.fiveStarChar.length);
						drop = standart.fiveStarChar[char];
					} else {
						itemType = 'Weapon';
						weap = random(standart.fiveStarWeap.length);
						drop = standart.fiveStarWeap[weap];
					}
					traveller[jid].standard5pity = 0;
				} else if (0.7 <= draw && draw <= 5.8) {
					rarity = '★★★★';
					weapOrChar = random(1);
					traveller[jid].standard5pity += 1;

					if (weapOrChar === 0) {
						itemType = 'Weapon';
						weap = random(standart.fourStarWeap.length);
						drop = standart.fourStarWeap[weap];
					} else {
						itemType = 'Character';
						char = random(standart.fourStarChar.length);
						drop = standart.fourStarChar[char];
					}
					traveller[jid].standard4pity = 0;
				} else {
					traveller[jid].standard5pity += 1;
					traveller[jid].standard4pity += 1;
					rarity = '★★★';
					itemType = 'Weapon';
					weap = random(standart.threeStarWeap.length);
					drop = standart.threeStarWeap[weap];
				}
				if (itemType === 'Character') {
					charArry.push(drop + ' (' + rarity + ')');
				} else {
					weapArry.push(drop + ' (' + rarity + ')');
				}
			}
			if (traveller[jid].interwined && traveller[jid].interwined <= times) {
				traveller[jid].interwined -= times;
			} else if (traveller[jid].primogems > 160 * times) {
				traveller[jid].primogems -= 160 * times;
			}
			if (charArry.length === 1) {
				if (charArry.length) traveller[jid].chars.push(...charArry);
				save();
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
				if (weapArry.length) traveller[jid].chars.push(...weapArry);
				save();
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
				if (charArry.length) traveller[jid].chars.push(...charArry);
				if (weapArry.length) traveller[jid].weapons.push(...weapArry);
				save();
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

export function wishLimited(jid: string, times: number): any {
	if (isExist(jid)) {
		const trv = getUser(jid);
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
						drop = character.rate5up;
					} else {
						char = random(character.fiveStarChar.length);
						drop = character.fiveStarChar[char];
					}
					traveller[jid].char5pity = 0;
					traveller[jid].char4pity += 1;
				} else if (0.7 <= draw && draw <= 5.8) {
					rarity = '★★★★';
					weapOrChar = random(1);

					if (weapOrChar === 0) {
						itemType = 'Weapon';
						weap = random(character.fourStarWeap.length);
						drop = character.fourStarWeap[weap];
					} else {
						itemType = 'Character';
						featured = random(1);
						if (featured === 1) {
							char = random(character.fourStarChar.length);
							drop = character.fourStarChar[char];
						} else {
							char = random(character.rate4up.length);
							drop = character.rate4up[char];
						}
					}
					traveller[jid].char4pity = 0;
					traveller[jid].char5pity += 1;
				} else {
					traveller[jid].char4pity += 1;
					traveller[jid].char5pity += 1;
					rarity = '★★★';
					itemType = 'Weapon';
					weap = random(character.threeStarWeap.length);
					drop = character.threeStarWeap[weap];
				}
				if (itemType === 'Character') {
					charArry.push(drop + ' (' + rarity + ')');
				} else {
					weapArry.push(drop + ' (' + rarity + ')');
				}
			}
			if (traveller[jid].acquaint && traveller[jid].acquaint <= times) {
				traveller[jid].acquaint -= times;
			} else if (traveller[jid].primogems > 160 * times) {
				traveller[jid].primogems -= 160 * times;
			}
			if (charArry.length === 1) {
				if (charArry.length) traveller[jid].chars.push(...charArry);
				save();
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
				if (weapArry.length) traveller[jid].chars.push(...weapArry);
				save();
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
				if (charArry.length) traveller[jid].chars.push(...charArry);
				if (weapArry.length) traveller[jid].weapons.push(...weapArry);
				save();
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
export function wishWeapon(jid: string, times: number): any {
	if (isExist(jid)) {
		const trv = getUser(jid);
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
						drop = weapon.rate5up;
					} else {
						char = random(weapon.fiveStarWeap.length);
						drop = weapon.fiveStarWeap[char];
					}
					traveller[jid].weap5pity = 0;
					traveller[jid].weap4pity += 1;
				} else if (0.7 <= draw && draw <= 5.8) {
					rarity = '★★★★';
					weapOrChar = random(1);
					traveller[jid].standard5pity += 1;

					if (weapOrChar === 0) {
						itemType = 'Weapon';
						featured = random(1);
						if (featured === 1) {
							weap = random(weapon.fourStarWeap.length);
							drop = weapon.fourStarWeap[weap];
						} else {
							weap = random(weapon.rate4up.length);
							drop = weapon.rate4up[weap];
						}
					} else {
						itemType = 'Character';
						char = random(weapon.fourStarChar.length);
						drop = weapon.fourStarChar[char];
					}
					traveller[jid].weap4pity = 0;
					traveller[jid].weap5pity += 1;
				} else {
					traveller[jid].weap4pity += 1;
					traveller[jid].weap5pity += 1;
					rarity = '★★★';
					itemType = 'Weapon';
					weap = random(weapon.threeStarWeap.length);
					drop = weapon.threeStarWeap[weap];
				}
				if (itemType === 'Character') {
					charArry.push(drop + ' (' + rarity + ')');
				} else {
					weapArry.push(drop + ' (' + rarity + ')');
				}
			}
			if (traveller[jid].acquaint && traveller[jid].acquaint <= times) {
				traveller[jid].acquaint -= times;
			} else if (traveller[jid].primogems > 160 * times) {
				traveller[jid].primogems -= 160 * times;
			}
			if (charArry.length === 1) {
				if (charArry.length) traveller[jid].chars.push(...charArry);
				save();
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
				if (weapArry.length) traveller[jid].chars.push(...weapArry);
				save();
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
				if (charArry.length) traveller[jid].chars.push(...charArry);
				if (weapArry.length) traveller[jid].weapons.push(...weapArry);
				save();
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
