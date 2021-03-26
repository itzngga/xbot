import { autoReply } from "types";
import { DB } from "./login";
export default class Reply {
	private reply: autoReply;
	constructor(private DB: DB) {
		this.reply = this.DB.autoReply
	}
	saveReply = () => this.DB.autoReply = this.reply
	isReply = (cmd: string) => Object.prototype.hasOwnProperty.call(this.reply, cmd);

	getReply = (cmd: string) => {
		if (Object.prototype.hasOwnProperty.call(this.reply, cmd)) {
			return this.reply[cmd]!.answer;
		} else {
			return false;
		}
	};

	addReply = (cmd: string, answer: string) => {
		if (Object.prototype.hasOwnProperty.call(this.reply, cmd)) {
			return 'Gagal, reply masih tersedia!';
		} else {
			this.reply[cmd] = {
				answer: answer.slice(cmd.length),
			};
			this.saveReply();
			return 'Sukses add reply!';
		}
	};

	removeReply = (cmd: string) => {
		if (Object.prototype.hasOwnProperty.call(this.reply, cmd)) {
			delete this.reply[cmd];
			return 'Sukses remove reply!';
		} else {
			return 'Gagal, reply tidak ada!';
		}
	};

	allReply = () => {
		let hasil = '*XyZ BOT AutoReply*\n\n',
			counter = 1;
		for (const [key, val] of Object.entries(this.reply)) {
			hasil += `${counter}. _${key}_\n Answer: *${val.answer}*\n`;
			counter++;
		}
		return hasil;
	};
}
