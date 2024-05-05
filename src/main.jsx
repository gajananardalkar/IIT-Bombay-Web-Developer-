import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import configureeStore from './Store/Store.js'; 
const { store, persistor } = configureeStore(); 
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist'
import './index.css'

// let persistor = persistStore(store)
// console.log(persistor,"persis")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>

    </Provider>

  </React.StrictMode>,
)
