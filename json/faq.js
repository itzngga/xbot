const fs = require('fs-extra');
const {prefix: p} = fs.readJSONSync('./json/setting.json');
const findFaq = msg => {
  msg = msg.toLowerCase();
  if (msg.substr(0, 1) !== p) msg = p + msg;
  const find = faq.findIndex(x => x.cmd == msg);
  if (find !== -1) {
    return faq[find].desc;
  } else {
    return `_*XyZ BOT Faq*_
------------------------------------------------------------------
Faq dari *Perintah* ${msg}
tidak ditemukan!

gunakann ${p}help untuk melihat *Perintah*
yang berada dalam faq
------------------------------------------------------------------`;
  }
};
module.exports = findFaq;
const faq = [
  {
    cmd: p + 'menu',
    desc: `_*XyZ BOT ${p}help Faq*_
------------------------------------------------------------------
*Fungsi umum* : Informasi seluruh *Perintah* yang ada di bot
*Perintah* : ${p}help, ${p}menu, ${p}help 2, ${p}menu 2
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'help',
    desc: `_*XyZ BOT ${p}help Faq*_
------------------------------------------------------------------
*Fungsi umum* : Informasi seluruh *Perintah* yang ada di bot
*Perintah* : ${p}help, ${p}menu, ${p}help 2, ${p}menu 2
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'sticker',
    desc: `_*XyZ BOT ${p}sticker Faq*_
------------------------------------------------------------------
*Fungsi umum* : mengirim sticker menggunakan caption
*Perintah* : ${p}sticker, ${p}stiker
*Contoh* : 

Kirim gambar dengan caption ${p}sticker atau 
reply gambar yang telah dikirim dengan *Perintah* yang sama
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'tiktok',
    desc: `_*XyZ BOT ${p}tiktok Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload media dari tiktok
*Perintah* : ${p}tiktok
*Contoh* :

Gunakan ${p}tiktor [link]
untuk memulai request ke bot

*Error* :
User private/video tidak valid
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'translate',
    desc: `_*XyZ BOT ${p}translate Faq*_
------------------------------------------------------------------
*Fungsi umum* : Translate teks ke bahasa tujuan
*Perintah* : ${p}translate
*Contoh* :

Gunakan ${p}translate [kode bahasa] {teks}
untuk translate dari bahasa yg di deteksi otomatis ke bahasa tujuan

*Error* :
Kode bahasa tertentu tidak didukung
*${p}bahasa*
untuk melihat daftar kode bahasa
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'qrcode',
    desc: `_*XyZ BOT ${p}qrcode Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mengubah teks ke barcode QR
*Perintah* : ${p}qrcode {teks}
*Contoh* :

Gunakan ${p}qrcode {teks}
untuk mengubah teks ke QRCODE

*Error* :
terkadang server *Error* dan merespon apapun
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'leave',
    desc: `_*XyZ BOT ${p}leave Faq*_
------------------------------------------------------------------
*Fungsi umum* : Memberi *Perintah* agar bot keluar dengan sendirinya
*Perintah* : ${p}leave
*Contoh* :

Gunakan ${p}leave
untuk keluar dari group

*Syarat* :
- chat dalam group
- pengirim *Perintah* admin group

------------------------------------------------------------------`,
  },
  {
    cmd: p + 'simsimi help',
    desc: `_*XyZ BOT ${p}simsimi help Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan penjelasan tentang fitur simsimi
*Perintah* : ${p}simsimi help
*Contoh* :

Gunakan ${p}simsimi help
untuk menampilkan penjelasan fitur simsimi
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'lirik',
    desc: `_*XyZ BOT ${p}lirik Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan lirik dengan artis dan judul lagu tertentu
*Perintah* : ${p}lirik
*Contoh* :

Gunakan ${p}lirik [artis] {lagu}
untuk menampilkan lirik dari artis dan judul lagu tertentu

*Error* :
lagu tidak ditemukan
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'nhinfo',
    desc: `_*XyZ BOT ${p}nhinfo Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan detail informasi dari doujin/manga hentai
*Perintah* : ${p}nhinfo
*Contoh* :

Gunakan ${p}nhinfo [kode nuklir]
untuk menampilkan detail informasi dari doujin/manga hentai

*Error* :
doujin/manga hentai tidak ditemukan
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'gift',
    desc: `_*XyZ BOT ${p}gift Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mengirim limit media ke target
*Perintah* : ${p}gift
*Contoh* :

Gunakan ${p}gift [jumlah] [tag target]
untuk mengirim limit media ke target,
maksimal gift adalah 5!

*Error* :
- Target memiliki limit yang berlebih
- Limit anda kurang dari jumlah
- Limit anda sudah habis
- Target memiliki limit yang masih penuh
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'ig',
    desc: `_*XyZ BOT ${p}ig Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload media dari instagram
*Perintah* : ${p}ig, ${p}instagram
*Contoh* :

Gunakan ${p}ig [link]
untuk mendownload media dari instagram

*Error* :
link tidak mengandung video/foto dan juga user private
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'instagram',
    desc: `_*XyZ BOT ${p}instagram Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload media dari instagram
*Perintah* : ${p}ig, ${p}instagram
*Contoh* :

Gunakan ${p}instagram [link]
untuk mendownload media dari instagram

*Error* :
link tidak mengandung video/foto dan juga user private
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'twt',
    desc: `_*XyZ BOT ${p}twt Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload media dari twitter
*Perintah* : ${p}twt, ${p}twitter
*Contoh* :

Gunakan ${p}twt [link]
untuk medownload media dari twitter

*Error* :
link tidak mengandung video/foto dan juga user private
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'twitter',
    desc: `_*XyZ BOT ${p}twitter Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload media dari twitter
*Perintah* : ${p}twt, ${p}twitter
*Contoh* :

Gunakan ${p}twitter [link]
untuk medownload media dari twitter

*Error* :
link tidak mengandung video/foto dan juga user private
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'speed',
    desc: `_*XyZ BOT ${p}speed Faq*_
------------------------------------------------------------------
*Fungsi umum* : menampilkan kecepatan processing BOT
*Perintah* : ${p}speed, ${p}ping
*Contoh* :

Gunakan ${p}speed
untuk menampilkan kecepatan processing BOT
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'ping',
    desc: `_*XyZ BOT ${p}ping Faq*_
------------------------------------------------------------------
*Fungsi umum* : menampilkan kecepatan processing BOT
*Perintah* : ${p}speed, ${p}ping
*Contoh* :

Gunakan ${p}ping
untuk menampilkan kecepatan processing BOT
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'fb',
    desc: `_*XyZ BOT ${p}fb Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload media facebook
*Perintah* : ${p}fb, ${p}facebook
*Contoh* : 

Gunakan ${p}fb [link]
untuk medownload media facebook

*Error* :
link bukan video/gambar dan juga user private
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'facebook',
    desc: `_*XyZ BOT ${p}facebook Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload media facebook
*Perintah* : ${p}fb, ${p}facebook
*Contoh* : 

Gunakan ${p}facebook [link]
untuk medownload media facebook

*Error* :
link bukan video/gambar dan juga user private
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'yt',
    desc: `_*XyZ BOT ${p}yt Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload video youtube
*Perintah* : ${p}yt, ${p}youtube
*Contoh* :

Gunakan ${p}yt [link]
untuk mendownload video youtube

*Contoh* : 
- video tidak private
- video tidak age restricted
- video bersifat publik

*Error* :
server terkadang *Error* jadi harus di ulang kembali
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'youtube',
    desc: `_*XyZ BOT ${p}youtube Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload video youtube
*Perintah* : ${p}youtube
*Contoh* :

Gunakan ${p}youtube [link]
untuk mendownload video youtube

*Contoh* : 
- video tidak private
- video tidak age restricted
- video bersifat publik

*Error* :
server terkadang *Error* jadi harus di ulang kembali
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'ytmp3',
    desc: `_*XyZ BOT ${p}ytmp3 Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload video youtube ke sound/mp3
*Perintah* : ${p}ytmp3
*Contoh* :

Gunakan ${p}ytmp3 [link]
untuk mendownload video youtube ke sound/mp3

*Contoh* : 
- video tidak private
- video tidak age restricted
- video bersifat publik

*Error* :
jika proses lama dan tidak ada respon video mungkin tidak bisa di proses
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'gtts',
    desc: `_*XyZ BOT ${p}gtts Faq*_
------------------------------------------------------------------
*Fungsi umum* : Konversi teks ke TextToSpeech Google (suara)
*Perintah* : ${p}gtts
*Contoh* :

Gunakan ${p}gtts {teks}
untuk konversi teks ke TextToSpeech Google (suara)

*Error* :
teks terlalu panjang untuk di konversi
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'lang',
    desc: `_*XyZ BOT ${p}lang Faq*_
------------------------------------------------------------------
*Fungsi umum* : Konversi teks ke TextToSpeech Google (suara) bahasa tertentu
*Perintah* : ${p}lang
*Contoh* :

Gunakan ${p}lang [kode bahasa] {teks}
untuk konversi teks ke TextToSpeech Google (suara) bahasa tertentu

*Error* :
- kode bahasa tidak didukung
${p}bahasa
untuk melihat daftar kode bahasa
- teks terlalu panjang untuk di konversi
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'qnime',
    desc: `_*XyZ BOT ${p}qnime Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan quote anime dari karakter/anime tertentu
*Perintah* : ${p}qnime char, ${p}qnime anime
*Contoh* :

Gunakan ${p}qnime char {nama karakter}
untuk menampilkan quote dari karakter tertentu

Gunakan ${p}qnime char {nama anime}
untuk menampilkan quote dari anime tertentu

*Error* :
karakter atau anime tidak ada
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'adult zone',
    desc: `_*XyZ BOT ${p}adult zone Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan *Perintah* yang mungkin mengandung unsur dewasa 
*Perintah* : ${p}adult zone
*Contoh* :

Gunakan ${p}adult zone
untuk menampilkan *Perintah* yang mungkin mengandung unsur dewasa
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'everyone',
    desc: `_*XyZ BOT ${p}everyone Faq*_
------------------------------------------------------------------
*Fungsi umum* : Tag semua member group
*Perintah* : ${p}everyone
*Contoh* :

Gunakan ${p}everyone
untuk tag semua member group

*Syarat* :
- chat dalam group
- pengirim *Perintah* adalah admin group

*Error* :
terkadang format tag tidak terbaca
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'waifu',
    desc: `_*XyZ BOT ${p}waifu Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan gambar random waifu pilihan
*Perintah* : ${p}waifu
*Contoh* :

Gunakan ${p}waifu
untuk menampilkan gambar random waifu pilihan

*Error* :
terkadang *Error* server tidak merespon

_*WARNING*_
*Perintah* ini termasuk dalam nsfw
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'kucing',
    desc: `_*XyZ BOT ${p}kucing Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan gambar random kucing lucu
*Perintah* : ${p}kucing
*Contoh* :

Gunakan ${p}kucing
untuk menampilkan gambar random kucing lucu

*Error* :
terkadang *Error* server tidak merespon
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'wallpaper',
    desc: `_*XyZ BOT ${p}wallpaper Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan gambar random wallpaper
*Perintah* : ${p}wallpaper
*Contoh* :

Gunakan ${p}wallpaper
untuk menampilkan gambar random wallpaper

*Error* :
terkadang *Error* server tidak merespon
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'wanime',
    desc: `_*XyZ BOT ${p}wanime Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan gambar random wallpaper anime
*Perintah* : ${p}wanime
*Contoh* :

Gunakan ${p}wanime
untuk menampilkan gambar random wallpaper anime

*Error* :
terkadang *Error* server tidak merespon
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'bmkg',
    desc: `_*XyZ BOT ${p}bmkg Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan catatan gempa lebih dari 5.1 SR
*Perintah* : ${p}bmkg
*Contoh* :

Gunakan ${p}bmkg
untuk menampilkan catatan gempa lebih dari 5.1 SR
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'cekresi',
    desc: `_*XyZ BOT ${p}cekresi Faq*_
------------------------------------------------------------------
*Fungsi umum* : Cekresi paket anda dengan format tertentu
*Perintah* : ${p}cekresi
*Contoh* :

Gunakan ${p}cekresi [no-resi] [kurir]
untuk cekresi paket anda dengan kurir :
- jne   - sicepat   - wahana    - lek
- pos   - tiki      - ninja
- jnt   - anteraja  - lion

*Error* :
nomor resi yang anda masukan tidak valid
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'wait',
    desc: `_*XyZ BOT ${p}wait Faq*_
------------------------------------------------------------------
*Fungsi umum* : What Anime Is That (Saource)
*Perintah* : ${p}wait
*Contoh* :

Gunakan ${p}wait
dengan gambar bercaption atau reply dengan *Perintah* yang sama

*Error* :
anime tidak ditemukan dan hasil tidak tepat
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'bahasa',
    desc: `_*XyZ BOT ${p}bahasa Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan kode bahasa
*Perintah* : ${p}bahasa
*Contoh* :

Gunakan ${p}bahasa
untuk menampilkan kode bahasa
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'quoteit',
    desc: `_*XyZ BOT ${p}quoteit Faq*_
------------------------------------------------------------------
*Fungsi umum* : Membuat quote gambar random dari teks dan author
*Perintah* : ${p}quoteit
*Contoh* :

Gunakan ${p}quoteit XyZ | Anjay Mabar
untuk membuat quote gambar random dari teks Anjay Mabar dengan Author XyZ
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'info',
    desc: `_*XyZ BOT ${p}info Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan informasi update dari XyZ BOT
*Perintah* : ${p}info
*Contoh* :

Gunakan ${p}info
untuk menampilkan informasi update dari XyZ BOT
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'delete',
    desc: `_*XyZ BOT ${p}delete Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menghapus pesan yang dikirim oleh BOT
*Perintah* : ${p}delete
*Contoh* :

Gunakan ${p}delete
untuk menghapus chat yang dikirim oleh bot dengan reply

*Error* :
- reply bukan dari chat dari bot
- chat sudah terhapus
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'brainly',
    desc: `_*XyZ BOT ${p}brainly Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan hasil pencarian brainly dengan teks
*Perintah* : ${p}brainly
*Contoh* :

Gunakan ${p}brainly {teks}
untuk menampilkan hasil pencarian brainly dengan teks

*Error* :
hasil pencarian/jawaban tidak ada
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'notif start',
    desc: `_*XyZ BOT ${p}notif start Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mengaktifkan notifikasi update corona dari bot setiap jam 9:30 pagi
*Perintah* : ${p}notif start
*Contoh* :

Gunakan ${p}notif start
untuk mengaktifkan notifikasi update corona dari bot setiap jam 9:30 pagi

------------------------------------------------------------------`,
  },
  {
    cmd: p + 'notif stop',
    desc: `_*XyZ BOT ${p} Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menghentikan notifikasi update corona dari bot setiap jam 9:30 pagi
*Perintah* : ${p}notif stop
*Contoh* :

Gunakan ${p}notif stop
untuk menghentikan notifikasi update corona dari bot setiap jam 9:30 pagi
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'corona',
    desc: `_*XyZ BOT ${p}corona Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan update corona dunia dan indonesia
*Perintah* : ${p}corona
*Contoh* :

Gunakan ${p}corona
untuk menampilkan update corona dunia dan indonesia
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'corona prov',
    desc: `_*XyZ BOT ${p}corona prov Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan update corona bedasarkan provinsi
*Perintah* : ${p}corona prov
*Contoh* :

Gunakan ${p}corona prov {nama provinsi}
Untuk menampilkan update corona bedasarkan provinsi

*Error* :
Provinsi tidak valid, gunakan format formal
seperti DKI Jakarta, Jawa Barat, Kalimantan Timur
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'nhder',
    desc: `_*XyZ BOT ${p}nhder Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload doujin/manga hentai dalam bentuk ZIP
*Perintah* : ${p}nhder
*Contoh* :

Gunakan ${p}nhder [kode nuklir]
untuk mendownload doujin/manga hentai dalam bentuk ZIP

*Error* :
link muncul tapi download tidak akan berhenti
direkomendasikan ${p}nhinfo sebelum download

_*WARNING*_
*Perintah* ini termasuk dalam nsfw
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'anime',
    desc: `_*XyZ BOT ${p}anime Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan informasi anime dari teks
*Perintah* : ${p}anime
*Contoh* :

Gunakan ${p}anime {teks}
untuk menampilkan informasi anime dari teks

*Error* :
Anime tidak di temukan
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'quote',
    desc: `_*XyZ BOT ${p}quote Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan quote bucin/inspirasi hidup
*Perintah* : ${p}quote
*Contoh* :

Gunakan ${p}quote
untuk menampilkan quote bucin/inspirasi hidup

*Error* :
terkadang *Error* server tidak merespon
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'likee',
    desc: `_*XyZ BOT ${p}likee Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mendownload media dari sosmed Likee
*Perintah* : ${p}likee
*Contoh* :

Gunakan ${p}likee [link]
untuk mendownload media dari sosmed likee

*Error* :
link bukan video/foto atau user private
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'mnt',
    desc: `_*XyZ BOT ${p}mnt Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan *Contoh* dan ketentuan XyZ BOT
*Perintah* : ${p}mnt
*Contoh* :

Gunakan ${p}mnt
Untuk menampilkan *Syarat* dan ketentuan XyZ BOT
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'google',
    desc: `_*XyZ BOT ${p}google Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan hasil pencarian google menurut teks
*Perintah* : ${p}google
*Contoh* :

Gunakan ${p}google {teks}
untuk menampilkan hasil pencarian google menurut teks
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'igstalk',
    desc: `_*XyZ BOT ${p}igstalk Faq*_
------------------------------------------------------------------
*Fungsi umum* : Stalk instagram target
*Perintah* : ${p}igstalk
*Contoh* :

Gunakan ${p}igstalk [username]
untuk stalk instagram target

*Error* :
username tidak ditemukan
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'quran',
    desc: `_*XyZ BOT ${p}quran Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan surah random dari Al-Quran
*Perintah* : ${p}quran
*Contoh* :

Gunakan ${p}quran
untuk menampilkan surah random dari Al-Quran
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'surah',
    desc: `_*XyZ BOT ${p}surah Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan informasi, arab, latin, arti dari surah
*Perintah* : ${p}
*Contoh* :

Gunakan ${p}surah [nomor surah]
untuk menampilkan informasi surah

Gunakan ${p}surah [nomor surah] [ayat]
untuk menampilkan surah menurut ayat :
- ayat 1-10
ayat urutan dari 1 sampai 10
- ayat 1,2,3
ayat pilihan 1,2,dan 3
-ayat 1
hanya satu ayat

*Error* :
nomor surah/ayat tidak valid
${p}list surah
untuk menampilkan daftar nomor surah
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'list surah',
    desc: `_*XyZ BOT ${p}list surah Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan daftar nomor surah
*Perintah* : ${p}list surah
*Contoh* :

Gunakan ${p}list surah
untuk menampilkan daftar nomor surah
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'compress',
    desc: `_*XyZ BOT ${p}compress Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mengkompress gambar yang anda kirim
*Perintah* : ${p}compress
*Contoh* :

Gunakan ${p}compress
untuk mengkompress gambar yang anda kirim dengan
caption atau reply gambar tersebut
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'join',
    desc: `_*XyZ BOT ${p}join Faq*_
------------------------------------------------------------------
*Fungsi umum* : Join ke group dengan link group tersebut
*Perintah* : ${p}join
*Contoh* :

Gunakan ${p}join [link-group]
untuk join ke group dengan link

*Contoh* :
- group member harus melebihi 25
- daya tampung group bot tidak penuh
- bot sedang tidak maintenance
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'limit',
    desc: `_*XyZ BOT ${p}limit Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan limit media anda yang tersisa
*Perintah* : ${p}limit
*Contoh* :

Gunakan ${p}limit
untuk menampilkan limit media anda yang tersisa
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'bug report',
    desc: `_*XyZ BOT ${p}bug report Faq*_
------------------------------------------------------------------
*Fungsi umum* : Laporkan masalah BOT ke owner
*Perintah* : ${p}bug report
*Contoh* :

Gunakan ${p}bug report {masalah}
untuk laporkan masalah BOT ke owner
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'kick',
    desc: `_*XyZ BOT ${p}kick Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mengeluarkan member dari group
*Perintah* : ${p}kick
*Contoh* :

Gunakan ${p}kick [tag]
untuk mengeluarkan member dari group

*Syarat* :
- chat dalam group
- pengirim *Perintah* admin group
- bot adalah admin group
- target tidak boleh admin group
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'add',
    desc: `_*XyZ BOT ${p}add Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menambahkan member ke group
*Perintah* : ${p}add
*Contoh* :

Gunakan ${p}add [nomor]
untuk menambahkan member ke group

*Contoh* :
- chat dalam group
- pengirim *Perintah* admin group
- bot adalah admin group
- target ada di kontak bot
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'op',
    desc: `_*XyZ BOT ${p}op Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menambahkan admin group baru
*Perintah* : ${p}op
*Contoh* :

Gunakan ${p}op [tag]
untuk menambahkan admin group baru

*Contoh* :
- chat dalam group
- pengirim *Perintah* admin group
- bot adalah admin group
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'deop',
    desc: `_*XyZ BOT ${p}deop Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menghapus status admin group target
*Perintah* : ${p}deop
*Contoh* :

Gunakan ${p}deop
untuk menghapus status admin group target

*Contoh* :
- chat dalam group
- pengirim *Perintah* admin group
- bot adalah admin group
- target adalah admin group
------------------------------------------------------------------`,
  },
  {
    cmd: p + '',
    desc: `_*XyZ BOT ${p} Faq*_
------------------------------------------------------------------
*Fungsi umum* : 
*Perintah* : ${p}
*Contoh* :

Gunakan ${p}

*Error* :

------------------------------------------------------------------`,
  },
  {
    cmd: p + 'group',
    desc: `_*XyZ BOT ${p}group Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan list utilitas group
*Perintah* : ${p}group
*Contoh* :

Gunakan ${p}group
untuk menampilkan list utilitas group
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'bacot',
    desc: `_*XyZ BOT ${p}bacot Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan quote buatan pengguna BOT ini
*Perintah* : ${p}bacot, ${p}bacot add
*Contoh* :

Gunakan ${p}bacot
untuk menampilkan quote buatan pengguna BOT ini
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'bacot add',
    desc: `_*XyZ BOT ${p}bacot add Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menambahkan quote ke database bot
*Perintah* : ${p}bacot add
*Contoh* :

Gunakan ${p}bacot add
untuk menambahkan quote ke database bot

_*WARNING*_
teks akan difilter dan pembuat nomor pembuat quote akan disimpan di database
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'me',
    desc: `_*XyZ BOT ${p}me Faq*_
------------------------------------------------------------------
*Fungsi umum* : BOT memberikan foto profile anda dan status sebagai caption
*Perintah* : ${p}me
*Contoh* :

Gunakan ${p}me
untuk agar BOT memberikan foto profile anda dan status sebagai caption
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'nsfw on',
    desc: `_*XyZ BOT ${p}nsfw on Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mengaktifkan mode nsfw/mode dewasa di chat ini
*Perintah* : ${p}nsfw on, ${p}nsfw off
*Contoh* :

Gunakan ${p}nsfw on
untuk mengaktifkan mode nsfw/mode dewasa di chat ini
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'nsfw off',
    desc: `_*XyZ BOT ${p}nsfw off Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menonaktifkan mode nsfw/mode dewasa di chat ini
*Perintah* : ${p}nsfw on, ${p}nsfw off
*Contoh* :

Gunakan ${p}nsfw off
untuk menonaktifkan mode nsfw/mode dewasa di chat ini
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'mute',
    desc: `_*XyZ BOT ${p}mute Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mensilent BOT agar tidak menerima *Perintah*
*Perintah* : ${p}mute, ${p}unmute
*Contoh* :

Gunakan ${p}mute
untuk mensilent BOT agar tidak menerima *Perintah*
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'unmute',
    desc: `_*XyZ BOT ${p}unmute Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mengaktifkan bot kembali setelah di mute
*Perintah* : ${p}mute, ${p}unmute
*Contoh* :

Gunakan ${p}unmute
untuk mengaktifkan BOT kembali setelah di mute
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'yts',
    desc: `_*XyZ BOT ${p}yts Faq*_
------------------------------------------------------------------
*Fungsi umum* : Informasi pencarian youtube
*Perintah* : ${p}yts, ${p}ytsearch
*Contoh* :

Gunakan ${p}yts *Alan Walker - Faded*
untuk mencari youtube yang berhubungan dengan Alan Walker - Faded

*Error* :
Pencarian youtube tidak di temukan
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'ytsearch',
    desc: `_*XyZ BOT ${p}ytsearch Faq*_
------------------------------------------------------------------
*Fungsi umum* : Informasi pencarian youtube
*Perintah* : ${p}yts, ${p}ytsearch
*Contoh* :

Gunakan ${p}ytsearch *Alan Walker - Faded*
untuk mencari youtube yang berhubungan dengan Alan Walker - Faded

*Error* :
Pencarian youtube tidak di temukan
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'ttp',
    desc: `_*XyZ BOT ${p}ttp Faq*_
------------------------------------------------------------------
*Fungsi umum* : Text To Picture, mengkonversi teks ke sticker
*Perintah* : ${p}ttp
*Contoh* :

Gunakan ${p}ttp *Anjay*
agar bot mengirimkan sticker dengan label "Anjay"

*Error* :
Teks tidak valid/emoji tidak terbaca
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'meme',
    desc: `_*XyZ BOT ${p}meme Faq*_
------------------------------------------------------------------
*Fungsi umum* : Meme luar dengan tema Anime
*Perintah* : ${p}meme
*Contoh* :

Gunakan ${p}meme
untuk mengirimkan meme luar dengan tema anime

*Error* :
Terkadang tidak merespon
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'news',
    desc: `_*XyZ BOT ${p}news Faq*_
------------------------------------------------------------------
*Fungsi umum* : Mencari berita indonesia dengan keyword tertentu
*Perintah* : ${p}news
*Contoh* :

Gunakan ${p}news Jokowi
untuk mencari berita tentang Jokowi
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'cmd',
    desc: `_*XyZ BOT ${p}cmd Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menambahkan custom command ke group
*Perintah* : ${p}cmd, ${p}delcmd, ${p}cmdlist
*Contoh* :

Gunakan ${p}cmd /about Saya adalah XyZ BOT dengam multifungsionalitas tinggi!
untuk menambah custom command ke group yang akan menghasilkan
Saya adalah XyZ BOT dengam multifungsionalitas tinggi!
jika /about di panggil

*Error*
custom command telah ada dan tidak bisa di buat lagi
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'delcmd',
    desc: `_*XyZ BOT ${p}delcmd Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menghapus custom command di group
*Perintah* : ${p}cmd, ${p}delcmd, ${p}cmdlist
*Contoh* :

Gunakan ${p}delcmd /about
untuk menghapus custom command /about dari group

*Error*
custom command tidak ada
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'cmdlist',
    desc: `_*XyZ BOT ${p}cmdlist Faq*_
------------------------------------------------------------------
*Fungsi umum* : Menampilkan list custom command yg ada di group ini
*Perintah* : ${p}cmd, ${p}delcmd, ${p}cmdlist
*Contoh* :

Gunakan ${p}cmdlist
untuk menampilkan list custom command yg ada di group ini

*Error*
custom command belum pernah di tambahkan
------------------------------------------------------------------`,
  },
  {
    cmd: p + 'bitly',
    desc: `_*XyZ BOT ${p}bitly Faq*_
------------------------------------------------------------------
*Fungsi umum* : Shorten link ke bitly
*Perintah* : ${p}bitly
*Contoh* :

Gunakan ${p}bitly https://www.google.com
untuk shorten link google ke bitly

*Error*
link tidak valid
------------------------------------------------------------------`,
  },
];
module.exports = findFaq;
