import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { withAppContext } from '../context.js';
import flow from 'lodash/flow';
import IssueForm from './IssueForm';
import IssueList from './IssueList';
import './App.scss';

class App extends Component {
  render() {
    const listProps = {
      issues: this.props.issues,
      moveIssue: this.props.moveIssue
    };

    return (
      <div>
        <div className="main">
          <div className="issue-chart">
          </div>
          <IssueList { ...listProps } order={this.props.open} state={'open'} />
          <IssueList { ...listProps } order={this.props.closed} state={'closed'}/>
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
      </div>
    );
  }
}

export default flow(
  DragDropContext(HTML5Backend),
  withAppContext,
)(App);
