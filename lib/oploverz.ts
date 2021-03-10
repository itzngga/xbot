import axios from 'axios';
import cheerio from 'cheerio';

const headers = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
  cookie:
    'sb=zLuAXxFSpva3oZu_kEOh90RW; datr=zLuAX5s4N7PiTlaTNsvt5HiN; c_user=100009907184556; spin=r.1003179603_b.trunk_t.1610545645_s.1_v.2_; xs=20%3AVcolWz21d-GWtA%3A2%3A1602272225%3A2639%3A10736%3A%3AAcWvuPwu8QklRFiPFe_79bNrXVV3P8DHxzew6BL_YKE; fr=0q2BYZyXo6cRMX63m.AWXlJ8Qgyo2kQyoNrFcs-nGha2E.Bfc_FB.NK.AAA.0.0.Bf_y-M.AWUiah1tJnw',
};

export const find = (query: string) =>
  axios
    .get(`https://www.oploverz.in/?s=${query}&post_type=post`, {
      headers: headers,
    })
    .then(res => {
      const $ = cheerio.load(res.data);
      const hasil: any[] = [];
      if (!$.length) throw new Error('Url invalid');
      $('div.postbody > div > div.right > div > ul > li').each((i, e) => {
        hasil.push({
          judul: $(e).find('div.dtl > h2 > a').text(),
          image: $(e).find('div.thumb img').attr('src'),
          link: $(e).find('div.dtl > h2 > a').attr('href'),
          rilis: $(e)
            .find('div.dtl > span > span > span:nth-child(1)')
            .text()
            .trim(),
        });
      });
      return hasil;
    });
export const findOne = (query: string) =>
  axios
    .get(`https://www.oploverz.in/?s=${query}&post_type=post`, {
      headers: headers,
    })
    .then(res => {
      const $ = cheerio.load(res.data);
      const anjay = $(
        'div.postbody > div > div.right > div > ul > li:nth-child(1)'
      );
      if (!anjay.length) throw new Error('Invalid url');
      return {
        judul: anjay.find('div.dtl > h2 > a').text(),
        link: anjay.find('div.dtl > h2 > a').attr('href'),
        image: anjay.find('div.thumb img').attr('src'),
        rilis: anjay
          .find('div.dtl > span > span > span:nth-child(1)')
          .text()
          .trim(),
      };
    });
export const downloadLink = (link: string): any =>
  axios.get(link, {headers: headers}).then(res => {
    const data: any[] = [];
    const no_server: any[] = [];
    const hasil: any[] = [];
    const $ = cheerio.load(res.data);
    $('div[class="sorattl title-download"]').each((i, e) => {
      data.push($(e).text().replace('oploverz – ', ''));
    });
    $('div[class="soraurl list-download"]').each((i, e) => {
      no_server.push($(e).html());
    });
    if (!data.length) throw new Error('Url invalid');
    for (let i = 0; i < data.length; i++) {
      const format: any = {title: data[i].trim(), links: []};
      const $ = cheerio.load(no_server[i]);
      $('a').each((i, e) => {
        const anjay: any = {};
        anjay.server = $(e).text();
        anjay.link = $(e).attr('href');
        format.links.push(anjay);
      });
      hasil.push(format);
    }
    return hasil;
  });
