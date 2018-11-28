import React, { Component, createContext } from 'react';

const initialState = {
  idCounter: 7,
  open: [1,3,6,7],
  closed: [2,4,5],
  issues: {
    '1': {id: 1,  title: 'test', type: 'Bug', description: 'test', status: 'open'},
    '2': {id: 2, title: 'test', type: 'Improvement', description: 'test', status: 'closed'},
    '3': {id: 3, title: 'test', type: 'Question', description: 'test', status: 'open'},
    '4': {id: 4, title: 'test', type: 'Question', description: 'test', status: 'closed'},
    '5': {id: 5, title: 'test', type: 'Bug', description: 'test', status: 'closed'},
    '6': {id: 6, title: 'test', type: 'Improvement', description: 'test', status: 'open'},
    '7': {id: 7, title: 'test', type: 'Bug', description: 'test', status: 'open'},
  },
};

const { Provider, Consumer } = createContext();

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.addIssue = this.addIssue.bind(this);
    this.editIssue = this.editIssue.bind(this);
    this.moveIssue = this.moveIssue.bind(this);
  }

  addIssue(data) {
    const { title, type, description } = data;
    const id = this.state.idCounter + 1;

    this.setState( prevState => ({
      idCounter: id,
      open: [...prevState.open, id],
      issues: {
        ...prevState.issues,
        [String(id)]: { id, title, type, description, status: 'open' }
      }
    }));
  }

  editIssue(data) {
    const { id, title, type, description, status } = data;
    if (id === null) return;
    const edit = {id, title, type, description, status};

    this.setState( prevState => ({
      issues: {
        ...prevState.issues,
        [String(id)]: edit
      }
    }));
  }

  moveIssue(pos, newPos) {
    const { id, title, type, description, status, index } = pos;
    const newStatus = newPos.status;
    const newIndex = newPos.index;

    const issue = { id, title, type, description, status: newStatus };

    this.setState( prevState => {
      const order = [...prevState[status]];
      order.splice(index, 1);

      const newState = {
        [status]: order,
        issues: {
          ...prevState.issues,
          [String(id)]: issue,
        }
      };

      if (status === newStatus) {
        order.splice(newIndex, 0, id);
      } else {
        const newOrder = [...prevState[newStatus]];
        newOrder.splice(newIndex, 0, id);
        newState[newStatus] = newOrder;
      }

      return newState;
    });
  }

  render() {
    const value = {
      ...this.state,
      addIssue: this.addIssue,
      editIssue: this.editIssue,
      moveIssue: this.moveIssue,
    };

    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    );
  }

}

export function withAppContext(Component) {
  return function WrapperComponent(props) {
    const child = state => <Component {...props} {...state} />;
    return <Consumer>{child}</Consumer>;
  }
}

export function withMoveIssue(Component) {
  return function WrapperComponent(props) {
    const child = state => <Component moveIssue={state.moveIssue} {...props} />;
    return <Consumer>{child}</Consumer>;
  }
}
