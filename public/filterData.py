"""
This is a simple script I created to filter out unecessary data from the official LoL json containing champion data.
With this script I create two json files. One file maps champion key (given in api call) to champion name.
The champion id (bit different from actual name in some cases) 
can be useful for getting champion photos as they use the id instead of name. 
"""

import json
from urllib.request import urlopen

keyToChampName = {}
champNameToChampId = {}
with urlopen("https://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion.json") as response:
  data = json.loads(response.read())
  for champion in data["data"]:
    championKey = data["data"][champion]["key"]
    championId = data["data"][champion]["id"]
    championName = data["data"][champion]["name"]

    keyToChampName[championKey] = championName
    champNameToChampId[championName] = championId

with open("src\jsonData\keyToChampName.json", 'w') as f:
  json.dump(keyToChampName, f)

with open("src\jsonData\champNameToChampId.json", 'w') as f:
  json.dump(champNameToChampId, f)

