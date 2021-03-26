import {settingType, countType} from '../types';
import { DB } from './login';

export default class Count {
	private setting: settingType;
	private count: countType;
	constructor(private DB: DB) {
		this.setting = this.DB.setting
		this.count = this.DB.count
	}
	addCount = (cmd: string): boolean => {
		if (Object.prototype.hasOwnProperty.call(this.count, cmd)) {
			this.count[cmd].count++;
			this.DB.count = this.count
			return true;
		} else {
			this.count[cmd] = {
				count: 1,
				type: 'member',
			};
			this.DB.count = this.count
			return true;
		}
	};
	countAll = (): any => {
		let counts = 0;
		for (const [key, val] of Object.entries(this.count)) {
			counts += val.count;
		}
		return counts;
	};
	countCmd = (): string => {
		const anjay = this.countAll();
		let hasil = '*「 XyZ SELF COUNT 」*\n',
			counter = 1;
		hasil += `total hit : *${anjay}*\n`;
		for (const [key, val] of Object.entries(this.count)) {
			hasil += `${counter}. ${this.setting.prefix}${key} : *${val.count}*\n`;
			counter++;
		}
		return hasil;
	};
	countAdd = (cmd: string): string => {
		if (Object.prototype.hasOwnProperty.call(this.count, cmd)) {
			this.count[cmd] = {
				count: 1,
				type: 'member',
			};
			this.DB.count = this.count
			return 'Sukses add *' + cmd + '*';
		} else {
			return 'No count named *' + cmd + '*';
		}
	};
	countRemove = (cmd: string): string => {
		if (Object.prototype.hasOwnProperty.call(this.count, cmd)) {
			delete this.count[cmd];
			this.DB.count = this.count
			return 'Sukses remove *' + cmd + '*';
		} else {
			return 'No count named *' + cmd + '*';
		}
	};
	setCountAsAdmin = (cmd: string): string => {
		if (Object.prototype.hasOwnProperty.call(this.count, cmd)) {
			this.count[cmd]!.type = 'admin';
			this.DB.count = this.count
			return 'Sukses set *' + cmd + '* sbg admin cmd';
		} else {
			return 'No count named *' + cmd + '*';
		}
	};
	setCountAsMember = (cmd: string): string => {
		if (Object.prototype.hasOwnProperty.call(this.count, cmd)) {
			this.count[cmd]!.type = 'member';
			this.DB.count = this.count
			return 'Sukses remove *' + cmd + '* sbg admin cmd';
		} else {
			return 'No count named *' + cmd + '*';
		}
	};
}
