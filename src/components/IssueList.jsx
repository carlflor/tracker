import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import IssueListItem from './IssueListItem.jsx';
import './IssueList.scss';

const listTarget = {
  drop(props, monitor, component) {
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class IssueList extends Component {
  _renderIssues() {
    const issues = this.props.order.map( id => (
      this.props.issues[String(id)]
    ))

    return issues.map((issue, index)  => (
      <IssueListItem
        key={issue.id}
        id={issue.id}
        title={issue.title}
        type={issue.type}
        description={issue.description}
        status={issue.status}
        index={index}
      />
    ));
  }

  render() {
    //const { connectDropTarget, status } = this.props;
    const { status } = this.props;

    //return connectDropTarget(
    return (
      <div className="issue-list">
        <div className={status}>
          <h2>{`${status} Issues`}</h2>
          {this._renderIssues()}
        </div>
      </div>
    )
  }
}

IssueList.defaultProps = {
  issues: [],
  order: [],
}

//export default DropTarget("ISSUE", listTarget, collect)(IssueList);
export default IssueList;
