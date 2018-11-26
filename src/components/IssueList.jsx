import React, { Component } from 'react';
import './IssueList.scss';

import IssueListItem from './IssueListItem.jsx';

class IssueList extends Component {
  _renderIssues(isOpen) {
    const openIssues = this.props.issues.filter( issue => issue.active === isOpen );
    return openIssues.map(issue  => (
      <IssueListItem
        key={issue.id}
        id={issue.id}
        title={issue.title}
        type={issue.type}
        description={issue.description}
        active={issue.active}
      />
    ));
  }

  render() {
    return (
      <div className="issue-list">
        <div className="body">
          <h2>Open Issues</h2>
          {this._renderIssues(true)}
        </div>
        <div className="body -closed">
          <h2>Closed Issues</h2>
          {this._renderIssues(false)}
        </div>
      </div>
    )
  }
}

IssueList.defaultProps = {
  issues: []
}

export default IssueList;
