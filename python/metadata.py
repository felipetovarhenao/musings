import os
import json

# Configuration
root_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
bell_folder = os.path.join(root_folder, "bell")
media_folder = os.path.join(root_folder, "public/puzzles")
# Define the required metadata keys
required_metadata = ["rank"]
output_json = os.path.join(root_folder, "src/assets/puzzles.json")

# Function to parse metadata from a bell script


def parse_metadata(file_path):
    metadata = {}
    with open(file_path, "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("##"):
                try:
                    key, value = line[2:].split(":", 1)
                    value = value.strip()
                    try:
                        value = float(value)
                        if value == int(value):
                            value = int(value)
                    except:
                        pass
                    metadata[key.strip()] = value
                except ValueError:
                    continue
    return metadata

# Function to check for corresponding media files


def check_media_files(script_name, media_folder):
    png_exists = os.path.exists(os.path.join(
        media_folder, f"{script_name}.png"))
    mp3_exists = os.path.exists(os.path.join(
        media_folder, f"{script_name}.mp3"))
    return png_exists, mp3_exists

# Main script


script_info = []
missing = False

# Loop through all bell scripts
for script_file in os.listdir(bell_folder):
    # Assuming bell scripts have a .bell extension
    if script_file.endswith(".bell") and not script_file.startswith("_"):
        script_path = os.path.join(bell_folder, script_file)
        script_name = os.path.splitext(script_file)[0]

        # Parse metadata
        metadata = parse_metadata(script_path)
        missing_metadata = [
            key for key in required_metadata if key not in metadata]

        if len(missing_metadata) > 0:
            missing = True
            print(f"missing metadata: {script_name}")
        # Check media files
        png_exists, mp3_exists = check_media_files(
            script_name, media_folder)

        if not png_exists:
            missing = True
            print(f"missing png: {script_name}")
        if not mp3_exists:
            missing = True
            print(f"missing mp3: {script_name}")

        # Collect information
        script_info.append({
            "file": script_name,
            **metadata,
        })

script_info.sort(key=lambda x: x['rank'])
script_info = [{"id": i, **x} for i, x in enumerate(script_info)]
if missing:
    exit()
# Write to JSON file
with open(output_json, "w") as json_file:
    json.dump(script_info, json_file, indent=4)

print(f"Information collected and written to {output_json}")
