const news: any = require('indo-news-scraper');

export default (keyword: string) => {
  return new Promise((resolve, reject) => {
    const beritaLink = Math.floor(Math.random() * 8);
    switch (beritaLink) {
      case 1:
        news.Viva.scrap(keyword)
          .then((res: any) => {
            return resolve(res[0]);
          })
          .catch((err: any) => reject(err));
        break;
      case 2:
        news.Antara.scrap(keyword)
          .then((res: any) => {
            return resolve(res[0]);
          })
          .catch((err: any) => reject(err));
        break;
      case 3:
        news.Kompas.scrap(keyword)
          .then((res: any) => {
            return resolve(res[0]);
          })
          .catch((err: any) => reject(err));
        break;
      case 4:
        news.Liputan6.scrap(keyword)
          .then((res: any) => {
            return resolve(res[0]);
          })
          .catch((err: any) => reject(err));
        break;
      case 5:
        news.Republika.scrap(keyword)
          .then((res: any) => {
            return resolve(res[0]);
          })
          .catch((err: any) => reject(err));
        break;
      case 6:
        news.Suara.scrap(keyword)
          .then((res: any) => {
            return resolve(res[0]);
          })
          .catch((err: any) => reject(err));
        break;
      case 7:
        news.Tempo.scrap(keyword)
          .then((res: any) => {
            return resolve(res[0]);
          })
          .catch((err: any) => reject(err));
        break;
      default:
        news.Detik.scrap(keyword)
          .then((res: any) => {
            return resolve(res[0]);
          })
          .catch((err: any) => reject(err));
        break;
    }
  });
};
