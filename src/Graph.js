import champData from "./jsonData/keyToChampName.json";
import classData from "./jsonData/champClassData.json";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useRef, useState } from "react";
import "./styles/Graph.css";
import Filter from "./Filter";
Chart.register(ArcElement, Tooltip);

//total mastery sum for the player
let sum = 0;
let percentageData = {};

function getChartData(masteries, filter) {
  let mastery = 0;
  let chartData = {};

  //reset percentage data to 0
  sum = 0;
  percentageData = {};

  if (filter.includes("All")) {
    filter = ["Fighter", "Assassin", "Mage", "Marksman", "Support", "Tank"];
  }

  //make array of champions to include in chart
  let championsToInclude = [];
  filter.forEach((className) => {
    championsToInclude.push(...classData[className]);
  });

  //sum of mastery scores
  for (let key of Object.keys(masteries)) {
    const champName = champData[key];
    if (champName !== undefined && championsToInclude.includes(champName)) {
      sum += masteries[key];
    }
  }

  //loop through each key in masteries object and add champion name: {mastery, champId} to chartData
  for (let key of Object.keys(masteries)) {
    const champName = champData[key];
    if (champName !== undefined && championsToInclude.includes(champName)) {
      mastery = masteries[key];
      chartData[champName] = mastery;

      //percentages
      percentageData[champName] = (mastery / sum) * 100;
    }
  }
  return chartData;
}

function Graph(props) {
  const [filter, setFilter] = useState(["All"]);

  //reference graph
  const graphRef = useRef(null);

  //if graph is not null, scroll to the graph
  useEffect(() => {
    if (graphRef.current !== null) {
      graphRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  //if no data, do not show this graph component
  if (props.data.result === undefined) {
    return null;
  }

  //get data from props data object
  const chartData = getChartData(props.data.masteries, filter);

  const options = {
    layout: {
      padding: 15,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const champName = tooltipItem.label;
            return "  Champion: " + champName;
          },
          afterLabel: function (tooltipItem) {
            return "  Mastery Score: " + tooltipItem.formattedValue;
          },
          afterBody: function (tooltipItem) {
            const champPercent =
              percentageData[tooltipItem[0].label].toFixed(2);
            return "      Percentage of Total: " + champPercent + "%";
          },
        },
      },
    },
  };
  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "Champion Mastery",
        data: Object.values(chartData),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        hoverOffset: 25,
        hoverBorderWidth: 3,
      },
    ],
  };

  return (
    <div class="graph-container">
      <div class="filter">
        <p>Filter by Class:</p>
        <Filter setFilter={setFilter} filter={filter} />
      </div>
      <div ref={graphRef} class="chart">
        <div>
          <p style={{ "font-size": "70%" }}>
            Champion Mastery for:{" "}
            <span style={{ color: "#05cdff", "font-size": "120%" }}>
              {props.data.details.name}
            </span>
            <br></br>Account Level:{" "}
            <span style={{ color: "#05cdff", "font-size": "120%" }}>
              {props.data.details.level}
            </span>
            <br></br> Total Mastery Score:{" "}
            <span style={{ color: "#05cdff", "font-size": "120%" }}>
              {sum.toLocaleString()}
            </span>
          </p>
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
export default Graph;
