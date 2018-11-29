import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const TrackerApp = () => (
    <div>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </div>
  );
  ReactDOM.render(<TrackerApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
