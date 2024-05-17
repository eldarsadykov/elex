import os
import re

# Specify the directory path
directory_path = "pug"

# List all files and directories in the given path
for filename in os.listdir(directory_path):
    # Construct full file path
    file_path = os.path.join(directory_path, filename)
    # Check if it's a file
    if os.path.isfile(file_path):
        print(f"File: {filename}")
    else:
        print(f"Skipping directory: {filename}")
        continue

    # Read all lines from the file
    with open(file_path, "r") as file:
        input_text = file.read()

        pattern = r"h1 (.+)"
        output_text = re.sub(pattern, r'- const title = "\1"\n\th1= title', input_text)

    # Write the remaining lines back to the file
    with open(file_path, "w") as file:
        file.write(output_text)
