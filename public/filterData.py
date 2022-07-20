"""
This is a simple script I created to filter out unecessary data from the official LoL json containing champion data.
With this script I create two json files. One file maps champion key (given in api call) to champion name.
The other arranges champions by their primary classes. 
"""

import json
from urllib.request import urlopen

keyToChampName = {}
champClassData = {"Fighter": [], "Tank": [], "Mage": [], "Assassin": [], "Marksman": [], "Support": []}

with urlopen("https://ddragon.leagueoflegends.com/cdn/12.13.1/data/en_US/champion.json") as response:
  data = json.loads(response.read())
  for obj in data["data"]:
    champion = data["data"][obj]

    championKey = champion["key"]
    championName = champion["name"]

    championClass = champion["tags"][0]
    champClassData[championClass].append(championName)

    keyToChampName[championKey] = championName

with open("src\jsonData\keyToChampName.json", 'w') as f:
  json.dump(keyToChampName, f)


with open("src\jsonData\champClassData.json", 'w') as f:
  json.dump(champClassData, f)



