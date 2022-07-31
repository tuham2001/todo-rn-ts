export const GET_LOGIN = 'GET_LOGIN';

export const loginSaga = (user: any) => {
  return {
    type: GET_LOGIN,
    user
  };
};