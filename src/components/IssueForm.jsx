import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNaN, get } from 'lodash';
import './IssueForm.scss';

const initialState = {
  title: '',
  type: 'Bug',
  description: '',
};

class IssueForm extends Component {

  constructor(props) {
    super(props);

    const issue = this.getIssue(props.issues, this.getId(props));
    this.state = {
      ...initialState,
      ...issue,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const id = this.getId(nextProps);
    const issue = this.getIssue(nextProps.issues, id);
    this.setState({ ...issue });
  }

  getId(props) {
    return Number(get(props, 'match.params.id'));
  }

  getIssue(issues, id) {
    if (isNaN(id)) return null;
    return issues[String(id)];
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const id = this.getId(this.props);
    const issue = { id, ...this.state };

    if (isNaN(id) || id === 0) {
      this.props.addIssue(issue);
    } else {
      this.props.editIssue(issue);
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ ...initialState }, () => {
      this.props.history.push('/');
    });
  }

  _renderIssueTypeOptions() {
    return this.props.types.map((value) => (
      <option key={value} value={value}>{value}</option>
    ));
  }

  render() {
    const onChange = {onChange: this.handleChange};

    return (
      <form className="issue-form" onSubmit={this.handleSubmit}>
        <label className="field">
          Title
          <input type="text" name="title" value={this.state.title} {...onChange}/>
        </label>
        <label className="field">
          Type
          <select name="type" value={this.state.type} {...onChange}>
            {this._renderIssueTypeOptions()}
          </select>
        </label>
        <label className="field">
          Description
          <textarea  name="description" value={this.state.description} {...onChange}/>
        </label>
        <input type="submit" name="submit" className="submit"/>
        {!isNaN(this.getId(this.props)) &&
          <button onClick={this.handleCancel}>Cancel</button>
        }
      </form>
    );
  }
}

IssueForm.defaultProps = {
  types: ['Bug', 'Improvement', 'Question'],
  editIssue: () => {},
  addIssue: () => {},
};

IssueForm.propTypes = {
  editIssue: PropTypes.func.isRequired,
  addIssue: PropTypes.func.isRequired,
}

export default IssueForm;
