import json
import os

os.system("clear")

with open("data_3.json", "r") as file:
    data = json.load(file)

    data["slug_keys"] = [chapter["slug"] for chapter in data["chapters"]]
    data["title_keys"] = [chapter["title"] for chapter in data["chapters"]]


with open("data_4.json", "w") as file:
    file.write(json.dumps(data, indent=2, ensure_ascii=False))
