const Axios = require("axios");

//api key from environment variable on netlify server
const key = process.env.REACT_APP_API_KEY;
const name = "HardlyAdept";

//global variables to store information for user
let details = {}
let masteries = {}

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
                "profileId" : response.data.profileIconId
            };
            details = data;
        }
    ).catch(err => console.error(err));
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
    ).catch(err => console.error(err));
}

exports.handler = async (event, context) => {
    console.log("going to call api");
    // wait for async api calls to finish
    await getSummonerDetails(name);
    await getSummonerMasteries(details.id);
    console.log("called api");
    return {
        statusCode: 200,
        body: JSON.stringify( {status : "success", details: details, masteries: masteries} )
        }
}        