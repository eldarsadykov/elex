import json
import os

os.system("clear")

with open("data_2.json", "r") as file:
    data = json.load(file)
    import json

    for chapter in data["chapters"]:
        chapter["main_route_link_source"] = any(
            link["main_route_link"] for link in chapter["links"]
        )
        chapter["main_route_link_target"] = any(
            link["main_route_link"]
            for other_chapter in data["chapters"]
            for link in other_chapter["links"]
            if link["target"] == chapter["title"]
        )


with open("data_3.json", "w") as file:
    file.write(json.dumps(data, indent=2, ensure_ascii=False))
