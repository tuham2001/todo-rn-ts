import { createSlice } from '@reduxjs/toolkit';
// import Axios from 'axios';

export const languageSlice = createSlice({
  name: 'app',
  initialState: {
    language: 'vi',
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export const selectLanguage = (state: any) => state.user.language;

export default languageSlice.reducer;
