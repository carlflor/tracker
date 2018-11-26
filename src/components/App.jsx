import React, { Component } from 'react';
import IssueForm from './IssueForm';
import IssueList from './IssueList';
import './App.scss';

import { withAppContext } from '../context.js';

class App extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <div className="issue-chart">
          </div>
          <IssueList issues={this.props.issues} />
        </div>
        <div className="sidebar">
          <IssueForm addIssue={this.props.addIssue} />
        </div>
      </div>
    );
  }
}

export default withAppContext(App);
