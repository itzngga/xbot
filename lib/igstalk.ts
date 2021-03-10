import axios from 'axios';
import {igstalk, config} from '../types/index';

export default function (target: string): Promise<igstalk> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://www.instagram.com/${target}/?__a=1`, {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-US,en;q=0.9,id;q=0.8',
          'cache-control': 'max-age=0',
          'upgrade-insecure-requests': '1',
          cookie: config.igCookie,
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
        },
      })
      .then(({data}) => {
        const main = data.graphql.user;
        return resolve({
          username: main.username,
          fullname: main.full_name,
          biography: main.biography,
          private: main.is_private,
          imageurl: main.profile_pic_url_hd,
          followers: main.edge_followed_by.count,
          followed: main.edge_follow.count,
          post: main.edge_owner_to_timeline_media.count,
          highlight: main.highlight_reel_count,
        });
      })
      .catch(() => reject('Maaf, username tidak valid'));
  });
}
