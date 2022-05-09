const Axios = require("axios");

//api key from environment variable on netlify server
const key = process.env.REACT_APP_API_KEY;

//global variables to store data
let details = {};
let masteries = {};
let name = "";
let status = "failure";

async function getSummonerDetails(summonerName) {

    //retrieve details for this user/summoner
    const RETRIEVE_ID_URL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name +
    "?api_key=" + key;

    await Axios.get(RETRIEVE_ID_URL).then(
        response => {
            //extract select data from response
            const data = {
                "name" : summonerName,
                "id" : response.data.id,
                "level" : response.data.summonerLevel,
                "profileIconId" : response.data.profileIconId
            };
            details = data;
        }
    ).catch(err => console.log("bad request"));
}

async function getSummonerMasteries(summonerId) {

    //retrieve champion masteries for this user/summoner
    const RETRIEVE_CHAMP_DATA_URL = "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"
    +summonerId + "?api_key=" + key;

    await Axios.get(RETRIEVE_CHAMP_DATA_URL).then(
        (response) => {
            //extract select data (champion id and champion points) from response
            const data = {}
            for (let i = 0; i < response.data.length; i++) {
                data[response.data[i].championId] = response.data[i].championPoints;
            }
            console.log(data);
            masteries = data;
        }
    ).catch(err => console.log("bad request"));
}

exports.handler = async (event, context) => {
    //retrieve name from url parameter
    name =  event.queryStringParameters.name;

    // wait for async api calls to finish
    await getSummonerDetails(event.queryStringParameters.name);
    await getSummonerMasteries(details.id);

    //error handling
    if (details.length > 0) {
        status = "success";
    }
    return {
        statusCode: 200,
        body: JSON.stringify( {status : status, details: details, masteries: masteries} )
        }
}        