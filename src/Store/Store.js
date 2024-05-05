import { createStore } from 'redux'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import menuReducer from './todoSlice';
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { version } from "react";

const persistConfig = {
  key: 'root',
  version:1,
  storage
};

const reducer = combineReducers({
  menu: menuReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer:persistedReducer
// })
const configureeStore = () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureeStore;