[![Netlify Status](https://api.netlify.com/api/v1/badges/e455fb04-a4b8-4e51-8928-00ff53f4b51e/deploy-status)](https://app.netlify.com/sites/lolmasterychart/deploys)


# Introduction
League of Legends is a multiplayer video game developed by Riot Games. There are over 150 different champions (characters) in this game. Champion mastery is a score earned by playing games on a certain champion.
LolMasteryChart is a tool which makes a pie chart of a player's champion mastery (score for each character) in League of Legends. I have never seen a tool that provides such a visualization, so I thought it would be nice to make one.


# How to use this website

This website is quite simple to use. A user has to specify a player name and the region that player belongs to. After pressing "Search", if the player exists and has available champion data, the user will see a chart of that players mastery scores. Otherwise, the user is alerted to an error. The user may search again in either case.


# Behind the scenes

All the API calling is handled by a serverless function which returns a JSON response containing information about a request made by the application (user). Once a user searches for some player, this function is called and returns a JSON object containing information about the response from the Riot Games API for the search. The response indicates whether the player search was successful. If successful, with the use of props, this data is then set to a variable inherited by the Form component from the main App component. Immediately, the Graph component (which also inherits this shared variable) acquires this data and outputs the resulting pie chart after some additional data processing. The usage of state and props with React keeps this website an easy-to-use single page app.


# Challenges faced

The biggest challenge I faced was in the begining when I had to figure out how to protect my API key. I initially thought of deploying this site on GitHub pages, but then I realized there was no good way to properly protect an API key this way. A .env file with my API key would not be secure. After a day of research, I came across Netlify functions which seemed to be useful for hiding API keys with environment variables on the server. 

Another challenge I faced was dealing with unnecessary data in the JSON containg all the champions' information. To solve this I made a Python script to process this data and create my own JSON file with only the data I needed.


# Legal:

LoLMasteryChart isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
