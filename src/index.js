import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App.jsx';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppProvider } from './context.js';

const TrackerApp = () => (
  <div>
    <AppProvider>
      <Router>
        <Route path="/" component={App}/>
      </Router>
    </AppProvider>
  </div>
);

ReactDOM.render(<TrackerApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
