const fs = require('fs-extra');
const fetch = require('node-fetch');
const {apikeys} = fs.readJSONSync('./json/config.json');
const arrayOfTogel = [];
const togelCreate = async () => {
  const response = await fetch(
    `https://api.vhtear.com/togel&apikey=${apikeys.vthear}`
  );
  if (!response.ok) return console.log('Togel fetch err');
  const json = await response.json();
  for (const i of json.result.hasil) {
    arrayOfTogel.push(i);
  }
};
togelCreate();
const shopee = query =>
  new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://api.vhtear.com/shopee?query=${query}1&count=3&apikey=${apikeys.vthear}`
    );
    if (!response.ok) return reject('Sedang dalam error :D');
    const json = await response.json();
    let counter = 1,
      hasil = '*Shoope Search Result*\n';
    for (const i of json.result.items) {
      hasil += `*Barang ke-${counter}*
➤ Nama : ${i.nama}
➤ Harga : ${i.harga}
➤ Terjual : ${i.terjual}
➤ Lokasi : ${i.shop_location}
➤ Link : ${i.link_product}\n\n`;
      counter++;
    }
    return resolve(
      hasil +
        '-------------------------------------------------------------------\n_*Processing Sukses #XyZ BOT*_'
    );
  });
exports.shopee = shopee;

const resep = query =>
  new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://api.vhtear.com/resepmasakan?query=${query}&apikey=${apikeys.vthear}`
    );
    if (!response.ok) return reject('Resep tidak valid/Sedang error');
    const json = await response.json();
    const hasil = `*Resep ${query}*
➤ Resep : ${json.result.title}
➤ Bahan :
${json.result.bahan}
➤ Langkah-Langkah :
${json.result.cara}\n`;
    return resolve({
      url: json.result.image,
      formated:
        hasil +
        '-------------------------------------------------------------------\n_*Processing Sukses #XyZ BOT*_',
    });
  });
exports.resep = resep;

const togel = () =>
  new Promise((resolve, reject) => {
    if (!arrayOfTogel) return reject('Sedang error, coba lain kali...');
    const i = Math.floor(Math.random() * arrayOfTogel.length);
    const hasil = `*Togel*
➤ Provider : ${arrayOfTogel[i].Negara}
➤ Senin : ${arrayOfTogel[i].Senin}
➤ Selasa : ${arrayOfTogel[i].Selasa}
➤ Rabu : ${arrayOfTogel[i].Rabu}
➤ Kamis : ${arrayOfTogel[i].Kamis}
➤ Jumat : ${arrayOfTogel[i].Jumat}
➤ Sabtu : ${arrayOfTogel[i].Sabtu}
➤ Minggu : ${arrayOfTogel[i].Minggu}
-------------------------------------------------------------------\n_*Processing Sukses #XyZ BOT*_`;
    return resolve(hasil);
  });
exports.togel = togel;
