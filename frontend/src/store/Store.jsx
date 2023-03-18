import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import Postslice from './Postslice';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';
import Authslice from './Authslice';
import Userslice from './Userslice';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['post', 'user'],
};
const rootreducer = {
  auth: Authslice.reducer,
  post: Postslice.reducer,
  user: Userslice.reducer,
};
const persistedReducer = persistCombineReducers(persistConfig, rootreducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default Store;
