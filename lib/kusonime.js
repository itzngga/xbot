/*
Author : Aditia © 2020
Date : Thu , 19 Nov 2020 - 15:28:28 WIB
Name : Kusonime.com Scrapper
Cuma iseng aja buat nambah ilmu.
Contact Me : https://t.me/aditia_dtz
*/
const Cli = require('readline');
const http = require('request');
const cheerio = require('cheerio');

const prompt = Cli.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const white = '\033[37m';
const red = '\033[31m';
const blue = '\033[34m';

const banner = ` . ∧ ∧
 (´･ω･)  =3    kusonime.com cli version
 /　 ⌒ヽ          by aditia_dtz © 2020
(人＿＿つ_つ
`;

function clear() {
  'use strict';
  process.stdout.write('\x1Bc');
}

function menu() {
  clear();
  console.log(banner);
  console.log(` ${blue}~${red}! ${white}made by aditia_dtz © 2020
${blue} [${white}01${blue}]${white} Home
${blue} [${white}02${blue}]${white} Search anime
${blue} [${white}03${blue}]${white} Show information
${blue} [${white}00${blue}]${white} Exit!`);
  prompt.question('\n >>> ', choice => {
    if (choice == '') {
      console.log(' Nothing Choice ');
      process.exit();
    } else if (choice == 2) {
      clear();
      console.log(banner);
      console.log(` ${blue}~${red}!${white} Anime Search `);
      prompt.question('\n >>> ', ttl => {
        if (ttl == '') {
          Err(' Please Input Anime Title!');
        } else {
          HttpPage(
            `https://www.kusonime.com/?s=${ttl.replace(/\s+/g, '+')}`,
            result => {
              findTitle(result);
            }
          );
        }
      });
    } else if (choice == 3) {
      console.log(`${white} Contact ${blue}=>${white} https://t.me/aditia_dtz`);
      process.exit(1);
    } else if (choice == 00) {
      process.exit();
    } else if (choice == 1) {
      HttpPage('https://www.kusonime.com/', result => {
        findTitle(result);
      });
    } else {
      Err(' Invalid Choice!');
    }
  });
}

function HttpPage(target, callback) {
  const post = {
    url: `${target}`,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    },
  };
  try {
    http.get(post, (err, response, html) => {
      if (!err && response.statusCode == 200) {
        callback(html);
      } else {
        throw err;
      }
    });
  } catch (e) {
    console.log(e.message);
  }
}

function findTitle(page) {
  const info = [];
  const next = [];
  const prev = [];
  clear();
  console.log(banner);
  const $ = cheerio.load(page);
  $("div[class='navigation']")
    .find('a')
    .each((x, y) => {
      const i = $(y);
      if (i.text()) {
        if (i.text().includes('Next Page')) {
          next.push(i.attr('href'));
        } else if (i.text().includes('Previous Page')) {
          prev.push(i.attr('href'));
        }
      } /** cari next & prev home **/
    });
  if (next.length == 0 || prev.length == 0) {
    $('a[class="previouspostslink"]').each((i, e) => {
      prev.push($(e).attr('href'));
    });
    $('a[class="nextpostslink"]').each((i, e) => {
      next.push($(e).attr('href'));
    });
  }
  console.log(`\t${$('title').text()}`);
  $("h2[class='episodeye']")
    .find('a')
    .each((i, elem) => {
      if ($(elem).text()) {
        info.push($(elem).attr('href'));
        console.log(` ${white}${i + 1}${blue}).${white} ${$(elem).text()}`);
      }
    });
  if (next.length !== 0 || prev.length !== 0) {
    console.log(
      `\n\t\t Type ${blue}[${white}N${blue}]${white} For Next Type ${blue}[${white}P${blue}]${white} For Prev\n`
    );
  } else if (info.length == 0) {
    console.log(`			~(‾▿‾~)
		Can't find Anime Title`);
    process.exit();
  }
  prompt.question('\n >>> ', il => {
    if (il !== '') {
      if (il - 1 < info.length) {
        HttpPage(info[il - 1], e => {
          parseInformation(e);
        });
      } else if (il === 'N') {
        if (next.length !== 0) {
          HttpPage(next[0], result => {
            findTitle(result);
          });
        } else {
          Err(" Can't Next Last Pages ");
        }
      } else if (il === 'P') {
        if (prev.length !== 0) {
          HttpPage(prev[0], result => {
            findTitle(result);
          });
        } else {
          Err(" Can't Previous First Pages");
        }
      } else {
        Err(' Your Choice Out Off Index List');
      }
    } else {
      Err(" Can't Process NoneType Choice ");
    }
    //		prompt.close();
  });
}

function parseInformation(page) {
  clear();
  console.log(banner);
  console.log(`\t\t\t${blue}[${white}·Anime·Information·${blue}]\n${white}`);
  const $ = cheerio.load(page);
  console.log(
    ` ${blue}[${white}^${blue}]${white} Title : ${$('h1.jdlz').text()}`
  );
  const up = $('div.kategoz')
    .text()
    .split(/\s\s\s/);
  console.log(` ${blue}[${white}^${blue}]${white} Uploads : ${up[0]}
 ${blue}[${white}^${blue}]${white} Viewers : ${up[1]}`);
  $('div.info')
    .find('p')
    .each((i, elem) => {
      console.log(` ${blue}[${white}^${blue}]${white} ${$(elem).text()}`);
    });
  const des = page
    .match(/<\/strong>(.+?)<strong>/i)[1]
    .replace(/<\/\w.*|<\w.*/, '')
    .trim();
  console.log(` ${blue}[${white}^${blue}]${white} Synopsis : ${des}`);
  prompt.question('\n >>> Download ? [Y/N] : ', fl => {
    if (fl == 'Y' || fl == 'y') {
      DownloadPage(page);
    } else if (fl == 'N' || fl == 'n') {
      process.exit();
    } else {
      Err(' Okay , Nothing Choice !');
    }
  });
}

function DownloadPage(page) {
  const smokettl = [];
  const smokeddl = [];
  const reso = [];
  const server = [];
  const link = [];
  const no_server = [];
  clear();
  console.log(banner);
  console.log(`\t\t\t ${blue}[${white} Download Page ${blue}]${white}\n`);
  const $ = cheerio.load(page);
  $("div[class='smokeddl']").each((i, res) => {
    smokeddl.push($(res).html());
    const smko = $(res).find("div[class='smokettl']").text();
    if (smko.length !== 0) {
      smokettl.push(smko);
    }
  });
  smokettl.forEach((i, e) => {
    console.log(` ${e + 1}${blue}).${white} ${i}`);
  });
  prompt.question('\n >>> ', x => {
    console.log(`\t\t\t ${blue}[${white} Set Resolution${blue} ]${white}\n`);
    if (x !== '') {
      if (x - 1 < smokettl.length) {
        const smoke = cheerio.load(smokeddl[x - 1]);
        smoke("div[class='smokeurl']").each((i, elem) => {
          const el = $(elem);
          reso.push(el.find('strong').text());
          no_server.push(el.html());
        });
        reso.forEach((e, i) => {
          console.log(` ${i + 1}${blue}).${white} ${e}`);
        });
        prompt.question('\n >>>  ', rs => {
          console.log(
            `\t\t\t ${blue}[${white} List Server ${blue}]${white} \n`
          );
          if (rs !== '') {
            if (rs - 1 < reso.length) {
              const no = cheerio.load(no_server[rs - 1]);
              no('a').each((i, elem) => {
                const sv = $(elem);
                server.push(sv.text());
                link.push(sv.attr('href'));
              });
              server.forEach((y, i) => {
                console.log(
                  ` ${white}${i + 1}${blue}). ${white}${y} ${blue}>>${white} ${
                    link[i]
                  }`
                );
              });
            } else {
              Err(' Your Choice Out Of Index');
            }
          } else {
            Err(" Can't Process NoneType Choice");
          }
          prompt.close();
        });
      } else {
        Err(' Your Choice Out Of Index List');
      }
    } else {
      Err(" Can't Process NoneType Choice");
    }
    //			prompt.close();
  });
}

function Err(message) {
  const err = new Error(message);
  throw err;
}

menu();
