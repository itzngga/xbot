import puppeteer from 'puppeteer';

export default class Scrap {
  private browser?: puppeteer.Browser;
  constructor() {
    this.start();
  }
  async start() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
  }
  async ss(link: string): Promise<Buffer | string | undefined> {
    try {
      const browser = this.browser!;
      const page = await browser.newPage();
      page
        .goto(link, {
          waitUntil: 'domcontentloaded',
        })
        .then(async () => {
          await page.setViewport({
            width: 1920,
            height: 1080,
          });
          const buffer = await page.screenshot();
          Promise.resolve(buffer as Buffer);
          await page.close();
        })
        .catch(async () => {
          Promise.reject('Maaf, url tidak valid');
          await page.close();
        });
    } catch (error) {
      return Promise.reject('Maaf, url tidak valid');
    }
  }
  async textpro1input(link: string, text: string): Promise<string | undefined> {
    try {
      const browser = this.browser!;
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', request => {
        if (request.resourceType() === 'document') {
          request.continue();
        } else {
          request.abort();
        }
      });
      page
        .goto(link)
        .then(async () => {
          await page.type(
            '#content-wrapper > section > div > div.col-md-9 > form > ul > li.item-content > div > div > input',
            text
          );
          await page.click(
            '#content-wrapper > section > div > div.col-md-9 > form > ul > li:nth-child(2) > input'
          );
          await page.waitForSelector(
            '#content-wrapper > section > div > div.col-md-9 > div:nth-child(4) > div > img'
          );
          Promise.resolve(
            'https://textpro.me/' +
              (await page.$eval(
                '#content-wrapper > section > div > div.col-md-9 > div:nth-child(4) > div > img',
                img => img.getAttribute('src')
              ))
          );
          await page.close();
        })
        .catch(async error => {
          console.log(error);
          Promise.reject('Maaf, url tidak valid');
          await page.close();
        });
    } catch (error) {
      console.log(error);
      return Promise.reject('Maaf, url tidak valid');
    }
  }
  async textpro2input(
    link: string,
    text1: string,
    text2: string
  ): Promise<string | undefined> {
    try {
      const browser = this.browser!;
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', request => {
        if (request.resourceType() === 'document') {
          request.continue();
        } else {
          request.abort();
        }
      });
      page
        .goto(link)
        .then(async () => {
          await page.type(
            '#content-wrapper > section > div > div.col-md-9 > form > ul > li.item-content > div > div > input',
            text1
          );
          await page.type(
            '#content-wrapper > section > div > div.col-md-9 > form > ul > li:nth-child(2) > div > div > input',
            text2
          );
          await page.click(
            '#content-wrapper > section > div > div.col-md-9 > form > ul > li:nth-child(3) > input'
          );
          await page.waitForSelector(
            '#content-wrapper > section > div > div.col-md-9 > div:nth-child(4) > div > img'
          );
          Promise.resolve(
            'https://textpro.me/' +
              (await page.$eval(
                '#content-wrapper > section > div > div.col-md-9 > div:nth-child(4) > div > img',
                img => img.getAttribute('src')
              ))
          );
          await page.close();
        })
        .catch(async () => {
          Promise.reject('Maaf, url tidak valid');
          await page.close();
        });
    } catch (error) {
      return Promise.reject('Maaf, url tidak valid');
    }
  }
  async photofunia(link: string, file: string): Promise<string | undefined> {
    try {
      const browser = this.browser!;
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', request => {
        if (
          request.resourceType() === 'image' ||
          request.resourceType() === 'script'
        ) {
          const headers = request.headers();
          headers['User-Agent'] =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';
          headers['Cookie'] =
            '_ga=GA1.2.1526952935.1605715094; accept_cookie=true; _gid=GA1.2.13620487.1610226426; PHPSESSID=b9icpripq9a90bf8mcp7qtki85; _gat=1';
          request.continue({headers: headers});
        } else {
          request.abort();
        }
      });
      page
        .goto(link, {waitUntil: 'domcontentloaded'})
        .then(async () => {
          await page.click('.button-container');
          const elementHandle = await page.$x('//*[@id="fileupload"]');
          await elementHandle[0]?.uploadFile(file);
          await page.waitForSelector(
            '#popup-container > div > div > div > div.popup-content > div > div > div.image-container > div.jcrop-holder.jcrop-dark > img'
          );
          const elements = await page.$x(
            '//*[@id="popup-container"]/div/div/div/div[2]/div/div/div[2]/div[2]/button'
          );
          await elements[0]?.click();
          const element = await page.$x('//*[@id="effect-form"]/div[2]/button');
          await element[0]?.click();
          await page.waitForNavigation({waitUntil: 'domcontentloaded'});
          Promise.resolve(
            await page.$eval(
              '#subcontent > div.image-container.p402_premium > div > img',
              (img: any) => img.getAttribute('src')
            )
          );
          await page.close();
        })
        .catch(async (err: Error) => {
          console.log(err);
          await page.close();
        });
    } catch (error) {
      console.log(error);
      return Promise.reject('Maaf, url tidak valid');
    }
  }
  async instagram(link: string): Promise<string | undefined> {
    try {
      const browser = this.browser!;
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', request => {
        const headers = request.headers();
        headers['User-Agent'] =
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';
        headers['Cookie'] =
          '_ga=GA1.2.760210676.1610359049; _gid=GA1.2.1672416019.1610359049; _gat=1';
        request.continue({headers: headers});
      });
      page
        .goto('https://downloadgram.com/', {waitUntil: 'domcontentloaded'})
        .then(async () => {
          await page.type('#main_form > div.main_input_wrapper > input', link);
          await page.click('#main_form > div.actions > input');
          await page.waitForSelector('#results > div > a');
          Promise.resolve(
            await page.$eval('#results > div > a', (elm: any) => elm.href)
          );
          await page.close();
        })
        .catch(async () => {
          Promise.reject('Maaf, url tidak valid');
          await page.close();
        });
    } catch (error) {
      return Promise.reject('Maaf, url tidak valid');
    }
  }
  async webp2mp4(path: string): Promise<string | undefined> {
    try {
      const browser = this.browser!;
      const page = await browser.newPage();
      page
        .goto('https://ezgif.com/webp-to-mp4', {
          waitUntil: 'domcontentloaded',
        })
        .then(async () => {
          const elementHandle = await page.$(
            '#upload-form > fieldset > p:nth-child(2) > input[type=file]'
          );
          await elementHandle?.uploadFile(path);
          await page.click('#tool-submit-button > input');
          await page.waitForNavigation({waitUntil: 'domcontentloaded'});
          await page.click('#tool-submit-button > input');
          await page.waitForNavigation({waitUntil: 'domcontentloaded'});
          await page.waitForSelector('#output > p.outfile > video > source');
          Promise.resolve(
            await page.$eval(
              '#output > p.outfile > video > source',
              (elm: any) => elm.src
            )
          );
          await page.close();
        })
        .catch(async (error) => {
          console.log(error);
          await page.close();
          return Promise.reject('Maaf, url tidak valid');
        });
    } catch (error) {
      console.log(error);
      return Promise.reject('Maaf, url tidak valid');
    }
  }
}
