import Axios from 'axios';
import { loginSuccess, logoutSuccess } from './userRedux';
import base64 from 'react-native-base64';

export function login(user: any) {
  return function Login(dispatch: any) {
    const authHeader = 'Basic ' + base64.encode(`${user.name}:${user.password}`);
    const session_url = 'https://httpbin.org/basic-auth/pro/123123';
    Axios({
      method: 'GET',
      url: session_url,
      headers: { Authorization: authHeader },
    })
      .then((res) => {
        dispatch(loginSuccess(user));
        console.log('Thành công');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
}
export function logout() {
  return function Logout(dispatch: any) {
    dispatch(logoutSuccess());
  };
}
