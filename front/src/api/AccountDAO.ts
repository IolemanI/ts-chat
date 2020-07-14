import axios from 'axios';
import API from './index';

const API_ENDPOINT = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PREFIX}`;

class AccountDAO extends API {
  constructor() {
    super({
      baseUrl: API_ENDPOINT,
      client: axios.create({
        baseURL: API_ENDPOINT,
        // withCredentials: true,
      }),
    });
    const parent = this.entity;

    this.entity = {
      login: ({ ...options } = {}) =>
        parent.get({ url: '/public/login', ...options }),
    };
  }
}

const DAO = new AccountDAO();
const Account = DAO.entity;

export default Account;
