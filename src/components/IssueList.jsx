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
      this.props.issues.find( issue => issue.id === id)
    ))

    return issues.map((issue, index)  => (
      <IssueListItem
        key={issue.id}
        id={issue.id}
        title={issue.title}
        type={issue.type}
        description={issue.description}
        state={issue.state}
        index={index}
      />
    ));
  }

  render() {
    const { connectDropTarget, state } = this.props;

    return connectDropTarget(
      <div className="issue-list">
        <div className={state}>
          <h2>{`${state} Issues`}</h2>
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

export default DropTarget("ISSUE", listTarget, collect)(IssueList);
