import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import menuReducer from './todoSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, menuReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
