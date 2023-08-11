import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import { Provider } from 'react-redux';
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import postState from './States/postState';
import commentState from './States/commentState'
import authorState from './States/authorState';

const reducer = combineReducers({
  postState: postState,
  commentState: commentState,
  authorState: authorState,
 });

const store = configureStore({
  reducer,
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
        <App />
     </Provider>
  </React.StrictMode>
);

