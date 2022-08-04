import Axios from 'axios';
import { login, logout } from './userRedux';

export function loginThunk(user: any) {
  return function Login(dispatch: any) {
    Axios({
      method: 'GET',
      url: 'https://httpbin.org/basic-auth/pro/123123',
      auth: {
        username: user.name,
        password: user.password,
      },
    })
      .then((res) => {
        dispatch(login(user));
        console.log('Thành công', res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
}
export function logoutThunk() {
  return function Logout(dispatch: any) {
    dispatch(logout());
  };
}
