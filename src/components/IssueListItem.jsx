import React, { Component } from 'react';
import './IssueListItem.scss';
import Ionicon from 'react-ionicons'

class IssueListItem extends Component {
  render() {
    const typeClass = `type -label-${this.props.type.toLowerCase()}`
    return (
      <div className="list-item">
        <div className="item">
          <div className="info">
            <span className="id">{this.props.id}</span>
            <span className="title">{this.props.title}</span>
          </div>
          <div className="actions">
            <span className={typeClass}>{this.props.type}</span>
            <span className="create"><Ionicon icon="md-create" /></span>
          </div>
        </div>
      </div>
    );
  }
}

export default IssueListItem;
