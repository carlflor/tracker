import React, { Component } from 'react';
import './IssueListItem.scss';

class IssueListItem extends Component {
  render() {
    const typeClass = `type -label-${this.props.type.toLowerCase()}`
    return (
      <div className="list-item">
        <span className="title">{this.props.title}</span>
        <span className={typeClass}>{this.props.type}</span>
      </div>
    );
  }
}

export default IssueListItem;
