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
			return null
		}

		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveIssue(monitor.getItem(), props)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex

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
      )
    );
  }
}

export default flow(
  DragSource('ISSUE', issueSource, collectSource),
  DropTarget('ISSUE', issueTarget, collectTarget),
  withMoveIssue,
)(IssueListItem);
