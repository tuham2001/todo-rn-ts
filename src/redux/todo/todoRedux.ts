import { createSlice } from '@reduxjs/toolkit';
// import Axios from 'axios';

export const todoSlice = createSlice({
  name: 'user',
  initialState: {
    taskList: [],
  },
  reducers: {
    getTask: (state, action) => {
      state.taskList = action.payload
    },
  }
});

export const { getTask } = todoSlice.actions;

export const selectTodo = (state: any) => state.user.user;

export default todoSlice.reducer;
