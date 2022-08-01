import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from './user/userRedux';
import todoReducer from './todo/todoRedux';
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
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
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
  middleware: [thunk, sagaMiddleware],
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
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default store;
