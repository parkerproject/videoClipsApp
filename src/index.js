/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store';
import App from './App';
import './index.css';
import clipList from './seed';


if (!store.get('clips')) {
  store.set('clips', clipList);
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
