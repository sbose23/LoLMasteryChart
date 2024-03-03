const Axios = require("axios");

//api key from environment variable on netlify server
const key = process.env.REACT_APP_API_KEY;

//global variables to store data
let details = {};
let masteries = {};
let name = "";
let status = "";
let region = "";

async function getSummonerDetails(summonerName, region) {

    //retrieve details for this user/summoner
    const RETRIEVE_ID_URL = "https://" + region + 
    ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + encodeURIComponent(name) +
    "?api_key=" + key;
    console.log("Region: " + region + " Name: " + name);
    await Axios.get(RETRIEVE_ID_URL).then(
        response => {
            
            //extract select data from response
            const data = {
                "name" : summonerName,
                "id" : response.data.id,
                "level" : response.data.summonerLevel,
                "profileIconId" : response.data.profileIconId
            };
            status = "userFound";
            details = data;
        }
    ).catch(e => {
        //error handling
        if (e.response === undefined) {
            console.log("Undefined response");
            status = "failure";
            return;
        }
        let responseStatus = e.response.status;

        switch(responseStatus) {
            case 404:
                status = "failure";
                return;

            case 403:
                status = "invalidKey";
                return;
            
            case 500 || 503:
                status = "internalError";
                return;
            
            default:
                return;
        }
    });
}

async function getSummonerMasteries(summonerPuuid, region) {

    //retrieve champion masteries for this user/summoner
    const RETRIEVE_CHAMP_DATA_URL = "https://" + region +
    ".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/"
    + summonerPuuid + "?api_key=" + key;

    await Axios.get(RETRIEVE_CHAMP_DATA_URL).then(
        (response) => {
            //extract select data (champion id and champion points) from response
            const data = {}
            for (let i = 0; i < response.data.length; i++) {
                data[response.data[i].championId] = response.data[i].championPoints;
            }
            masteries = data;
        }
    ).catch(e => {return;});
}

exports.handler = async (event, context) => {
    
    //if the request is not directly from app, decline request
    if (event.headers["referer"] !== "https://lolmasterychart.netlify.app/") {
        return { statusCode: 400, body: "You should not be doing this. Please make a request from the application :)" };
    }

    //retrieve name from url parameter
    name =  event.queryStringParameters.name;
    region = event.queryStringParameters.region;

    // wait for async api calls to finish
    await getSummonerDetails(name, region);

    //if user exists, get masteries
    if (status === "userFound") {
        await getSummonerMasteries(details.puuid, region);
        status = Object.keys(masteries).length === 0 ? "noChampData" : "success";
        console.log("Status: " + status);
    }

    //return required data as json
    return {
        statusCode: 200,
        body: JSON.stringify( {result : status, details: details, masteries: masteries} )
        }
}        
