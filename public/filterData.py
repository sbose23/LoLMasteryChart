"""
this is a simple script I created to filter out useless data from the original json containing champion data
the new json I create only maps a champion's number id to its champion id and name
the champion id can be useful for getting champion photos as they use that name
otherwise, there isnt much point in having them
"""

import json
from urllib.request import urlopen

new_data = {}
with urlopen("https://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion.json") as response:
  data = json.loads(response.read())
  for champion in data["data"]:
    championKey = data["data"][champion]["key"]
    championId = data["data"][champion]["id"]
    championName = data["data"][champion]["name"]
    new_data[championKey] = {"champId": championId, "champName": championName}

with open("public\championData.json", 'w') as f:
  json.dump(new_data, f)