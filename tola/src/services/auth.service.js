import {
    LOGIN_ENDPOINT,
    REFRESH_ENDPOINT,
    REGISTER_ENDPOINT,
  } from './auth.constants'
import toast from 'react-hot-toast';
  
  import request from "./api.request";
  
  class AuthService {
    constructor() {
      this.login = this.login.bind(this);
    }
  
    async login(username, password) {
      let resp = await request({
        url: LOGIN_ENDPOINT,
        method: 'POST',
        data:   {
          username,
          password
        }
      })
  
      if (resp.data.access) {
        return this.setToken(resp)
      }
    }
  
    logout() {
      localStorage.removeItem("user");
    }
  
    async register({
      username,
      email,
      password,
      first_name,
      last_name
    }) {
      await request({
        url: REGISTER_ENDPOINT,
        method: 'POST',
        data: {
          username,
          email,
          password,
          first_name: first_name,
          last_name: last_name,
        }
      })
      .then(() => {
        this.login(username, password)
      }).catch(error => toast.error(error))
    }
  
    setToken(resp) {
      localStorage.setItem("user", JSON.stringify(resp.data));
      return resp.data
    }
  
    async refreshToken() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user.refresh) {
        return await request({
          url: REFRESH_ENDPOINT,
          method: 'POST',
          data: {
            refresh: user.refresh
          }
        })
      }
    }
  }
  
  export default new AuthService();