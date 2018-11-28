import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { withAppContext } from '../context.js';
import flow from 'lodash/flow';
import IssueChart from './IssueChart';
import IssueForm from './IssueForm';
import IssueList from './IssueList';
import './App.scss';

class App extends Component {
  render() {
    const { issues, open, closed, moveIssue } = this.props;
    const listProps = { issues, moveIssue };

    return (
      <div>
        <div className="main">
          <IssueList { ...listProps } order={open} status={'open'} />
          <IssueList { ...listProps } order={closed} status={'closed'}/>
        </div>
        <div className="sidebar">
          <Switch>
            <Route
              exact
              path="/issues/:id/edit"
              render={ props => <IssueForm {...this.props} match={props.match} />}
            />
            <Route render={() => <IssueForm {...this.props} />} />
          </Switch>
        </div>
        <div className="issue-chart">
          <IssueChart issues={issues} open={open} />
        </div>
      </div>
    );
  }
}

export default flow(
  DragDropContext(HTML5Backend),
  withAppContext,
)(App);
