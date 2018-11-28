import React, { Component, createContext } from 'react';

const initialState = {
  idCounter: 7,
  open: [1,3,6,7],
  closed: [2,4,5],
  issues: [
    {id: 1,  title: 'test', type: 'Bug', description: 'test', state: 'open'},
    {id: 2, title: 'test', type: 'Improvement', description: 'test', state: 'closed'},
    {id: 3, title: 'test', type: 'Question', description: 'test', state: 'open'},
    {id: 4, title: 'test', type: 'Question', description: 'test', state: 'closed'},
    {id: 5, title: 'test', type: 'Bug', description: 'test', state: 'closed'},
    {id: 6, title: 'test', type: 'Improvement', description: 'test', state: 'open'},
    {id: 7, title: 'test', type: 'Bug', description: 'test', state: 'open'},
  ]
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
      issues: [
        ...prevState.issues,
        { id, title, type, description, state: 'active' }
      ]
    }))
  }

  editIssue(data) {
    const { id, title, type, description } = data;
    if (id === null) return;
    const edit = {title, type, description};

    this.setState( prevState => {
      const issues = prevState.issues.map(issue => {
        return issue.id === id ?
          {...issue, ...edit} :
          {...issue};
      });

      return {issues};
    });
  }

  moveIssue(fromPos, toPos) {
    const toState = toPos.state
    console.log(toState);
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
