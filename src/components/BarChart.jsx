import React from 'react';
import * as d3 from 'd3';

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    const widthScale = d3
        .scaleBand()
        .domain(d3.range(0, props.data.length))
        .range([0, props.width]);
    const heightScale = d3
        .scaleLinear()
        .domain([0, d3.max(props.data)])
        .range([0, props.height]);

    this.state = {
      widthScale,
      heightScale,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { widthScale, heightScale } = prevState;

    widthScale.domain(d3.range(0, nextProps.data.length));
    heightScale.domain([0, d3.max(nextProps.data)]);

    prevState = { ...prevState, widthScale, heightScale };
    return prevState;
  }

  render() {
    const { x, y, data, height, types } = this.props,
      { widthScale, heightScale } = this.state;

    return (
      <g
        transform={`translate(${x}, ${y})`}
      >
        {data.map((d, i) => (
          <g key={i}>
            <rect
              x={widthScale(i)}
              y={height - heightScale(d)}
              width={widthScale.bandwidth()}
              height={heightScale(d)}
              className={`bar-${types[i].toLowerCase()}`}
            />
            <text
              x={widthScale(i) + 10}
              y={height - heightScale(d) - 10}
              fill="white"
              className="bar-text">
              {`${types[i]} | ${d}`}
            </text>
          </g>
        ))}
      </g>
    );
  }
}

BarChart.initialProps = {
  data: [],
  types: [],
};

export default BarChart;
