import React from "react";
import Chart from "react-apexcharts";
import { Container, Title } from "./StyledComponents";

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ["#81b955"],
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return Math.abs(val) > 999 ? Math.sign(val)*((Math.abs(val)/1000).toFixed(1)) + 'k' : Math.sign(val)*Math.abs(val)
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        xaxis: {
          categories: this.props.orderDay ? this.props.orderDay : [],
          position: "bottom",
          labels: {
            offsetY: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#81b955",
                colorTo: "#81b955",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
        },
        fill: {
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return Math.abs(val) > 999 ? Math.sign(val)*((Math.abs(val)/1000).toFixed(1)) + 'k' : Math.sign(val)*Math.abs(val)
            },
          },
        },
        title: {
          floating: true,
          offsetY: 320,
          align: "center",
          style: {
            color: "#444",
          },
        },
      },
      series: [
        {
          // name: 'Inflation',
          data: this.props.orderCount ? this.props.orderCount : [],
        },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderDay !== this.state.options.xaxis.categories) {
      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: nextProps.orderDay,
          },
        },
      });
    }
    if (nextProps.orderCount !== this.state.series.data) { 
      const series = [...this.state.series];
      series[0].data = nextProps.orderCount;
      this.setState({
        series
      })
    }
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.props.orderCount);
    console.log(this.props.orderDay);
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
