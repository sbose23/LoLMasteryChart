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
      <h4>LoLMasteryChart: A League of Legends Champion Mastery Visualizer </h4>
      <br></br>
      <Form data={data} setData={setData} />
      <Graph data={data} />
      <br></br>
      <br></br>
      <a href="https://github.com/sbose23/LoLMasteryChart"> Source Code on GitHub</a>
      <small>LoLMasteryChart isn't endorsed by Riot Games and doesn't reflect the views or opinions of 
        Riot Games or anyone officially involved in producing or managing Riot Games properties. 
        Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</small>
    </div>
  );
}

export default App;
