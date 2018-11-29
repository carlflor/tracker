import React from 'react';
import { shallow } from 'enzyme';
import IssueList from './IssueForm'

it('renders without crashing', () => {
  shallow(<IssueList />);
});
