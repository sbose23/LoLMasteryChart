import champData from "./jsonData/keyToChampName.json";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useRef } from "react";
import "./styles/Graph.css";
Chart.register(ArcElement, Tooltip);

//total mastery sum for the player
let sum = 0;
let percentageData = {};

function getChartData(masteries) {
  
  let mastery = 0;
  let chartData = {};
  percentageData = {};

  //sum all mastery scores, also value is reset to 0
  sum = 0;
  for (let value of Object.values(masteries)){
    sum += value;
  }

  //loop through each key in masteries object and add champion name: {mastery, champId} to chartData
  for (let key of Object.keys(masteries)) {
    const champName = champData[key];
    if (champName !== undefined) {
      mastery = masteries[key];
      chartData[champName] = mastery;
      //percentages
      percentageData[champName] = (mastery / sum)*100
    }
  }
  return chartData;
}

function Graph(props) {

  //reference graph
  const graphRef =  useRef(null);

  //if graph is not null, scroll to the graph
  useEffect(() => {
    if (graphRef.current !== null) {
      graphRef.current.scrollIntoView({ behavior: "smooth" })
    };
  });

  //if no data, do not show this graph component
  if (props.data.result === undefined) {
    return null;
  }

  //get data from props data object
  const masteries = props.data.masteries;
  const chartData = getChartData(masteries);

  //additional data
  const level = props.data.details.level;
  const name = props.data.details.name;

  //arrays to hold labels and data
  const labels = Object.keys(chartData);
  const graphData = Object.values(chartData);

  const options = {
    layout : {
      padding:  15
      },
    plugins: {
      tooltip: {
        callbacks:{
          label: function(tooltipItem) {
            const champName = tooltipItem.label;
            return "  Champion: " + champName;
          },
          afterLabel: function(tooltipItem) {
            return "  Mastery Score: " + tooltipItem.formattedValue;
          },
          afterBody: function(tooltipItem) {
            const champPercent = (percentageData[tooltipItem[0].label]).toFixed(2);
            return "      Percentage of Total: " + champPercent + "%";
          }
        }
      }
    }
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Champion Mastery",
        data: graphData,
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
    <div ref={graphRef} class="chart">
      <p style={{"font-size": "70%"}}>
        Champion Mastery for: <span style={{"color": "#05cdff", "font-size": "120%"}}>{name}</span>
        <br></br>Account Level: <span style={{"color": "#05cdff", "font-size": "120%"}}>{level}</span>
        <br></br> Total Mastery Score: <span style={{"color": "#05cdff", "font-size": "120%"}}>{sum.toLocaleString()}</span>
      </p>
      <Pie data={data} options={options}/>
    </div>
  );
}
export default Graph;
