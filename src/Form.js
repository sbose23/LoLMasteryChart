import React, { useState } from 'react';
import Axios from 'axios';

let data = {};

function Form() {

    async function getData(name, region) {
        console.log("calling api with " + name + " and region " + region);
        await Axios.get(process.env.REACT_APP_API_LOCATION + "?name="+ name + "&&region=" + region)
        .then(
          (response) => {
              data = response.data;
          }).catch(error => {console.log("ERROR: " + error.response.data);});
    }

    const [name, setName] = useState('');
    const [region, setRegion] = useState('na1');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.length > 16 || name.length < 3) {
            alert("Invalid name. Names are 3-16 characters long.");
            return;
        }
        
        await getData(name, region);
        if (data.result === "failure" || data.result === "noChampData") {
            alert("Invalid player. Please check your name and region.");
            return;
        }
        if (data.result === "noChampData") {
            alert("No champion data found for this player.");
            return;
        }
        console.log("success");
        console.log(data);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Player name: </label>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label> Region: </label>
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                    <option value="br1">BR1</option>
                    <option value="eune1">EUNE1</option>
                    <option value="euw1">EUW1</option>
                    <option value="jp1">JP1</option>
                    <option value="kr">KR</option>
                    <option value="la1">LA1</option>
                    <option value="la2">LA2</option>
                    <option value="na1">NA1</option>
                    <option value="oc1">OC1</option>
                    <option value="tr1">TR1</option>
                    <option value="ru">RU</option>
                </select>
                <br></br>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Form;