import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App.jsx';
import * as serviceWorker from './serviceWorker';

import { AppProvider } from './context.js';

ReactDOM.render(
  <AppProvider>
      <App />
  </AppProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
