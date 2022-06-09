import { render } from "react-dom";
import Highcharts from "highcharts";
import highchartsData from "highcharts/modules/data";
import highchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { data } from "./data";
import "./index.css";

highchartsData(Highcharts);
highchartsExporting(Highcharts);

const App = () => {
  const options = {
    chart: {
      type: "scatter",
      style: {
        fontFamily: "sans-serif",
      },
      styledMode: true,
      height: (9 / 16) * 75 + "%",
      spacing: [10, 30, 10, 30],
    },
    title: {
      text: "SUPPORT-FRONTEND TYPESCRIPT ERRORS",
    },
    xAxis: {
      labels: {
        enabled: true,
        formatter: function () {
          const date = new Date(this.value);
          return date.toLocaleDateString().match(/^([\d]+\/[\d]+)/g);
        },
        style: {
          fontSize: 11,
        },
      },
      endOnTick: true,
      showLastLabel: true,
    },
    yAxis: {
      title: {
        text: "NUMBER OF ERRORS",
        x: -10,
      },
    },
    tooltip: {
      formatter: function () {
        const date = new Date(this.x);
        return `${
          this.y
        } errors<br/>${date.toDateString()}<br/>${date.toLocaleTimeString()}`;
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        lineWidth: 3,
      },
      {
        type: "scatter",
      },
      {
        data,
      },
    ],
  };

  return (
    <div className={"container"}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

render(<App />, document.getElementById("root"));
