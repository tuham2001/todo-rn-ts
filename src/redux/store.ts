import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import todoReducer from './todo/todoRedux';
import userReducer from './user/userRedux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';
import { Dispatch } from 'react';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  userReducer,
  todoReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  //  redux-thunk
  middleware: [thunk],
  //redux
  // middleware: getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  //   }
  // }),
  reducer: {
    user: persistedReducer,
  },
});
export const persistor = persistStore(store);

export default store;

export const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
