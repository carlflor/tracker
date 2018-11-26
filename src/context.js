import React, { Component, createContext } from 'react';

const initialState = {
  form: 'new',
  idCounter: 7,
  issues: [
    {id: 1,  title: 'test', type: 'Bug', description: 'test', active: true},
    {id: 2, title: 'test', type: 'Improvement', description: 'test', active: false},
    {id: 3, title: 'test', type: 'Question', description: 'test', active: true},
    {id: 4, title: 'test', type: 'Question', description: 'test', active: false},
    {id: 5, title: 'test', type: 'Bug', description: 'test', active: false},
    {id: 6, title: 'test', type: 'Improvement', description: 'test', active: true},
    {id: 7, title: 'test', type: 'Bug', description: 'test', active: true},
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
  }

  addIssue(data) {
    const { title, type, description } = data;
    const id = this.state.idCounter + 1;

    this.setState( prevState => ({
      idCounter: id,
      issues: [
        ...prevState.issues,
        { id, title, type, description, active: true }
      ]
    }))
  }

  render() {
    const value = {
      ...this.state,
      addIssue: this.addIssue
    }

    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    );
  }

}

export function withAppContext(Component) {
  return function WrapperComponent(props) {

    const child = state => (
      <Component
        {...props}
        form={state.form}
        issues={state.issues}
        addIssue={state.addIssue}
      />
    );

    return (
      <Consumer>
        {child}
      </Consumer>
    );
  }
}

