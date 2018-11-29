import React from 'react';
import { shallow } from 'enzyme';
import IssueChart from './IssueForm'

it('renders without crashing', () => {
  shallow(<IssueChart />);
});
