import './App.css';
import Axios from 'axios';


function App() {
  console.log("the begining")
  async function getData() {
    await Axios.get(process.env.REACT_APP_API_LOCATION).then(
      (response) => {
        console.log(response.data);
      }).catch(err => console.error(err));
  }

  
  return (
    <div className="App">
      <header className="App-header">
          Champify: the cool app
        <button onClick={getData}>test api call </button>
      </header>
    </div>
  );
}

export default App;
