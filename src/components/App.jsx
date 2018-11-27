import React, { Component } from 'react';
import IssueForm from './IssueForm';
import IssueList from './IssueList';
import './App.scss';

import { withAppContext } from '../context.js';
import { Route, Switch } from 'react-router-dom';

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
          <Switch>
            <Route
              exact
              path="/issues/:id/edit"
              render={(props) => <IssueForm {...this.props} match={props.match} />}
            />
            <Route render={() => <IssueForm {...this.props} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withAppContext(App);
