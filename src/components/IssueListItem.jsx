import React, { PureComponent } from 'react';
import './IssueListItem.scss';
import Ionicon from 'react-ionicons'

import { Link } from 'react-router-dom';

class IssueListItem extends PureComponent {
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
            <Link className="edit" to={`/issues/${this.props.id}/edit`}>
              <Ionicon icon="md-create" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default IssueListItem;
