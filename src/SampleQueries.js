//sample queries list. when a button is clicked set name and set region to the value of the button
import "./styles/SampleQueries.css";

function SampleQueries(props){


    return (
        <div>
            <span>If you are not a LoL player, you can choose a sample query: (famous player, region)</span>
            <div class="button-group">     
                <button onClick={() => {props.setName("TF Blade"); props.setRegion("na1")}}>TF Blade, NA</button>
                <button onClick={() => {props.setName("hulksmash1337"); props.setRegion("na1")}}>loltyler1, NA</button>
                <button onClick={() => {props.setName("KC Rekkles"); props.setRegion("euw1")}}>Rekkles, EUW</button>
                <button onClick={() => {props.setName("hide on bush"); props.setRegion("kr")}}>Faker, KR</button>
                <button onClick={() => {props.setName("Doublelift"); props.setRegion("na1")}}>Doublelift, NA</button>
                <br></br>
                <br></br>
            </div>
        </div>
    )

}

export default SampleQueries;