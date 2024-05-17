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
