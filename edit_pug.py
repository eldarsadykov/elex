import os

# Specify the directory path
directory_path = 'pug'

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
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Check if there are at least four lines to remove
    if len(lines) >= 4:
        lines = lines[:-4]  # Remove the last four lines

    # Write the remaining lines back to the file
    with open(file_path, 'w') as file:
        file.writelines(lines)

