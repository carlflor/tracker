import React from 'react';
import BarChart from './BarChart.jsx';
import { groupBy } from 'lodash';
import './IssueChart.scss';

class IssueChart extends React.Component {
  _computeData() {
    const openIssues = this.props.open.map((id) => (
      this.props.issues[String(id)]
    ));

    const groups = groupBy(openIssues, 'type');

    return {
      data: Object.values(groups).map(group => group.length),
      types: Object.keys(groups)
    }
  }

  render() {
    const issues = this._computeData();
    return (
      <svg width="400" height="400">
        <BarChart
          data={issues.data}
          types={issues.types}
          width={400}
          height={350}
          x={0}
          y={50}
        />
      </svg>
    );
  }
}


export default IssueChart;
