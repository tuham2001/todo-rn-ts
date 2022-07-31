import Axios from 'axios';
import { loginSuccess, logoutSuccess } from './userRedux';

export function login(user: any) {
  return function Login(dispatch: any, getState: any) {
    Axios({
      method: 'GET',
      url: 'https://httpbin.org/basic-auth/pro/123123',
      auth: {
        username: user.name,
        password: user.password,
      },
    })
      .then(res => {
        dispatch(loginSuccess(user));
        console.log('Thành công', res);
      })
      .catch(err => {
        console.log(err.message)
      });
  };
}
export function logout() {
  return function Logout(dispatch: any, getState: any) {
    dispatch(logoutSuccess());
  };
}
