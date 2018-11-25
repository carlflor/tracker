import React, { Component } from 'react';
import './IssueList.scss';

import IssueListItem from './IssueListItem.jsx';

class IssueList extends Component {
  _renderList() {
    return this.props.open.map(issue => (
      <IssueListItem
        key={issue.id}
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
          {this._renderList()}
        </div>
        <div className="body -closed">
          <h2>Closed Issues</h2>
          {this._renderList()}
        </div>
      </div>
    )
  }
}

IssueList.defaultProps = {
  open: [
    {id: 1,  title: 'test', type: 'Bug', description: 'test', active: true},
    {id: 2, title: 'test', type: 'Improvement', description: 'test', active: true},
    {id: 3, title: 'test', type: 'Question', description: 'test', active: true},
    {id: 4, title: 'test', type: 'Question', description: 'test', active: true},
    {id: 5, title: 'test', type: 'Bug', description: 'test', active: true},
    {id: 6, title: 'test', type: 'Improvement', description: 'test', active: true},
    {id: 7, title: 'test', type: 'Bug', description: 'test', active: true},
  ],
  closed: [
    {id: 1,  title: 'test', type: 'Bug', description: 'test', active: true},
    {id: 2, title: 'test', type: 'Bug', description: 'test', active: true},
    {id: 3, title: 'test', type: 'Bug', description: 'test', active: true},
    {id: 4, title: 'test', type: 'Bug', description: 'test', active: true},
    {id: 5, title: 'test', type: 'Bug', description: 'test', active: true},
    {id: 6, title: 'test', type: 'Bug', description: 'test', active: true},
    {id: 7, title: 'test', type: 'Bug', description: 'test', active: true},
  ],
}

export default IssueList;
