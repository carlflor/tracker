import React, { Component, createContext } from 'react';

const initialState = {
  idCounter: 0,
  open: [],
  closed: [],
  issues: {},
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

  componentDidMount() {
    this.loadStateFromLocalStorage();

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }

  loadStateFromLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
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
