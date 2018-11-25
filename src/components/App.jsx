import React, { Component } from 'react';
import IssueForm from './IssueForm';
import './App.scss';


class App extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <div className="issue-chart">
          </div>
          <div className="issue-list">
          </div>
        </div>
        <div className="sidebar">
          <IssueForm />
        </div>
      </div>
    );
  }
}

export default App;
