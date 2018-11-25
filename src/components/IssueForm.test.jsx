import React from 'react';
import { shallow } from 'enzyme';
import IssueForm from './IssueForm'

it('renders without crashing', () => {
  const wrapper = shallow(<IssueForm />);
  expect(wrapper).toHaveState('title');
  expect(wrapper).toHaveState('type');
  expect(wrapper).toHaveState('description');
});
