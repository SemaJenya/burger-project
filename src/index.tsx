import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './components/app/index';
import { Provider } from 'react-redux';
import store from './services/store';
import {BrowserRouter} from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
     
    </Provider>
   
  // </React.StrictMode>
);

