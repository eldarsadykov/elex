import os
import re

directory_path = "pug"


def process_text(file):
    input_text = file.read()
    pattern = r"h1 (.+)"
    output_text = re.sub(pattern, r'- const title = "\1"\n\th1= title', input_text)
    return output_text


def process_file(file_path):
    with open(file_path, "r") as file:
        output_text = process_text(file)

    with open(file_path, "w") as file:
        file.write(output_text)


def process_directory(directory_path):
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path, filename)

        if os.path.isfile(file_path):
            print(f"File: {filename}")
        else:
            print(f"Skipping directory: {filename}")
            continue

        process_file(file_path)


def get_js_array_of_titles():
    filename = "inhaltsverzeichnis.pug"
    file_path = os.path.join(directory_path, filename)
    with open(file_path, "r") as file:
        text = file.read()
    # Regular expression pattern to match the desired parts
    pattern = r'\|\s*(\d+)\.\s*a\(href="([^"]+)"\)\s*(.+)'

    # Find all matches in the text
    matches = re.findall(pattern, text)

    # Initialize the JS dictionary
    js_dict = "const titles = {\n"

    # Construct the JS dictionary entries
    for match in matches:
        index, address, title = match
        js_dict += (
            f'    "{title}": {{ "index": {int(index)}, "address": "{address}" }},\n'
        )

    # Close the JS dictionary
    js_dict += "};"

    # Print the resulting JS dictionary
    print(js_dict)
