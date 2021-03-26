/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-self-assign */
import {createCanvas, registerFont} from 'canvas';
import {MessageType, WAContextInfo, WAMessage} from '@adiwajshing/baileys';
import fs from 'fs-extra';
import { Index } from 'index';
const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'.split(
  ''
);
const nums = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
const {stripIndents}: any = require('common-tags');
const tictactoe: any = require('tictactoe-minimax-ai');
const cakLontong = fs.readJSONSync('../json/caklontong.json');
const slots = ['🍇', '🍊', '🍐', '🍒', '🍋', '🍌', '🔔'];
const game: Set<string> = new Set();
registerFont('../fonts/Captcha.ttf', {family: 'Captcha'});

// high 56
// low 55

// bj 10-30 / undefined
// csn kebanyakan
function randomText(len: number): string {
  const result = [];
  for (let i = 0; i < len; i++)
    result.push(pool[Math.floor(Math.random() * pool.length)]);
  return result.join('');
}
function is_undefined(input: string): boolean {
  const u = void 0;
  return input === u;
}
export default class Game {
  constructor(private client: Index){
    this.client = client
  }
  async sendText (
    from: string,
    teks: string,
    context?: WAContextInfo
  ) {
    return this.client.sendMessage(
      from,
      teks,
      MessageType.text,
      context ? {contextInfo: context} : {}
    );
  }
  async reply (
    from: string,
    teks: string,
    msg: any,
    context?: WAContextInfo
  ) {
    return this.client.sendMessage(
      from,
      teks,
      MessageType.text,
      context ? {quoted: msg, contextInfo: context} : {quoted: msg}
    );
  }
  async capca(
    from: string,
    serial: string,
    message: WAMessage
  ): Promise<WAMessage | void> {
    try {
      if (game.has(serial))
        return this.client.sendMessage(
          from,
          'Mohon selesaikan game sebelumnya!',
          MessageType.text,
          {quoted: message}
        );
      game.add(serial);
      const canvas = createCanvas(125, 32);
      const ctx = canvas.getContext('2d');
      const teks = randomText(5);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.font = '26px Captcha';
      ctx.rotate(-0.05);
      ctx.strokeText(teks, 15, 26);
      await this.client.sendMessage(from, canvas.toBuffer(), MessageType.image, {
        caption: 'Anda memiliki waktu 15 detik untuk menebak apa ini',
        quoted: message,
      });
      this.client
        .waitMessage({type: 'text', query: teks, sender: serial}, 15000)
        .then(res => {
          this.client.sendMessage(
            from,
            'Good Job, Jawaban anda benar!',
            MessageType.text,
            {quoted: res}
          );
          game.delete(serial);
        })
        .catch(() => {
          this.client.sendMessage(
            from,
            'Maaf, waktu habis!\n\nJawabanya adalah *' + teks + '*',
            MessageType.text,
            {quoted: message}
          );
          game.delete(serial);
        });
    } catch (error) {
      console.log(error);
    }
  }
  async cakLontong(
    from: string,
    serial: string,
    message: WAMessage
  ): Promise<WAMessage | void> {
    try {
      if (game.has(serial))
        return this.client.sendMessage(
          from,
          'Mohon selesaikan game sebelumnya!',
          MessageType.text,
          {quoted: message}
        );
      game.add(serial);
      const quiz = cakLontong[Math.floor(Math.random() * cakLontong.length)];
      quiz.answer = quiz.answer.toLowerCase();
      await this.client.sendMessage(
        from,
        `*Anda memiliki waktu 15detik untuk menjawab pertanyaan dibawah.*\n\n${quiz.quiz}`,
        MessageType.text,
        {quoted: message}
      );
      this.client
        .waitMessage({type: 'text', query: quiz.answer, sender: serial}, 15000)
        .then(res => {
          this.client.sendMessage(
            from,
            'Jawaban anda benar!\n\n' + quiz.detail,
            MessageType.text,
            {quoted: res}
          );
          game.delete(serial);
        })
        .catch(() => {
          this.client.sendMessage(
            from,
            'Maaf, waktu habis!\n\nJawabanya adalah *' +
              quiz.answer +
              '*\n_' +
              quiz.detail +
              '_',
            MessageType.text,
            {quoted: message}
          );
          game.delete(serial);
        });
    } catch (error) {
      console.log(error);
    }
  }
  async mathquiz(
    diff: number,
    from: string,
    serial: string,
    message: WAMessage
  ): Promise<WAMessage | void> {
    const operations = ['+', '-', '*'];
    const maxValues: any = {
      ez: 10,
      easy: 50,
      medium: 100,
      hard: 500,
      extreme: 1000,
      impossible: Number.MAX_SAFE_INTEGER,
    };
    const maxMultiplyValues: any = {
      ez: 5,
      easy: 12,
      medium: 30,
      hard: 50,
      extreme: 100,
      impossible: Number.MAX_SAFE_INTEGER,
    };
    try {
      if (game.has(serial))
        return this.client.sendMessage(
          from,
          'Mohon selesaikan game sebelumnya!',
          MessageType.text,
          {quoted: message}
        );
      game.add(serial);
      const operation =
        operations[Math.floor(Math.random() * operations.length)];
      let answer: any, value1, value2;
      switch (operation) {
        case '+':
          value1 = Math.floor(Math.random() * maxValues[diff]) + 1;
          value2 = Math.floor(Math.random() * maxValues[diff]) + 1;
          answer = value1 + value2;
          break;
        case '-':
          value1 = Math.floor(Math.random() * maxValues[diff]) + 1;
          value2 = Math.floor(Math.random() * maxValues[diff]) + 1;
          answer = value1 - value2;
          break;
        case '*':
          value1 = Math.floor(Math.random() * maxMultiplyValues[diff]) + 1;
          value2 = Math.floor(Math.random() * maxMultiplyValues[diff]) + 1;
          answer = value1 * value2;
          break;
      }
      answer = answer.toString().replace('*', '×');
      this.client.sendMessage(
        from,
        `*Anda memiliki waktu 15detik untuk menjawab pertanyaan dibawah.*\n\n${value1} ${operation} ${value2}`,
        MessageType.text,
        {quoted: message}
      );
      this.client
        .waitMessage(
          {type: 'text', query: answer.toString(), sender: serial},
          15000
        )
        .then(res => {
          this.client.sendMessage(
            from,
            'Good Job, Jawaban anda benar!',
            MessageType.text,
            {quoted: res}
          );
          game.delete(serial);
        })
        .catch(() => {
          this.client.sendMessage(
            from,
            'Maaf, waktu habis!\n\nJawabanya adalah *' +
              answer.toString() +
              '*',
            MessageType.text,
            {quoted: message}
          );
          game.delete(serial);
        });
    } catch (error) {
      console.log(error);
    }
  }
  async slots(from: string, message: WAMessage): Promise<WAMessage> {
    const slotOne = Math.floor(Math.random() * slots.length);
    const slotTwo = Math.floor(Math.random() * slots.length);
    const slotThree = Math.floor(Math.random() * slots.length);
    return this.reply(
      from,
      stripIndents`
			\`\`\`╭ : : SLOTS : : ╮
			┝•---------------
			┝• ${this.wrapSlots(slotOne, false)} : ${this.wrapSlots(
        slotTwo,
        false
      )} : ${this.wrapSlots(slotThree, false)}
			┝> ${slots[slotOne]} : ${slots[slotTwo]} : ${slots[slotThree]}
			┝• ${this.wrapSlots(slotOne, true)} : ${this.wrapSlots(
        slotTwo,
        true
      )} : ${this.wrapSlots(slotThree, true)}
			┝•---------------
			╰ : : ${
        slotOne === slotTwo && slotOne === slotThree ? ' WIN! ' : ' LOST '
      } : : ╯\`\`\`
		`,
      message
    );
  }
  wrapSlots(slot: number, add: boolean) {
    if (add) {
      if (slot + 1 > slots.length - 1) return slots[0];
      return slots[slot + 1];
    }
    if (slot - 1 < 0) return slots[slots.length - 1];
    return slots[slot - 1];
  }
  async tictactoe(
    gid: string,
    from: any,
    opponent: any,
    message: WAMessage
  ): Promise<WAMessage> {
    if (game.has(gid))
      return this.reply(gid, 'Tolong tunggu game sebelumnya berakhir!', message);
    game.add(gid);
    try {
      if (!opponent.bot) {
        await this.client.sendMessage(
          gid,
          `@${opponent.id.replace(
            '@s.whatsapp.net',
            ''
          )}\nterima tantangan game ini?\n\n*yes/no*`,
          MessageType.text,
          {quoted: message, contextInfo: {mentionedJid: [opponent.id]}}
        );
        const verification = await this.client
          .waitMessage(
            {type: 'regex', query: '/yes|no/g', sender: opponent.id},
            15000
          )
          .then(res => {
            if (res.body[0] === 'yes') return true;
            if (res.body[0] === 'no') return false;
            return false;
          })
          .catch(err => {
            console.log(err);
            return false;
          });
        if (!verification) {
          game.delete(gid);
          return this.reply(gid, 'Sepertinya dia menolak...', message);
        }
      }
      const sides = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const taken: string[] = [];
      let userTurn = true;
      let winner = null;
      while (!winner && taken.length < 9) {
        const user: any = userTurn ? from : opponent;
        const sign: boolean | string = userTurn ? 'X' : 'O';
        let choice;
        if (opponent.bot && !userTurn) {
          choice = tictactoe.bestMove(this.convertBoard(sides), {
            computer: 'x',
            opponent: 'o',
          });
        } else {
          await this.client.sendMessage(
            gid,
            stripIndents`
						@${user.id.replace(
              '@s.whatsapp.net',
              ''
            )}\nbagian apa yang anda pilih?\nbalas *end* untuk mengakhiri game
						${this.displayBoard(sides)}
                    `,
            MessageType.text,
            {quoted: message, contextInfo: {mentionedJid: [user.id]}}
          );
          await this.client
            .waitMessage(
              {type: 'regex', query: '/[0-9]|end/g', sender: user.id},
              30000
            )
            .then(res => {
              choice = res.body[0];
              if (choice === 'end') return true;
              if (taken.includes(choice)) {
                this.sendText(gid, 'Maaf, box tersebut telah terpakai!');
                choice = Math.floor(Math.random() * sides.length);
                return true;
              }
              return sides.includes(choice) && !taken.includes(choice);
            })
            .catch(() => {
              choice = 'timeout';
            });
          choice = choice;
          if (choice === 'end') {
            winner = userTurn ? opponent : from;
            break;
          } else if (choice === 'timeout') {
            winner = 'time';
            break;
          }
        }
        sides[
          opponent.bot && !userTurn ? choice : Number.parseInt(choice, 10) - 1
        ] = sign;
        taken.push(choice);
        const win = this.verifyWin(sides, from, opponent);
        if (win) winner = win;
        userTurn = !userTurn;
      }
      game.delete(gid);
      if (winner === 'tie')
        return this.reply(
          gid,
          stripIndents`
                Game ini berakhir seri!\n\n${this.displayBoard(sides)}`,
          message
        );
      if (!is_undefined(winner.bot))
        return this.reply(
          gid,
          stripIndents`
                Bot XyZ menang!\n\n${this.displayBoard(sides)}`,
          message
        );
      if (winner === 'time')
        return this.reply(
          gid,
          stripIndents`Game otomatis berakhir karena tidak ada respon.
                \n${this.displayBoard(sides)}`,
          message
        );
      return this.client.sendMessage(
        gid,
        stripIndents`
				Game ini dimenangkan oleh, @${winner.id.replace('@s.whatsapp.net', '')}!\n
				${this.displayBoard(sides)}
			`,
        MessageType.text,
        {quoted: message, contextInfo: {mentionedJid: [winner.id]}}
      );
    } catch (err) {
      game.delete(gid);
      throw err;
    }
  }
  verifyWin(
    sides: string[],
    player1: {id: string; bot: boolean} | string,
    player2: {id: string; bot: boolean} | string
  ): any {
    const evaluated = tictactoe.boardEvaluate(this.convertBoard(sides)).status;
    if (evaluated === 'win') return player1;
    if (evaluated === 'loss') return player2;
    if (evaluated === 'tie') return 'tie';
    return false;
  }

  convertBoard(board: string[]) {
    const newBoard: any = [[], [], []];
    let col = 0;
    for (const piece of board) {
      if (piece === 'X') {
        newBoard[col].push('x');
      } else if (piece === 'O') {
        newBoard[col].push('o');
      } else {
        newBoard[col].push('_');
      }
      if (newBoard[col].length === 3) col++;
    }
    return newBoard;
  }

  displayBoard(board: string[]) {
    let str = '';
    for (let i = 0; i < board.length; i++) {
      if (board[i] === 'X') {
        str += '❌';
      } else if (board[i] === 'O') {
        str += '⭕';
      } else {
        str += nums[i];
      }
      if (i % 3 === 2) str += '\n';
    }
    return str;
  }
}
