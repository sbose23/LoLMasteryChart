import React, { useState } from "react";
import Axios from "axios";
import "./styles/Form.css";
import SampleQueries from "./SampleQueries";

let data = {};
const invalidKey = "Sorry, this project is still awaiting a permanent API key." +
                    " The temporary key needs to be regenerated every 24 hours. " +
                    "The key in use has expired.";

//keep track of last query
let lastQuery = {"name": "", "region": ""};

function Form(props) {

  //button variable to prevent spam button clicks before the first request is processed
  const [buttonDisabled, setButtonDisabled] = useState(false);

  async function getData(name, region) {

    //if duplicate query, do not make a new api call
    if (name === lastQuery.name && region === lastQuery.region) {
      return;
    }

    console.log("Calling API with Name: " + name + " and Region: " + region);
    await Axios.get(
      process.env.REACT_APP_API_LOCATION +
        "?name=" +
        name +
        "&region=" +
        region
    )
      .then((response) => {
        
        //save this successful query
        lastQuery.name = name;
        lastQuery.region = region;

        //save the response data
        data = response.data;
      })
      .catch((error) => {
        console.log("ERROR: " + error.response.data);
      });
  }

  const [name, setName] = useState("");
  const [region, setRegion] = useState("na1");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    //alert if errors with input fields or api call
    if (name.length > 16 || name.length < 3) {
      alert("Invalid name. Names are 3-16 characters long.");
      return;
    }

    //call api and disable submit button while waiting for response (somewhat like a mutex)
    setButtonDisabled(true);
    await getData(name, region);
    setButtonDisabled(false);

    switch(data.result) {

      //handle api error cases
      case "failure" || "noChampData":
        alert("Invalid player. Please check your name and region.");
        return;
      
      case "invalidKey":
        alert(invalidKey);
        return;
      
      case "internalError":
        alert("Riot games server error. Please try again later.");
        return;
    
      case "noChampdata":
        alert("No champion data found for this player.");
        return;
      
        default:
          break;
    }

    //use setData to update the state of data variable from App.js
    props.setData(data);
  };

  return (
    <div>
      <SampleQueries setName={setName} setRegion={setRegion} />
      <form onSubmit={handleSubmit}>
        <label>Player name: </label>
        <span>
          <input
            class="name"
            size="40"
            placeholder= "Enter player in-game name..."
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </span>
        <label> Region: </label>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="br1">BR</option>
          <option value="eune1">EUNE</option>
          <option value="euw1">EUW</option>
          <option value="jp1">JP</option>
          <option value="kr">KR</option>
          <option value="la1">LA1</option>
          <option value="la2">LA2</option>
          <option value="na1">NA</option>
          <option value="oc1">OC</option>
          <option value="tr1">TR</option>
        </select>
        <br></br>
        <br></br>
        <button class = "submit" disabled={buttonDisabled}>
          Search{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0.3 0 15 11"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Form;
