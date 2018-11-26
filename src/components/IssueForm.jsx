import React, { Component } from 'react';
import './IssueForm.scss';

class IssueForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      type: 'Bug',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const id = this.props.currentIssue;
    const issue = { id, ...this.state }

    if (id === 0) {
      this.props.addIssue(issue);
    } else {
      this.props.editIssue(issue);
    }
  }

  _renderIssueTypeOptions() {
    return this.props.types.map((value) => (
      <option key={value} value={value}>{value}</option>
    ));
  }

  render() {
    const onChange = {onChange: this.handleChange}

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
        <input type="submit" name="submit" />
      </form>
    );
  }
}

IssueForm.defaultProps = {
  types: ['Bug', 'Improvement', 'Question'],
}

export default IssueForm;
