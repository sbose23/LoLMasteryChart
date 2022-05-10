import "./styles/App.css";
import React, { useState } from "react";
import Form from "./Form";
import Graph from "./Graph";

function App() {
  //use state to store data from api call and pass to graph component
  const [data, setData] = useState({});

  return (
    <div className="App">
      <br></br>
      <br></br>
      <h4>Champify: A League of Legends Champion Mastery Visualizer </h4>
      <br></br>
      <Form data={data} setData={setData} />
      <Graph data={data} />
      <br></br>
      <br></br>
      <a href="https://github.com/sbose23/champify"> Source Code on GitHub</a>
      <br></br>
    </div>
  );
}

export default App;
