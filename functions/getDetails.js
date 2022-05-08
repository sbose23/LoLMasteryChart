const Axios = require("axios");

//api key from environment variable on netlify server
const key = process.env.REACT_APP_API_KEY;
const name = "HardlyAdept";
let details = {}
let masteries = {}

async function getSummonerDetails(summonerName) {
    const RETRIEVE_ID_URL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name +
    "?api_key=" + key;

    await Axios.get(RETRIEVE_ID_URL).then(
        response => {
            const data = {
                "name" : summonerName,
                "id" : response.data.id,
                "level" : response.data.summonerLevel,
                "profileId" : response.data.profileIconId
            };
            details = data;
        }
    ).catch(err => console.error(err));
};

async function getSummonerMasteries(summonerId) {
    const RETRIEVE_CHAMP_DATA_URL = "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"
    +summonerId + "?api_key=" + key;
    await Axios.get(RETRIEVE_CHAMP_DATA_URL).then(
        (response) => {
            console.log(response.data);
            masteries = response.data;
        }
    )
}

exports.handler = async (event, context) => {
    //dummy variables to wait for async api calls to finish
    const success = await getSummonerDetails(name);
    const success2 = await getSummonerMasteries(details.id);

    return {
        statusCode: 200,
        body: JSON.stringify( {msg : "Hello World", test: masteries} )

        }
}        