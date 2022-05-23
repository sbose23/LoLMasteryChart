import "./styles/Graph.css";

function Filter(props) {
  //reference filter
  let mirrorFilter = props.filter.slice();

  function handleChange(e) {
    let checked = e.target.checked;
    let className = e.target.value;
    switch (checked) {
      case true:
        if (!mirrorFilter.includes(className)) {
          mirrorFilter.push(className);
        }
        break;

      case false:
        if (mirrorFilter.includes(className)) {
          mirrorFilter.splice(mirrorFilter.indexOf(className), 1);
        }
        break;
      default:
        break;
    }
    props.setFilter(mirrorFilter);
  }

  return (
    <div className="filter">
      <form style={{ "font-size": "70%" }} onChange={handleChange}>
        <input type="checkbox" id="All" name="All" value="All" defaultChecked />
        <label htmlFor="All">All</label>
        <br></br>
        <input type="checkbox" id="Fighter" name="Fighter" value="Fighter" />
        <label htmlFor="Fighter">Fighter</label>
        <br></br>
        <input type="checkbox" id="Assassin" name="Assassin" value="Assassin" />
        <label htmlFor="Assassin">Assassin</label>
        <br></br>
        <input type="checkbox" id="Mage" name="Mage" value="Mage" />
        <label htmlFor="Mage">Mage</label>
        <br></br>
        <input type="checkbox" id="Marksman" name="Marksman" value="Marksman" />
        <label htmlFor="Marksman">Marksman</label>
        <br></br>
        <input type="checkbox" id="Support" name="Support" value="Support" />
        <label htmlFor="Support">Support</label>
        <br></br>
        <input type="checkbox" id="Tank" name="Tank" value="Tank" />
        <label htmlFor="Tank">Tank</label>
      </form>
    </div>
  );
}

export default Filter;
