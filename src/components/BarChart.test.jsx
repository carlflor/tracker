import React from 'react';
import { shallow } from 'enzyme';
import BarChart from './IssueForm'

it('renders without crashing', () => {
  shallow(<BarChart />);
});
