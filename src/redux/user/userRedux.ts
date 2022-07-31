import { createSlice } from '@reduxjs/toolkit';
// import Axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;

      //redux
      // Axios({
      //   method: 'GET',
      //   url: 'https://httpbin.org/basic-auth/pro/123123',
      //   auth: {
      //     username: state.user.name,
      //     password: state.user.password,
      //   },
      // })
      //   .then((res) => {
      //     console.log('Thành công', res)
      //   })
      //   .catch((err) => {
      //     console.log(err.message)
      //   })
    },
    logoutSuccess: state => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export const selectUser = state => state.user.user;

export default userSlice.reducer;
