import axios from 'axios';
import { formatResponseErrorMsg } from './utils/errorFormat';

const domain = 'http://localhost:5000';

export default class API {
  static login = async (body) => {
    try {
      const { data } = await axios.post(`${domain}/api/auth/login`, body);
      const { token, ...appData } = data;
      localStorage['token'] = token;
      return appData;
    } catch (err) {
      throw formatResponseErrorMsg(err);
    }
  }

  static authenticate = async () => {
    try {
      const currentToken = localStorage['token'];
      const { data } = await axios.get(`${domain}/api/auth`, {
        headers: { 'Authorization': `Bearer ${currentToken}` }
      });
      const { token, ...appData } = data;
      localStorage['token'] = token;
      return appData;
    } catch (err) {
      throw formatResponseErrorMsg(err);
    }
  }

  static fetchLocations = async () => {
    try {
      await this.authenticate();
      const { data } = await axios.get(`${domain}/api/locations`, {
        headers: { 'Authorization': `Bearer ${localStorage['token']}` }
      });
      return data;
    } catch (err) {
      throw formatResponseErrorMsg(err);
    }
  }
}
