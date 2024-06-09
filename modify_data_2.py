import json
import os

os.system("clear")

with open("data_2.json", "r") as file:
    data = json.load(file)


with open("data_3.json", "w") as file:
    file.write(json.dumps(data, indent=2, ensure_ascii=False))
