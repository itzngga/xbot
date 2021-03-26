export function help(prefix: string) {
  const hasil = `*「 XyZ SELF 」*

*MAIN*
• prefix: *「$prefix」*
• name: *$name*
• creator: *@itzngga*
• cmd-count: *$hit times*
• runtime: *$runtime*
• servertime: 
*_<%>_*

*GAME*
• ${prefix}rank
• ${prefix}mine
• ${prefix}chop
• ${prefix}dig
• ${prefix}trade
• ${prefix}hunt
• ${prefix}thief
• ${prefix}fight
• ${prefix}dungeon
• ${prefix}level
• ${prefix}gameLimit
• ${prefix}level help
• ${prefix}quiz *{difficult}*
• ${prefix}tictactoe *[tag]*
• ${prefix}caklontong
• ${prefix}captha
• ${prefix}slots

*TEXT*
• ${prefix}md5 *{teks}*
• ${prefix}sha1 *{teks}*
• ${prefix}sha3 *{teks}*
• ${prefix}sha256 *{teks}*
• ${prefix}sha512 *{teks}*
• ${prefix}mock *{teks}*
• ${prefix}math *{teks}*
• ${prefix}reverse *{teks}*

*STICKER*
• ${prefix}slist
• ${prefix}s *{sticker name}*
• ${prefix}ssave *(reply img)*
• ${prefix}supdate *(reply img)*
• ${prefix}sdelete *{sticker name}*
• ${prefix}sinfo *{sticker name}*
• ${prefix}sticker *(send video)*
• ${prefix}sticker *{url gambar}*

*IMAGE*
• ${prefix}fp *atau [tag]*
• ${prefix}burn *{teks}*
• ${prefix}fisheye *[int]*
• ${prefix}wasted *atau [tag]*
• ${prefix}wanted *atau [tag]*
• ${prefix}rainbow *atau [tag]*
• ${prefix}fuse *[tag1] [tag2]*
• ${prefix}thuglife *atau [tag]*
• ${prefix}triggered *atau [tag]*
• ${prefix}tobe */ (reply image)*
• ${prefix}deepfry */ (reply image)*
• ${prefix}triggered *atau [tag]*
• ${prefix}memegen *{text atas} | {text bwh}*
• ${prefix}memegen2 *{text}*

*AUDIO*
• ${prefix}8d (reply audio)
• ${prefix}destroy (reply media)
• ${prefix}bass *atau [DB] [FREQ]*

*MEDIA*
• ${prefix}meme
• ${prefix}quote
• ${prefix}bacot
• ${prefix}qnime
• ${prefix}kucing
• ${prefix}sticker
• ${prefix}compress
• ${prefix}wallpaper
• ${prefix}ss *{link}*
• ${prefix}ss2 *{link}*
• ${prefix}attp *[teks]*
• ${prefix}a-harta *[teks]*
• ${prefix}tahta *[teks]*
• ${prefix}harta *[teks]*
• ${prefix}nulis *{teks}*
• ${prefix}bitly *[link]*
• ${prefix}image *{query}*
• ${prefix}ocr *(reply gambar)*
• ${prefix}steal *(reply sticker)*
• ${prefix}qnime char *[char]*
• ${prefix}extract *(send video)*
• ${prefix}qnime anime *[anime]*
• ${prefix}inspect *(reply gambar)*
• ${prefix}translate *[kode bahasa] [teks]*
• ${prefix}lang *[kode bahasa] [teks]*
• ${prefix}quoteit *[author]* | *[teks]*
• ${prefix}bacot add *[quote]*
• ${prefix}qrcode *[teks]*
• ${prefix}gtts *[teks]*
• ${prefix}ttp *[teks]*
• ${prefix}ttd *[teks]*

*DOWNLOADER*
• ${prefix}yt *[url]*
• ${prefix}fb *[url]*
• ${prefix}ig *[url]*
• ${prefix}twt *[url]*
• ${prefix}ytmp3 *[url]*
• ${prefix}likee *[url]*
• ${prefix}tiktok *[url]*
• ${prefix}imp3 *[query]*
• ${prefix}music *[query]*

*INFORMATION*
• ${prefix}bmkg
• ${prefix}wait
• ${prefix}corona
• ${prefix}cek *[nomor]*
• ${prefix}yts *{query}*
• ${prefix}imdb *{query}*
• ${prefix}imdbs *{query}*
• ${prefix}gplay *{query}*
• ${prefix}kbbi *[kata]*
• ${prefix}cuaca *[kota]*
• ${prefix}resep *{query}*
• ${prefix}google *{query}*
• ${prefix}shopee *{query}*
• ${prefix}refrence *{query}*
• ${prefix}news *{pencarian}*
• ${prefix}lirik *{nama lagu}*
• ${prefix}anime *{nama anime}*
• ${prefix}igstalk *[username]*
• ${prefix}brainly *{pertanyaan}*
• ${prefix}wikipedia *{pencarian}*
• ${prefix}cekresi *[no resi] [kurir]*
• ${prefix}corona prov *[nama provinsi]*

*ISLAMIC*
• ${prefix}quran
• ${prefix}list surah
• ${prefix}sholat *[kota]*
• ${prefix}surah *[no surah]*
• ${prefix}surah *[no surah] ayat [ayat]*

*KERANG AJAIB*
• ?kapan *[pertanyaan]*
• ?apakah *[pertanyaan]*
• ?siapakah *[pertanyaan]*

*CLOUD STORAGE*
• ${prefix}cloud
• ${prefix}cloud add
• ${prefix}cloud help
• ${prefix}cloud remove

*UTILITAS*
• ${prefix}me
• ${prefix}cmdlist
• ${prefix}everyone
• ${prefix}getPic *[tag]*
• ${prefix}join *[link group]*
• ${prefix}delcmd *[perintah]*
• ${prefix}cmd *[perintah]* | *[balasan]*
• ${prefix}cmd *[perintah]* (kirim media)

*SELF*
• ${prefix}count
• ${prefix}prefix *[prefix]*
• ${prefix}upname *{name}*
• ${prefix}uprofile *(reply img)*
• ${prefix}upstatus *{status}*
• ${prefix}upstory *{story}*
• ${prefix}upstory *(reply img)*
• ${prefix}upstory *(reply video)*
• ${prefix}antivirtex *[on/off]*
• ${prefix}autoread *[on/off]*
• ${prefix}suggest *[on/off]*
• ${prefix}unsend *[on/off]*
• ${prefix}log *[on/off]*
• ${prefix}debug *[on/off]*
• ${prefix}eval *{js}*
• ${prefix}exec *{cmd}*
• ${prefix}getobj *{js/obj}*
• ${prefix}reply
• ${prefix}reply *[on/off]*
• ${prefix}reply add *[word]* *{reply}*
• ${prefix}reply remove *[word]*
• ${prefix}fitnah *[tag]* | *{text1}* | *{text2}*
• ${prefix}fakereply *[on/off]*
• ${prefix}fakereply jid *{id}*
• ${prefix}fakereply *{reply text}*
• ${prefix}fakereply *(reply img)*
• ${prefix}public *[tag]* (group)
• ${prefix}public (chat)
• ${prefix}public *[on/off]* (universal)


*BOT*
• ${prefix}mute
• ${prefix}unmute
• ${prefix}arch
• ${prefix}ping
• ${prefix}info
• ${prefix}error
• ${prefix}limit
• ${prefix}speed
• ${prefix}status
• ${prefix}delete
• ${prefix}quality
• ${prefix}changelog
• ${prefix}temp
• ${prefix}temp clear
• ${prefix}hidetag *{text}*
• ${prefix}retry (reply media)
• ${prefix}feature *{saran fitur}*
• ${prefix}decrypt (reply sticker)
• ${prefix}gift *[jmlah] [tag/nomor]*
• ${prefix}feedback *{kirim feedback}*
• ${prefix}bug *{laporan masalah}*
• ${prefix}bot restart
• ${prefix}bot block *[number]*
• ${prefix}bot unblock *[number]*
• ${prefix}bot leaveall
• ${prefix}bot clearall
• ${prefix}bot chatclear

*GROUP*
• ${prefix}leave
• ${prefix}invite
• ${prefix}tagall
• ${prefix}everyone
• ${prefix}onlyadmin
• ${prefix}desc {teks}
• ${prefix}subject {teks}
• ${prefix}add [tag]
• ${prefix}kick [tag]
• ${prefix}admin [tag]
• ${prefix}unadmin [tag]

_*「 XyZ BOT Automation 」*_`;
  return hasil;
}
export function quality(prefix: string) {
  return `*Animated Sticker Quality*
• *1*
very high, cocok untuk video pendek
• *2*
high, cocok untuk video menengah
• *3*
medium, cocok untuk video panjang
• *4*
low, cocok untuk video panjang
• *5*
very low, cocok untuk video panjang

Contoh: ${prefix}sticker 1
Kualitas default: *3*`;
}
export function donasi() {
  let hasil = `)%%%Jika bot ini dirasa bermanfaat 
marilah berdonasi agar bot bisa 
terus aktif dan update%%%.

• SAWERIA: https://saweria.co/donate/ItzNgga
• OVO: 081297980063
• DANA: 081297980063
• GOPAY: 081297980063
• INDOSAT: 08568970792

• Costumer Service ▼▼▼`;
  hasil = hasil.replace(/%%%/g, '```');
  return hasil;
}
export function cloudHelp(prefix: string) {
  return `*XyZ BOT Cloud*

• Apa itu cloud?
    - penyimpanan server
• Apakah cloud XyZ aman?
    - Aman, data anda di enkripsi dan tidak dapat dibuka oleh siapapun
• Berapa file yg dapat disimpan?
    - Maksimal hanya 1 file
• Apakah file bisa hilang?
    - Ya, karena server tidak tetap
    
Perintah:
• ${prefix}cloud
_mengirimkan file yg ada di cloud_
• ${prefix}cloud add
_menambahkan media ke cloud_
• ${prefix}cloud help
_penjelasan cloud_
• ${prefix}cloud remove
_hapus file di cloud_

*usahakan tidak menyimpan file penting*`;
}
export function bahasa() {
  return `*List kode Bahasa*\n
	*Code       Bahasa*
    sq        Albanian
    ar        Arabic
    hy        Armenian
    ca        Catalan
    zh        Chinese
    zh-cn     Chinese (China)
    zh-tw     Chinese (Taiwan)
    zh-yue    Chinese (Cantonese)
    hr        Croatian
    cs        Czech
    da        Danish
    nl        Dutch
    en        English
    en-au     English (Australia)
    en-uk     English (United Kingdom)
    en-us     English (United States)
    eo        Esperanto
    fi        Finnish
    fr        French
    de        German
    el        Greek
    ht        Haitian Creole
    hi        Hindi
    hu        Hungarian
    is        Icelandic
    id        Indonesian
    it        Italian
    ja        Japanese
    ko        Korean
    la        Latin
    lv        Latvian
    mk        Macedonian
    no        Norwegian
    pl        Polish
    pt        Portuguese
    pt-br     Portuguese (Brazil)
    ro        Romanian
    ru        Russian
    sr        Serbian
    sk        Slovak
    es        Spanish
    es-es     Spanish (Spain)
    es-us     Spanish (United States)
    sw        Swahili
    sv        Swedish
    ta        Tamil
    th        Thai
    tr        Turkish
    vi        Vietnamese
    cy        Welsh`;
}
