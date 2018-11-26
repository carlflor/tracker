import React, { Component, createContext } from 'react';

const initialState = {
  currentIssue: 0,
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
    this.editIssue = this.editIssue.bind(this);
    this.setCurrentIssue = this.setCurrentIssue.bind(this);
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

  editIssue(data) {
    const { id, title, type, description } = data;
    if (id === null) return;
    const edit = {title, type, description};

    this.setState( prevState => {
      const issues = prevState.issues.map(issue => {
        return issue.id === id ?
          {...issue, ...edit}  :
          {...issue};
      });

      return {issues}
    });
  }

  setCurrentIssue(data) {
    const {id} = data;
    this.setState({currentIssue: id});
  }

  render() {
    const value = {
      ...this.state,
      addIssue: this.addIssue,
      editIssue: this.editIssue,
      setCurrentIssue: this.setCurrentIssue,
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

