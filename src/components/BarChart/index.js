import React from 'react';
import Chart from "react-apexcharts";
import {
  Container,
  Title,
} from './StyledComponents';

class BarChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['#81b955'],
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "K";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: ["1Feb", "2Feb", "3Feb", "4Feb", "5Feb", "6Feb", "7Feb", "8Feb", "9Feb", "10Feb", "11Feb", "12Feb", "13Feb", "14Feb", "15Feb", "16Feb"],
          position: 'bottom',
          labels: {
            offsetY: 0,
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#81b955',
                colorTo: '#81b955',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
        },
        fill: {
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          },
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "k";
            }
          }
        },
        title: {
          floating: true,
          offsetY: 320,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      },
      series: [{
        name: 'Inflation',
        data: [10, 23, 14, 10, 33, 9, 7, 17, 14, 8, 5, 22, 23, 14, 30, 16]
      }],
    }
  }

  render() {
    const { height, title } = this.props;

    return (
      <Container>
        <Title>{title}</Title>
        <Chart
          className="chart-wrapper"
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={height}
        />
      </Container>
    );
  }
}

export default BarChart;
