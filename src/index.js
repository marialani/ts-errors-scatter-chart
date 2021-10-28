import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import highchartsData from "highcharts/modules/data";
import highchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import Papa from "papaparse";
import "./index.css";

highchartsData(Highcharts);
highchartsExporting(Highcharts);

const App = () => {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const url1 =
        "https://raw.githubusercontent.com/guardian/support-frontend/jd-ts-error-csv/support-frontend/ts-error-history.csv";
      const response = await fetch(url1);
      const data = await response.text();

      const textToCsv = Papa.parse(data, {
        skipEmptyLines: true,
      });
      console.log(textToCsv);

      const finalData = textToCsv.data.map((arr, i) => [
        parseInt(arr[0]),
        parseInt(arr[1]),
      ]);
      setCsvData(finalData);
      console.log({ finalData });
    }
    fetchData();
  }, []);

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
      text: "Support-Frontend Typescript Errors",
    },
    subtitle: {
      text: "Optional subtitle with <a href='http://google.co.uk' target='_blank' rel='noopener noreferrer'>Link?</a>\n\r\r",
    },
    xAxis: {
      // tickInterval: 1,
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
      // startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
    },
    yAxis: {
      title: {
        text: "NUMBER OF ERRORS",
        x: -10,
      },
      // labels: {
      //   format: "{value}",
      // },
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
        data: csvData,
      },
    ],
  };

  return (
    <div className={"container"}>
      {csvData && <HighchartsReact highcharts={Highcharts} options={options} />}
    </div>
  );
};

render(<App />, document.getElementById("root"));
