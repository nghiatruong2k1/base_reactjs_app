import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import GlobalStates from '~/states/GlobalStates';
import MessageProvider from '~/Message';
import App from './App';
import './config';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <CookiesProvider>
      <MessageProvider>
        <GlobalStates>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GlobalStates>
      </MessageProvider>
    </CookiesProvider>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
