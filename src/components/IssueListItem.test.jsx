import React from 'react';
import { shallow } from 'enzyme';
import IssueListItem from './IssueForm'

it('renders without crashing', () => {
  shallow(<IssueListItem />);
});
