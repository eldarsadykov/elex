import os
import re

directory_path = "pug"


def process_text(file):
    input_text = file.read()
    # Define the patterns to match and the replacements
    pattern = r"\t\tdiv\n\t\t\t| \t\t\tb"
    replacement = "\t\tdiv\n\t\t\t| \t\t\t\.inline-title"

    # Perform the replacements
    output_text = re.sub(pattern, replacement, input_text)

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

    # Initialize the JS dictionary and keys array
    js_dict = "const titles = {\n"
    keys_array = "const keys = [\n"

    # Construct the JS dictionary entries and keys array
    for match in matches:
        index, address, title = match
        js_dict += (
            f'    "{title}": {{ "index": {int(index)}, "address": "{address}" }},\n'
        )
        keys_array += f'    "{title}",\n'

    # Close the JS dictionary and keys array
    js_dict += "};"
    keys_array += "];"

    # Print the resulting JS dictionary and keys array
    print(js_dict)
    print(keys_array)


process_directory(directory_path)
