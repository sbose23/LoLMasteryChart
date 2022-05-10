import champData from './jsonData/keyToChampName.json';
//import nameToId from './jsonData/champNameToChampId.json';
import {Chart, ArcElement, Tooltip} from 'chart.js';
import {Pie} from 'react-chartjs-2'
Chart.register(ArcElement);
Chart.register(Tooltip);
/*
let sum = 0;
let others = 0;
*/
function getChartData(masteries) {
    let mastery = 0;
    let chartData = {};

    /*reset existing data
    sum = 0;
    others = 0;*/

    /*get total mastery points of the player
    for (let value of Object.values(masteries)){
        sum += value;
    }*/

    //loop through each key in masteries object and add champion name: {mastery, champId} to chartData
    for (let key of Object.keys(masteries)) {
        const champName = champData[key];
        if ( champName !== undefined) {
            mastery = masteries[key];
            chartData[champName] = mastery;
            //sum += mastery;
            //const cutoff = sum*(0.005);
            /*champions with mastery less than 0.5% of total mastery are added to "others"
            if (mastery > cutoff - 50000) {
                chartData[champName] = mastery;
            }else{
                others += mastery;
            }*/
        }
    }
    return chartData;
}

function Graph(props){
    //if no data, do not show this graph component
    if (props.data.result === undefined) {
        return null;
    }

    //get data from props data object
    const masteries = props.data.masteries;
    const chartData = getChartData(masteries);
    const profileIconId = props.data.profileIconId;
    
    const level = props.data.details.level;
    const name = props.data.details.name;
    const labels = Object.keys(chartData);
    const cData = Object.values(chartData);
    console.log(props.data)
    const data = {
        labels: labels,
        datasets: [{
            label: 'Champion Mastery',
            data: cData,
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
            ],
            hoverOffset: 4
        }]
    };

    return(
        <div>
            <p>Champion Mastery for {name} (Account Level: {level})</p>
            <Pie data={data} />
        </div>
    )
}
export default Graph;