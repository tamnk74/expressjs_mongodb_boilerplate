import axios from 'axios';
import { zaloConfig } from '../config';

export default class Zalo {
  static async getAccessToken(code) {
    const zaloUrl = 'https://oauth.zaloapp.com/v3/access_token';
    const res = await axios.get(
      `${zaloUrl}?app_id=${zaloConfig.appId}&app_secret=${zaloConfig.appSecret}&code=${code}`
    );
    const { access_token: accessToken, error } = res.data;
    if (error) {
      throw new Error('LOG-0006');
    }

    return accessToken;
  }

  static async getUser(accessToken) {
    const zaloUrl = 'https://graph.zalo.me/v2.0/me';
    const res = await axios.get(
      `${zaloUrl}?access_token=${accessToken}&fields=id,birthday,name,gender,picture`
    );
    const { error } = res.data;
    if (error) {
      throw new Error('LOG-0006');
    }
    return res.data;
  }
}
