import React, { PureComponent } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Link } from 'react-router-dom';
import Ionicon from 'react-ionicons'
import { findDOMNode } from 'react-dom'
import flow from 'lodash/flow';
import classnames from 'classnames';
import { withMoveIssue } from '../context.js';
import './IssueListItem.scss';


const issueSource = {
  beginDrag(props, monitor, component) {
    return {...props};
  }
}

const issueTarget = {
  hover(props, monitor, component) {
    if (!component) {
			return null;
		}

    const dragItem = monitor.getItem();
		const dragIndex = dragItem.index;
    const dragStatus = dragItem.status;
		const hoverIndex = props.index;
    const hoverStatus = props.status;


		// Don't replace items with themselves
		if (dragIndex === hoverIndex && dragStatus === hoverStatus) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		props.moveIssue(monitor.getItem(), props);

    // Update the dragSource item
		monitor.getItem().index = hoverIndex;
    monitor.getItem().status = props.status;
  }
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

class IssueListItem extends PureComponent {
  render() {
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const typeClass = `type -label-${this.props.type.toLowerCase()}`;

    return connectDragSource(
      connectDropTarget(
        <div className={classnames('list-item', {dragging: isDragging})}>
          <div className="item">
            <div className="head">
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
            <div className="description">{this.props.description}</div>
          </div>
        </div>
      )
    );
  }
}

export default flow(
  DragSource('ISSUE', issueSource, collectSource),
  DropTarget('ISSUE', issueTarget, collectTarget),
  withMoveIssue,
)(IssueListItem);
