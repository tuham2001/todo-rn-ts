import { loginSuccess } from './userRedux';
import { put, call, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';
import { GET_LOGIN } from '../actions/actionSaga';

function* getLogin(action: any) {
  const { name, password } = action.user;

  function getApi() {
    return Axios({
      method: 'GET',
      url: 'https://httpbin.org/basic-auth/pro/123123',
      auth: {
        username: name,
        password: password,
      },
    });
  }
  try {
    yield call(getApi);
    yield put({ type: loginSuccess.type, payload: action.user });
  } catch (error) {
    yield put({ type: loginSuccess, error });
  }
}

export default function* userSaga() {
  yield takeLatest(GET_LOGIN, getLogin);
}
